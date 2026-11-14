import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tagSlug, tagTerms } from '../src/lib/tags.ts';

test('a Chinese tag keeps its characters', () => {
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
  ]);
  const dapr = terms.find((term) => term.slug === 'dapr');
  assert.equal(dapr?.count, 3);
  assert.equal(dapr?.name, 'Dapr');
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
