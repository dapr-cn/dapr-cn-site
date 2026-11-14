---
name: Dapr 中国社区
description: A flat, blue-on-white bulletin board for the Dapr Chinese community, where posts, events and publications are pinned up as quiet cards and long Chinese articles read at 1.75 line-height.
colors:
  brand-indigo: "#0d2192"
  link-cobalt: "#1743c7"
  focus-azure: "#2f6bff"
  paper: "#ffffff"
  pinboard-mist: "#f5f7fb"
  ink-navy: "#1b2033"
  ink-slate: "#545c70"
  hairline: "#dde3ee"
  code-wash: "#f1f4fa"
  highlighter: "#fff3c4"
  brand-indigo-dark: "#8fb3ff"
  link-cobalt-dark: "#8fb3ff"
  link-hover-dark: "#c3d6ff"
  paper-dark: "#0e1320"
  pinboard-mist-dark: "#161d2f"
  ink-navy-dark: "#e7eaf3"
  ink-slate-dark: "#a7b0c4"
  hairline-dark: "#2a3450"
  code-wash-dark: "#1d2640"
  highlighter-dark: "#4a4120"
typography:
  display:
    fontFamily: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "2.4rem"
    fontWeight: 700
    lineHeight: 1.35
  headline:
    fontFamily: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.45rem"
    fontWeight: 700
    lineHeight: 1.35
  title:
    fontFamily: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.35
  body:
    fontFamily: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.75
  code:
    fontFamily: "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
    fontSize: "0.92em"
    fontWeight: 400
    lineHeight: 1.75
rounded:
  sm: "4px"
  md: "6px"
  lg: "10px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  gutter: "16px"
  gutter-wide: "24px"
  max-width: "1080px"
  article-width: "780px"
components:
  site-header:
    backgroundColor: "{colors.brand-indigo}"
    textColor: "{colors.paper}"
    height: "60px"
  nav-link:
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "6px 10px"
  button-primary:
    backgroundColor: "{colors.brand-indigo}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.55em 1.1em"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.brand-indigo}"
    rounded: "{rounded.pill}"
    padding: "0.55em 1.1em"
  card:
    backgroundColor: "{colors.pinboard-mist}"
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.lg}"
    padding: "1rem 1.1rem"
  tag:
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
---

# Design System: Dapr 中国社区

## Overview

**Creative North Star: "The Cloud-Native Bulletin Board"**

The site is a community notice board for Chinese-speaking Dapr users. Posts, events, publications and tags are pinned up as quiet, bordered cards on a pale surface, under an indigo masthead that never changes. Nothing shouts. The personality lives in the content and in the way it is sorted: card grids for browsing, a plain dated list for "latest", a tag cloud for finding your way around, and a single narrow column for reading.

The system is flat and restrained. Depth comes from tonal layering (white page, mist-blue cards, a 1px hairline) and never from shadow. Components are plain: pill buttons, pill tags, 10px cards. Density is relaxed. Body text sits at 1.75 line-height because the primary job is reading long Chinese technical writing, so the typography is one system-font stack with no webfonts to load.

The palette is blue on white with a single indigo voice. Light is the default; dark follows the system preference unless the visitor picks a theme, and both themes are first-class.

**Key Characteristics:**
- Flat, tonal, bordered surfaces; one shadow in the whole system (the mobile menu popover).
- One typeface stack (CJK system fonts first), hierarchy by size and weight only.
- Indigo masthead + indigo accent rule under section titles as the only brand marks. The masthead condenses on scroll and draws reading progress on articles; that is the one authored motion in the chrome.
- Pill geometry for anything clickable that is small (buttons, tags, search toggle, theme toggle).
- Light and dark themes defined from the same role names, kept in step by hand.
- Reading comfort over density: 1.75 line-height, 780px article column, 1080px page.

## Colors

