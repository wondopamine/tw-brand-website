"use client";

import CanvasItem from "./CanvasItem";
import type { CanvasItem as CanvasItemType } from "@/types/canvas";
import type { IllustrationSlide } from "@/types/canvas";

interface CanvasLayoutProps {
  items: CanvasItemType[];
  canvasWidth: number;
  canvasHeight: number;
  onFolderClick: (panelId: string) => void;
  onIllustrationClick: (slides: IllustrationSlide[], index: number) => void;
}

export default function CanvasLayout({
  items,
  canvasWidth,
  canvasHeight,
  onFolderClick,
  onIllustrationClick,
}: CanvasLayoutProps) {
  return (
    <div
      className="relative mx-auto"
      style={{
        width: canvasWidth,
        height: canvasHeight,
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute"
          style={{
            left: item.position.x,
            top: item.position.y,
            width: item.size.width,
            height: item.size.height,
            zIndex: item.zIndex ?? 1,
            transform: item.rotation
              ? `rotate(${item.rotation}deg)`
              : undefined,
          }}
        >
          <CanvasItem
            item={item}
            onFolderClick={onFolderClick}
            onIllustrationClick={onIllustrationClick}
          />
        </div>
      ))}
    </div>
  );
}
