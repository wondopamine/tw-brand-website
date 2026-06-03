import type { ToolEntry } from "@/types/portfolio";

/**
 * Tangible, on-brand tools that product builders in the T&S portfolio can
 * pick up and use. This is the "operating system" half of the Brand OS
 * framing — not docs about brand, but actual working artifacts.
 *
 * Add new tools by appending to the array. Group by `category` if the list
 * grows large; today there's one entry so the panel renders flat.
 */
export const tools: ToolEntry[] = [
  {
    id: "icon-generator",
    name: "Icon Generator",
    description:
      "Generate on-brand iconography for T&S products. Maintains stroke weight, corner radius, and silhouette guidelines automatically.",
    href: "https://github.com/wondopamine/icon-generator",
    category: "icons",
  },
];

/**
 * Products in the T&S portfolio. Reserved for a future Products surface
 * (logo + name lockups). Empty today because the site is currently focused
 * on the T&S brand itself, not product specifications.
 *
 * When this gets populated, add the ProductEntry type to
 * src/types/portfolio.ts at that time.
 */
export const products: never[] = [];
