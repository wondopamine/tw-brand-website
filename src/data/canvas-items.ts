import type { CanvasItem } from "@/types/canvas";

export const CANVAS_WIDTH = 3200;
export const CANVAS_HEIGHT = 2000;

// Center of canvas
const CX = CANVAS_WIDTH / 2; // 1600
const CY = CANVAS_HEIGHT / 2; // 1000

export const canvasItems: CanvasItem[] = [
  // ===== HERO (dead center) =====
  {
    id: "hero",
    type: "hero-text",
    position: { x: CX - 500, y: CY - 140 },
    size: { width: 1000, height: 280 },
    title: "Teacher Workspace",
    subtitle: "Brand Guidelines",
    zIndex: 10,
    mobileOrder: 0,
  },

  // ===== CARDS — surrounding the hero in a ring =====

  // Top row (3 cards above hero)
  // 1. Why Aesthetic Matters? — top-left
  {
    id: "card-aesthetics",
    type: "brand-card",
    position: { x: CX - 800, y: CY - 470 },
    size: { width: 380, height: 240 },
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
    position: { x: CX - 190, y: CY - 490 },
    size: { width: 380, height: 240 },
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
    position: { x: CX + 420, y: CY - 470 },
    size: { width: 380, height: 260 },
    title: "Manifesto",
    subtitle: "Pillars of Kind Utility — our brand philosophy.",
    modalId: "manifesto",
    accentColor: "var(--accent)",
    rotation: 2,
    mobileOrder: 3,
  },

  // Side cards (flanking hero)
  // 4. Always From Teachers — left of hero
  {
    id: "card-teachers",
    type: "brand-card",
    position: { x: CX - 920, y: CY - 120 },
    size: { width: 360, height: 240 },
    title: "Always From Teachers",
    subtitle: "Designed with teachers, for teachers.",
    modalId: "always-from-teachers",
    rotation: -2,
    mobileOrder: 4,
  },

  // 5. Illustrations — right of hero
  {
    id: "illustration-reel",
    type: "illustration-reel",
    position: { x: CX + 560, y: CY - 140 },
    size: { width: 280, height: 300 },
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

  // Teacher photos — clickable image gallery card, shuffles on click
  {
    id: "image-teachers-classroom",
    type: "image-card",
    position: { x: CX - 190, y: CY + 220 },
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
    mobileOrder: 8,
  },

  // Bottom cards (flanking the photo)
  // 6. Voice & Tone — bottom-left
  {
    id: "card-voice-tone",
    type: "brand-card",
    position: { x: CX - 760, y: CY + 240 },
    size: { width: 380, height: 240 },
    title: "Voice & Tone",
    subtitle: "How we communicate — warm, clear, human.",
    modalId: "voice-tone",
    rotation: 1.5,
    mobileOrder: 6,
  },

  // 7. Brand Principles — bottom-right
  {
    id: "card-brand-principles",
    type: "brand-card",
    position: { x: CX + 380, y: CY + 280 },
    size: { width: 400, height: 260 },
    title: "Brand Principles",
    subtitle: "Utility by Default, Kind at Surface, Calm Guidance, Light Weight.",
    modalId: "brand-principles",
    accentColor: "var(--accent)",
    rotation: -1.5,
    mobileOrder: 7,
  },

  // ===== 5 FOLDERS — centered row below cards =====
  {
    id: "folder-colours",
    type: "folder",
    position: { x: CX - 460, y: CY + 620 },
    size: { width: 140, height: 160 },
    label: "COLOURS",
    panelId: "colours",
    mobileOrder: 9,
  },
  {
    id: "folder-imagery",
    type: "folder",
    position: { x: CX - 230, y: CY + 620 },
    size: { width: 140, height: 160 },
    label: "IMAGERY",
    panelId: "imagery",
    mobileOrder: 10,
  },
  {
    id: "folder-illustrations",
    type: "folder",
    position: { x: CX - 0, y: CY + 620 },
    size: { width: 140, height: 160 },
    label: "ILLUSTRATIONS",
    panelId: "illustrations",
    mobileOrder: 11,
  },
  {
    id: "folder-typography",
    type: "folder",
    position: { x: CX + 230, y: CY + 620 },
    size: { width: 140, height: 160 },
    label: "TYPOGRAPHY",
    panelId: "typography",
    mobileOrder: 12,
  },
  {
    id: "folder-use-cases",
    type: "folder",
    position: { x: CX + 460, y: CY + 620 },
    size: { width: 140, height: 160 },
    label: "USE CASES",
    panelId: "use-cases",
    mobileOrder: 13,
  },
];
