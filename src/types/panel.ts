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
  | PanelDividerItem;

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
