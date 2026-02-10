import type { PanelContent } from "@/types/panel";

export const panelContents: Record<string, PanelContent> = {
  imagery: {
    id: "imagery",
    title: "Imagery Guidelines",
    description:
      "How we use photography and illustration to bring the Teacher Workspace brand to life.",
    items: [
      {
        type: "text",
        title: "Photography",
        content:
          "Use real photographs of teachers in natural settings. Capture authentic moments \u2014 collaboration, focus, joy. Avoid stock photography that feels staged or generic. Lighting should be warm and natural.",
      },
      {
        type: "guideline",
        title: "Photography Style",
        doText:
          "Real teachers in real classrooms. Natural lighting. Candid moments of teaching, collaboration, and connection. Diverse representation.",
        dontText:
          "Overly staged stock photos. Cold, clinical lighting. Generic office settings. Lack of diversity.",
      },
      { type: "divider" },
      {
        type: "text",
        title: "Illustration",
        content:
          "Illustrations complement photography to explain concepts, add warmth, and create moments of delight. Our illustration style is warm, approachable, and slightly playful without being childish.",
      },
      {
        type: "guideline",
        title: "Illustration Style",
        doText:
          "Warm color palette anchored in TW blue. Human figures with natural proportions. Soft edges and rounded forms. Subtle textures.",
        dontText:
          "Overly corporate or flat illustrations. Cartoonish proportions. Sharp, aggressive angles. Neon or harsh colors.",
      },
      { type: "divider" },
      {
        type: "text",
        title: "Brand Comparisons",
        content:
          "Think of our visual tone as similar to Dropbox, Notion, and Linear \u2014 clean, considered, professional yet warm. Avoid the tone of Canva (too playful), Salesforce (too corporate), or Duolingo (too gamified).",
      },
    ],
  },

  downloads: {
    id: "downloads",
    title: "Downloads",
    description: "Brand assets and resources for the Teacher Workspace team.",
    items: [
      {
        type: "text",
        title: "Logo Files",
        content:
          "Logo assets are being finalized. Check back soon for SVG, PNG, and EPS formats in all color variants.",
      },
      { type: "divider" },
      {
        type: "text",
        title: "Color Palette",
        content:
          "Primary Blue: #0064FF\nUse as the main brand accent across UI, marketing, and communications. Refer to the FlowDS design system for the full shade ramp.",
      },
      { type: "divider" },
      {
        type: "text",
        title: "Typography",
        content:
          "Display: Sora (Google Fonts) \u2014 used for headlines and display text.\nBody: Inter (Google Fonts) \u2014 used for body copy, UI text, and all readable content.\n\nBoth fonts are freely available from Google Fonts.",
      },
      { type: "divider" },
      {
        type: "text",
        title: "Brand Guidelines PDF",
        content:
          "The full brand guidelines document is available as a PDF. Contact the design team for the latest version.",
      },
    ],
  },
};
