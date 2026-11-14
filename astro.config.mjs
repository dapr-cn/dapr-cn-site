// @ts-check
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import { findMissingLocalImages, formatMissing } from './scripts/lib/local-images.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));

/**
 * Fails the build before Astro runs when a content entry points at an image that is not there.
 * Astro leaves a missing Markdown image unresolved without an error, so the check is explicit.
 */
const failOnMissingImages = {
  name: 'fail-on-missing-local-images',
  hooks: {
    'astro:build:start': () => {
      const missing = findMissingLocalImages({
        contentDir: path.join(root, 'src/content'),
        publicDir: path.join(root, 'public'),
      });
      if (missing.length > 0) {
        throw new Error(`Missing local images:\n${formatMissing(missing)}`);
      }
    },
  },
};

// https://astro.build/config
export default defineConfig({
  // Public site URL. Used for canonical links, the sitemap and the feed.
  site: 'https://cn.dapr.io',
  // Hugo wrote every page as <dir>/index.html and served it with a trailing slash.
  // Keep the same URL shape so existing links keep resolving.
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [failOnMissingImages],
});
