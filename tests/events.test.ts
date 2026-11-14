import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitEvents } from '../src/lib/events.ts';

const now = new Date('2026-11-13T12:00:00+08:00');
const event = (id: string, date: string) => ({ id, data: { date: new Date(date) } });

test('an event that starts after now is upcoming', () => {
  const { upcoming, past } = splitEvents([event('future', '2027-01-10T09:00:00+08:00')], now);
  assert.deepEqual(upcoming.map((e) => e.id), ['future']);
  assert.deepEqual(past, []);
});

test('an event dated 2022-09-03 is a past review', () => {
  const { upcoming, past } = splitEvents([event('past', '2022-09-03T09:00:00+08:00')], now);
  assert.deepEqual(upcoming, []);
  assert.deepEqual(past.map((e) => e.id), ['past']);
});

test('a same-day event is upcoming only while its start time is still ahead', () => {
  const later = event('later-today', '2026-11-13T18:00:00+08:00');
  const earlier = event('earlier-today', '2026-11-13T08:00:00+08:00');
  const { upcoming, past } = splitEvents([later, earlier], now);
  assert.deepEqual(upcoming.map((e) => e.id), ['later-today']);
  assert.deepEqual(past.map((e) => e.id), ['earlier-today']);
});

test('upcoming events are ordered soonest first and past events newest first', () => {
  const { upcoming, past } = splitEvents(
    [
      event('far', '2027-06-01T00:00:00+08:00'),
      event('near', '2027-01-01T00:00:00+08:00'),
      event('old', '2021-01-01T00:00:00+08:00'),
      event('recent', '2026-01-01T00:00:00+08:00'),
    ],
    now,
  );
  assert.deepEqual(upcoming.map((e) => e.id), ['near', 'far']);
  assert.deepEqual(past.map((e) => e.id), ['recent', 'old']);
});
