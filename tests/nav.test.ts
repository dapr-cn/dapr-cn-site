import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nav, currentNavItem } from '../src/config/nav.ts';

test('navigation has the seven remaining menu entries in order', () => {
  assert.deepEqual(
    nav.map((item) => item.name),
    ['介绍', '活动', '博客', '翻译', '会议', '出版', '成员'],
  );
});

test('navigation links point at pages this build produces', () => {
  assert.deepEqual(
    nav.map((item) => item.href),
    ['/', '/event/', '/post/', '/tag/translation/', '/tag/meeting/', '/publication/', '/authors/'],
  );
});

test('navigation does not link to /source/ or /case/', () => {
  assert.equal(nav.some((item) => item.href === '/source/' || item.href === '/case/'), false);
});

test('a post page is highlighted as 博客', () => {
  assert.equal(currentNavItem('/post/202306-dapr-release-111/')?.name, '博客');
});

test('the home page highlights 介绍, and no other page does', () => {
  assert.equal(currentNavItem('/')?.name, '介绍');
  assert.equal(currentNavItem('/post/'), nav.find((item) => item.name === '博客'));
  assert.equal(currentNavItem('/tag/translation/')?.name, '翻译');
  assert.equal(currentNavItem('/author/yukun/')?.name, '成员');
  assert.equal(currentNavItem('/tags/')?.name, undefined);
});
