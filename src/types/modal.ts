export interface ModalSection {
  type:
    | "heading"
    | "paragraph"
    | "list"
    | "quote"
    | "divider"
    | "highlight-box"
    | "two-column"
    | "quadrant";
  title?: string;
  content?: string;
  items?: string[];
  columns?: { title: string; items: string[] }[];
  quadrantLabels?: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
    xAxis: string;
    yAxis: string;
  };
  variant?: "accent" | "warning" | "success" | "neutral";
}

export interface ModalContent {
  id: string;
  title: string;
  subtitle?: string;
  sections: ModalSection[];
}
