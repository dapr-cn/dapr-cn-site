// One-off migration: Hugo content (TOML or YAML front matter) -> Astro content collections (YAML front matter).
//
// The body of every file is copied byte for byte. Only the front matter is parsed and rewritten.
//
// Usage:
//   node scripts/convert-front-matter.mjs            run every migration job listed in JOBS
//
// Keep this script until the migration is verified (see design.md D3), then remove it.

import { cp, mkdir, readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseToml } from 'smol-toml';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Splits a Hugo file into front matter text, its format and the untouched body.
 * Leading blank lines before the opening delimiter are ignored (six Hugo files start with one).
 * A file without front matter returns format null and the whole text as its body.
 */
export function splitFrontMatter(raw) {
  const text = raw.replace(/^﻿/, '');
  const trimmedStart = text.replace(/^\s*(?=\+\+\+|---)/, '');
  const open = trimmedStart.match(/^(\+\+\+|---)[ \t]*\r?\n/);
  if (!open) {
    return { format: null, frontMatterText: '', body: raw };
  }
  const delimiter = open[1];
  const afterOpen = trimmedStart.slice(open[0].length);
  const close = new RegExp(`(^|\\r?\\n)${delimiter.replace(/\+/g, '\\+')}[ \\t]*(\\r?\\n|$)`).exec(afterOpen);
  if (!close) {
    throw new Error('front matter is not closed');
  }
  const frontMatterText = afterOpen.slice(0, close.index);
  const body = afterOpen.slice(close.index + close[0].length);
  return { format: delimiter === '+++' ? 'toml' : 'yaml', frontMatterText, body };
}

/**
 * TOML parses unquoted dates into Date objects. Quote them first so every date stays the
 * exact string Hugo read, and so the YAML written afterwards is unambiguous.
 */
function quoteBareTomlDates(text) {
  return text.replace(
    /^(\s*[A-Za-z0-9_.-]+\s*=\s*)(\d{4}-\d{2}-\d{2}(?:[T ][0-9:.]+(?:Z|[+-]\d{2}:?\d{2})?)?)[ \t]*$/gm,
    '$1"$2"',
  );
}

function parseFrontMatter(format, text) {
  if (format === 'toml') {
    return parseToml(quoteBareTomlDates(text));
  }
  if (format === 'yaml') {
    return parseYaml(text) ?? {};
  }
  return {};
}

/**
 * Removes empty strings and null (Hugo writes `key:` with no value as null), and objects emptied
 * by that, at every level. Empty arrays are kept.
 */
function stripEmptyStrings(value) {
  if (Array.isArray(value)) {
    return value.filter((item) => item !== '' && item !== null).map(stripEmptyStrings);
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, item] of Object.entries(value)) {
      if (item === '' || item === null) continue;
      const cleaned = stripEmptyStrings(item);
      if (cleaned && typeof cleaned === 'object' && !Array.isArray(cleaned) && Object.keys(cleaned).length === 0) {
        continue;
      }
      out[key] = cleaned;
    }
    return out;
  }
  return value;
}

