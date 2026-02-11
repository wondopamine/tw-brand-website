import type { PanelContent } from "@/types/panel";

export const panelContents: Record<string, PanelContent> = {
  colours: {
    id: "colours",
    title: "Colours",
    description:
      "The TW colour system anchored in a single primary blue. Click any swatch to copy its HEX value.",
    items: [
      {
        type: "text",
        title: "TW Accent — #0064FF",
        content:
          "Our primary brand colour. A confident, approachable blue that balances professionalism with warmth.",
      },
      {
        type: "text",
        title: "Why We Picked This",
        content:
          "Blue signals trust, reliability, and calm — exactly what teachers need from a daily tool. TW Accent (#0064FF) is inspired by MOE Singapore\u2019s institutional blue, grounding Teacher Workspace in a colour teachers already associate with education. We shifted the hue slightly brighter to feel more modern and energetic, aligning with the Kind Utility philosophy: familiar enough to feel safe, polished enough to feel premium. It works across light and dark contexts, meets WCAG AA contrast on white, and scales cleanly into a full shade ramp for UI states.",
      },
      { type: "divider" },
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
        title: "Blue Shade Ramp",
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
      "Photography guidelines and assets for Teacher Workspace.",
    items: [
      {
        type: "text",
        title: "Photography Style",
        content:
          "Authentic, warm images of real teachers in real classrooms. Our photography captures the everyday moments of teaching — focus, collaboration, connection, and joy.",
      },
      {
        type: "text",
        title: "Why We Picked This",
        content:
          "Teachers are the heart of Teacher Workspace. Stock photography feels impersonal and generic — exactly the opposite of Kind Utility. Real photography signals that we see teachers as real people, not abstract users. Warm, natural lighting evokes approachability. Candid moments (not staged poses) build trust because they mirror the reality teachers live. This visual honesty is how we make the brand promise tangible: we understand your world because we\u2019ve been there.",
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
      "Illustration style and assets for Teacher Workspace.",
    items: [
      {
        type: "text",
        title: "Illustration Style",
        content:
          "Warm, approachable, and slightly playful without being childish. Rounded forms, soft edges, and a hand-drawn quality that feels human and crafted.",
      },
      {
        type: "text",
        title: "Why We Picked This",
        content:
          "Illustrations fill the gap where photography can\u2019t reach — explaining abstract concepts, adding moments of delight, and softening the interface. A hand-drawn, slightly imperfect style reinforces Kind Utility: it signals that a real person made this with care, not a machine. The rounded, soft aesthetic lowers cognitive load and reduces intimidation, making complex features feel approachable. We anchor the palette in TW blue to maintain brand consistency while using warm accent colours to add life. The result is an illustration system that feels like a kind colleague sketching something out on a whiteboard to help you understand.",
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
          "Warm color palette anchored in TW blue. Human figures with natural proportions. Soft edges and rounded forms. Subtle textures and hand-drawn quality.",
        dontText:
          "Overly corporate or flat illustrations. Cartoonish proportions. Sharp, aggressive angles. Neon or harsh colors.",
      },
    ],
  },

  typography: {
    id: "typography",
    title: "Typography",
    description:
      "The typographic system for Teacher Workspace — two fonts, clearly defined roles.",
    items: [
      {
        type: "text",
        title: "Plus Jakarta Sans",
        content:
          "Our display font. Used for headlines, hero text, and all display-level typography. Clean geometric forms create a modern, confident presence while remaining approachable and friendly.",
      },
      {
        type: "text",
        title: "Why We Picked This",
        content:
          "Plus Jakarta Sans strikes the exact balance Kind Utility demands: geometric enough to feel modern and professional, soft enough to feel warm and human. Its open letterforms improve readability at large sizes, and the SemiBold weight (600) gives headlines presence without aggression. It\u2019s free via Google Fonts — respecting the Light Weight principle by eliminating licensing overhead and ensuring fast, reliable loading. The name itself evokes Southeast Asia, subtly connecting to our Singapore roots.",
      },
      { type: "divider" },
      {
        type: "text",
        title: "Inter",
        content:
          "Our body font. Used for body copy, UI text, labels, and all readable content. Exceptional legibility at small sizes makes it ideal for interface text and longer reading.",
      },
      {
        type: "text",
        title: "Why We Picked This",
        content:
          "Inter was designed specifically for screens. Its tall x-height, open apertures, and carefully tuned spacing make it one of the most readable UI fonts available. For teachers scanning information quickly between classes, readability is kindness. It supports 3 weights in our system — Regular (400) for body, Medium (500) for emphasis, SemiBold (600) for labels — giving us enough range without adding complexity. Like Plus Jakarta Sans, it\u2019s free via Google Fonts.",
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
        type: "asset-list",
        title: "Font Resources",
        assets: [
          {
            name: "Plus Jakarta Sans",
            thumbnailColor: "#E6F0FF",
            description: "Display font — Google Fonts",
            link: "https://fonts.google.com/specimen/Plus+Jakarta+Sans",
          },
          {
            name: "Inter",
            thumbnailColor: "#F0F0F5",
            description: "Body font — Google Fonts",
            link: "https://fonts.google.com/specimen/Inter",
          },
        ],
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
      "Practical examples of how brand guidelines translate into real product decisions.",
    items: [
      {
        type: "text",
        title: "Naming Convention",
        content:
          "Every feature, page, and label is a brand touchpoint. Names should be immediately understandable — a teacher encountering a feature for the first time should know exactly what it does.",
      },
      {
        type: "text",
        title: "Why This Matters",
        content:
          "Naming is one of the most powerful brand tools and one of the easiest to get wrong. In ed-tech, there\u2019s a tendency toward clever portmanteau names (SyncFlow, InsightHub, EduPulse) that sound impressive in a pitch deck but confuse real users. Kind Utility demands the opposite: plain language that teachers already know. A name that requires explanation has already failed. Clarity-first naming reduces cognitive load, builds trust, and makes the product feel like it was built by someone who respects teachers\u2019 time.",
      },
      { type: "divider" },
      {
        type: "text",
        title: "Examples",
        content:
          "Good: \u201CClass Planner\u201D \u2014 instantly clear.\nBad: \u201CSyncFlow\u201D \u2014 requires explanation.\n\nGood: \u201CStudent Notes\u201D \u2014 obvious purpose.\nBad: \u201CInsightHub\u201D \u2014 ambiguous and corporate.",
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
