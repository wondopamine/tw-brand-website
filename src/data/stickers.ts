export interface StickerData {
  id: string;
  emoji: string;
  label: string;
  defaultPosition: { x: number; y: number };
  rotation?: number;
}

// Stickers placed around the canvas — users can drag them anywhere
export const defaultStickers: StickerData[] = [
  {
    id: "sticker-heart",
    emoji: "\u2764\uFE0F",
    label: "Love",
    defaultPosition: { x: 600, y: 350 },
    rotation: -12,
  },
  {
    id: "sticker-star",
    emoji: "\u2B50",
    label: "Star",
    defaultPosition: { x: 2500, y: 400 },
    rotation: 8,
  },
  {
    id: "sticker-fire",
    emoji: "\uD83D\uDD25",
    label: "Fire",
    defaultPosition: { x: 2600, y: 850 },
    rotation: -5,
  },
  {
    id: "sticker-sparkles",
    emoji: "\u2728",
    label: "Sparkles",
    defaultPosition: { x: 700, y: 1200 },
    rotation: 15,
  },
  {
    id: "sticker-rocket",
    emoji: "\uD83D\uDE80",
    label: "Rocket",
    defaultPosition: { x: 2700, y: 1400 },
    rotation: -8,
  },
  {
    id: "sticker-100",
    emoji: "\uD83D\uDCAF",
    label: "100",
    defaultPosition: { x: 550, y: 800 },
    rotation: 6,
  },
  {
    id: "sticker-wave",
    emoji: "\uD83D\uDC4B",
    label: "Wave",
    defaultPosition: { x: 2400, y: 1700 },
    rotation: -10,
  },
  {
    id: "sticker-bulb",
    emoji: "\uD83D\uDCA1",
    label: "Idea",
    defaultPosition: { x: 800, y: 1650 },
    rotation: 12,
  },
];
