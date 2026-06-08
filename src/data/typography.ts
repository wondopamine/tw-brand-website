/**
 * Content model for the Typography app (dock app, Geist-style showcase).
 * Prose is carried over verbatim from the former Typography folder panel.
 */

export type FontId = "jakarta" | "inter";

export interface FontWeight {
  label: string;
  value: number;
}

export interface FontDef {
  id: FontId;
  name: string;
  /** Role within the brand system, e.g. "Display" */
  role: string;
  /** CSS font-family value (token first, then fallback) */
  cssVar: string;
  /** Weights actually loaded via next/font — never list synthesized faces */
  weights: FontWeight[];
  /** One-line role description */
  summary: string;
  /** "Why We Picked This" prose */
  rationale: string;
  resource: { label: string; href: string };
}

export const fonts: FontDef[] = [
  {
    id: "jakarta",
    name: "Plus Jakarta Sans",
    role: "Display",
    cssVar: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
    weights: [
      { label: "ExtraLight", value: 200 },
      { label: "Light", value: 300 },
      { label: "Regular", value: 400 },
      { label: "Medium", value: 500 },
      { label: "SemiBold", value: 600 },
      { label: "Bold", value: 700 },
      { label: "ExtraBold", value: 800 },
    ],
    summary:
      "Our display font. Used for headlines, hero text, and all display-level typography. Clean geometric forms create a modern, confident presence while remaining approachable and friendly.",
    rationale:
      "Plus Jakarta Sans strikes the exact balance Kind Utility demands: geometric enough to feel modern and professional, soft enough to feel warm and human. Its open letterforms improve readability at large sizes, and the SemiBold weight (600) gives headlines presence without aggression. It’s free via Google Fonts — respecting the Light Weight principle by eliminating licensing overhead and ensuring fast, reliable loading. The name itself evokes Southeast Asia, subtly connecting to our Singapore roots.",
    resource: {
      label: "Plus Jakarta Sans — Google Fonts",
      href: "https://fonts.google.com/specimen/Plus+Jakarta+Sans",
    },
  },
  {
    id: "inter",
    name: "Inter",
    role: "Body",
    cssVar: "var(--font-body, 'Inter', sans-serif)",
    weights: [
      { label: "Regular", value: 400 },
      { label: "Medium", value: 500 },
      { label: "SemiBold", value: 600 },
    ],
    summary:
      "Our body font. Used for body copy, UI text, labels, and all readable content. Exceptional legibility at small sizes makes it ideal for interface text and longer reading.",
    rationale:
      "Inter was designed specifically for screens. Its tall x-height, open apertures, and carefully tuned spacing make it one of the most readable UI fonts available. For teachers scanning information quickly between classes, readability is kindness. It supports 3 weights in our system — Regular (400) for body, Medium (500) for emphasis, SemiBold (600) for labels — giving us enough range without adding complexity. Like Plus Jakarta Sans, it’s free via Google Fonts.",
    resource: {
      label: "Inter — Google Fonts",
      href: "https://fonts.google.com/specimen/Inter",
    },
  },
];

export function getFont(id: FontId): FontDef {
  return fonts.find((f) => f.id === id) ?? fonts[0];
}

export interface TypeScaleEntry {
  label: string;
  fontId: FontId;
  size: number;
  weight: number;
  uppercase?: boolean;
  /** Letter spacing in em */
  tracking?: number;
  sample: string;
}

export const typeScale: TypeScaleEntry[] = [
  { label: "Display XL", fontId: "jakarta", size: 120, weight: 600, sample: "Aa" },
  { label: "Display L", fontId: "jakarta", size: 96, weight: 600, sample: "Teach" },
  { label: "Display", fontId: "jakarta", size: 72, weight: 600, sample: "Kind Utility" },
  { label: "Display S", fontId: "jakarta", size: 48, weight: 600, sample: "Built for teachers" },
  { label: "Heading 1", fontId: "jakarta", size: 32, weight: 600, sample: "Less friction, more confidence" },
  { label: "Heading 2", fontId: "jakarta", size: 24, weight: 600, sample: "Calm guidance at every step" },
  { label: "Heading 3", fontId: "jakarta", size: 20, weight: 600, sample: "Familiar enough to feel safe" },
  { label: "Body Large", fontId: "inter", size: 18, weight: 400, sample: "Teachers across Singapore navigate dozens of platforms before they can teach." },
  { label: "Body", fontId: "inter", size: 16, weight: 400, sample: "The tool gets out of the way so the teaching can happen." },
  { label: "Body Small", fontId: "inter", size: 14, weight: 400, sample: "Progressive disclosure over information overload." },
  { label: "Caption", fontId: "inter", size: 12, weight: 500, sample: "Updated 5 minutes ago" },
  { label: "Label", fontId: "inter", size: 11, weight: 600, uppercase: true, tracking: 0.08, sample: "Class Planner" },
];

export const usageGuidelines = {
  doText:
    "Use Plus Jakarta Sans exclusively for display and headline text. Use Inter for all body and UI text. Maintain generous line height (1.5–1.6 for body). Respect the type scale consistently.",
  dontText:
    "Mix display and body fonts inappropriately. Use decorative or script fonts. Set body text below 14px. Use all-caps for more than short labels.",
};
