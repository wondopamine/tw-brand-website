import type { CanvasItem } from "@/types/canvas";

export const CANVAS_WIDTH = 3200;
export const CANVAS_HEIGHT = 2000;

// Center of canvas
const CX = CANVAS_WIDTH / 2; // 1600
const CY = CANVAS_HEIGHT / 2; // 1000

export const canvasItems: CanvasItem[] = [
  // ===== HERO (dead center — large to fit typography playground) =====
  {
    id: "hero",
    type: "hero-text",
    position: { x: CX - 460, y: CY - 200 },
    size: { width: 920, height: 400 },
    title: "Teacher",
    subtitle: "Workspace\nBrand\nGuidelines",
    zIndex: 0,
    mobileOrder: 0,
  },

  // ===== CARDS — surrounding the hero in a well-spaced ring =====

  // Top row (3 cards above hero) — spread wider to avoid overlap
  // 1. Why Aesthetic Matters? — top-left
  {
    id: "card-aesthetics",
    type: "brand-card",
    position: { x: CX - 820, y: CY - 500 },
    size: { width: 360, height: 220 },
    title: "Why Aesthetic Matters?",
    subtitle: "Good design builds trust and signals reliability.",
    modalId: "aesthetics",
    rotation: -1.5,
    mobileOrder: 1,
  },

  // 2. About TW Brand Guidelines — top-center
  {
    id: "card-about",
    type: "brand-card",
    position: { x: CX - 180, y: CY - 520 },
    size: { width: 360, height: 220 },
    title: "About TW Brand Guidelines",
    subtitle: "What this document is — and what it isn't.",
    modalId: "about-guidelines",
    rotation: 1,
    mobileOrder: 2,
  },

  // 3. Manifesto — top-right
  {
    id: "card-manifesto",
    type: "brand-card",
    position: { x: CX + 440, y: CY - 500 },
    size: { width: 360, height: 240 },
    title: "Manifesto",
    subtitle: "Pillars of Kind Utility — our brand philosophy.",
    modalId: "manifesto",
    accentColor: "var(--accent)",
    rotation: 2,
    mobileOrder: 3,
  },

  // Side cards (flanking hero) — pushed further out
  // 4. Always From Teachers — left of hero
  {
    id: "card-teachers",
    type: "brand-card",
    position: { x: CX - 960, y: CY - 100 },
    size: { width: 340, height: 220 },
    title: "Always From Teachers",
    subtitle: "Designed with teachers, for teachers.",
    modalId: "always-from-teachers",
    rotation: -2,
    mobileOrder: 4,
  },

  // 5. Illustrations — right of hero (moved further right)
  {
    id: "illustration-reel",
    type: "illustration-reel",
    position: { x: CX + 580, y: CY - 120 },
    size: { width: 260, height: 280 },
    thumbnailSrc: "/images/illustration-thumb.svg",
    thumbnailAlt: "Illustrations",
    illustrations: [
      {
        src: "/images/illustration-1.svg",
        alt: "Teacher at desk illustration",
        caption: "Warm, human-centered illustrations",
      },
      {
        src: "/images/illustration-2.svg",
        alt: "Classroom scene illustration",
        caption: "Natural settings, real moments",
      },
      {
        src: "/images/illustration-3.svg",
        alt: "Collaboration illustration",
        caption: "Connection and collaboration",
      },
    ],
    rotation: 2,
    mobileOrder: 5,
  },

  // Teacher photos — clickable image gallery card
  {
    id: "image-teachers-classroom",
    type: "image-card",
    position: { x: CX - 190, y: CY + 250 },
    size: { width: 380, height: 220 },
    images: [
      {
        src: "/images/teachers-classroom.jpg",
        alt: "Teacher guiding students with tablets in classroom",
        description:
          "Real classrooms, real teachers — every design decision starts here.",
      },
      {
        src: "/images/teachers-classroom-2.png",
        alt: "Teacher leaning in to help two students with tablets",
        description:
          "Designed alongside educators who use technology daily.",
      },
      {
        src: "/images/teachers-classroom-3.png",
        alt: "Teacher engaging with students using tablets at desk",
        description:
          "Warm, human moments that inspire our brand aesthetic.",
      },
    ],
    rotation: -1,
    mobileOrder: 9,
  },

  // Bottom cards — spread widely to prevent overlap
  // 6. Voice & Tone — bottom-left
  {
    id: "card-voice-tone",
    type: "brand-card",
    position: { x: CX - 840, y: CY + 280 },
    size: { width: 360, height: 220 },
    title: "Voice & Tone",
    subtitle: "How we communicate — warm, clear, human.",
    modalId: "voice-tone",
    rotation: 1.5,
    mobileOrder: 6,
  },

  // 7. Brand Principles — bottom-right of photo
  {
    id: "card-brand-principles",
    type: "brand-card",
    position: { x: CX + 280, y: CY + 300 },
    size: { width: 380, height: 240 },
    title: "Brand Principles",
    subtitle: "Utility by Default, Kind at Surface, Calm Guidance, Light Weight.",
    modalId: "brand-principles",
    accentColor: "var(--accent)",
    rotation: -1.5,
    mobileOrder: 7,
  },

  // 8. Product Design Principles — far right, below illustration reel
  {
    id: "card-design-principles",
    type: "brand-card",
    position: { x: CX + 760, y: CY + 260 },
    size: { width: 360, height: 240 },
    title: "Product Design Principles",
    subtitle: "Seven principles that guide every product design decision.",
    modalId: "design-principles",
    accentColor: "var(--accent)",
    rotation: -2,
    mobileOrder: 8,
  },

  // ===== 5 FOLDERS — centered row below cards =====
  {
    id: "folder-colours",
    type: "folder",
    position: { x: CX - 460, y: CY + 640 },
    size: { width: 140, height: 160 },
    label: "COLOURS",
    panelId: "colours",
    mobileOrder: 10,
  },
  {
    id: "folder-imagery",
    type: "folder",
    position: { x: CX - 230, y: CY + 640 },
    size: { width: 140, height: 160 },
    label: "IMAGERY",
    panelId: "imagery",
    mobileOrder: 11,
  },
  {
    id: "folder-illustrations",
    type: "folder",
    position: { x: CX - 0, y: CY + 640 },
    size: { width: 140, height: 160 },
    label: "ILLUSTRATIONS",
    panelId: "illustrations",
    mobileOrder: 12,
  },
  {
    id: "folder-typography",
    type: "folder",
    position: { x: CX + 230, y: CY + 640 },
    size: { width: 140, height: 160 },
    label: "TYPOGRAPHY",
    panelId: "typography",
    mobileOrder: 13,
  },
  {
    id: "folder-use-cases",
    type: "folder",
    position: { x: CX + 460, y: CY + 640 },
    size: { width: 140, height: 160 },
    label: "USE CASES",
    panelId: "use-cases",
    mobileOrder: 14,
  },
];
