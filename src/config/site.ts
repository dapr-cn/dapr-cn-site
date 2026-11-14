// Site-wide settings. Replaces Hugo's config/_default/{config,params}.yaml.

export const site = {
  /** Website name, used in titles and the header. */
  title: 'Dapr 中国社区',
  /** Default description for pages without their own summary. */
  description: 'Dapr 中国社区.',
  /** Public origin. Canonical links, the sitemap and the feed are built from it. */
  baseUrl: 'https://cn.dapr.io',
  /** Language tag of the site content. */
  lang: 'zh-Hans',
  /** Google Analytics property. Loaded on production builds only. */
  gaId: 'G-J4DYYVC8KL',
  /** Footer copyright. `{year}` is replaced with the build year. */
  copyright: '© {year}. Dapr 中国社区版权所有',
  /** Community GitHub organisation, linked from the footer. */
  githubUrl: 'https://github.com/dapr-cn',
} as const;

/** Returns the copyright line for a given year. */
export function copyrightText(year: number): string {
  return site.copyright.replace('{year}', String(year));
}
