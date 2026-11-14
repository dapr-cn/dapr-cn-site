import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

/**
 * Page bundles keep their Hugo folder name as the id, so `/post/<id>/` matches the Hugo URL.
 * `202306-dapr-release-111/index.md` -> `202306-dapr-release-111`.
 */
function bundleId({ entry }: { entry: string }): string {
  return entry.replace(/\/index\.md$/, '');
}

/**
 * Widget entries keep their path below `src/content/pages`, e.g. `home/welcome.md` -> `home/welcome`.
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
 * Tag descriptions. `tag/<name>/index.md` is the text shown above the entries of the tag `<name>`
 * on `/tag/<name>/`. The folder name is not used for the URL; the title is.
 * A tag with a description and no entries still gets a page.
 */
const tag = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/tag', generateId: bundleId }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
  }),
});

/**
 * Home-page widgets (`home/*.md`). Every entry is `headless: true` and produces no URL: the
 * home page reads them for the hero, the section titles and the community statement.
 */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages', generateId: pageId }),
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    headless: z.boolean().default(false),
    draft: z.boolean().default(false),
    weight: z.number().optional(),
    widget: z.string().optional(),
    content: z.any().optional(),
    feature: z
      .array(z.object({ name: z.string(), description: z.string(), icon: z.string().optional(), icon_pack: z.string().optional() }))
      .optional(),
  }),
});

/**
 * Starlight's collections. The site has no docs or UI-string entries of its own; the collections
 * exist so Starlight's loaders and schemas are satisfied.
 */
const docs = defineCollection({ loader: docsLoader(), schema: docsSchema() });
const i18n = defineCollection({ loader: i18nLoader(), schema: i18nSchema() });

export const collections = { post, event, publication, authors, tag, pages, docs, i18n };
