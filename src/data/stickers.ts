export interface StickerData {
  id: string;
  label: string;
  defaultPosition: { x: number; y: number };
  rotation?: number;
  /** Sticker width/height */
  size: number;
}

// Stickers placed around the canvas — users can drag them anywhere
// Each sticker renders an SVG graphic with a die-cut white border
export const defaultStickers: StickerData[] = [
  {
    id: "sticker-butterfly",
    label: "Butterfly",
    defaultPosition: { x: 600, y: 350 },
    rotation: -8,
    size: 72,
  },
  {
    id: "sticker-lightning",
    label: "Lightning",
    defaultPosition: { x: 2500, y: 400 },
    rotation: 6,
    size: 68,
  },
  {
    id: "sticker-cloud",
    label: "Cloud",
    defaultPosition: { x: 700, y: 1200 },
    rotation: 12,
    size: 74,
  },
  {
    id: "sticker-star",
    label: "Star",
    defaultPosition: { x: 2600, y: 850 },
    rotation: -5,
    size: 66,
  },
  {
    id: "sticker-heart",
    label: "Heart",
    defaultPosition: { x: 2700, y: 1400 },
    rotation: -10,
    size: 64,
  },
  {
    id: "sticker-smiley",
    label: "Smiley",
    defaultPosition: { x: 550, y: 800 },
    rotation: 8,
    size: 70,
  },
  {
    id: "sticker-flower",
    label: "Flower",
    defaultPosition: { x: 2400, y: 1700 },
    rotation: -12,
    size: 68,
  },
  {
    id: "sticker-thumbsup",
    label: "Thumbs Up",
    defaultPosition: { x: 800, y: 1650 },
    rotation: 15,
    size: 66,
  },
];
