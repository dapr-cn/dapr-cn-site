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

export const nav: readonly NavItem[] = [
  { name: '介绍', href: '/tour/', section: '/tour/', producedHere: true },
  { name: '活动', href: '/event/', section: '/event/', producedHere: true },
  { name: '博客', href: '/post/', section: '/post/', producedHere: true },
  { name: '翻译', href: '/translation/', section: '/translation/', producedHere: true },
  { name: '源码', href: '/source/', section: '/source/', producedHere: false },
  { name: '会议', href: '/meeting/', section: '/meeting/', producedHere: true },
  { name: '案例', href: '/case/', section: '/case/', producedHere: false },
  { name: '出版', href: '/publication/', section: '/publication/', producedHere: true },
  { name: '成员', href: '/people/', section: '/people/', producedHere: true },
];

/**
 * Returns the nav entry whose section contains `pathname`, or undefined.
 * `/post/some-article/` belongs to 博客 because it starts with `/post/`.
 */
export function currentNavItem(pathname: string): NavItem | undefined {
  return nav.find((item) => pathname === item.section || pathname.startsWith(item.section));
}
