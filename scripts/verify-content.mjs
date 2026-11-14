// Checks the migrated content after a build:
//   1. front matter: parses, has a title, and has a valid date on dated collections
//   2. author references: every author an entry names has a profile
//   3. local images: every local image resolves (the build fails on these too)
//   4. internal links: every link in a body resolves to a built page or a public file
//   5. external images: listed for review, not a failure (hotlinked images may disappear)
//
// Exits 1 when checks 1-4 find a problem. Run after `pnpm run build`, which writes dist/.
//
// Usage:
//   node scripts/verify-content.mjs

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';
import { findMissingLocalImages, formatMissing, isLocalReference } from './lib/local-images.mjs';
import { normalisePath, routesFromDist } from './verify-url-parity.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Sections another deployment serves. Links to them are not checked against this build. */
export const EXTERNAL_SECTIONS = ['/source/', '/case/'];

const DATED = new Set(['post', 'event', 'publication']);
const LINK = /(?<!!)\[[^\]]*\]\(\s*<?([^)\s>]+)[^)]*\)/g;
const IMAGE_SRC = /!\[[^\]]*\]\(\s*<?(https?:\/\/[^)\s>]+)[^)]*\)|<img\b[^>]*?\ssrc\s*=\s*["'](https?:\/\/[^"']+)["']/gi;

/** Parses the front matter of a converted entry. Returns `{ data, body }`. Throws on bad YAML. */
export function parseEntry(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    throw new Error('no YAML front matter');
  }
  return { data: parseYaml(match[1]) ?? {}, body: text.slice(match[0].length) };
}

/**
 * Checks front matter of each entry.
 * @param {{ collection: string, id: string, file: string, text: string }[]} entries
 */
export function checkFrontMatter(entries) {
  const findings = [];
  for (const entry of entries) {
    let data;
    try {
      ({ data } = parseEntry(entry.text));
    } catch (error) {
      findings.push({ file: entry.file, field: 'front matter', message: error.message });
      continue;
    }
    if (typeof data.title !== 'string' || data.title.trim() === '') {
      findings.push({ file: entry.file, field: 'title', message: 'missing title' });
    }
    if (DATED.has(entry.collection)) {
      if (data.date === undefined || Number.isNaN(Date.parse(String(data.date)))) {
        findings.push({ file: entry.file, field: 'date', message: `invalid date "${data.date ?? ''}"` });
      }
    }
  }
  return findings;
}

/**
 * Checks that each author a post names has a profile.
 * @param {{ collection: string, file: string, text: string }[]} entries
 * @param {Set<string>} authorIds folder names of the author profiles
 */
export function checkAuthorReferences(entries, authorIds) {
  const findings = [];
  for (const entry of entries.filter((item) => item.collection === 'post')) {
    let data;
    try {
      ({ data } = parseEntry(entry.text));
    } catch {
      continue; // reported by checkFrontMatter
    }
    for (const author of data.authors ?? []) {
      if (!authorIds.has(author)) {
        findings.push({ file: entry.file, field: 'authors', message: `unknown author "${author}"` });
      }
    }
  }
  return findings;
}

/** Route a body's relative links resolve from. Entries embedded in another page use that page. */
export function baseRouteOf(entry) {
  if (entry.collection === 'site') return normalisePath(`/${entry.id}`);
  if (entry.collection === 'pages') {
    if (entry.id.startsWith('home/')) return '/';
    return normalisePath(`/${entry.id}`);
  }
  if (entry.collection === 'authors') return normalisePath(`/author/${entry.id}`);
  return normalisePath(`/${entry.collection}/${entry.id}`);
}

/**
 * Checks internal links in each body.
 * @param {{ collection: string, id: string, file: string, text: string, title?: string }[]} entries
 * @param {{ routes: Set<string>, publicFiles: Set<string> }} site built routes and public file paths
 */
