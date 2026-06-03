"use client";

import type { DesktopItem as DesktopItemType } from "@/types/desktop";
import type { ActiveWindow } from "./Desktop";
import FolderIcon from "./icons/FolderIcon";
import DocIcon from "./icons/DocIcon";
import AppIcon from "./icons/AppIcon";
import StickyWidget from "./widgets/StickyWidget";
import IllustrationWidget from "./widgets/IllustrationWidget";

interface DesktopItemProps {
  item: DesktopItemType;
  onOpen: (window: ActiveWindow) => void;
}

/**
 * Per-item renderer. Positions the item absolutely on the desktop and
 * delegates to the right element component based on item.type.
 */
export default function DesktopItem({ item, onOpen }: DesktopItemProps) {
  const position: React.CSSProperties = {
    position: "absolute",
    left: `${item.position?.x ?? 0}%`,
    top: `${item.position?.y ?? 0}%`,
  };

  switch (item.type) {
    case "folder":
      return (
        <div style={position}>
          <FolderIcon
            label={item.label}
            onClick={() =>
              onOpen({ kind: "folder", panelId: item.panelId, title: item.label })
            }
          />
        </div>
      );

    case "doc":
      return (
        <div style={position}>
          <DocIcon
            label={item.label}
            onClick={() =>
              onOpen({ kind: "doc", contentId: item.contentId, title: item.label })
            }
          />
        </div>
      );

    case "app":
      return (
        <div style={position}>
          <AppIcon label={item.label} href={item.href} />
        </div>
      );

    case "sticky":
      return (
        <div style={position}>
          <StickyWidget
            quote={item.quote}
            highlight={item.highlight}
            attribution={item.attribution}
            rotation={item.rotation}
          />
        </div>
      );

    case "illustration-widget":
      return (
        <div style={position}>
          <IllustrationWidget slides={item.slides} />
        </div>
      );
  }
}
