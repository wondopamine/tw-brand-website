"use client";

import type { CanvasItem } from "@/types/canvas";

const MINIMAP_WIDTH = 160;
const MINIMAP_HEIGHT = 107;

interface MinimapProps {
  items: CanvasItem[];
  canvasWidth: number;
  canvasHeight: number;
  offsetX: number;
  offsetY: number;
  viewportWidth: number;
  viewportHeight: number;
  zoom: number;
  onNavigate: (x: number, y: number) => void;
  hoveredItemId?: string | null;
}

function getItemColor(type: string): string {
  switch (type) {
    case "hero-text":
      return "var(--accent)";
    case "brand-card":
      return "var(--accent)";
    case "illustration-reel":
      return "var(--accent)";
    case "image-card":
      return "var(--accent)";
    case "folder":
      return "var(--text-secondary)";
    default:
      return "var(--text-secondary)";
  }
}

export default function Minimap({
  items,
  canvasWidth,
  canvasHeight,
  offsetX,
  offsetY,
  viewportWidth,
  viewportHeight,
  zoom,
  onNavigate,
  hoveredItemId,
}: MinimapProps) {
  const scaleX = MINIMAP_WIDTH / canvasWidth;
  const scaleY = MINIMAP_HEIGHT / canvasHeight;

  // Viewport indicator position
  const vpLeft = (-offsetX / zoom) * scaleX;
  const vpTop = (-offsetY / zoom) * scaleY;
  const vpWidth = (viewportWidth / zoom) * scaleX;
  const vpHeight = (viewportHeight / zoom) * scaleY;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const canvasX = clickX / scaleX;
    const canvasY = clickY / scaleY;

    onNavigate(
      -(canvasX * zoom - viewportWidth / 2),
      -(canvasY * zoom - viewportHeight / 2)
    );
  };

  return (
    <div
      className="fixed bottom-4 left-4 z-30 rounded-xl overflow-hidden cursor-pointer transition-opacity hover:opacity-100 opacity-60"
      style={{
        width: MINIMAP_WIDTH,
        height: MINIMAP_HEIGHT,
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        backdropFilter: "blur(10px)",
      }}
      onClick={handleClick}
      role="navigation"
      aria-label="Canvas minimap"
    >
      {/* Item dots — highlighted when hovered on canvas */}
      {items.map((item) => {
        const isHovered = item.id === hoveredItemId;
        return (
          <div
            key={item.id}
            className="absolute rounded-[2px]"
            style={{
              left: item.position.x * scaleX,
              top: item.position.y * scaleY,
              width: Math.max(item.size.width * scaleX, 3),
              height: Math.max(item.size.height * scaleY, 2),
              backgroundColor: isHovered ? "var(--accent)" : getItemColor(item.type),
              opacity: isHovered ? 1 : 0.4,
              boxShadow: isHovered
                ? "0 0 6px rgba(0, 100, 255, 0.5)"
                : "none",
              transition: "opacity 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease",
              zIndex: isHovered ? 10 : 1,
            }}
          />
        );
      })}

      {/* Viewport indicator */}
      <div
        className="absolute rounded-sm transition-all duration-100"
        style={{
          left: vpLeft,
          top: vpTop,
          width: Math.max(vpWidth, 8),
          height: Math.max(vpHeight, 6),
          backgroundColor: "rgba(0, 100, 255, 0.12)",
          border: "1px solid rgba(0, 100, 255, 0.4)",
        }}
      />
    </div>
  );
}
