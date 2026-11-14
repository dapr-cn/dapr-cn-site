import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nav, currentNavItem } from '../src/config/nav.ts';

test('navigation has the nine community entries in order', () => {
  assert.deepEqual(
    nav.map((item) => item.name),
    ['介绍', '活动', '博客', '翻译', '源码', '会议', '案例', '出版', '成员'],
  );
});

test('navigation links point at pages this build produces', () => {
  assert.deepEqual(
    nav.map((item) => item.href),
    ['/', '/event/', '/post/', '/tag/translation/', '/source/', '/tag/meeting/', '/case/', '/publication/', '/authors/'],
  );
});

test('源码 and 案例 are highlighted on their section pages', () => {
  assert.equal(currentNavItem('/source/join/target/')?.name, '源码');
  assert.equal(currentNavItem('/case/join/pr/')?.name, '案例');
  assert.equal(currentNavItem('/source/')?.name, '源码');
  assert.equal(currentNavItem('/case/china/')?.name, '案例');
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
