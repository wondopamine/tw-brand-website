export interface StickerData {
  id: string;
  label: string;
  defaultPosition: { x: number; y: number };
  rotation?: number;
  /** Sticker width/height */
  size: number;
  /** Image source for illustration stickers */
  imageSrc?: string;
}

// Illustration stickers placed around the canvas — users can drag them anywhere
// Each sticker renders an illustration image with physics-based flip interaction
export const defaultStickers: StickerData[] = [
  {
    id: "sticker-search",
    label: "Discovery",
    defaultPosition: { x: 580, y: 320 },
    rotation: -5,
    size: 160,
    imageSrc: "/images/illustrations/illustration-search.png",
  },
  {
    id: "sticker-together",
    label: "Collaboration",
    defaultPosition: { x: 2500, y: 380 },
    rotation: 4,
    size: 170,
    imageSrc: "/images/illustrations/illustration-together.png",
  },
  {
    id: "sticker-focus",
    label: "Focus",
    defaultPosition: { x: 2550, y: 1350 },
    rotation: -6,
    size: 155,
    imageSrc: "/images/illustrations/illustration-focus.png",
  },
];
