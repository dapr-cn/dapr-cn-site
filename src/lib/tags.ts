// Tag URLs. Hugo wrote /tag/<urlize(tag)>/ with removePathAccents on, so this mirrors urlize:
// lower-case, accents removed, every whitespace character becomes '-', CJK characters are kept.
// `翻译` -> `翻译`, `Release Notes` -> `release-notes`, `name resolution` -> `name-resolution`.

export function tagSlug(tag: string): string {
  return tag
    .trim()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/\s/g, '-');
}

export interface TagTerm {
  /** URL segment of the archive page. */
  slug: string;
  /** Name as first written, shown on the archive page. */
  name: string;
  /** Number of entries carrying this tag. */
  count: number;
}

/**
 * Groups tags from a set of entries into archive terms. Tags that differ only in case or accents
 * become one term, as Hugo does. Empty tags produce no term. Each entry counts once per term.
 */
export function tagTerms(entries: readonly { tags: readonly string[] }[]): TagTerm[] {
  const terms = new Map<string, TagTerm>();
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
  return [...terms.values()].sort((a, b) => b.count - a.count || a.slug.localeCompare(b.slug, 'zh'));
}
