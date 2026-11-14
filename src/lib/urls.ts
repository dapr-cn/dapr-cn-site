// Public URLs. Every path ends with a slash, as in the Hugo site (`trailingSlash: 'always'`).
// Segments are percent-encoded, so `/tag/translation/` is written `/tag/translation/`, as Hugo wrote it.

const path = (...segments: string[]): string => encodeURI(`/${segments.join('/')}/`);

export const urls = {
  home: () => '/',
  post: (id: string) => path('post', id),
  postList: () => path('post'),
  event: (id: string) => path('event', id),
  eventList: () => path('event'),
  publication: (id: string) => path('publication', id),
  publicationList: () => path('publication'),
  publicationType: (type: string) => path('publication-type', type),
  publicationTypeList: () => path('publication_types'),
  /** `name` is the author's display name, which is what Hugo used as the author slug. */
  author: (name: string) => path('author', name),
  authorList: () => path('authors'),
  tag: (slug: string) => path('tag', slug),
  tagList: () => path('tags'),
  categoryList: () => path('categories'),
};
