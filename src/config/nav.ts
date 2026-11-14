// Primary navigation. Replaces the `main` menu in config/_default/menus.yaml.
// The order of this array is the order shown in the header.

export interface NavItem {
  /** Label shown in the header. */
  name: string;
  /** Path on the public site, with a trailing slash. */
  href: string;
  /** Route prefix that marks this entry as the current section. */
  section: string;
  /**
   * False for routes that another deployment serves (/source/ and /case/).
   * This site never produces those pages; the link points at the same origin.
   */
  producedHere: boolean;
}

// The pages that were standalone are now tag archives (see src/content/tag). 介绍 is the home page,
// and 成员 is the author list.
export const nav: readonly NavItem[] = [
  { name: '介绍', href: '/', section: '/', producedHere: true },
  { name: '活动', href: '/event/', section: '/event/', producedHere: true },
  { name: '博客', href: '/post/', section: '/post/', producedHere: true },
  { name: '翻译', href: '/tag/translation/', section: '/tag/translation/', producedHere: true },
  { name: '源码', href: '/source/', section: '/source/', producedHere: false },
  { name: '会议', href: '/tag/meeting/', section: '/tag/meeting/', producedHere: true },
  { name: '案例', href: '/case/', section: '/case/', producedHere: false },
  { name: '出版', href: '/publication/', section: '/publication/', producedHere: true },
  { name: '成员', href: '/authors/', section: '/author', producedHere: true },
];

/**
 * Returns the nav entry whose section contains `pathname`, or undefined.
 * `/post/some-article/` belongs to 博客 because it starts with `/post/`.
 * The home section `/` matches the home page only, not every page.
 */
export function currentNavItem(pathname: string): NavItem | undefined {
  return nav.find((item) => (item.section === '/' ? pathname === '/' : pathname.startsWith(item.section)));
}
