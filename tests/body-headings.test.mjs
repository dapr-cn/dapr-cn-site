import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bodyHeadingsStartAtH2, collectHeadings, headingShift, ladderLevels } from '../scripts/lib/body-headings.mjs';

const el = (tagName, children = []) => ({ type: 'element', tagName, properties: {}, children });
const text = (value) => ({ type: 'text', value });

test('a body that starts at h1 moves down one level', () => {
  assert.equal(headingShift([1, 2, 3]), 1);
});

test('a body that starts at h3 moves up one level', () => {
  assert.equal(headingShift([3, 4]), -1);
});

test('a body already starting at h2, or with no headings, is unchanged', () => {
  assert.equal(headingShift([2, 3]), 0);
  assert.equal(headingShift([]), 0);
});

test('a body that starts at h1 is moved down, so its first heading is h2', () => {
  assert.deepEqual(ladderLevels([1, 2, 3]), [2, 3, 4]);
});

test('a body that starts at h3 is moved up, so its first heading is h2', () => {
  assert.deepEqual(ladderLevels([3, 4, 3]), [2, 3, 2]);
});

test('a skipped level in the body is closed', () => {
  // h1 then h3 becomes h2 then h3, not h2 then h4.
  assert.deepEqual(ladderLevels([1, 3]), [2, 3]);
  assert.deepEqual(ladderLevels([1, 2, 4]), [2, 3, 4]);
});

test('levels stay within h2 to h6 in a body', () => {
  assert.deepEqual(ladderLevels([5, 6]), [2, 3]);
  assert.deepEqual(ladderLevels([1, 6, 6]), [2, 3, 4]);
});

test('a stray h1 among the sections of a body becomes h2, and the sections keep their level', () => {
  // The body starts at h2, so nothing shifts; the h1 is lifted to h2 and the h3 under it stays h3.
  assert.deepEqual(ladderLevels([2, 2, 1, 3]), [2, 2, 2, 3]);
});

test('collects heading elements in document order and ignores other elements', () => {
  const h1 = el('h1', [text('a')]);
  const h3 = el('h3');
  const h2 = el('h2');
  const tree = el('div', [h1, el('p', [h3]), h2, el('code')]);
  assert.deepEqual(collectHeadings(tree), [h1, h3, h2]);
});

test('the plugin sets the new level only on headings that change', () => {
  const plugin = bodyHeadingsStartAtH2();
  const h1 = el('h1');
  const h2 = el('h2');
  const h3 = el('h3');
  const root = el('root', [h1, el('p'), h2, h3]);

  const calls = [];
  plugin.before(root, { setField: (node, key, value) => calls.push([node, key, value]) });

  assert.deepEqual(calls, [
    [h1, 'tagName', 'h2'],
    [h2, 'tagName', 'h3'],
    [h3, 'tagName', 'h4'],
  ]);
});

test('a document with nothing to change sets nothing', () => {
  const plugin = bodyHeadingsStartAtH2();
  const calls = [];
  plugin.before(el('root', [el('h2'), el('h3')]), { setField: (...args) => calls.push(args) });
  assert.deepEqual(calls, []);
});
