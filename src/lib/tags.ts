// Tag URLs. Hugo wrote /tag/<urlize(tag)>/ with removePathAccents on, so this mirrors urlize:
// lower-case, accents removed, every whitespace character becomes '-'.
// `Release Notes` -> `release-notes`, `name resolution` -> `name-resolution`.
//
// Every public URL is ASCII. A tag whose name is not ASCII (`翻译`) takes its URL segment from a tag
// description: the folder `src/content/tag/<ascii-slug>/` whose title is the tag name, so `翻译` is
// `/tag/translation/`. A tag like that without a description fails the build.

export function tagSlug(tag: string): string {
  return tag
    .trim()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/\s/g, '-');
}

/** A tag description: `id` is its folder name (the URL segment), `title` is the tag name. */
export interface TagDescription {
  id: string;
  title: string;
}

export interface TagTerm {
  /** Key that groups entries under this tag (see `tagSlug`). Not used in URLs. */
  slug: string;
  /** URL segment of the archive page. Always ASCII. */
  url: string;
  /** Name shown on the archive page: the description's title if there is one, else the name first written. */
  name: string;
  /** Number of entries carrying this tag. */
  count: number;
}

export function isAscii(value: string): boolean {
  return /^[\x00-\x7F]*$/.test(value);
}

/**
 * The URL segment for a tag name. A description with the same name wins; its folder name must be ASCII.
 * Without a description, an ASCII name is its own slug. A non-ASCII name with no description is an error.
 */
export function tagUrlSlug(name: string, descriptions: readonly TagDescription[]): string {
  const key = tagSlug(name);
  const described = descriptions.find((description) => tagSlug(description.title) === key);
  if (described) {
    if (described.id === '' || !isAscii(described.id)) {
      throw new Error(`tag description "${described.title}" needs an ASCII folder name, found "${described.id}"`);
    }
    return described.id;
  }
  if (isAscii(key)) return key;
  throw new Error(`tag "${name}" has no ASCII URL: add src/content/tag/<ascii-slug>/index.md with title "${name}"`);
}

/**
 * Groups tags from a set of entries into archive terms. Tags that differ only in case or accents
 * become one term, as Hugo does. Empty tags produce no term. Each entry counts once per term.
 * A described tag that no entry carries is also a term, with count 0, so it still gets an archive page.
 */
export function tagTerms(
  entries: readonly { tags: readonly string[] }[],
  descriptions: readonly TagDescription[] = [],
): TagTerm[] {
  const terms = new Map<string, { slug: string; name: string; count: number }>();
  for (const entry of entries) {
    const seenInEntry = new Set<string>();
    for (const tag of entry.tags) {
      const slug = tagSlug(tag);
      if (slug === '' || seenInEntry.has(slug)) continue;
      seenInEntry.add(slug);
      const existing = terms.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        terms.set(slug, { slug, name: tag.trim(), count: 1 });
      }
    }
  }
  for (const description of descriptions) {
    const slug = tagSlug(description.title);
    if (slug === '') continue;
    const existing = terms.get(slug);
    if (existing) {
      existing.name = description.title.trim();
    } else {
      terms.set(slug, { slug, name: description.title.trim(), count: 0 });
    }
  }
  const result = [...terms.values()].map((term) => ({
    ...term,
    url: tagUrlSlug(term.name, descriptions),
  }));
  return result.sort((a, b) => b.count - a.count || a.slug.localeCompare(b.slug, 'zh'));
}