A blue-on-white palette with one deep indigo for brand and a lighter cobalt for links. Neutrals carry a faint blue cast so surfaces and text sit in the same family as the accent. Values in the frontmatter are the source of truth; the `-dark` entries are the dark-theme counterparts of the same roles.

### Primary
- **Brand Indigo** (`brand-indigo`, #0d2192; dark #8fb3ff): the masthead background, the primary button, the 2px rule under each section title, the secondary button's border and label, and the fallback author avatar. In dark mode it flips to a pale periwinkle and the masthead takes the surface color instead.
- **Link Cobalt** (`link-cobalt`, #1743c7; dark #8fb3ff): inline links and card-title hover. Hover darkens to Brand Indigo in light mode and lightens to #c3d6ff in dark mode.
- **Focus Azure** (`focus-azure`, #2f6bff; dark #8fb3ff): the 3px focus ring, always, except on the masthead and its menu. Focus Azure is only 2.8:1 against Brand Indigo, so the masthead ring uses the masthead text colour (`--color-header-text`, 12.7:1).

### Neutral
- **Paper** (`paper`, #ffffff; dark #0e1320): page background; also the text color on the masthead and primary button in light mode.
- **Pinboard Mist** (`pinboard-mist`, #f5f7fb; dark #161d2f): cards, hero band, footer, and (in dark mode) the masthead.
- **Ink Navy** (`ink-navy`, #1b2033; dark #e7eaf3): body text and card titles.
- **Ink Slate** (`ink-slate`, #545c70; dark #a7b0c4): meta lines, dates, summaries, blockquotes, captions.
- **Hairline** (`hairline`, #dde3ee; dark #2a3450): every border, table rule, list divider and separator dot.
- **Code Wash** (`code-wash`, #f1f4fa; dark #1d2640): inline code and code block background.
- **Highlighter** (`highlighter`, #fff3c4; dark #4a4120): `mark` and search-match highlight. The only warm color in the system.

### Named Rules
**The One Voice Rule.** Indigo is the only brand color. It appears as the masthead, the primary button and the section-title rule, and nowhere decorative. Do not introduce a second accent.

**The Same Roles, Two Themes Rule.** Every color is consumed through a role variable (`--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-border`, `--color-link`, `--color-brand`, `--color-focus`). The light block, the `prefers-color-scheme` block and the `data-theme='dark'` block in `tokens.css` must change together.

**The Hairline Is the Divider Rule.** Separation between regions is a 1px Hairline or a step from Paper to Pinboard Mist. Never a shadow, never a heavier line (the 2px section-title rule is the single exception and it is Brand Indigo).

## Typography

**Display / Headline / Body Font:** PingFang SC, with Noto Sans SC, Microsoft YaHei, system-ui, -apple-system, Segoe UI and sans-serif as fallbacks.
**Mono Font:** ui-monospace, with SFMono-Regular, Menlo, Consolas and monospace.

**Character:** A single native-feeling CJK stack. Whatever the visitor's OS renders best is what they read, and nothing is downloaded. Hierarchy comes from size and a bold/regular split, with no italics and no letter-spacing tricks.

### Hierarchy
- **Display** (700, 2rem, 2.4rem from 720px, 1.35): the home hero title only.
- **Headline** (700, 1.9rem h1 / 1.45rem h2, 1.35): article and list-page titles (`h1`), prose section headings (`h2`).
- **Title** (700, 1.35rem section title; 1.2rem `h3`; 1.05rem card title, 1.35): home section titles with the indigo underline rule, prose subheadings, card titles. Card titles are text-colored links that turn cobalt and underline on hover.
- **Body** (400, 1rem, 1.75): all running text. Keep article text inside the 780px column. Text uses `overflow-wrap: anywhere` so long URLs and Latin strings never break the layout; links inside prose that start with `http` use `word-break: break-all`.
- **Label** (400, 0.9rem meta / 0.95rem summary and nav / 0.85rem tag, 1.75): dates, locations, author lines, tag pills, nav links, summaries. Always Ink Slate except nav and tags.
- **Code** (400, 0.92em of the surrounding size): inline `code` and `pre`, on Code Wash.

### Named Rules
**The Native Stack Rule.** No webfonts. Do not add a font file or a font CDN; extend the existing CJK stack if a glyph needs a fallback.

**The Size-and-Weight Rule.** Hierarchy is carried by size and bold-versus-regular alone. Do not add italics, uppercase transforms or tracked-out labels, which read poorly in Chinese.

## Layout

A single centered column system. Starlight's own content padding and width cap are lifted, so bands can run edge to edge and every page frames itself with `.container`. `.container` is 1080px max with a 16px gutter, which widens to 24px from 640px. Articles narrow to a 780px column. Pages are a vertical stack of sections separated by 2.2rem; the footer sits 3rem below the last section.

Card lists use a gap of 16px: one column on mobile, two from 640px, and three (`.card-grid.three`) from 960px. The home hero is a two-column grid (text, then a 220px logo image) from 720px and stacks below it. Recent posts are a plain flex list with a hairline under each row; the date wraps under the title when space runs out.

The header is sticky, 60px minimum, with the brand left, desktop navigation from 960px, and search, theme toggle and a `<details>` menu on the right. Below 960px the navigation collapses into that menu. Tables scroll horizontally in their own block instead of widening the page.

Spacing rhythm is small and practical: 4px (meta row gap), 6px (tag gap), 8px, 10px, 12px, 16px, 24px. It is not a strict scale; follow the nearest existing value.

Breakpoints in use: 640px (gutter and two-column grid), 720px (hero), 960px (desktop nav, three-column grid).

## Elevation & Depth

Flat by design. Surfaces are separated by tone (Paper to Pinboard Mist) and 1px Hairline borders. Cards never lift, scale or cast a shadow. Hover, press, focus and return change only the border, the tone, the cue at the foot and the cover (see Cards / Containers).

### Shadow Vocabulary
- **Menu popover** (`box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25)`): the mobile navigation panel only. It floats over content, so it is the one surface allowed a shadow.
- **Dialog backdrop** (`rgba(5, 8, 20, 0.55)`): the full-screen scrim behind the search dialog. The dialog itself is bordered, not shadowed.

### Named Rules
**The Flat-By-Default Rule.** A surface that sits in the page flow has no shadow. Shadow is reserved for things that float over the page.

## Shapes

Soft but not bubbly. Large containers use a 10px radius (`--radius`: cards, code blocks, search dialog, mobile menu). Interactive elements that are small and standalone are full pills (999px): buttons, tags, the search toggle, the theme toggle. Inline details are tighter: 6px for nav links, images and the skip link, 4px for inline code and the focus ring. Avatars are circles.

Borders are always 1px Hairline, except the 2px Brand Indigo section-title underline and the 2px outline on the secondary button. Blockquotes use a 4px Hairline left rule. Cover images are 16:9, cropped with `object-fit: cover`.

## Components

### Page Frame (Starlight)
- **Style:** every page renders through Starlight's `StarlightPage` (`BaseLayout.astro`), which supplies the document, head, and main region. The site overrides what it shows: the masthead (`Header`), the footer (`Footer`), the head (`starlight/Head.astro`), and the page title (`starlight/PageTitle.astro`, empty because pages render their own `h1`). Search and the theme select are Starlight's own components, placed in the masthead.
- **Frame:** Starlight's own header bar is made transparent and in flow, so the masthead is the only bar. Starlight's content panel rules are removed; the masthead hairline and the hero hairline are the only separators.
- **Code blocks:** Expressive Code keeps the Code Wash block of this document (no terminal frame, `--color-code-bg`, 10px radius, `--font-mono`); the copy button and syntax colours are kept.
- **Colours:** `src/styles/starlight.css` maps Starlight's colour roles to the tokens in `tokens.css`, so Starlight's search, theme select and contents follow both themes. The theme choice is Starlight's own (`starlight-theme`).
- **Contents:** article pages show "本页内容" (on this page) in the right column on wide screens, from the article's headings. Other pages have no contents.

### Site Header (masthead)
- **Style:** Brand Indigo bar with white text (Pinboard Mist with light text in dark mode), a hairline bottom border, 60px at the top of the page. The brand is a 32px logo on a white rounded chip beside the site name in bold. Starlight's fixed header frame is a transparent, padding-free carrier of the same 60px (`styles/starlight.css`), so the masthead is the only bar and fills the width.
- **Condensing:** over the first 96px of scroll the masthead eases from 60px to 48px (logo 32px to 26px), driven by `animation-timeline: scroll(root block)` on the registered properties `--header-h` and `--brand-mark`. Without scroll-driven animations, or with reduced motion, it stays 60px.
- **Reading progress:** on article pages (`.article`) a 2px line in the masthead text colour sits on the lower edge and fills with the page scroll. Other pages and unsupported browsers show no line.
- **Nav links:** 0.95rem, 6px 10px padding, 6px radius, with the current page (`aria-current='page'`) in bold. With scripting, a single indicator carries both washes (12% for the link under the pointer or focus, 20% for the current page): it glides to the hovered or focused link and returns to the current page on leave. Without scripting each link keeps its own wash. The washes are mixed from `--color-header-text`, not literals.
- **Header tools:** Starlight's search and theme select are 36px pills with a 1px 50%-text-colour border and transparent fill; hover adds the 12% wash. Below 800px search is icon-only, and below 640px the theme select is icon-only too.
- **Mobile menu:** a `<details>` with a 36px pill button ("菜单" plus a two-bar icon that turns into a cross when open). The panel hangs from the masthead's lower edge across the full width, with 44px rows and the current page washed. It fades and rises in with `@starting-style`, closes on Escape, outside click, and when the viewport reaches 960px.

### Site Footer
- **Style:** a band the full width of the page: Pinboard Mist fill and a 1px Hairline above, no shadow, no radius. Its contents sit in the chrome width (1240px), the same as the masthead. On the home page it meets the closing band without a gap.
- **Content:** the community name and its one-line description; the navigation split into "阅读" (博客, 翻译, 出版) and "社区" (everything else in the nav); and "资源" with GitHub, the RSS feed, the official Dapr docs (Chinese) and the official Dapr site. External links carry a small drawn arrow and a screen-reader "(外部链接)".
- **Base row:** a second band under a hairline with the copyright line, the statement that the site is volunteer-run and not the official Dapr site, and a pill "回到顶部" link (same geometry as a tag). It stacks on narrow screens.
- **Layout:** two columns on mobile with the brand block above; four columns (1.7fr 1fr 1fr 1.2fr) from 960px.

### Buttons
- **Shape:** full pill (999px), `0.55em 1.1em` padding, 600 weight.
- **Primary:** Brand Indigo fill, Paper text (`.button`). Hover raises brightness by 8% and keeps the text color.
- **Secondary:** transparent, 2px Brand Indigo border and label (`.button.secondary`). Hover keeps the colors.
- **Pairing:** the home hero places primary ("阅读博客") then secondary ("加入翻译小组") side by side with a 10px gap, wrapping on narrow screens.

### Cards / Containers
One structure and one set of states for posts, events and publications, on every page (`styles/cards.css`; the home page no longer has its own card rules).
- **Corner style:** 12px, with the cover flush to the edge (the card clips it).
- **Background:** Pinboard Mist, with a 1px Hairline border, `1rem 1.1rem` padding, full height of its grid cell.
- **Shadow:** none.
- **Structure:** optional 16:9 cover; title (`h2`/`h3`, 1.05rem, three lines at most, balanced); meta row of date and authors or location; summary (0.95rem Ink Slate, three lines at most); then the foot pinned to the bottom: tags on the left, the cue on the right. Every card in a row ends on the same line, with or without a cover or tags. The first home featured card is larger and may show more lines.
- **Click target:** the whole card, through the title link's stretched `::after`. Author and tag links sit above it.
- **Cue:** "阅读全文" (posts), "查看活动", "查看出版物", with a drawn arrow; Ink Slate at rest, so touch screens see it too. The three labels share one cell, so it never changes width.
- **States:**
  - Hover (pointer only), on the title link or the overlay, not on author or tag links: border to Link Cobalt, a 6% cobalt tone, title underlined and cobalt, the arrow 3px right, the cover eases to 1.03.
  - Keyboard focus: the 3px Focus Azure ring is on the card (the title link draws none), with the hover cues.
  - Press: an instant 12% cobalt tone and a darker border.
  - Seen (`data-seen`): the cue reads "已读". Kept in `localStorage`; a page also counts as seen when opened directly.
  - Opening (`data-opening`): after a plain click, "打开中…", a cobalt border and a 2px line filling along the lower edge, until the next page shows.
  - Returned (`data-returned`): coming back to a list, the card the reader left from is scrolled into view if needed, takes the keyboard focus, and flashes the hover tone once (1.8s).
- **Round trip:** with cross-document view transitions, the card's title flies into the page's `h1` and back (`card-title`); the rest of the page cross-fades in 180ms. Only the card to page round trip animates; every other navigation is a plain load. Browsers without support and reduced motion get a plain load (the Returned mark still shows, without motion).
- **Used for:** posts, events, publications. The home "社区宗旨" rows are not cards.

### Tags
- **Style:** 0.85rem pill, 1px Hairline border, Ink Navy text, 2px 10px padding, no underline.
- **State:** hover shifts both border and text to Link Cobalt. The home tag cloud scales the label from 0.8rem to 1.1rem by count.

### Navigation
- **Style:** see Site Header. Desktop is an inline list from 960px; mobile is a disclosure menu. Always keep `aria-current='page'` on the active link and a skip link first in the tab order.

### Search Dialog
- **Style:** Starlight's search dialog, coloured from the role tokens through `styles/starlight.css`: Paper background, Hairline borders, Link Cobalt result titles, and Highlighter matches. On narrow screens the masthead button shows only its icon.
- **Behavior:** Starlight's Pagefind index covers the article bodies only (articles mark them with `data-pagefind-body`), so the dialog searches posts.

### Recent List
- **Style:** a plain list with a hairline under each row. The title is a link; the date is Ink Slate at 0.9rem and does not wrap internally.

### Author Badge
- **Style:** inline avatar plus name, in three sizes (28px, 56px, 160px). With no avatar, it falls back to a Brand Indigo circle holding the first character of the name in white. The name underlines on hover.

### Article page
- **Narrow (below 72rem):** one 780px column. The title comes first, then the date, authors and tags under a hairline. Starlight's collapsible "本页内容" bar hangs from the masthead's current height on the page surface.
- **Wide (72rem and up):** a three-column shell in the chrome width. Left, a sticky facts rail (date, authors, tags, with a hairline above the tags); centre, the title and a 740px reading column at 1.0625rem; right, a sticky 220px "本页内容" list of the h2 and h3 headings, with the current section in Link Cobalt and bold and a 1px Link Cobalt rule on its left, set by scroll position. Both rails stick below the masthead's current height. Without enough headings (fewer than two) the right column is dropped. Starlight's own fixed contents column is hidden from this width.

### Prose
- **Style:** article bodies sit in a 780px column (740px in the wide shell). Images are centered with a 6px radius and an Ink Slate caption; code blocks use Code Wash with a 10px radius; tables get 1px Hairline cells.

## Do's and Don'ts

### Do:
- **Do** consume color only through the role variables in `src/styles/tokens.css`, and edit the light, `prefers-color-scheme` and `data-theme='dark'` blocks together.
- **Do** keep Brand Indigo to the masthead, the primary button, the secondary-button outline and the section-title rule.
- **Do** separate regions with a 1px Hairline or a Paper-to-Pinboard-Mist step.
- **Do** keep the 3px focus ring (2px offset) visible on every interactive element: Focus Azure everywhere, except the masthead ring, which uses the masthead text colour. Keep `aria-current='page'` on the active nav link.
- **Do** use pill geometry for small standalone controls and 10px for containers.
- **Do** keep body text at 1.75 line-height and article text inside the 780px column (740px in the wide shell).
- **Do** honor `prefers-reduced-motion`: the global stylesheet already disables transitions and animations; do not override it.
- **Do** render sections that have no data as nothing at all, as the home widgets already do.

### Don't:
- **Don't** add a shadow to anything that sits in the page flow. The mobile menu popover is the only exception.
- **Don't** introduce a second accent color or a decorative gradient.
- **Don't** add webfonts, italics, uppercase transforms or letter-spacing to labels.
- **Don't** hard-code hex values in components. The two existing literals (the white chip behind the brand logo and the white-alpha washes in the masthead) are masthead-only; do not spread them.
- **Don't** make cards lift, scale or cast a shadow. Feedback goes to the border, tone, cue and cover only.
- **Don't** let content break the page width: keep `overflow-wrap: anywhere` on body, scroll wide tables in place, and constrain images with `max-width: 100%`.

## Home Page Exception: The Signal Field

The home page is the one surface that leaves the flat bulletin board. It opens with a dark hero and ends with a dark closing band; the light sections between them keep the board's tokens. Every other page keeps the rules above.

- **Always-dark bands.** The hero (`components/home/Hero.astro`) and the closing band (`Closing.astro`) read `--signal-*` roles from `tokens.css`. These do not change with the theme. Their only accent is the existing periwinkle (`#8fb3ff`); there is still no second accent.
- **Signal field.** A seeded node network (`lib/signal-field.ts`) is drawn twice from the same layout: as a static SVG poster on the server, and as a WebGL canvas in the browser. Nodes drift, short signals hop along the links, and the pointer pulls nearby nodes and links to them. The canvas loop runs only while the hero is visible, the tab is visible and motion is allowed; without WebGL, JavaScript or with reduced motion the poster (or one still frame) stays.
- **Light sections on the home page** use the same cards as every other page, with a large first featured card and plain ruled lists.
- **Still true here:** no webfonts, no invented numbers or logos, URLs unchanged, Dapr logo as supplied.

## Reference Study: dapr.io

Source: `dapr/website` at commit `460d369` (2026-11-06), Apache-2.0. The site is studied for structure, rhythm and interaction, not copied. Its colour roles, copy and third-party marks are not ours to reuse as they are. The inventory of reusable material for the homepage, header and footer is in `docs/redesign/homepage-header-footer-materials.md`.

### What the reference does well
- **One hero, one promise.** A large H1 with two keywords set on colour chips, one paragraph, then a primary and two secondary calls to action in a row.
- **A diagram carries the explanation.** The hero and the value rows pair text with a drawn architecture diagram. Each diagram has a `<title>`, a `<desc>`, a still fallback and a pause control.
- **Groups of four.** The use-case block is four cards, each with an icon, a title, two sentences and one link. The API block is a grid of icon cards.
- **A navigation split by intent.** Top-level items are grouped; a dropdown opens on hover or focus, closes on Escape and on focus leaving it, and sets `aria-expanded`.
- **Footer as an index.** Four link columns, a legal row, and a plain statement of who publishes the site.

### Mapping to this system

| Reference value | This system | Decision |
| --- | --- | --- |
| Brand blue `#0D2192` | `brand-indigo` `#0d2192` | Same colour; keep our role names |
| Link blue `#202192`, hover at 29% alpha | `link-cobalt` `#1743c7` | Keep ours |
| Accents `#3EA9F5`, `#73CDF3`, `#489FB5`, `#FF4E00`, `#EFCA08` | none | Reject: One Voice Rule |
| Page `#fff`, surface `#f8fbff`, border `#ECECEC` | `paper`, `pinboard-mist`, `hairline` | Keep ours |
| Buttons 7px radius, 120×50 | pill buttons | Keep pills |
| Cards 10px with a soft shadow | 12px cards, no shadow | Keep flat rule |
| Open Sans, Noto Sans, Work Sans, Lato | CJK system stack, no webfonts | Keep ours |
| Sticky white nav with logo left and links | sticky indigo masthead | Keep ours; the structure matches |
| Orange "Join Discord" chip | none | Reject the colour; a pill outline button is the equivalent if a join action is needed |
| Keyword chips in the hero H1 | none | Adapt: a brand-indigo chip or bold text, never a second colour |
| Carousel banner with autoplay | none | Adapt only as a static notice; if it moves, it pauses on hover and respects reduced motion |
| Architecture hero diagram (D3) | Signal Field (WebGL, dark hero) | Keep the Signal Field; take the still-fallback and pause pattern |
| Four-card use-case row | none on the home page | Adopt for the three to five entry points |
| Adopter logo wall | none | Reject: third-party marks and claims we cannot verify |

### Named Rules
**The Translation Is Attributed Rule.** The user subsequently chose to integrate the official content in Chinese, including third-party content. `dapr/website` at `460d369` is now a pinned content source as well as a visual reference. Every adapted page links its original and names the source revision. Homepage claims, commercial offers and adopter marks remain attributed to the source, never to the Chinese community. Marks belong to their owners.

**The Single Accent Rule Holds.** The reference uses five accents. This system keeps one, so every chip and button in this study is translated into the indigo, Paper and Ink roles above.

**The Motion Pause Rule.** Any moving diagram or banner has a visible pause control, a static fallback for no-script and reduced-motion visitors, and no autoplay that cannot be stopped.

### Implemented content integration

The homepage puts the community first. After the hero come the community purpose, upcoming events, featured and earlier posts, event reviews and the tag cloud; the translated Dapr overview follows, then the closing band. The hero's newest posts are not repeated in the cards or list below it. The overview opens with one attribution note that covers its claims, case studies, adopter marks and third-party offers, then shows three illustrated value cards, the building-block diagram with the fifteen API entries folded away, four cross-cutting concerns, three case studies with the twenty-two adopter logos, and ecosystem resources (including the talk video, linked to its YouTube watch page) with CNCF status. The commercial banner's messages are a static resource list, not an autoplay carousel. Videos link out instead of loading third-party players automatically.

The Signal Field remains the hero's visual world, with the translated Dapr promise and three source-backed actions. Its background has a pause control; static diagrams need none. The new overview keeps the existing single-accent palette, native CJK typography and flat borders. Imported artwork stays on a white ground in both themes (`--official-artwork-bg`) so logos and diagram labels retain their original appearance.

The nine-entry 了解 Dapr disclosure joins the existing seven community links. Desktop navigation starts at 1200px to fit the additional menu; below that, both groups live in the existing mobile disclosure. The footer adds the same official-content index and identifies Linux Foundation legal links as project links, not this site's policies. Copyright and the non-official-site statement remain unchanged.

Below 360px, the mobile menu uses an icon-only pill to keep the brand, search, theme and menu controls inside the viewport. Its Chinese label remains available to screen readers.

Adapted pages use the existing BaseLayout and a narrow reading column. Their source note separates official statements from community authorship. Their bodies are indexed by Pagefind and their routes are in the sitemap. Global events use `/events/`; the Chinese event archive keeps `/event/`.
