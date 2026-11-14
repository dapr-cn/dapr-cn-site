# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: Chinese-speaking developers and platform engineers who are learning or adopting Dapr. They come to read Chinese-language articles, find translated Dapr documentation, and follow community events and meetings. The content is mostly long technical text.

Secondary audiences (contributors, translators, teams evaluating Dapr) were not confirmed as co-primary. They are served by the same pages but do not set priorities.

## Product Purpose

The website of the Dapr 中国社区 (Dapr Chinese community). It gives Dapr users and developers a place to share knowledge and exchange experience in Chinese: blog posts, events, meetings, translation work, publications and a member list. The community states its goal as helping Dapr users and developers communicate with each other (信息同步、资源共享、增进了解、促进合作).

Success is a Chinese-speaking reader finding the article, translation or meeting they need, and joining the community. The site is run by volunteers, so it is also meant to stay cheap to maintain and easy to contribute content to.

## Positioning

A neutral, open, volunteer-run Chinese hub centered on Dapr. It is not the official Dapr site. It adds what the English community pages and docs.dapr.io do not: Chinese-language writing, Chinese-language biweekly meetings at times that suit China (Wednesday evening, via Tencent Meeting), and a translation group that publishes Chinese versions of the official docs, blog posts and papers.

## Operating Context

- Content is Markdown in `src/content/` (posts, events, publications, authors, pages). Volunteers add content through pull requests to the repository.
- The site was migrated from Hugo to Astro. Content, URLs and feeds were deliberately kept unchanged.
- Visitors are assumed to read Chinese; device mix and traffic sources are not measured here (Google Analytics exists but no data was provided).
- Meetings happen outside the site (Tencent Meeting links, minutes and video replays). Official English community meetings and Dapr docs are on other sites.
- Translated Dapr documentation lives on docs.dapr.io (`/zh-hans/`), not on this site. Translated blog and paper posts are published here with a title that starts with "[译]".

## Capabilities and Constraints

- Static site built with Astro, with Pagefind search (needs a build to exist), an RSS feed at `/index.xml`, a sitemap, and Google Analytics on production builds only.
- Site language is Simplified Chinese (`zh-Hans`). Public origin is `https://cn.dapr.io`.
- Every URL listed in `scripts/hugo-urls.txt` must keep resolving; `pnpm run verify` enforces route parity.
- Navigation: 介绍, 活动, 博客, 翻译, 源码, 会议, 案例, 出版, 成员. `/source/` and `/case/` are served by other deployments on the same origin; this build does not produce them.
- A post must name authors that have a profile, or the build fails. Events are "upcoming" until their start time passes, evaluated at build time.
- Seven images are hotlinked from `wework.qpic.cn` and are not checked by the build.
- Undecided: whether contributors or evaluating companies should become co-primary audiences; no accessibility standard has been set.

## Brand Commitments

- The community name is "Dapr 中国社区", and its footer copyright line reads "© {year}. Dapr 中国社区版权所有".
- The Dapr name and logo (`public/media/dapr_logo.svg`, `public/media/dapr.png`) belong to the Dapr project. Keep them as supplied; do not redraw, recolor or restyle them.
- Voice follows the site's own welcome copy: neutral, open, volunteer-run, plain Chinese technical writing.

## Evidence on Hand

- Real content in the repository: 15 posts, 5 events, 5 publications and 11 author profiles in `src/content/`, plus pages for the community charter, translation, meetings and members.
- Meeting pages list dated Tencent Meeting links and minutes; the listed dates stop in 2022, so the current cadence is not confirmed.
- Images in `public/media/` (`welcome.avif`, `study.avif`, `books.avif`, `coders.avif`, `contact.avif`).
- Not on hand, and not to be invented: testimonials, user counts, adoption statistics, sponsor logos, case-study content (the case pages are served elsewhere).

## Product Principles

1. **Reading first.** The main job is reading long Chinese technical text; everything else supports finding it.
2. **Neutral and open.** The site speaks for a community, not a vendor; it never implies it is the official Dapr site.
3. **Cheap for volunteers to keep alive.** Prefer static, content-as-Markdown and few moving parts over features that need ongoing care.
4. **Links last.** Published URLs are a promise to readers and search engines; do not break them.
5. **Chinese is the default language.** Copy, layout and search are designed for Chinese first.
