// Ordering and navigation for the section pages (`case` and `source`).
//
// Pure functions over `{ id, title, weight }` items, so the tests need no Astro runtime. An id is
// the path inside the collection (`join/pr`); the landing entry is `index` and has no parent.
//
// Ordering: at each level, a lower `weight` comes first, a page without `weight` comes last, and
// ties sort by title. Hugo's `weight` is kept for this.

/** The id of a section's landing entry (`index.md` at the collection root). */
export const ROOT_ID = 'index';

export interface SectionItem {
  id: string;
  title: string;
  weight?: number;
}

export interface Crumb {
  title: string;
  href: string;
}

/** The `[...id]` route parameter for an entry. The landing has none, so `/case/` matches it. */
export function routeParam(id: string): string | undefined {
  return id === ROOT_ID ? undefined : id;
}

/** The parent id: `join/pr` -> `join`, `join` -> '' (the top level of the section). */
export function parentOf(id: string): string {
  const slash = id.lastIndexOf('/');
  return slash === -1 ? '' : id.slice(0, slash);
}

/** Orders two items: lower weight first, missing weight last, then by title. */
export function compareItems(a: SectionItem, b: SectionItem): number {
  const aWeight = a.weight ?? Infinity;
  const bWeight = b.weight ?? Infinity;
  if (aWeight !== bWeight) return aWeight < bWeight ? -1 : 1;
  return a.title.localeCompare(b.title, 'zh-Hans-CN');
}

/** Every page of the section, without the landing entry. */
function pages(items: readonly SectionItem[]): SectionItem[] {
  return items.filter((item) => item.id !== ROOT_ID);
}

/** The direct children of `parent` (`''` for the top level), in order. */
function childrenOf(items: readonly SectionItem[], parent: string): SectionItem[] {
  return pages(items)
    .filter((item) => parentOf(item.id) === parent)
    .sort(compareItems);
}

/**
 * The pages that share a parent with `id`, `id` included, in order. This is the list shown beside
 * the page. For the landing it is the top level of the section.
 */
export function sectionList(items: readonly SectionItem[], id: string): SectionItem[] {
  return childrenOf(items, parentOf(id));
}

/** Every page of the section in reading order: each page is followed by its own children. */
export function sectionOrder(items: readonly SectionItem[]): SectionItem[] {
  const ordered: SectionItem[] = [];
  const visit = (parent: string) => {
    for (const item of childrenOf(items, parent)) {
      ordered.push(item);
      visit(item.id);
    }
  };
  visit('');
  return ordered;
}

/** The page before and after `id` in reading order. Either is undefined at the ends. */
export function previousAndNext(items: readonly SectionItem[], id: string): { previous?: SectionItem; next?: SectionItem } {
  const order = sectionOrder(items);
  const index = order.findIndex((item) => item.id === id);
  if (index === -1) return {};
  return {
    previous: index > 0 ? order[index - 1] : undefined,
    next: index < order.length - 1 ? order[index + 1] : undefined,
  };
}

/**
 * The trail from the section landing to `id`, the page itself last. Each crumb links to its page,
 * `url` builds a section URL from an id (`urls.caseSection` or `urls.sourceSection`).
 * An ancestor with no entry of its own is skipped.
 */
export function breadcrumb(items: readonly SectionItem[], id: string, url: (id?: string) => string): Crumb[] {
  const root = items.find((item) => item.id === ROOT_ID);
  const crumbs: Crumb[] = [{ title: root?.title ?? '', href: url() }];
  if (id === ROOT_ID) return crumbs;

  const segments = id.split('/');
  for (let length = 1; length <= segments.length; length++) {
    const path = segments.slice(0, length).join('/');
    const item = items.find((candidate) => candidate.id === path);
    if (item) crumbs.push({ title: item.title, href: url(path) });
  }
  return crumbs;
}
