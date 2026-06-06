/**
 * DesktopItem discriminated union — the data shape for items rendered on
 * the T&S Brand OS desktop. Five element types form the visual vocabulary
 * (see plan 2026-06-03-002):
 *
 *   folder              — grouped resources (Colours, Illustrations, ...)
 *   app                 — launcher: external (href, new tab) or in-OS (appId, window)
 *   doc                 — one-pager content (opens in a window overlay)
 *   sticky              — always-visible passive content (quotes)
 *   illustration-widget — inline swipeable illustration carousel
 */

interface BaseDesktopItem {
  id: string;
  /** Position as percentage of viewport (0–100). Authored per item; defaults handled by layout if absent. */
  position?: { x: number; y: number };
  /** Ordering on MobileDesktop (lower = first). */
  mobileOrder: number;
}

export interface FolderDesktopItem extends BaseDesktopItem {
  type: "folder";
  label: string;
  /** Lookup key in src/data/panel-contents.ts */
  panelId: string;
}

/** External app launcher — opens href in a new tab. */
export interface ExternalAppDesktopItem extends BaseDesktopItem {
  type: "app";
  label: string;
  href: string;
  appId?: never;
}

/**
 * Known in-OS app ids. Closed union so the renderWindowContent dispatch in
 * Desktop/MobileDesktop is compile-checked when a new app is registered.
 */
export type OsAppId = "typography";

/** In-OS app — opens an app window (e.g. the Typography app). */
export interface OsAppDesktopItem extends BaseDesktopItem {
  type: "app";
  label: string;
  /** App lookup key handled by the desktop's window renderer. */
  appId: OsAppId;
  href?: never;
}

export type AppDesktopItem = ExternalAppDesktopItem | OsAppDesktopItem;

export interface DocDesktopItem extends BaseDesktopItem {
  type: "doc";
  label: string;
  /** Content lookup key in src/data/modal-contents.ts */
  contentId: string;
}

export interface IllustrationSlide {
  id: string;
  caption: string;
  imageSrc: string;
  alt: string;
}

export interface StickyDesktopItem extends BaseDesktopItem {
  type: "sticky";
  quote: string;
  highlight?: string;
  attribution?: string;
  /** Small rotation in degrees for natural sticky look (e.g., -2 to 2). */
  rotation?: number;
}

export interface IllustrationWidgetDesktopItem extends BaseDesktopItem {
  type: "illustration-widget";
  slides: IllustrationSlide[];
}

export type DesktopItem =
  | FolderDesktopItem
  | AppDesktopItem
  | DocDesktopItem
  | StickyDesktopItem
  | IllustrationWidgetDesktopItem;
