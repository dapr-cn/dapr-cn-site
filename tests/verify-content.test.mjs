import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import {
  baseRouteOf,
  checkAuthorReferences,
  checkFrontMatter,
  checkInternalLinks,
  externalImages,
  loadEntries,
} from '../scripts/verify-content.mjs';
import { findMissingLocalImages } from '../scripts/lib/local-images.mjs';
import { compareRoutes, nonAsciiAttributes, nonAsciiRoutes, parseUrlList } from '../scripts/verify-url-parity.mjs';

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
  // /source/ is built here, so the link to it passes; only the missing page fails.
  const site = { routes: new Set(['/tag/translation/', '/source/']), publicFiles: new Set() };
  const entry = post('links', 'title: "x"\ndate: "2023-01-01"', 'See [译](../../tag/translation/), [missing](../../nope/) and [source](/source/).\n');
  const findings = checkInternalLinks([entry], site);
  assert.equal(findings.length, 1);
  assert.match(findings[0].message, /nope/);
});

test('a relative link that resolves to a built tag page passes', () => {
  const site = { routes: new Set(['/tag/translation/']), publicFiles: new Set() };
  const entry = post('tag-link', 'title: "x"\ndate: "2023-01-01"', 'See [tag](../../tag/translation/).\n');
  assert.deepEqual(checkInternalLinks([entry], site), []);
});

test('translated site pages resolve relative links from their public route', () => {
  const entry = {
    collection: 'site',
    id: 'community/program',
    file: 'src/content/site/community/program.md',
    text: '---\ntitle: "Program"\n---\n[Community](../)\n[Missing](../../missing/)\n',
  };
  const findings = checkInternalLinks([entry], { routes: new Set(['/community/']), publicFiles: new Set() });
  assert.equal(findings.length, 1);
  assert.match(findings[0].message, /resolves to \/missing\//);
});

test('the content verifier loads nested translated site pages', async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), 'dapr-cn-site-content-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'site', 'community'), { recursive: true });
  await writeFile(path.join(root, 'site', 'community', 'program.md'), '---\ntitle: "Program"\n---\n');
  const entries = loadEntries(root);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].collection, 'site');
  assert.equal(entries[0].id, 'community/program');
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
  const hugo = parseUrlList('# comment\n/tag/translation/\n/tour/\n');
  const { missing } = compareRoutes(hugo, ['/tour/']);
  assert.deepEqual(missing, ['/tag/translation/']);
});

test('a percent-encoded Hugo URL matches the decoded built route', () => {
  const hugo = parseUrlList('/tag/translation/\n');
  assert.deepEqual(compareRoutes(hugo, ['/tag/translation/']).missing, []);
});

test('a route with a non-ASCII character is reported, an ASCII route is not', () => {
  assert.deepEqual(nonAsciiRoutes(['/tag/translation/', '/author/yukun/', '/tag/翻译/', '/author/%E4%BF%9E/']), ['/author/%E4%BF%9E/', '/tag/翻译/']);
});

test('an href or id with a non-ASCII character, raw or percent-encoded, is reported', () => {
  const html = '<a href="/tag/translation/">a</a><a href="#s-1ca93277">b</a><a href="#概述">c</a><a href="/tag/%E7%BF%BB%E8%AF%91/">d</a><h2 id="概述-1">e</h2>';
  assert.deepEqual(nonAsciiAttributes(html), ['#概述', '/tag/%E7%BF%BB%E8%AF%91/', '概述-1']);
});

const sectionEntry = (collection, id, body, front = 'title: "x"') => ({
  collection,
  id,
  file: `src/content/${collection}/${id}.md`,
  text: `---\n${front}\n---\n${body}`,
});

test('a link from a section page into a built section page passes', () => {
  const site = { routes: new Set(['/source/join/workitems/']), publicFiles: new Set() };
  const entry = sectionEntry('source', 'join/meetings', '见 [分工合作](../workitems/)。\n');
  assert.deepEqual(checkInternalLinks([entry], site), []);
});

test('a link from a section page into a section page that is not built fails', () => {
  const site = { routes: new Set(['/source/join/workitems/']), publicFiles: new Set() };
  const entry = sectionEntry('source', 'join/meetings', '见 [缺失](../missing-page/)。\n');
  const findings = checkInternalLinks([entry], site);
  assert.equal(findings.length, 1);
  assert.match(findings[0].message, /\/source\/join\/missing-page\//);
});

test('a relative link on a section landing resolves from the section root', () => {
  const site = { routes: new Set(['/case/', '/case/join/', '/case/join/pr/']), publicFiles: new Set() };
  assert.equal(baseRouteOf({ collection: 'case', id: 'index' }), '/case/');
  assert.equal(baseRouteOf({ collection: 'source', id: 'join' }), '/source/join/');
  const good = sectionEntry('case', 'index', '[参与](join/) 和 [PR](join/pr/)\n');
  assert.deepEqual(checkInternalLinks([good], site), []);
  const broken = sectionEntry('case', 'index', '[缺失](join/nope/)\n');
  assert.match(checkInternalLinks([broken], site)[0].message, /\/case\/join\/nope\//);
});

test('a landing card href is checked like a body link', () => {
  const site = { routes: new Set(['/case/china/']), publicFiles: new Set() };
  const front = [
    'title: "Dapr用户案例"',
    'groups:',
    '  - cards:',
    '      - title: "国内"',
    '        href: "/case/china/"',
    '      - title: "国外"',
    '        href: "/case/global/"',
    '      - title: "纯文字"',
  ].join('\n');
  const findings = checkInternalLinks([sectionEntry('case', 'index', '', front)], site);
  assert.equal(findings.length, 1);
  assert.match(findings[0].message, /\/case\/global\//);
});

test('the content verifier loads case and source entries with path ids', async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), 'dapr-cn-sections-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'source', 'join'), { recursive: true });
  await writeFile(path.join(root, 'source', 'index.md'), '---\ntitle: "源码"\n---\n');
  await writeFile(path.join(root, 'source', 'join', 'target.md'), '---\ntitle: "目标"\n---\n');
  const entries = loadEntries(root);
  assert.deepEqual(entries.map((entry) => `${entry.collection}:${entry.id}`).sort(), ['source:index', 'source:join/target']);
});

