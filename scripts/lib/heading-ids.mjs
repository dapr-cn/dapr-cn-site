// Heading ids are part of the URL (`/post/<id>/#<heading id>`), so they must be ASCII too.
// The default slugger keeps CJK characters in an id, which then shows up in the address bar and in
// links. This plugin gives every heading that contains a non-ASCII character an ASCII id: the ASCII
// words of the heading, then a short hash of the whole heading text, so the id is stable and unique.
// `dapr是什么` -> `dapr-<hash>`, `概述` -> `s-<hash>`. A heading with only ASCII keeps the default id
// (`Dapr v1.8` -> `dapr-v18`), so existing ASCII anchors do not change.

import { createHash } from 'node:crypto';

export function hasNonAscii(text) {
  return /[^\x00-\x7F]/.test(text);
}

/**
 * The ASCII id for a heading whose text has a non-ASCII character. `used` holds the ids already given
 * in the same document; a repeated base gets `-2`, `-3`, and so on, as the default slugger does.
 */
export function asciiHeadingId(text, used) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/, '');
  const hash = createHash('sha1').update(text).digest('hex').slice(0, 8);
  const base = words ? `${words}-${hash}` : `s-${hash}`;
  let id = base;
  for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`;
  used.add(id);
  return id;
}

/** Text of a hast node, without markup. */
function plainText(node) {
  if (node.type === 'text') return node.value ?? '';
  return (node.children ?? []).map(plainText).join('');
}

/**
 * Sätteri hast plugin for `markdown.processor`. Listed before Astro's heading-id plugin, so an id set
 * here is kept: the page's "on this page" links and the `#anchor` in URLs both use it.
 */
export function asciiHeadingIds() {
  const used = new Set();
  return {
    name: 'ascii-heading-ids',
    element: {
      filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      visit(node, ctx) {
        if (typeof node.properties?.id === 'string') return;
        const text = plainText(node).trim();
        if (!hasNonAscii(text)) return;
        ctx.setProperty(node, 'id', asciiHeadingId(text, used));
      },
    },
  };
}