export function checkInternalLinks(entries, site) {
  const findings = [];
  for (const entry of entries) {
    let body;
    try {
      ({ body } = parseEntry(entry.text));
    } catch {
      continue; // reported by checkFrontMatter
    }
    const base = baseRouteOf(entry);
    for (const match of body.matchAll(LINK)) {
      const href = match[1];
      if (!isLocalReference(href)) continue; // external, mailto:, or in-page anchor
      const resolved = new URL(href, `https://site.invalid${base}`).pathname;
      const decoded = decodeURI(resolved);
      if (EXTERNAL_SECTIONS.some((prefix) => decoded.startsWith(prefix))) continue;
      const asRoute = normalisePath(decoded);
      if (site.routes.has(asRoute) || site.publicFiles.has(decoded)) continue;
      findings.push({ file: entry.file, field: 'link', message: `link "${href}" resolves to ${decoded}, which is not built` });
    }
  }
  return findings;
}

/** External image URLs written in the content, for review. */
export function externalImages(entries) {
  const found = new Map();
  for (const entry of entries) {
    for (const match of entry.text.matchAll(IMAGE_SRC)) {
      const url = match[1] ?? match[2];
      if (!found.has(url)) found.set(url, []);
      found.get(url).push(entry.file);
    }
  }
  return [...found.entries()].map(([url, files]) => ({ url, files }));
}

function walkFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walkFiles(full) : [full];
  });
}

/** Loads every entry from src/content with its collection, id and base route. */
export function loadEntries(contentDir) {
  const entries = [];
  for (const collection of ['post', 'event', 'publication', 'authors', 'tag']) {
    for (const file of walkFiles(path.join(contentDir, collection)).filter((f) => f.endsWith('.md'))) {
      const id = path.basename(path.dirname(file));
      entries.push({ collection, id, file: path.relative(ROOT, file), text: readFileSync(file, 'utf8') });
    }
  }
  for (const collection of ['pages', 'site']) {
    for (const file of walkFiles(path.join(contentDir, collection)).filter((f) => f.endsWith('.md'))) {
      const relative = path.relative(path.join(contentDir, collection), file).split(path.sep).join('/');
      const id = relative.replace(/\/index\.md$/, '').replace(/\.md$/, '');
      entries.push({ collection, id, file: path.relative(ROOT, file), text: readFileSync(file, 'utf8') });
    }
  }
  return entries;
}

/** Public files as URL paths, e.g. `/media/dapr.png`. */
export function publicFilesOf(publicDir) {
  const files = new Set();
  for (const file of walkFiles(publicDir)) {
    if (statSync(file).isFile()) {
      files.add(`/${path.relative(publicDir, file).split(path.sep).join('/')}`);
    }
  }
  return files;
}

function main() {
  const contentDir = path.join(ROOT, 'src/content');
  const publicDir = path.join(ROOT, 'public');
  const distDir = path.join(ROOT, 'dist');
  if (!existsSync(distDir)) {
    console.error('dist/ not found. Run pnpm run build first.');
    return 1;
  }

  const entries = loadEntries(contentDir);
  const authorIds = new Set(entries.filter((e) => e.collection === 'authors').map((e) => e.id));
  const site = {
    routes: new Set(routesFromDist(distDir).map(normalisePath)),
    publicFiles: publicFilesOf(publicDir),
  };

  const findings = [
    ...checkFrontMatter(entries).map((f) => ({ check: 'front matter', ...f })),
    ...checkAuthorReferences(entries, authorIds).map((f) => ({ check: 'author reference', ...f })),
    ...checkInternalLinks(entries, site).map((f) => ({ check: 'internal link', ...f })),
  ];
  const missingImages = findMissingLocalImages({ contentDir, publicDir });
  for (const item of missingImages) {
    findings.push({ check: 'local image', file: item.file, field: 'image', message: `missing image "${item.ref}"` });
  }

  const external = externalImages(entries);
  console.log(`Checked ${entries.length} entries against ${site.routes.size} built routes.`);
  console.log(`External images (not checked, may disappear): ${external.length}`);
  for (const item of external) console.log(`  ~ ${item.url} (${item.files.length} file(s))`);

  if (findings.length > 0) {
    console.error(`${findings.length} content problem(s):`);
    for (const finding of findings) {
      console.error(`  [${finding.check}] ${finding.file}: ${finding.message}`);
    }
    return 1;
  }
  console.log('Content checks passed.');
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = main();
}

export { formatMissing };
