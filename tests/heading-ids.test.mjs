import { test } from 'node:test';
import assert from 'node:assert/strict';
import { asciiHeadingId, hasNonAscii } from '../scripts/lib/heading-ids.mjs';

test('a heading with only ASCII is not changed by the plugin', () => {
  assert.equal(hasNonAscii('Dapr v1.8'), false);
  assert.equal(hasNonAscii('dapr是什么'), true);
});

test('a mixed heading keeps its ASCII words and adds a hash of the whole text', () => {
  const id = asciiHeadingId('dapr是什么', new Set());
  assert.match(id, /^dapr-[0-9a-f]{8}$/);
});

test('a heading with no ASCII words is only a hash', () => {
  assert.match(asciiHeadingId('概述', new Set()), /^s-[0-9a-f]{8}$/);
});

test('the same text gives the same id, and different texts give different ids', () => {
  assert.equal(asciiHeadingId('概述', new Set()), asciiHeadingId('概述', new Set()));
  assert.notEqual(asciiHeadingId('概述', new Set()), asciiHeadingId('总结', new Set()));
});

test('a repeated heading in one document gets a numbered id', () => {
  const used = new Set();
  const first = asciiHeadingId('概述', used);
  const second = asciiHeadingId('概述', used);
  assert.equal(second, `${first}-2`);
});

test('the id is ASCII only', () => {
  for (const text of ['第一步：安装 Dapr CLI', '一、概述', 'Dapr 是什么（简介）', '名字解析组件 name resolution']) {
    assert.doesNotMatch(asciiHeadingId(text, new Set()), /[^\x00-\x7F]/);
  }
});
