import { getCollection } from 'astro:content';
import { tagUrlSlug, type TagDescription } from './tags';
import { urls } from './urls';

/** The tag descriptions in src/content/tag, as `tagTerms` expects them. */
export async function tagDescriptions(): Promise<TagDescription[]> {
  return (await getCollection('tag')).map((entry) => ({ id: entry.id, title: entry.data.title }));
}

/**
 * Returns a function from a tag name (as written on an entry) to its public URL. Build-time only:
 * it reads the tag descriptions, and fails for a non-ASCII tag that has no description.
 */
export async function tagHrefs(): Promise<(name: string) => string> {
  const descriptions = await tagDescriptions();
  return (name) => urls.tag(tagUrlSlug(name, descriptions));
}
