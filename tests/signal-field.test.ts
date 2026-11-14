import { test } from 'node:test';
import assert from 'node:assert/strict';
import { signalLayout } from '../src/lib/signal-field.ts';

test('the same seed gives the same layout', () => {
  assert.deepEqual(signalLayout(48, 7, 1.6), signalLayout(48, 7, 1.6));
});

test('a different seed gives a different layout', () => {
  assert.notDeepEqual(signalLayout(48, 7, 1.6).nodes, signalLayout(48, 8, 1.6).nodes);
});

test('every node sits inside the space and has a weight between 0 and 1', () => {
  const { width, height, nodes } = signalLayout(60, 3, 1.78);
  assert.equal(height, 100);
  assert.equal(width, 178);
  assert.ok(nodes.length > 0 && nodes.length <= 60);
  for (const node of nodes) {
    assert.ok(node.x >= 0 && node.x <= width, `x ${node.x}`);
    assert.ok(node.y >= 0 && node.y <= height, `y ${node.y}`);
    assert.ok(node.weight >= 0 && node.weight <= 1);
  }
});

test('edges point at real nodes, never loop and never repeat', () => {
  const { nodes, edges } = signalLayout(60, 3, 1.6);
  assert.ok(edges.length > nodes.length / 2);
  const keys = new Set<string>();
  for (const { a, b } of edges) {
    assert.ok(a !== b && a >= 0 && b >= 0 && a < nodes.length && b < nodes.length);
    keys.add([a, b].sort((p, q) => p - q).join('-'));
  }
  assert.equal(keys.size, edges.length);
});

test('a portrait space keeps the node count and stays 100 tall', () => {
  const { width, height, nodes } = signalLayout(30, 5, 0.56);
  assert.equal(height, 100);
  assert.equal(width, 56);
  assert.ok(nodes.length >= 20);
});
