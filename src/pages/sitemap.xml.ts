import { getCollection } from 'astro:content';
import { site } from '../config/site';
import { tagTerms } from '../lib/tags';
import { urls } from '../lib/urls';
import { routeParam } from '../lib/sections';
import { publicationTypes } from '../lib/publication-types';

// Sitemap at /sitemap.xml (the Hugo path). Lists every public page with its absolute URL.
export async function GET() {
  const [posts, events, publications, authors, descriptions, sitePages, caseSections, sourceSections] = await Promise.all([
    getCollection('post', (entry) => !entry.data.draft),
    getCollection('event'),
    getCollection('publication'),
    getCollection('authors'),
    getCollection('tag'),
    getCollection('site', (entry) => !entry.data.draft),
    getCollection('case', (entry) => !entry.data.draft),
    getCollection('source', (entry) => !entry.data.draft),
  ]);

  const paths = new Set<string>([
    urls.home(),
    urls.postList(),
    urls.eventList(),
    urls.publicationList(),
    urls.authorList(),
    urls.tagList(),
    urls.categoryList(),
    urls.publicationTypeList(),
    ...sitePages.map((page) => urls.site(page.id)),
    ...caseSections.map((entry) => urls.caseSection(routeParam(entry.id))),
    ...sourceSections.map((entry) => urls.sourceSection(routeParam(entry.id))),
    ...posts.map((post) => urls.post(post.id)),
    ...events.map((event) => urls.event(event.id)),
    ...publications.map((publication) => urls.publication(publication.id)),
    ...authors.map((author) => urls.author(author.id)),
    ...tagTerms(
      [...posts, ...events, ...publications].map((entry) => ({ tags: entry.data.tags })),
      descriptions.map((entry) => ({ id: entry.id, title: entry.data.title })),
    ).map((term) => urls.tag(term.url)),
    ...publicationTypes(publications).map((type) => urls.publicationType(type)),
  ]);

  const body = [...paths]
    .sort()
    .map((path) => `  <url><loc>${new URL(path, site.baseUrl).href}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
