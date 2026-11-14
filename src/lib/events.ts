// Splits events into upcoming and past by their start date at build time (design D5).
// An event is upcoming when it starts after `now`; otherwise it is a past event shown as a review.

export interface DatedEvent {
  data: { date: Date };
}

export function splitEvents<T extends DatedEvent>(events: readonly T[], now: Date): { upcoming: T[]; past: T[] } {
  const upcoming: T[] = [];
  const past: T[] = [];
  for (const event of events) {
    (event.data.date.getTime() > now.getTime() ? upcoming : past).push(event);
  }
  upcoming.sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
  past.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return { upcoming, past };
}
