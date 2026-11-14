import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Page bundles keep their Hugo folder name as the id, so `/post/<id>/` matches the Hugo URL.
 * `202306-dapr-release-111/index.md` -> `202306-dapr-release-111`.
 */
function bundleId({ entry }: { entry: string }): string {
  return entry.replace(/\/index\.md$/, '');
}

/**
 * Static pages keep their path below `src/content/pages`.
 * `tour/index.md` -> `tour`, `translation/docs/index.md` -> `translation/docs`,
 * `meeting/meeting-minutes.md` -> `meeting/meeting-minutes`.
 */
function pageId({ entry }: { entry: string }): string {
  return entry.replace(/\/index\.md$/, '').replace(/\.md$/, '');
}

/** Tags: trimmed, non-empty, de-duplicated. Hugo's empty tag values are removed here too. */
const tagList = z
  .array(z.string())
  .default([])
  .transform((tags) => [...new Set(tags.map((tag) => tag.trim()).filter((tag) => tag.length > 0))]);

const post = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/post', generateId: bundleId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      authors: z.array(reference('authors')),
      tags: tagList,
      summary: z.string().optional(),
      abstract: z.string().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      header: z
        .object({
          image: image().optional(),
          caption: z.string().optional(),
        })
        .optional(),
    }),
});

const event = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/event', generateId: bundleId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      event: z.string().optional(),
      event_url: z.string().optional(),
      location: z.string().optional(),
      summary: z.string().optional(),
      abstract: z.string().optional(),
      date: z.coerce.date(),
      date_end: z.coerce.date().optional(),
      publishDate: z.coerce.date().optional(),
      tags: tagList,
      featured: z.boolean().default(false),
      image: z
        .object({
          filename: image().optional(),
          caption: z.string().optional(),
          focal_point: z.string().optional(),
        })
        .optional(),
    }),
});

const publication = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/publication', generateId: bundleId }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    publication_types: z.array(z.string()),
    publication: z.string().optional(),
    publication_short: z.string().optional(),
    abstract: z.string().optional(),
    summary: z.string().optional(),
    doi: z.string().optional(),
    publishDate: z.coerce.date().optional(),
    tags: tagList,
    links: z.array(z.object({ name: z.string(), url: z.string() })).default([]),
    featured: z.boolean().default(false),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/authors', generateId: bundleId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      superuser: z.boolean().default(false),
      role: z.string().optional(),
      bio: z.string().optional(),
      organizations: z.array(z.object({ name: z.string(), url: z.string().optional() })).default([]),
      interests: z.array(z.string()).default([]),
      social: z
        .array(z.object({ icon: z.string(), icon_pack: z.string().optional(), link: z.string().optional() }))
        .default([]),
      avatar: image().optional(),
    }),
});

/**
 * Static pages and home-page widgets. Widgets are `headless: true` and produce no URL:
 * the tour slider, the people list and the home sections are read by the pages that use them.
 */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages', generateId: pageId }),
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    headless: z.boolean().default(false),
    draft: z.boolean().default(false),
    toc: z.boolean().default(false),
    weight: z.number().optional(),
    widget: z.string().optional(),
    content: z.any().optional(),
    feature: z
      .array(z.object({ name: z.string(), description: z.string(), icon: z.string().optional(), icon_pack: z.string().optional() }))
      .optional(),
  }),
});

export const collections = { post, event, publication, authors, pages };
