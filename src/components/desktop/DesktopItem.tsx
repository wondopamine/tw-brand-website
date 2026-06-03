"use client";

import type { DesktopItem as DesktopItemType } from "@/types/desktop";
import type { ActiveWindow } from "./Desktop";

interface DesktopItemProps {
  item: DesktopItemType;
  onOpen: (window: ActiveWindow) => void;
}

/**
 * Per-item renderer switch. For U2 scaffold, each case renders a simple
 * placeholder so positions can be visually verified. U3–U7 replace
 * each case with the real element renderer (DocIcon, FolderIcon, etc).
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
        <button
          style={position}
          onClick={() =>
            onOpen({ kind: "folder", panelId: item.panelId, title: item.label })
          }
          className="bg-card-bg border border-card-border rounded-lg px-3 py-2 text-xs shadow-sm hover:bg-accent-light cursor-pointer"
        >
          <div className="font-semibold text-text-primary">📁 {item.label}</div>
          <div className="text-text-secondary">folder</div>
        </button>
      );

    case "app":
      return (
        <a
          style={position}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card-bg border border-card-border rounded-lg px-3 py-2 text-xs shadow-sm hover:bg-accent-light cursor-pointer block"
        >
          <div className="font-semibold text-text-primary">🚀 {item.label}</div>
          <div className="text-text-secondary">app · new tab</div>
        </a>
      );

    case "doc":
      return (
        <button
          style={position}
          onClick={() =>
            onOpen({ kind: "doc", contentId: item.contentId, title: item.label })
          }
          className="bg-card-bg border border-card-border rounded-lg px-3 py-2 text-xs shadow-sm hover:bg-accent-light cursor-pointer"
        >
          <div className="font-semibold text-text-primary">📄 {item.label}</div>
          <div className="text-text-secondary">doc</div>
        </button>
      );

    case "sticky":
      return (
        <div
          style={{
            ...position,
            transform: `rotate(${item.rotation ?? 0}deg)`,
          }}
          className="bg-quote-highlight border border-card-border rounded-md px-3 py-2 text-xs shadow-sm max-w-[200px]"
        >
          <div className="font-semibold">📝 sticky</div>
          <div className="text-[10px] line-clamp-2">{item.quote}</div>
        </div>
      );

    case "illustration-widget":
      return (
        <div
          style={position}
          className="bg-accent-light border border-accent rounded-lg px-3 py-2 text-xs shadow-sm"
        >
          <div className="font-semibold text-accent">🎨 illustrations</div>
          <div className="text-text-secondary">
            {item.slides.length} slide(s)
          </div>
        </div>
      );
  }
}
