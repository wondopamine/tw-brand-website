import type { PanelContent } from "@/types/panel";

export const panelContents: Record<string, PanelContent> = {
  colours: {
    id: "colours",
    title: "Colours",
    description:
      "The TW colour system. Click any swatch to copy its HEX value.",
    items: [
      {
        type: "color-swatch",
        title: "Primary",
        colors: [
          { name: "TW Accent", hex: "#0064FF", isPrimary: true },
        ],
      },
      { type: "divider" },
      {
        type: "color-swatch",
        title: "Blue Shades (Tailwind Placeholder)",
        colors: [
          { name: "Blue 50", hex: "#EFF6FF" },
          { name: "Blue 100", hex: "#DBEAFE" },
          { name: "Blue 200", hex: "#BFDBFE" },
          { name: "Blue 300", hex: "#93C5FD" },
          { name: "Blue 400", hex: "#60A5FA" },
          { name: "Blue 500", hex: "#3B82F6" },
          { name: "Blue 600", hex: "#2563EB" },
          { name: "Blue 700", hex: "#1D4ED8" },
          { name: "Blue 800", hex: "#1E40AF" },
          { name: "Blue 900", hex: "#1E3A8A" },
          { name: "Blue 950", hex: "#172554" },
        ],
      },
      { type: "divider" },
      {
        type: "text",
        title: "Usage",
        content:
          "Use TW Accent (#0064FF) as the primary brand colour across UI, marketing, and communications. The blue shade ramp provides supporting tones for backgrounds, borders, hover states, and text emphasis. Refer to FlowDS for the full design system palette.",
      },
    ],
  },

  imagery: {
    id: "imagery",
    title: "Imagery",
    description:
      "Photography and visual assets for Teacher Workspace. Click to enlarge, copy filename, or open source link.",
    items: [
      {
        type: "text",
        title: "Photography Style",
        content:
          "Use real photographs of teachers in natural settings. Capture authentic moments \u2014 collaboration, focus, joy. Avoid stock photography that feels staged or generic. Lighting should be warm and natural.",
      },
      { type: "divider" },
      {
        type: "asset-list",
        title: "Image Library",
        assets: [
          {
            name: "teacher-classroom-01.jpg",
            thumbnailColor: "#E8D5B7",
            description: "Teacher helping student at desk",
            link: "https://unsplash.com/photos/teacher-classroom",
          },
          {
            name: "teacher-collaboration-02.jpg",
            thumbnailColor: "#C4D9A0",
            description: "Teachers collaborating in staff room",
            link: "https://unsplash.com/photos/teacher-collaboration",
          },
          {
            name: "classroom-environment-03.jpg",
            thumbnailColor: "#A7C7E7",
            description: "Warm classroom environment",
            link: "https://unsplash.com/photos/classroom-environment",
          },
          {
            name: "teacher-tech-04.jpg",
            thumbnailColor: "#D4B8E0",
            description: "Teacher using technology in class",
            link: "https://unsplash.com/photos/teacher-tech",
          },
          {
            name: "student-engagement-05.jpg",
            thumbnailColor: "#F5D0A9",
            description: "Students engaged in group activity",
            link: "https://unsplash.com/photos/student-engagement",
          },
        ],
      },
      { type: "divider" },
      {
        type: "guideline",
        title: "Photography Guidelines",
        doText:
          "Real teachers in real classrooms. Natural lighting. Candid moments of teaching, collaboration, and connection. Diverse representation.",
        dontText:
          "Overly staged stock photos. Cold, clinical lighting. Generic office settings. Lack of diversity.",
      },
    ],
  },

  illustrations: {
    id: "illustrations",
    title: "Illustrations",
    description:
      "Illustration assets for Teacher Workspace. Click to enlarge, copy filename, or open source link.",
    items: [
      {
        type: "text",
        title: "Illustration Style",
        content:
          "Illustrations complement photography to explain concepts, add warmth, and create moments of delight. Our illustration style is warm, approachable, and slightly playful without being childish.",
      },
      { type: "divider" },
      {
        type: "asset-list",
        title: "Illustration Library",
        assets: [
          {
            name: "illustration-teacher-desk.svg",
            thumbnailColor: "#E6F0FF",
            description: "Teacher at desk, warm and focused",
            link: "#",
          },
          {
            name: "illustration-classroom-scene.svg",
            thumbnailColor: "#FFF3E0",
            description: "Classroom scene with students",
            link: "#",
          },
          {
            name: "illustration-collaboration.svg",
            thumbnailColor: "#E8F5E9",
            description: "Teacher collaboration moment",
            link: "#",
          },
          {
            name: "illustration-onboarding.svg",
            thumbnailColor: "#F3E5F5",
            description: "Onboarding welcome illustration",
            link: "#",
          },
          {
            name: "illustration-success.svg",
            thumbnailColor: "#E0F7FA",
            description: "Success celebration moment",
            link: "#",
          },
        ],
      },
      { type: "divider" },
      {
        type: "guideline",
        title: "Illustration Guidelines",
        doText:
          "Warm color palette anchored in TW blue. Human figures with natural proportions. Soft edges and rounded forms. Subtle textures.",
        dontText:
          "Overly corporate or flat illustrations. Cartoonish proportions. Sharp, aggressive angles. Neon or harsh colors.",
      },
    ],
  },

  typography: {
    id: "typography",
    title: "Typography",
    description:
      "The typographic system for Teacher Workspace.",
    items: [
      {
        type: "text",
        title: "Display \u2014 Plus Jakarta Sans",
        content:
          "Used for headlines, hero text, and display-level typography. Plus Jakarta Sans\u2019s clean geometric forms create a modern, confident presence while remaining approachable and friendly.\n\nWeight: SemiBold (600) for all display and heading text.\nSource: Google Fonts (free, open source).",
      },
      { type: "divider" },
      {
        type: "text",
        title: "Body \u2014 Inter",
        content:
          "Used for body copy, UI text, labels, and all readable content. Inter\u2019s exceptional legibility at small sizes makes it ideal for interface text and longer reading.\n\nWeights: Regular (400) for body, Medium (500) for emphasis, SemiBold (600) for labels.\nSource: Google Fonts (free, open source).",
      },
      { type: "divider" },
      {
        type: "text",
        title: "Type Scale",
        content:
          "Display: 120px / 96px / 72px / 48px (Plus Jakarta Sans 600)\nHeading 1: 32px (Plus Jakarta Sans 600)\nHeading 2: 24px (Plus Jakarta Sans 600)\nHeading 3: 20px (Plus Jakarta Sans 600)\nBody Large: 18px (Inter Regular)\nBody: 16px (Inter Regular)\nBody Small: 14px (Inter Regular)\nCaption: 12px (Inter Medium)\nLabel: 11px (Inter SemiBold, uppercase, tracking wider)",
      },
      { type: "divider" },
      {
        type: "guideline",
        title: "Usage Guidelines",
        doText:
          "Use Plus Jakarta Sans exclusively for display and headline text. Use Inter for all body and UI text. Maintain generous line height (1.5\u20131.6 for body). Respect the type scale consistently.",
        dontText:
          "Mix display and body fonts inappropriately. Use decorative or script fonts. Set body text below 14px. Use all-caps for more than short labels.",
      },
    ],
  },

  "use-cases": {
    id: "use-cases",
    title: "Use Cases",
    description:
      "Practical examples of brand guidelines applied to real scenarios.",
    items: [
      {
        type: "text",
        title: "Naming Convention",
        content:
          "Naming is one of the most powerful brand tools. Every feature, page, and label is an opportunity to reinforce our brand values. We prioritize Clarity above all else in naming.",
      },
      { type: "divider" },
      {
        type: "text",
        title: "Clarity First",
        content:
          "Names should be immediately understandable. A teacher encountering a feature name for the first time should know exactly what it does. Clever names fail when they require explanation.\n\nGood: \u201CClass Planner\u201D \u2014 instantly clear.\nBad: \u201CSyncFlow\u201D \u2014 requires explanation.\n\nGood: \u201CStudent Notes\u201D \u2014 obvious purpose.\nBad: \u201CInsightHub\u201D \u2014 ambiguous and corporate.",
      },
      { type: "divider" },
      {
        type: "guideline",
        title: "Naming Principles",
        doText:
          "Use plain language teachers already know. Name by function, not by metaphor. Be specific and descriptive. Test names with real teachers.",
        dontText:
          "Invent portmanteau words. Use technical jargon or acronyms. Prioritize cleverness over clarity. Name features after internal codenames.",
      },
      { type: "divider" },
      {
        type: "text",
        title: "More Use Cases (Coming Soon)",
        content:
          "Additional use cases including email templates, notification copy, error message patterns, empty state design, and onboarding flows will be documented here.",
      },
    ],
  },
};
