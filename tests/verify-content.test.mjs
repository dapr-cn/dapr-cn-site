import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import {
  checkAuthorReferences,
  checkFrontMatter,
  checkInternalLinks,
  externalImages,
} from '../scripts/verify-content.mjs';
import { findMissingLocalImages } from '../scripts/lib/local-images.mjs';
import { compareRoutes, parseUrlList } from '../scripts/verify-url-parity.mjs';

const post = (id, front, body = '') => ({
  collection: 'post',
  id,
  file: `src/content/post/${id}/index.md`,
  text: `---\n${front}\n---\n${body}`,
});

const good = post('202306-release', 'title: "Release"\ndate: "2023-06-14"\nauthors:\n  - "zhangshanyou"\ntags: []', 'Body.\n');

test('front matter with a title and a date passes', () => {
  assert.deepEqual(checkFrontMatter([good]), []);
});

test('front matter without a title is reported with the file', () => {
  const findings = checkFrontMatter([post('no-title', 'date: "2023-06-14"\nauthors: []')]);
  assert.equal(findings.length, 1);
  assert.equal(findings[0].field, 'title');
  assert.match(findings[0].file, /no-title/);
});

test('a malformed date is reported', () => {
  const findings = checkFrontMatter([post('bad-date', 'title: "x"\ndate: "not a date"')]);
  assert.equal(findings[0].field, 'date');
});

test('an author with no profile fails the author reference check', () => {
  const findings = checkAuthorReferences([post('ghost', 'title: "x"\ndate: "2023-01-01"\nauthors:\n  - "nobody"')], new Set(['zhangshanyou']));
  assert.equal(findings.length, 1);
  assert.match(findings[0].message, /unknown author "nobody"/);
});

test('a known author passes the author reference check', () => {
  assert.deepEqual(checkAuthorReferences([good], new Set(['zhangshanyou'])), []);
});

test('a broken internal link fails and names the link', () => {
  const site = { routes: new Set(['/translation/', '/tag/翻译/']), publicFiles: new Set() };
  const entry = post('links', 'title: "x"\ndate: "2023-01-01"', 'See [译](../../translation/), [missing](../../nope/) and [source](/source/).\n');
  const findings = checkInternalLinks([entry], site);
  assert.equal(findings.length, 1);
  assert.match(findings[0].message, /nope/);
});

test('a relative link that resolves to a built tag page passes', () => {
  const site = { routes: new Set(['/tag/翻译/']), publicFiles: new Set() };
  const entry = post('tag-link', 'title: "x"\ndate: "2023-01-01"', 'See [tag](../../tag/%E7%BF%BB%E8%AF%91/).\n');
  assert.deepEqual(checkInternalLinks([entry], site), []);
});

test('external images are listed, not failed', () => {
  const entry = post('pics', 'title: "x"\ndate: "2023-01-01"', '![a](https://example.com/a.png)\n<img src="https://example.com/b.png" />\n');
  assert.deepEqual(
    externalImages([entry]).map((item) => item.url),
    ['https://example.com/a.png', 'https://example.com/b.png'],
  );
});

test('a missing local image is found in a temporary content tree', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'dapr-cn-verify-'));
  const contentDir = path.join(root, 'content');
  const publicDir = path.join(root, 'public');
  await mkdir(path.join(contentDir, 'post', 'img'), { recursive: true });
  await mkdir(publicDir, { recursive: true });
  await writeFile(path.join(contentDir, 'post', 'img', 'index.md'), '---\ntitle: "x"\n---\n![x](images/nope.png)\n');
  const missing = findMissingLocalImages({ contentDir, publicDir });
  assert.equal(missing.length, 1);
  assert.equal(missing[0].ref, 'images/nope.png');
});

test('removing one route is reported as a missing URL', () => {
  const hugo = parseUrlList('# comment\n/tag/翻译/\n/tour/\n');
  const { missing } = compareRoutes(hugo, ['/tour/']);
  assert.deepEqual(missing, ['/tag/翻译/']);
});

test('a percent-encoded Hugo URL matches the decoded built route', () => {
  const hugo = parseUrlList('/tag/%E7%BF%BB%E8%AF%91/\n');
  assert.deepEqual(compareRoutes(hugo, ['/tag/翻译/']).missing, []);
});
