// Finds local image references in content that point at files which do not exist.
// Used by the Astro build (astro.config.mjs) so a missing image fails the build,
// and by scripts/verify-content.mjs so `pnpm run verify` reports the same findings.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const MARKDOWN_IMAGE = /!\[[^\]]*\]\(\s*<?([^)\s>]+)[^)]*\)/g;
const HTML_IMAGE = /<img\b[^>]*?\ssrc\s*=\s*["']([^"']+)["']/gi;

/** A reference is local when it is not an absolute URL, protocol-relative, data URI or in-page anchor. */
export function isLocalReference(ref) {
  return !(/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(ref));
}

/** Lists the image references of one Markdown text: `{ ref }` for every image written in it. */
export function imageReferences(text) {
  const refs = [];
  for (const match of text.matchAll(MARKDOWN_IMAGE)) refs.push(match[1]);
  for (const match of text.matchAll(HTML_IMAGE)) refs.push(match[1]);
  return refs.filter(isLocalReference);
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

/**
 * Returns `[{ file, ref }]` for each local image that does not exist.
 * Relative references resolve from the Markdown file. Absolute ones (`/media/x.png`) resolve from `publicDir`.
 * @param {{ contentDir: string, publicDir: string }} roots
 */
export function findMissingLocalImages({ contentDir, publicDir }) {
  const missing = [];
  for (const file of walk(contentDir).filter((f) => f.endsWith('.md'))) {
    const text = readFileSync(file, 'utf8');
    for (const raw of imageReferences(text)) {
      const ref = decodeURI(raw.split(/[?#]/)[0]);
      const target = ref.startsWith('/')
        ? path.join(publicDir, ref)
        : path.resolve(path.dirname(file), ref);
      if (!existsSync(target)) {
        missing.push({ file: path.relative(process.cwd(), file), ref: raw });
      }
    }
  }
  return missing;
}

/** Formats findings as one line per missing image. */
export function formatMissing(missing) {
  return missing.map((item) => `${item.file}: missing image "${item.ref}"`).join('\n');
}
