import type { CanvasItem } from "@/types/canvas";

export const CANVAS_WIDTH = 1400;

export const canvasItems: CanvasItem[] = [
  // ===== HERO =====
  {
    id: "hero",
    type: "hero-text",
    position: { x: 200, y: 80 },
    size: { width: 1000, height: 280 },
    title: "Teacher Workspace",
    subtitle: "Brand Guidelines",
    zIndex: 10,
    mobileOrder: 0,
  },

  // ===== MANIFESTO =====
  {
    id: "manifesto",
    type: "manifesto-card",
    position: { x: 60, y: 440 },
    size: { width: 620, height: 420 },
    tagline: "Kind Utility",
    description:
      "Teacher Workspace sits at the intersection of high utility and high warmth. We call this Kind Utility \u2014 tools that are powerful yet feel personal, efficient yet humane.",
    quadrantLabels: {
      topLeft: "High Warmth\nLow Utility",
      topRight: "High Warmth\nHigh Utility",
      bottomLeft: "Low Warmth\nLow Utility",
      bottomRight: "Low Warmth\nHigh Utility",
    },
    mobileOrder: 1,
  },

  // ===== PILLARS =====
  {
    id: "pillar-clarity",
    type: "pillar-card",
    position: { x: 740, y: 440 },
    size: { width: 280, height: 180 },
    number: "01",
    title: "Clarity",
    description:
      "Every element should communicate its purpose immediately. No ambiguity, no guessing.",
    rotation: -1,
    mobileOrder: 2,
  },
  {
    id: "pillar-action",
    type: "pillar-card",
    position: { x: 1060, y: 460 },
    size: { width: 280, height: 180 },
    number: "02",
    title: "Action Oriented",
    description:
      "Design that drives action. Teachers are busy \u2014 every interaction should move them forward.",
    rotation: 1.5,
    mobileOrder: 3,
  },
  {
    id: "pillar-kindness",
    type: "pillar-card",
    position: { x: 740, y: 660 },
    size: { width: 280, height: 180 },
    number: "03",
    title: "Kindness & Humanity",
    description:
      "Technology that feels human. Warm, approachable, and respectful of the people who use it.",
    rotation: 0.5,
    mobileOrder: 4,
  },
  {
    id: "pillar-delight",
    type: "pillar-card",
    position: { x: 1060, y: 680 },
    size: { width: 280, height: 180 },
    number: "04",
    title: "Delight",
    description:
      "Moments of unexpected joy. Small touches that make the experience feel crafted with care.",
    rotation: -0.8,
    mobileOrder: 5,
  },

  // ===== WHY AESTHETICS MATTER =====
  {
    id: "aesthetics",
    type: "text-card",
    position: { x: 80, y: 940 },
    size: { width: 520, height: 260 },
    title: "Why Aesthetics Matter",
    body: "Good design builds trust. When teachers open a tool that looks thoughtful and polished, they feel confident it was built with the same care applied to its functionality. Visual quality signals reliability \u2014 the difference between a tool teachers tolerate and one they love.",
    mobileOrder: 6,
  },

  // ===== TEACHER QUOTES =====
  {
    id: "quote-1",
    type: "quote-card",
    position: { x: 660, y: 960 },
    size: { width: 340, height: 200 },
    quote:
      "I need something that just works. I don\u2019t have time to figure out complicated software.",
    highlight: "just works",
    attribution: "Middle school teacher",
    rotation: 1.2,
    mobileOrder: 7,
  },
  {
    id: "quote-2",
    type: "quote-card",
    position: { x: 1040, y: 920 },
    size: { width: 320, height: 200 },
    quote:
      "The best tools feel like they were made by someone who understands what my day actually looks like.",
    highlight: "understands what my day actually looks like",
    attribution: "High school teacher",
    rotation: -1.5,
    mobileOrder: 8,
  },
  {
    id: "quote-3",
    type: "quote-card",
    position: { x: 160, y: 1260 },
    size: { width: 360, height: 180 },
    quote:
      "I want to feel safe trying new features. If I make a mistake, I need to know I can undo it easily.",
    highlight: "feel safe",
    attribution: "Elementary school teacher",
    rotation: -0.8,
    mobileOrder: 9,
  },

  // ===== 4 UTILITIES =====
  {
    id: "utility-approachable",
    type: "utility-card",
    position: { x: 580, y: 1260 },
    size: { width: 240, height: 220 },
    title: "Approachable",
    description:
      "First impressions that welcome rather than overwhelm. Low barrier to entry.",
    icon: "\u{1F44B}",
    mobileOrder: 10,
  },
  {
    id: "utility-frictionless",
    type: "utility-card",
    position: { x: 860, y: 1240 },
    size: { width: 240, height: 220 },
    title: "Frictionless",
    description:
      "Smooth, intuitive flows that respect teachers\u2019 limited time and cognitive load.",
    icon: "\u26A1",
    mobileOrder: 11,
  },
  {
    id: "utility-safe",
    type: "utility-card",
    position: { x: 580, y: 1520 },
    size: { width: 240, height: 220 },
    title: "Safe",
    description:
      "Confidence to explore without fear. Forgiving interfaces with easy undo and clear consequences.",
    icon: "\u{1F6E1}\uFE0F",
    mobileOrder: 12,
  },
  {
    id: "utility-reliable",
    type: "utility-card",
    position: { x: 860, y: 1500 },
    size: { width: 240, height: 220 },
    title: "Reliable",
    description:
      "Consistent behavior that builds trust over time. Teachers can depend on it every day.",
    icon: "\u2705",
    mobileOrder: 13,
  },

  // ===== ILLUSTRATION REEL =====
  {
    id: "illustration-reel",
    type: "illustration-reel",
    position: { x: 1140, y: 1260 },
    size: { width: 220, height: 280 },
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
    mobileOrder: 14,
  },

  // ===== FOLDERS =====
  {
    id: "folder-imagery",
    type: "folder",
    position: { x: 120, y: 1560 },
    size: { width: 140, height: 160 },
    label: "IMAGERY",
    panelId: "imagery",
    mobileOrder: 15,
  },
  {
    id: "folder-downloads",
    type: "folder",
    position: { x: 320, y: 1540 },
    size: { width: 140, height: 160 },
    label: "DOWNLOADS",
    panelId: "downloads",
    mobileOrder: 16,
  },
];

export function getCanvasHeight(): number {
  let maxY = 0;
  for (const item of canvasItems) {
    const bottom = item.position.y + item.size.height;
    if (bottom > maxY) maxY = bottom;
  }
  return maxY + 120; // bottom padding
}
