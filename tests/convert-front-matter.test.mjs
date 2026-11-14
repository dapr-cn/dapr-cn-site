import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parse as parseYaml } from 'yaml';
import { convertDocument, splitFrontMatter } from '../scripts/convert-front-matter.mjs';

const tomlPost = `+++
title = "[译] Dapr 工作流提案"
authors = ["aoxiaojian"]
date =  2022-06-02
draft = false

tags = ["Dapr", "workflow", "翻译", ""]
summary = "Dapr 最近提出了一个新的提案"

[header]
image = ""
caption = ""
+++

> 译者注：正文第一段。

## 为什么使用它？

* 调度
* 状态存储
`;

const yamlEvent = `---
title: GIAC 全球互联网架构大会
event: GIAC 全球互联网架构大会
location: 深圳
summary: '全球互联网架构大会'
date: '2022-07-23T09:00:00+08:00'
date_end: '2022-07-23T10:00:00+08:00'
authors: []
tags: [""]
featured: true
---

## 活动介绍

正文保持不变。
`;

const noFrontMatter = `# 没有 front matter 的页面

正文第一段，没有任何元数据。
`;

test('splitFrontMatter separates a TOML post from its body', () => {
  const { format, body } = splitFrontMatter(tomlPost);
  assert.equal(format, 'toml');
  assert.ok(body.startsWith('\n> 译者注'));
});

test('a TOML post converts to YAML with the same title, date, authors and tags', () => {
  const { text, data } = convertDocument(tomlPost);
  assert.equal(data.title, '[译] Dapr 工作流提案');
  assert.equal(data.date, '2022-06-02');
  assert.deepEqual(data.authors, ['aoxiaojian']);
  assert.deepEqual(data.tags, ['Dapr', 'workflow', '翻译']);

  const front = text.split('\n---\n')[0].replace(/^---\n/, '');
  const parsed = parseYaml(front);
  assert.equal(parsed.date, '2022-06-02');
  assert.deepEqual(parsed.tags, ['Dapr', 'workflow', '翻译']);
});

test('empty header values are dropped and empty tags are removed', () => {
  const { data } = convertDocument(tomlPost);
  assert.equal('header' in data, false);
  assert.ok(!data.tags.includes(''));
});

test('a YAML event keeps its values and its tag list loses the empty string', () => {
  const { data, text } = convertDocument(yamlEvent);
  assert.equal(data.title, 'GIAC 全球互联网架构大会');
  assert.equal(data.date, '2022-07-23T09:00:00+08:00');
  assert.equal(data.location, '深圳');
  assert.deepEqual(data.tags, []);
  assert.equal(data.featured, true);
  assert.ok(text.startsWith('---\ntitle: "GIAC'));
});

test('a file without front matter gets a title from its first heading', () => {
  const { text, data } = convertDocument(noFrontMatter);
  assert.equal(data.title, '没有 front matter 的页面');
  assert.ok(text.startsWith('---\n'));
});

test('a file without front matter and without a heading uses the fallback title', () => {
  const { data } = convertDocument('只有正文，没有标题。\n', { fallbackTitle: '首页' });
  assert.equal(data.title, '首页');
});

test('a file without front matter, heading or fallback fails loudly', () => {
  assert.throws(() => convertDocument('只有正文。\n'), /no title/);
});

for (const [name, raw] of [
  ['TOML post', tomlPost],
  ['YAML event', yamlEvent],
  ['file without front matter', noFrontMatter],
]) {
  test(`the body bytes of a ${name} are identical before and after`, () => {
    const before = splitFrontMatter(raw).body;
    const { text, body } = convertDocument(raw, { fallbackTitle: 'fallback' });
    assert.equal(body, before);
    assert.ok(text.endsWith(before), 'converted file ends with the untouched body');
  });
}
