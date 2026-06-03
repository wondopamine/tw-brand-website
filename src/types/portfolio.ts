/**
 * Type definitions for the T&S portfolio's tools and resources.
 *
 * NOTE: A `ProductEntry` type is intentionally deferred. The site today is
 * about the T&S brand itself, not the product catalogue. When a future
 * Products surface is added, the format will be logo + name lockups (square
 * brand-coloured icon + product name), not descriptive product list. Add
 * ProductEntry + products data at that point.
 */

export interface ToolEntry {
  id: string;
  /** Display name */
  name: string;
  /** One-line description of what this tool does and why it's on-brand */
  description: string;
  /** Outbound URL (repo, app, doc, etc.) */
  href: string;
  /** Loose category used for grouping; render flat if only one category is in use */
  category?: "icons" | "color" | "typography" | "illustration" | "other";
}
