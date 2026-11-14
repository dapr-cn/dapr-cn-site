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
- Indigo masthead + indigo accent rule under section titles as the only brand marks.
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

A single centered column system. `.container` is 1080px max with a 16px gutter, which widens to 24px from 640px. Articles narrow to a 780px column. Pages are a vertical stack of sections separated by 2.2rem; the footer sits 3rem below the last section.

Card lists use a gap of 16px: one column on mobile, two from 640px, and three (`.card-grid.three`) from 960px. The home hero is a two-column grid (text, then a 220px logo image) from 720px and stacks below it. Recent posts are a plain flex list with a hairline under each row; the date wraps under the title when space runs out.

The header is sticky, 60px minimum, with the brand left, desktop navigation from 960px, and search, theme toggle and a `<details>` menu on the right. Below 960px the navigation collapses into that menu. Tables scroll horizontally in their own block instead of widening the page.

Spacing rhythm is small and practical: 4px (meta row gap), 6px (tag gap), 8px, 10px, 12px, 16px, 24px. It is not a strict scale; follow the nearest existing value.

Breakpoints in use: 480px (search toggle label hides), 640px (gutter and two-column grid), 720px (hero), 960px (desktop nav, three-column grid).

## Elevation & Depth

Flat by design. Surfaces are separated by tone (Paper to Pinboard Mist) and 1px Hairline borders. Cards do not lift on hover; they change nothing except the title link color.

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
- **Theme:** the site's own key (`dapr-cn-theme`) decides the theme; Starlight's default theme provider is replaced so Starlight does not force a theme.

### Site Header (masthead)
- **Style:** Brand Indigo bar with white text (Pinboard Mist with light text in dark mode), a hairline bottom border, sticky at the top, 60px minimum height. The brand is a 32px logo on a white rounded chip beside the site name in bold.
- **Nav links:** 0.95rem, 6px 10px padding, 6px radius. Hover adds a 12% white wash; the current page (`aria-current='page'`) gets a 20% white wash and bold weight.
- **Header tools:** Search and theme toggle are 36px pills with a 1px 50%-white border and transparent fill; hover adds the same 12% wash. The mobile menu is a `<details>` with a bordered "菜单" button and a popover panel of the nav list, up to 260px wide.

### Buttons
- **Shape:** full pill (999px), `0.55em 1.1em` padding, 600 weight.
- **Primary:** Brand Indigo fill, Paper text (`.button`). Hover raises brightness by 8% and keeps the text color.
- **Secondary:** transparent, 2px Brand Indigo border and label (`.button.secondary`). Hover keeps the colors.
- **Pairing:** the home hero places primary ("阅读博客") then secondary ("加入翻译小组") side by side with a 10px gap, wrapping on narrow screens.

### Cards / Containers
- **Corner style:** 10px.
- **Background:** Pinboard Mist, with a 1px Hairline border, `1rem 1.1rem` padding, full height of its grid cell.
- **Shadow:** none.
- **Content order:** optional 16:9 cover (6px radius), title (`h3`, 1.05rem, text-colored link), a meta row of dates and locations, optional summary in Ink Slate at 0.95rem.
- **Used for:** posts, events, publications and the home "社区宗旨" feature cards (title plus short lines).

### Tags
- **Style:** 0.85rem pill, 1px Hairline border, Ink Navy text, 2px 10px padding, no underline.
- **State:** hover shifts both border and text to Link Cobalt. The home tag cloud scales the label from 0.8rem to 1.1rem by count.

### Navigation
- **Style:** see Site Header. Desktop is an inline list from 960px; mobile is a disclosure menu. Always keep `aria-current='page'` on the active link and a skip link first in the tab order.

### Search Dialog
- **Style:** native `<dialog>`, up to 720px wide, 10px radius, Paper background with a 1px Hairline border and 16px padding. A bordered "close" button (6px radius) sits at the right of the header row. The toggle label hides below 480px, leaving the icon.
- **Behavior:** Pagefind renders results inside. Its own palette is mapped to these role tokens (links to Link Cobalt, matches to the Highlighter), so the dialog follows both themes. Status text is Ink Slate.

### Recent List
- **Style:** a plain list with a hairline under each row. The title is a link; the date is Ink Slate at 0.9rem and does not wrap internally.

### Author Badge
- **Style:** inline avatar plus name, in three sizes (28px, 56px, 160px). With no avatar, it falls back to a Brand Indigo circle holding the first character of the name in white. The name underlines on hover.

### Prose
- **Style:** article bodies sit in a 780px column. Images are centered with a 6px radius and an Ink Slate caption; code blocks use Code Wash with a 10px radius; tables get 1px Hairline cells.

## Do's and Don'ts

### Do:
- **Do** consume color only through the role variables in `src/styles/tokens.css`, and edit the light, `prefers-color-scheme` and `data-theme='dark'` blocks together.
- **Do** keep Brand Indigo to the masthead, the primary button, the secondary-button outline and the section-title rule.
- **Do** separate regions with a 1px Hairline or a Paper-to-Pinboard-Mist step.
- **Do** keep the 3px focus ring (2px offset) visible on every interactive element: Focus Azure everywhere, except the masthead ring, which uses the masthead text colour. Keep `aria-current='page'` on the active nav link.
- **Do** use pill geometry for small standalone controls and 10px for containers.
- **Do** keep body text at 1.75 line-height and article text inside the 780px column.
- **Do** honor `prefers-reduced-motion`: the global stylesheet already disables transitions and animations; do not override it.
- **Do** render sections that have no data as nothing at all, as the home widgets already do.

### Don't:
- **Don't** add a shadow to anything that sits in the page flow. The mobile menu popover is the only exception.
- **Don't** introduce a second accent color or a decorative gradient.
- **Don't** add webfonts, italics, uppercase transforms or letter-spacing to labels.
- **Don't** hard-code hex values in components. The two existing literals (the white chip behind the brand logo and the white-alpha washes in the masthead) are masthead-only; do not spread them.
- **Don't** make cards lift, scale or animate on hover.
- **Don't** let content break the page width: keep `overflow-wrap: anywhere` on body, scroll wide tables in place, and constrain images with `max-width: 100%`.
