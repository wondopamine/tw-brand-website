"use client";

import { useRef, useState, useCallback } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { canvasItems, getCanvasHeight, CANVAS_WIDTH } from "@/data/canvas-items";
import { panelContents } from "@/data/panel-contents";
import CanvasLayout from "./CanvasLayout";
import StackLayout from "./StackLayout";
import Minimap from "@/components/minimap/Minimap";
import PanelDrawer from "@/components/panel/PanelDrawer";
import IllustrationPopup from "@/components/items/IllustrationPopup";
import type { IllustrationSlide } from "@/types/canvas";
import type { PanelContent } from "@/types/panel";

export default function CanvasViewport() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { scrollY, scrollHeight, clientHeight, scrollTo } =
    useScrollPosition(viewportRef);

  const [openPanel, setOpenPanel] = useState<PanelContent | null>(null);
  const [illustrationPopup, setIllustrationPopup] = useState<{
    slides: IllustrationSlide[];
    initialIndex: number;
  } | null>(null);

  const handleFolderClick = useCallback((panelId: string) => {
    const content = panelContents[panelId];
    if (content) setOpenPanel(content);
  }, []);

  const handleIllustrationClick = useCallback(
    (slides: IllustrationSlide[], index: number) => {
      setIllustrationPopup({ slides, initialIndex: index });
    },
    []
  );

  const canvasHeight = getCanvasHeight();

  return (
    <div
      ref={viewportRef}
      className="canvas-grid fixed inset-0 overflow-y-auto overflow-x-hidden"
    >
      {isDesktop ? (
        <CanvasLayout
          items={canvasItems}
          canvasWidth={CANVAS_WIDTH}
          canvasHeight={canvasHeight}
          onFolderClick={handleFolderClick}
          onIllustrationClick={handleIllustrationClick}
        />
      ) : (
        <StackLayout
          items={canvasItems}
          onFolderClick={handleFolderClick}
          onIllustrationClick={handleIllustrationClick}
        />
      )}

      {/* Minimap - desktop only */}
      {isDesktop && (
        <Minimap
          items={canvasItems}
          canvasWidth={CANVAS_WIDTH}
          canvasHeight={canvasHeight}
          scrollY={scrollY}
          scrollHeight={scrollHeight}
          clientHeight={clientHeight}
          onNavigate={scrollTo}
        />
      )}

      {/* Panel drawer */}
      <PanelDrawer
        content={openPanel}
        onClose={() => setOpenPanel(null)}
      />

      {/* Illustration popup */}
      {illustrationPopup && (
        <IllustrationPopup
          slides={illustrationPopup.slides}
          initialIndex={illustrationPopup.initialIndex}
          onClose={() => setIllustrationPopup(null)}
        />
      )}
    </div>
  );
}
