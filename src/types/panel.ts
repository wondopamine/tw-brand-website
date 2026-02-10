export interface PanelContent {
  id: string;
  title: string;
  description?: string;
  items: PanelContentItem[];
}

export type PanelContentItem =
  | PanelTextItem
  | PanelImageItem
  | PanelGuidelineItem
  | PanelDividerItem
  | PanelColorSwatchItem
  | PanelAssetListItem;

export interface PanelTextItem {
  type: "text";
  title?: string;
  content: string;
}

export interface PanelImageItem {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface PanelGuidelineItem {
  type: "guideline";
  title: string;
  doText: string;
  dontText: string;
}

export interface PanelDividerItem {
  type: "divider";
}

export interface PanelColorSwatchItem {
  type: "color-swatch";
  title?: string;
  colors: ColorEntry[];
}

export interface ColorEntry {
  name: string;
  hex: string;
  isPrimary?: boolean;
}

export interface PanelAssetListItem {
  type: "asset-list";
  title?: string;
  assets: AssetEntry[];
}

export interface AssetEntry {
  name: string;
  thumbnailSrc?: string;
  thumbnailColor?: string;
  link?: string;
  description?: string;
}
