export type CanvasItemType =
  | "hero-text"
  | "manifesto-card"
  | "pillar-card"
  | "text-card"
  | "quote-card"
  | "utility-card"
  | "illustration-reel"
  | "brand-card"
  | "image-card"
  | "folder";

export interface CanvasPosition {
  x: number;
  y: number;
}

export interface CanvasSize {
  width: number;
  height: number;
}

export interface CanvasItemBase {
  id: string;
  type: CanvasItemType;
  position: CanvasPosition;
  size: CanvasSize;
  rotation?: number;
  zIndex?: number;
  mobileOrder?: number;
}

export interface HeroTextItem extends CanvasItemBase {
  type: "hero-text";
  title: string;
  subtitle?: string;
}

export interface ManifestoCardItem extends CanvasItemBase {
  type: "manifesto-card";
  tagline: string;
  description: string;
  quadrantLabels: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
}

export interface PillarCardItem extends CanvasItemBase {
  type: "pillar-card";
  number: string;
  title: string;
  description: string;
}

export interface TextCardItem extends CanvasItemBase {
  type: "text-card";
  title: string;
  body: string;
  modalId?: string;
}

export interface QuoteCardItem extends CanvasItemBase {
  type: "quote-card";
  quote: string;
  highlight?: string;
  attribution?: string;
}

export interface UtilityCardItem extends CanvasItemBase {
  type: "utility-card";
  title: string;
  description: string;
  icon: string;
}

export interface IllustrationReelItem extends CanvasItemBase {
  type: "illustration-reel";
  thumbnailSrc: string;
  thumbnailAlt: string;
  illustrations: IllustrationSlide[];
}

export interface IllustrationSlide {
  src: string;
  alt: string;
  caption?: string;
}

// Brand card — generic clickable card that opens a modal
export interface BrandCardItem extends CanvasItemBase {
  type: "brand-card";
  title: string;
  subtitle?: string;
  modalId: string;
  accentColor?: string;
}

// Image card — photo gallery that shuffles on click, shows description on hover
export interface ImageCardImage {
  src: string;
  alt: string;
  description: string;
}

export interface ImageCardItem extends CanvasItemBase {
  type: "image-card";
  images: ImageCardImage[];
  caption?: string;
}

export interface FolderItem extends CanvasItemBase {
  type: "folder";
  label: string;
  panelId: string;
}

export type CanvasItem =
  | HeroTextItem
  | ManifestoCardItem
  | PillarCardItem
  | TextCardItem
  | QuoteCardItem
  | UtilityCardItem
  | IllustrationReelItem
  | BrandCardItem
  | ImageCardItem
  | FolderItem;