/** First Markdown level-1 heading in a body, or undefined. */
function firstHeading(body) {
  const match = body.match(/^#\s+(.+?)\s*$/m);
  return match ? match[1] : undefined;
}

/** Merges `source` into `target`, recursing into plain objects. Used to add image fields. */
function deepMerge(target, source) {
  if (!source) return target;
  const out = { ...target };
  for (const [key, value] of Object.entries(source)) {
    const isObject = (v) => v && typeof v === 'object' && !Array.isArray(v);
    out[key] = isObject(value) && isObject(out[key]) ? deepMerge(out[key], value) : value;
  }
  return out;
}

/**
 * Converts one Hugo document. Returns the new file text and the parsed metadata.
 * @param {string} raw            the original file text
 * @param {{ fallbackTitle?: string }} [options]
 */
export function convertDocument(raw, options = {}) {
  const { format, frontMatterText, body } = splitFrontMatter(raw);
  const data = deepMerge(stripEmptyStrings(parseFrontMatter(format, frontMatterText)), options.extra);

  if (!data.title) {
    const title = firstHeading(body) ?? options.fallbackTitle;
    if (!title) {
      throw new Error('no title in front matter, no heading in body, and no fallback title');
    }
    data.title = title;
  }

  // Keep the key order from the source, with title first.
  const ordered = { title: data.title, ...data };
  const yaml = stringifyYaml(ordered, {
    defaultStringType: 'QUOTE_DOUBLE',
    defaultKeyType: 'PLAIN',
    lineWidth: 0,
  });
  return { text: `---\n${yaml}---\n${body}`, body, data };
}

/** Copies a directory tree. Markdown is converted, every other file is copied unchanged. */
const IMAGE_FILE = /\.(png|jpe?g|gif|webp|svg|avif)$/i;

/**
 * Image fields Hugo found by filename convention, written into front matter so the Astro schema
 * can check that the file exists. `kind` is the collection kind from JOBS.
 */
function bundleImageExtra(kind, names) {
  const find = (prefix) => names.find((name) => name.toLowerCase().startsWith(prefix) && IMAGE_FILE.test(name));
  if (kind === 'post') {
    const featured = find('featured.');
    return featured ? { header: { image: `./${featured}` } } : undefined;
  }
  if (kind === 'event') {
    const featured = find('featured.');
    return featured ? { image: { filename: `./${featured}` } } : undefined;
  }
  if (kind === 'author') {
    const avatar = find('avatar.');
    return avatar ? { avatar: `./${avatar}` } : undefined;
  }
  return undefined;
}

export async function convertTree(srcDir, dstDir, { skip = [], renameIndex = false, fallbackTitle, kind } = {}) {
  const report = { converted: [], copied: [], skipped: [] };
  await walk(srcDir, dstDir, srcDir);
  return report;

  async function walk(currentSrc, currentDst, base) {
    await mkdir(currentDst, { recursive: true });
    const entries = await readdir(currentSrc, { withFileTypes: true });
    const names = entries.map((entry) => entry.name);
    for (const entry of entries) {
      const from = path.join(currentSrc, entry.name);
      const relative = path.relative(base, from);
      if (skip.includes(relative) || skip.includes(entry.name)) {
        report.skipped.push(relative);
        continue;
      }
      if (entry.isDirectory()) {
        await walk(from, path.join(currentDst, entry.name), base);
        continue;
      }
      if (entry.name.endsWith('.md')) {
        const outName = renameIndex && entry.name === '_index.md' ? 'index.md' : entry.name;
        const to = path.join(currentDst, outName);
        const raw = await readFile(from, 'utf8');
        // Hugo found featured.* and avatar.* by filename. Name them in front matter for the schema.
        const extra = bundleImageExtra(kind, names);
        const result = convertDocument(raw, { fallbackTitle: fallbackTitle ?? path.basename(currentSrc), extra });
        await writeFile(to, result.text, 'utf8');
        report.converted.push(path.relative(ROOT, to));
      } else {
        await cp(from, path.join(currentDst, entry.name));
        report.copied.push(path.relative(ROOT, from));
      }
    }
  }
}

/**
 * Migration jobs. Paths are relative to the repository root. `_index.md` is the Hugo section
 * page; posts, events and publications have no entry for it, and the list pages replace it.
 */
export const JOBS = [
  { from: 'content/post', to: 'src/content/post', skip: ['_index.md'], kind: 'post' },
  { from: 'content/event', to: 'src/content/event', skip: ['_index.md'], kind: 'event' },
  { from: 'content/publication', to: 'src/content/publication', skip: ['_index.md'] },
  { from: 'content/authors', to: 'src/content/authors', renameIndex: true, kind: 'author' },
  { from: 'content/tour', to: 'src/content/pages/tour' },
  { from: 'content/people', to: 'src/content/pages/people', fallbackTitle: '社区成员' },
  { from: 'content/meeting', to: 'src/content/pages/meeting', renameIndex: true },
  { from: 'content/translation', to: 'src/content/pages/translation', renameIndex: true },
  // Home widgets. cta.md and image.md are inactive (active: false) and are dropped.
  { from: 'content/home', to: 'src/content/pages/home', skip: ['cta.md', 'image.md'], fallbackTitle: '首页' },
];

async function main() {
  for (const job of JOBS) {
    const src = path.join(ROOT, job.from);
    if (!existsSync(src)) {
      throw new Error(`missing source: ${job.from}`);
    }
    if (!(await stat(src)).isDirectory()) {
      throw new Error(`not a directory: ${job.from}`);
    }
    const dst = path.join(ROOT, job.to);
    // Section folders may hold files that are copied into the same place; they are overwritten.
    const report = await convertTree(src, dst, job);
    console.log(
      `${job.from} -> ${job.to}: ${report.converted.length} converted, ${report.copied.length} copied, ${report.skipped.length} skipped`,
    );
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
