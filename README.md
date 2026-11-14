# [Dapr 中国社区](https://cn.dapr.io)

The website of the Dapr Chinese community, built with [Astro](https://astro.build) and [Pagefind](https://pagefind.app).

The site was migrated from Hugo. Its content, URLs and feeds are unchanged; see `scripts/hugo-urls.txt` for the list of URLs it must keep serving. The standalone pages of the Hugo site (介绍, 会议, 翻译 and their sub-pages, 成员) are now tag archives or existing pages, so their URLs were removed from that list on purpose. Likewise, the Chinese-path URLs of tags and authors were retired: `scripts/retired-urls.txt` maps each one to its ASCII replacement, for redirects on the host.

## Requirements

- Node.js 24
- pnpm, enabled with corepack. The version comes from `packageManager` in `package.json`.

Go and Hugo are not needed.

## Install

```bash
corepack enable
pnpm install
```

## Develop

```bash
pnpm run dev
```

The dev server runs at <http://localhost:4321> and reloads when you save a file. It does not load analytics.

## Build

```bash
pnpm run build     # writes dist/, then the Pagefind search index in dist/pagefind
pnpm run preview   # serves dist/ at http://localhost:4321
```

## Verify

```bash
pnpm run verify    # builds the site, then runs the route and content checks
pnpm run check     # type-checks the project with astro check
pnpm test          # runs the unit tests
```

`verify` fails when:

- a URL in `scripts/hugo-urls.txt` is not produced by the build (route parity);
- an entry has invalid front matter, names an unknown author, links to a page that is not built, or uses a missing image.

External images are listed, not checked. The build also fails on a missing local image.

## Write content

Content lives in `src/content/`.

| Path | What it is | URL |
| --- | --- | --- |
| `post/<folder>/index.md` | Blog post | `/post/<folder>/` |
| `event/<folder>/index.md` | Event | `/event/<folder>/` |
| `publication/<folder>/index.md` | Publication | `/publication/<folder>/` |
| `authors/<id>/index.md` | Author profile | `/author/<id>/` (the folder name) |
| `tag/<slug>/index.md` | Tag description, shown above the tag's entries | `/tag/<slug>/` |
| `pages/home/*.md` | Home-page widgets | none (headless) |

A post looks like this:

```markdown
---
title: "Dapr v1.11 正式发布"
authors:
  - "zhangshanyou"        # the author's folder name in src/content/authors/
date: "2023-06-14"
tags:
  - "Dapr"
summary: "一句话摘要，用作搜索结果和页面描述。"
---

正文使用 Markdown。
```

- **Images:** put them in the entry's folder and refer to them relatively, for example `![alt](images/cover.avif)`. A `featured.*` file in the folder is the card cover, and `avatar.*` in an author folder is the avatar.
- **Dates:** use a quoted date (`"2023-06-14"`). Events may include a time with an offset (`"2023-07-23T09:00:00+08:00"`). An event is listed as upcoming until its start time passes, and this is evaluated at build time.
- **Tags:** each tag gets an archive at `/tag/<slug>/`. Upper-case letters become lower-case and spaces become `-`, as before. Public URLs are ASCII only, so a tag whose name is not ASCII (such as `翻译`) needs a tag description whose folder is its ASCII slug (`tag/translation/`); the build fails without one. `pnpm run verify` fails on any non-ASCII route, `href` or `id`. Heading anchors are ASCII too: a heading with non-ASCII text gets its ASCII words plus a short hash (`scripts/lib/heading-ids.mjs`), so `dapr是什么` becomes `#dapr-<hash>`; ASCII headings keep their id.
- **Tag descriptions:** a folder `tag/<slug>/` with an `index.md` (`title` is the tag name, the folder name is the URL) adds a text above that tag's entries. A tag with a description and no entries still gets its page. Use it instead of a separate page.
- **Authors:** an author the entry names must have a profile, or the build fails.

## Search, feeds and analytics

- Search is Pagefind. It indexes the body of posts, events and publications, and needs a build (`pnpm run build`) to exist.
- RSS is at `/index.xml`, the sitemap at `/sitemap.xml`, and `robots.txt` points to the sitemap.
- Google Analytics (`G-J4DYYVC8KL`) loads on production builds only.

## Known limits

- `/source/` and `/case/` are linked from the navigation. They are served by other sites and this build does not produce them.
- Seven images are hotlinked from `wework.qpic.cn`. `verify` lists them but does not check them.
- `scripts/convert-front-matter.mjs` was the one-off migration from the Hugo sources. Those sources have been removed, so the script is kept only as a record.

## Layout

```
src/
  config/       site settings and navigation
  content/      posts, events, publications, authors, tag descriptions and home widgets
  content.config.ts   collection schemas
  components/   header, footer, search, cards, home sections
  layouts/      base page and article layout
  lib/          URLs, tags, dates, events
  pages/        routes (no static pages; the tag archive is `pages/tag/[tag].astro`)
  styles/       theme tokens and base CSS
public/         logo, images and robots.txt, served as they are
scripts/        verification and migration scripts, hugo-urls.txt
tests/          unit tests
```
