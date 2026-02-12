export interface StickerData {
  id: string;
  emoji: string;
  label: string;
  defaultPosition: { x: number; y: number };
  rotation?: number;
  /** Organic blob shape variant (0-5) — each maps to a different SVG clip path */
  shape: number;
  /** Base size in px */
  size: number;
  /** Background color */
  bg: string;
}

// Stickers placed around the canvas — users can drag them anywhere
export const defaultStickers: StickerData[] = [
  {
    id: "sticker-heart",
    emoji: "\u2764\uFE0F",
    label: "Love",
    defaultPosition: { x: 600, y: 350 },
    rotation: -12,
    shape: 0,
    size: 64,
    bg: "#FFE4E9",
  },
  {
    id: "sticker-star",
    emoji: "\u2B50",
    label: "Star",
    defaultPosition: { x: 2500, y: 400 },
    rotation: 8,
    shape: 1,
    size: 58,
    bg: "#FFF3D4",
  },
  {
    id: "sticker-fire",
    emoji: "\uD83D\uDD25",
    label: "Fire",
    defaultPosition: { x: 2600, y: 850 },
    rotation: -5,
    shape: 2,
    size: 60,
    bg: "#FFE8D6",
  },
  {
    id: "sticker-sparkles",
    emoji: "\u2728",
    label: "Sparkles",
    defaultPosition: { x: 700, y: 1200 },
    rotation: 15,
    shape: 3,
    size: 62,
    bg: "#E8E4FF",
  },
  {
    id: "sticker-rocket",
    emoji: "\uD83D\uDE80",
    label: "Rocket",
    defaultPosition: { x: 2700, y: 1400 },
    rotation: -8,
    shape: 4,
    size: 66,
    bg: "#D4EDFF",
  },
  {
    id: "sticker-100",
    emoji: "\uD83D\uDCAF",
    label: "100",
    defaultPosition: { x: 550, y: 800 },
    rotation: 6,
    shape: 5,
    size: 56,
    bg: "#DFFCE8",
  },
  {
    id: "sticker-wave",
    emoji: "\uD83D\uDC4B",
    label: "Wave",
    defaultPosition: { x: 2400, y: 1700 },
    rotation: -10,
    shape: 0,
    size: 60,
    bg: "#FFF0D4",
  },
  {
    id: "sticker-bulb",
    emoji: "\uD83D\uDCA1",
    label: "Idea",
    defaultPosition: { x: 800, y: 1650 },
    rotation: 12,
    shape: 2,
    size: 64,
    bg: "#FFFACD",
  },
];
