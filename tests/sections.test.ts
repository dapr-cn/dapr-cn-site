import { test } from 'node:test';
import assert from 'node:assert/strict';
import { breadcrumb, parentOf, previousAndNext, routeParam, sectionList, sectionOrder, type SectionItem } from '../src/lib/sections.ts';

// A small source-like section: a landing, two top-level pages, a nested group and a page without weight.
const items: SectionItem[] = [
  { id: 'index', title: 'Dapr源码解析' },
  { id: 'process', title: 'Dapr 功能和流程', weight: 20 },
  { id: 'detail', title: 'Dapr 实现细节', weight: 30 },
  { id: 'detail/sdk', title: 'Dapr SDK 源码学习', weight: 50 },
  { id: 'detail/runtime', title: 'Dapr Runtime 源码学习', weight: 20 },
  { id: 'join', title: '参与活动' },
  { id: 'join/target', title: '我们的目标', weight: 10 },
  { id: 'join/how-to-study', title: '源码解读的方式', weight: 20 },
  { id: 'join/meetings', title: '双周会', weight: 1 },
];

test('an entry id is its path, and the landing is the root', () => {
  assert.equal(routeParam('index'), undefined);
  assert.equal(routeParam('join/how-to-study'), 'join/how-to-study');
  assert.equal(routeParam('join'), 'join');
});

test('the parent of a nested id is its folder, and top-level ids have the root as parent', () => {
  assert.equal(parentOf('join/how-to-study'), 'join');
  assert.equal(parentOf('detail/runtime'), 'detail');
  assert.equal(parentOf('join'), '');
});

test('the top-level list is ordered by weight, then title, with unweighted pages last', () => {
  assert.deepEqual(
    sectionList(items, 'index').map((item) => item.id),
    ['process', 'detail', 'join'],
  );
});

test('a page list holds the siblings of the page, the page included, in weight order', () => {
  assert.deepEqual(
    sectionList(items, 'join/how-to-study').map((item) => item.id),
    ['join/meetings', 'join/target', 'join/how-to-study'],
  );
});

test('a page without weight sorts after weighted pages, and ties sort by title', () => {
  const tied: SectionItem[] = [
    { id: 'index', title: '根' },
    { id: 'b', title: '乙' },
    { id: 'a', title: '甲' },
    { id: 'c', title: '丙', weight: 5 },
  ];
  assert.deepEqual(
    sectionList(tied, 'index').map((item) => item.id),
    ['c', 'a', 'b'],
  );
});

test('reading order puts each page before its children', () => {
  assert.deepEqual(
    sectionOrder(items).map((item) => item.id),
    ['process', 'detail', 'detail/runtime', 'detail/sdk', 'join', 'join/meetings', 'join/target', 'join/how-to-study'],
  );
});

test('the first page has no previous and the last page has no next', () => {
  assert.deepEqual(previousAndNext(items, 'process'), { previous: undefined, next: items.find((item) => item.id === 'detail') });
  const last = previousAndNext(items, 'join/how-to-study');
  assert.equal(last.next, undefined);
  assert.equal(last.previous?.id, 'join/target');
});

test('a page in the middle links to both neighbours', () => {
  const middle = previousAndNext(items, 'join/target');
  assert.equal(middle.previous?.id, 'join/meetings');
  assert.equal(middle.next?.id, 'join/how-to-study');
});

test('the landing has no neighbours, and an unknown id has none', () => {
  assert.deepEqual(previousAndNext(items, 'index'), {});
  assert.deepEqual(previousAndNext(items, 'missing'), {});
});

test('the breadcrumb runs from the landing to the page, the page last', () => {
  const url = (id?: string) => (id ? `/source/${id}/` : '/source/');
  assert.deepEqual(breadcrumb(items, 'join/how-to-study', url), [
    { title: 'Dapr源码解析', href: '/source/' },
    { title: '参与活动', href: '/source/join/' },
    { title: '源码解读的方式', href: '/source/join/how-to-study/' },
  ]);
});

test('an ancestor without its own entry is skipped in the breadcrumb', () => {
  const url = (id?: string) => (id ? `/source/${id}/` : '/source/');
  const trail = breadcrumb(items, 'join/missing-middle/page', url);
  assert.deepEqual(
    trail.map((crumb) => crumb.title),
    ['Dapr源码解析', '参与活动'],
  );
});

test('the landing breadcrumb holds only the landing', () => {
  const url = (id?: string) => (id ? `/source/${id}/` : '/source/');
  assert.deepEqual(breadcrumb(items, 'index', url), [{ title: 'Dapr源码解析', href: '/source/' }]);
});
