import type { DesktopItem } from "@/types/desktop";

/**
 * Content lineup for the T&S Brand OS desktop.
 *
 * Positions are viewport-percentage coordinates. The default layout below
 * is a starting point — adjust freely as the visual hierarchy emerges.
 * Items WITHOUT explicit position render at (0, 0) and will overlap.
 */
export const desktopItems: DesktopItem[] = [
  // ===== Doc icons (manifesto featured top-left) =====
  {
    type: "doc",
    id: "doc-manifesto",
    label: "Manifesto",
    contentId: "manifesto",
    position: { x: 6, y: 10 },
    mobileOrder: 1,
  },
  {
    type: "doc",
    id: "doc-about",
    label: "About this Brand OS",
    contentId: "about-guidelines",
    position: { x: 18, y: 10 },
    mobileOrder: 2,
  },
  {
    type: "doc",
    id: "doc-brand-principles",
    label: "Brand Principles",
    contentId: "brand-principles",
    position: { x: 6, y: 30 },
    mobileOrder: 3,
  },
  {
    type: "doc",
    id: "doc-voice-tone",
    label: "Voice & Tone",
    contentId: "voice-tone",
    position: { x: 6, y: 50 },
    mobileOrder: 4,
  },
  {
    type: "doc",
    id: "doc-aesthetics",
    label: "Why Aesthetics matters",
    contentId: "aesthetics",
    position: { x: 18, y: 50 },
    mobileOrder: 5,
  },

  // ===== Folder icons =====
  // Colours is promoted to the dock (Colour Picker app) on desktop, but
  // still appears as a folder on the dock-less mobile layout.
  {
    type: "folder",
    id: "folder-colours",
    label: "Colours",
    panelId: "colours",
    position: { x: 32, y: 10 },
    mobileOrder: 8,
  },
  {
    type: "folder",
    id: "folder-illustrations",
    label: "Illustrations",
    panelId: "illustrations",
    position: { x: 32, y: 30 },
    mobileOrder: 9,
  },
  // Typography is an in-OS app: built-in dock tile on desktop, app icon
  // on the dock-less mobile layout (mirrors the Colours-in-dock pattern).
  {
    type: "app",
    id: "app-typography",
    label: "Typography",
    appId: "typography",
    position: { x: 32, y: 50 },
    mobileOrder: 10,
  },
  {
    type: "folder",
    id: "folder-use-cases",
    label: "Use Cases",
    panelId: "use-cases",
    position: { x: 32, y: 70 },
    mobileOrder: 11,
  },

  // ===== App icons =====
  {
    type: "app",
    id: "app-icon-generator",
    label: "Icon Generator",
    href: "https://github.com/wondopamine/icon-generator",
    position: { x: 18, y: 70 },
    mobileOrder: 12,
  },

  // ===== Sticky widgets (right side) =====
  {
    type: "sticky",
    id: "sticky-quote-1",
    quote:
      "I need something that just works. I don't have time to figure out complicated software.",
    highlight: "just works",
    attribution: "Middle school teacher",
    rotation: -2,
    position: { x: 52, y: 12 },
    mobileOrder: 13,
  },
  {
    type: "sticky",
    id: "sticky-quote-2",
    quote:
      "The best tools feel like they were made by someone who understands what my day actually looks like.",
    highlight: "understands what my day actually looks like",
    attribution: "High school teacher",
    rotation: 1.5,
    position: { x: 72, y: 12 },
    mobileOrder: 14,
  },
  {
    type: "sticky",
    id: "sticky-quote-3",
    quote:
      "You can feel the shape of what's coming — even if the tools are still clunky, the future is clearly starting to boot up.",
    highlight: "the future is clearly starting to boot up",
    attribution: "A teacher",
    rotation: -1,
    position: { x: 62, y: 38 },
    mobileOrder: 15,
  },

  // ===== Illustration widget =====
  {
    type: "illustration-widget",
    id: "illust-widget-1",
    slides: [
      {
        id: "search",
        caption: "Discovery",
        imageSrc: "/images/illustrations/illustration-search.png",
        alt: "Discovery — magnifying glass illustration",
      },
      {
        id: "together",
        caption: "Collaboration",
        imageSrc: "/images/illustrations/illustration-together.png",
        alt: "Collaboration — figures working together illustration",
      },
      {
        id: "focus",
        caption: "Focus",
        imageSrc: "/images/illustrations/illustration-focus.png",
        alt: "Focus illustration",
      },
      {
        id: "kids-playing",
        caption: "Play",
        imageSrc: "/images/illustrations/illustration-kids-playing.png",
        alt: "Play — four smiling kids running and playing together illustration",
      },
      {
        id: "teacher-desk",
        caption: "Deep work",
        imageSrc: "/images/illustrations/illustration-teacher-desk.png",
        alt: "Deep work — a teacher focusing at her desk illustration",
      },
      {
        id: "juggling",
        caption: "Juggling it all",
        imageSrc: "/images/illustrations/illustration-juggling.png",
        alt: "Juggling it all — a man surrounded by laptops, notes, and tabs illustration",
      },
      {
        id: "family",
        caption: "Community",
        imageSrc: "/images/illustrations/illustration-family.png",
        alt: "Community — a smiling family portrait illustration",
      },
      {
        id: "delivery",
        caption: "Delivered",
        imageSrc: "/images/illustrations/illustration-delivery.png",
        alt: "Delivered — a courier on a bicycle delivering learning bites illustration",
      },
      {
        id: "celebration",
        caption: "Celebration",
        imageSrc: "/images/illustrations/illustration-celebration.png",
        alt: "Celebration — a group of teachers cheering together illustration",
      },
    ],
    position: { x: 58, y: 62 },
    mobileOrder: 16,
  },
];
