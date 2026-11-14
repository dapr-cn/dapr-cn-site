import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nav, currentNavItem } from '../src/config/nav.ts';

test('navigation has the nine Hugo menu entries in order', () => {
  assert.deepEqual(
    nav.map((item) => item.name),
    ['介绍', '活动', '博客', '翻译', '源码', '会议', '案例', '出版', '成员'],
  );
});

test('navigation links match the Hugo menu URLs', () => {
  assert.deepEqual(
    nav.map((item) => item.href),
    ['/tour/', '/event/', '/post/', '/translation/', '/source/', '/meeting/', '/case/', '/publication/', '/people/'],
  );
});

test('/source/ and /case/ are marked as served elsewhere', () => {
  const external = nav.filter((item) => !item.producedHere).map((item) => item.href);
  assert.deepEqual(external, ['/source/', '/case/']);
});

test('a post page is highlighted as 博客', () => {
  assert.equal(currentNavItem('/post/202306-dapr-release-111/')?.name, '博客');
});

test('the home page highlights no entry', () => {
  assert.equal(currentNavItem('/'), undefined);
});
