// Checks that every URL the Hugo site published is still produced by the Astro build.
//
// Compares the routes in dist/ with scripts/hugo-urls.txt. Exits 1 and prints each missing URL.
// Extra routes (URLs the Hugo site did not publish) are listed but do not fail the check.
//
// Usage:
//   node scripts/verify-url-parity.mjs [distDir] [urlsFile]

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Normalises a URL path: decoded, leading and trailing slash. `/tag/%E7%BF%BB%E8%AF%91` -> `/tag/翻译/`. */
export function normalisePath(input) {
  let value = input.trim();
  try {
    value = decodeURI(value);
  } catch {
    // Already decoded or malformed; keep as written.
  }
  if (!value.startsWith('/')) value = `/${value}`;
  if (!value.endsWith('/')) value = `${value}/`;
  return value;
}

/** Reads the Hugo URL list: one URL per line, `#` starts a comment. */
export function parseUrlList(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .map(normalisePath);
}

/** Lists the route of every directory in `distDir` that holds an index.html. */
export function routesFromDist(distDir) {
  const routes = [];
  const visit = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        visit(path.join(dir, entry.name));
      } else if (entry.name === 'index.html') {
        const relative = path.relative(distDir, dir).split(path.sep).join('/');
        routes.push(normalisePath(relative === '' ? '/' : `/${relative}`));
      }
    }
  };
  visit(distDir);
  return routes;
}

/**
 * Compares the Hugo URLs with the built routes.
 * @returns {{ missing: string[], extra: string[] }}
 */
export function compareRoutes(hugoUrls, routes) {
  const built = new Set(routes.map(normalisePath));
  const expected = new Set(hugoUrls.map(normalisePath));
  return {
    missing: [...expected].filter((url) => !built.has(url)).sort(),
    extra: [...built].filter((url) => !expected.has(url)).sort(),
  };
}

function main() {
  const distDir = path.resolve(process.argv[2] ?? path.join(ROOT, 'dist'));
  const urlsFile = path.resolve(process.argv[3] ?? path.join(ROOT, 'scripts/hugo-urls.txt'));
  if (!existsSync(distDir)) {
    console.error(`dist directory not found: ${distDir}. Run pnpm run build first.`);
    return 1;
  }
  const hugoUrls = parseUrlList(readFileSync(urlsFile, 'utf8'));
  const routes = routesFromDist(distDir);
  const { missing, extra } = compareRoutes(hugoUrls, routes);

  console.log(`Hugo URLs: ${hugoUrls.length}, built routes: ${routes.length}`);
  if (extra.length > 0) {
    console.log(`Routes not in the Hugo list (${extra.length}):`);
    for (const url of extra) console.log(`  + ${url}`);
  }
  if (missing.length > 0) {
    console.error(`Missing ${missing.length} Hugo URL(s):`);
    for (const url of missing) console.error(`  - ${url}`);
    return 1;
  }
  console.log('Route parity: every Hugo URL is produced.');
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = main();
}
