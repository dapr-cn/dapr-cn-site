// @ts-check
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { satteri } from '@astrojs/markdown-satteri';
import { findMissingLocalImages, formatMissing } from './scripts/lib/local-images.mjs';
import { bodyHeadingsStartAtH2 } from './scripts/lib/body-headings.mjs';
import { asciiHeadingIds } from './scripts/lib/heading-ids.mjs';

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
  markdown: {
    // The default Sätteri processor, plus the heading rules: the levels in scripts/lib/body-headings.mjs
    // and the ASCII ids in scripts/lib/heading-ids.mjs.
    processor: satteri({ hastPlugins: [bodyHeadingsStartAtH2, asciiHeadingIds] }),
  },
  integrations: [
    // Starlight supplies the documentation theme and its shared pieces (search, theme switch,
    // Markdown asides, code blocks). The site keeps its own routes: the 404 page stays in src/pages.
    starlight({
      title: 'Dapr 中国社区',
      defaultLocale: 'root',
      locales: { root: { label: '简体中文', lang: 'zh-CN' } },
      disable404Route: true,
      // The site keeps its own masthead, footer, head tags and theme handling; Starlight supplies
      // the page frame and its shared behaviour. See src/components/starlight/.
      components: {
        Head: './src/components/starlight/Head.astro',
        PageTitle: './src/components/starlight/PageTitle.astro',
        Header: './src/components/Header.astro',
        Footer: './src/components/Footer.astro',
      },
      // Starlight's colours come from the site's tokens (see the file for the mapping).
      customCss: ['./src/styles/starlight.css'],
      // Code blocks keep the flat Code Wash block of DESIGN.md: no terminal frame, the site's
      // background, rule, radius and monospace font. The copy button and highlighting stay.
      expressiveCode: {
        defaultProps: { frame: 'none' },
        styleOverrides: {
          codeBackground: 'var(--color-code-bg)',
          borderColor: 'var(--color-border)',
          borderRadius: '10px',
          codeFontFamily: 'var(--font-mono)',
        },
      },
    }),
    failOnMissingImages,
  ],
});
