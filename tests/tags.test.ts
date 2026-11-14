import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isAscii, tagSlug, tagTerms, tagUrlSlug } from '../src/lib/tags.ts';

test('tagSlug keeps Chinese characters as the grouping key', () => {
  assert.equal(tagSlug('翻译'), '翻译');
});

test('spaces become hyphens and letters are lower-cased', () => {
  assert.equal(tagSlug('Release Notes'), 'release-notes');
  assert.equal(tagSlug('name resolution'), 'name-resolution');
});

test('an empty tag has no slug', () => {
  assert.equal(tagSlug(''), '');
  assert.equal(tagSlug('   '), '');
});

test('accents are removed as Hugo does with removePathAccents', () => {
  assert.equal(tagSlug('Café'), 'cafe');
});

test('tags that differ only in case form one term with the count of entries', () => {
  const terms = tagTerms([
    { tags: ['Dapr', '翻译'] },
    { tags: ['dapr', ''] },
    { tags: ['Dapr', 'Dapr'] },
  ], [{ id: 'translation', title: '翻译' }]);
  const dapr = terms.find((term) => term.slug === 'dapr');
  assert.equal(dapr?.count, 3);
  assert.equal(dapr?.name, 'Dapr');
  assert.equal(dapr?.url, 'dapr');
  assert.equal(terms.some((term) => term.slug === ''), false);
});

test('terms sort by count, then slug', () => {
  const terms = tagTerms([{ tags: ['b'] }, { tags: ['a', 'b'] }]);
  assert.deepEqual(
    terms.map((term) => [term.slug, term.count]),
    [
      ['b', 2],
      ['a', 1],
    ],
  );
});

test('an ASCII tag name is its own URL segment, without a description', () => {
  assert.equal(tagUrlSlug('Release Notes', []), 'release-notes');
});

test('a Chinese tag takes its URL from the description folder, and the description names it', () => {
  const terms = tagTerms([{ tags: ['翻译'] }], [{ id: 'translation', title: '翻译' }]);
  assert.deepEqual(terms, [{ slug: '翻译', url: 'translation', name: '翻译', count: 1 }]);
});

test('a described tag with no entries becomes a term with count 0', () => {
  const terms = tagTerms([{ tags: ['b'] }], [{ id: 'paper-translation', title: '论文翻译' }]);
  assert.deepEqual(
    terms.map((term) => [term.url, term.count]),
    [
      ['b', 1],
      ['paper-translation', 0],
    ],
  );
});

test('a Chinese tag with no description fails the build with the name in the message', () => {
  assert.throws(() => tagTerms([{ tags: ['视频'] }]), /tag "视频" has no ASCII URL/);
});

test('a description whose folder name is not ASCII is refused', () => {
  assert.throws(() => tagUrlSlug('书籍', [{ id: '书籍', title: '书籍' }]), /needs an ASCII folder name/);
});

test('a description with an empty title adds no term', () => {
  assert.deepEqual(tagTerms([], [{ id: 'x', title: '  ' }]), []);
});

test('isAscii accepts ASCII only', () => {
  assert.equal(isAscii('translation-2'), true);
  assert.equal(isAscii('翻译'), false);
  assert.equal(isAscii('café'), false);
});
