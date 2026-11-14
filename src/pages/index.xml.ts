import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../config/site';
import { urls } from '../lib/urls';

// RSS feed of posts at /index.xml (the Hugo home feed URL), newest first.
export async function GET(context: APIContext) {
  const posts = (await getCollection('post', (entry) => !entry.data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? site.baseUrl,
    customData: '<language>zh-cn</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary ?? post.data.abstract ?? '',
      link: urls.post(post.id),
    })),
  });
}
