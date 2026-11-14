// Keeps the headings of a Markdown body on the DESIGN.md ladder: the article title is the page's
// only h1, prose section headings are h2 and subheadings are h3. Volunteer Markdown often opens its
// sections at h1, at h2 or at h3, may put a stray h1 among its sections, and may skip a level.
// The body is moved as a whole so its first heading is h2, a body heading is never h1, and no
// level is skipped. Heading text, ids and URLs are unchanged.

const HEADING_TAG = /^h[1-6]$/;

/** The level change that makes the body's first heading h2. Zero when there are no headings. */
export function headingShift(levels) {
  if (levels.length === 0) return 0;
  return 2 - levels[0];
}

/**
 * The new level of each heading, in document order. Every heading moves by the same shift, so the
 * first heading becomes h2. Then a heading may not be above h2 (the article title is the only h1),
 * and may not sit more than one level below the heading before it, which closes skipped levels.
 * The page's own h1 counts as the level before the first body heading.
 */
export function ladderLevels(levels) {
  const shift = headingShift(levels);
  let previous = 1;
  return levels.map((level) => {
    let next = Math.min(6, Math.max(2, level + shift));
    if (next > previous + 1) next = previous + 1;
    previous = next;
    return next;
  });
}

/** Every heading element in a hast tree, in document order. */
export function collectHeadings(node, headings = []) {
  if (node.type === 'element' && HEADING_TAG.test(node.tagName)) headings.push(node);
  for (const child of node.children ?? []) collectHeadings(child, headings);
  return headings;
}

/**
 * Sätteri hast plugin for `markdown.processor`. Astro calls the factory once per compiled document,
 * so each document gets its own run over its own headings, in `before`, before any visitor runs.
 */
export function bodyHeadingsStartAtH2() {
  return {
    name: 'body-headings-start-at-h2',
    before(root, ctx) {
      const headings = collectHeadings(root);
      const current = headings.map((heading) => Number(heading.tagName[1]));
      const targets = ladderLevels(current);
      headings.forEach((heading, index) => {
        if (targets[index] !== current[index]) ctx.setField(heading, 'tagName', `h${targets[index]}`);
      });
    },
  };
}
