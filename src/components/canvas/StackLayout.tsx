"use client";

import CanvasItem from "./CanvasItem";
import type { CanvasItem as CanvasItemType } from "@/types/canvas";
import type { IllustrationSlide } from "@/types/canvas";

interface StackLayoutProps {
  items: CanvasItemType[];
  onFolderClick: (panelId: string) => void;
  onIllustrationClick: (slides: IllustrationSlide[], index: number) => void;
}

export default function StackLayout({
  items,
  onFolderClick,
  onIllustrationClick,
}: StackLayoutProps) {
  const sorted = [...items].sort(
    (a, b) => (a.mobileOrder ?? 999) - (b.mobileOrder ?? 999)
  );

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 max-w-lg mx-auto">
      {sorted.map((item) => (
        <div key={item.id} className="w-full">
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
