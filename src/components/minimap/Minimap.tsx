"use client";

import type { CanvasItem } from "@/types/canvas";

const MINIMAP_WIDTH = 120;
const MINIMAP_HEIGHT = 180;

interface MinimapProps {
  items: CanvasItem[];
  canvasWidth: number;
  canvasHeight: number;
  scrollY: number;
  scrollHeight: number;
  clientHeight: number;
  onNavigate: (y: number) => void;
}

function getItemColor(type: string): string {
  switch (type) {
    case "hero-text":
      return "var(--accent)";
    case "manifesto-card":
      return "var(--accent)";
    case "pillar-card":
      return "var(--accent)";
    case "text-card":
      return "var(--text-secondary)";
    case "quote-card":
      return "var(--quote-highlight)";
    case "utility-card":
      return "var(--accent)";
    case "illustration-reel":
      return "var(--accent)";
    case "folder":
      return "var(--folder-icon-bg)";
    default:
      return "var(--text-secondary)";
  }
}

export default function Minimap({
  items,
  canvasWidth,
  canvasHeight,
  scrollY,
  scrollHeight,
  clientHeight,
  onNavigate,
}: MinimapProps) {
  const scaleX = MINIMAP_WIDTH / canvasWidth;
  const scaleY = MINIMAP_HEIGHT / canvasHeight;

  const viewportHeight = scrollHeight > 0
    ? (clientHeight / scrollHeight) * MINIMAP_HEIGHT
    : MINIMAP_HEIGHT;
  const viewportTop = scrollHeight > 0
    ? (scrollY / scrollHeight) * MINIMAP_HEIGHT
    : 0;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = clickY / MINIMAP_HEIGHT;
    const targetScroll = ratio * scrollHeight - clientHeight / 2;
    onNavigate(Math.max(0, targetScroll));
  };

  return (
    <div
      className="fixed bottom-4 left-4 z-30 rounded-xl overflow-hidden cursor-pointer transition-opacity hover:opacity-100 opacity-60"
      style={{
        width: MINIMAP_WIDTH,
        height: MINIMAP_HEIGHT,
        backgroundColor: "var(--minimap-bg)",
        border: "1px solid var(--minimap-border)",
        backdropFilter: "blur(8px)",
      }}
      onClick={handleClick}
      role="navigation"
      aria-label="Canvas minimap"
    >
      {/* Item dots */}
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute rounded-[2px]"
          style={{
            left: item.position.x * scaleX,
            top: item.position.y * scaleY,
            width: Math.max(item.size.width * scaleX, 3),
            height: Math.max(item.size.height * scaleY, 2),
            backgroundColor: getItemColor(item.type),
            opacity: 0.6,
          }}
        />
      ))}

      {/* Viewport indicator */}
      <div
        className="absolute left-0 right-0 rounded-sm transition-[top] duration-100"
        style={{
          top: viewportTop,
          height: Math.max(viewportHeight, 8),
          backgroundColor: "var(--minimap-viewport)",
          border: "1px solid var(--minimap-viewport-border)",
        }}
      />
    </div>
  );
}
