// Date formatting in the site's time zone. Entries carry dates like `2023-06-14` or `2022-07-23T09:00:00+08:00`.

const TIME_ZONE = 'Asia/Shanghai';

/** `2023-06-14` for a date, `2022-07-23 09:00` for a date with a time. */
export function formatDate(date: Date, withTime = false): string {
  const day = date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: TIME_ZONE,
  });
  const normalised = day.replace(/\//g, '-');
  if (!withTime) return normalised;
  const time = date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: TIME_ZONE });
  return `${normalised} ${time}`;
}

/** Machine-readable date for `<time datetime>` and feeds. */
export function isoDate(date: Date): string {
  return date.toISOString();
}
