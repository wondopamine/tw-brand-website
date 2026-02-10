"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCanvasPan } from "@/hooks/useCanvasPan";
import { useCursorPosition } from "@/hooks/useCursorPosition";
import { canvasItems, CANVAS_WIDTH, CANVAS_HEIGHT } from "@/data/canvas-items";
import { panelContents } from "@/data/panel-contents";
import CanvasLayout from "./CanvasLayout";
import StackLayout from "./StackLayout";
import EdgeVignette from "./EdgeVignette";
import Minimap from "@/components/minimap/Minimap";
import PanelDrawer from "@/components/panel/PanelDrawer";
import IllustrationPopup from "@/components/items/IllustrationPopup";
import type { IllustrationSlide } from "@/types/canvas";
import type { PanelContent } from "@/types/panel";

export default function CanvasViewport() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const canvasInnerRef = useRef<HTMLDivElement>(null);

  const [openPanel, setOpenPanel] = useState<PanelContent | null>(null);
  const [illustrationPopup, setIllustrationPopup] = useState<{
    slides: IllustrationSlide[];
    initialIndex: number;
  } | null>(null);

  const isOverlayOpen = openPanel !== null || illustrationPopup !== null;

  // 2D canvas panning
  const { offsetX, offsetY, isDragging, containerRef, panTo } = useCanvasPan({
    canvasWidth: CANVAS_WIDTH,
    canvasHeight: CANVAS_HEIGHT,
    disabled: isOverlayOpen || !isDesktop,
  });

  // Cursor tracking for grid highlight
  useCursorPosition(canvasInnerRef, offsetX, offsetY);

  // Viewport dimensions for minimap
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const update = () =>
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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

  // Mobile: vertical stack with normal scroll
  if (!isDesktop) {
    return (
      <div className="canvas-grid min-h-screen overflow-y-auto">
        <StackLayout
          items={canvasItems}
          onFolderClick={handleFolderClick}
          onIllustrationClick={handleIllustrationClick}
        />
        <PanelDrawer
          content={openPanel}
          onClose={() => setOpenPanel(null)}
        />
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

  // Desktop: 2D draggable canvas
  return (
    <div
      ref={containerRef}
      className="canvas-grid fixed inset-0 overflow-hidden"
      style={{ touchAction: "none" }}
    >
      {/* Canvas inner — transformed by pan offsets */}
      <div
        ref={canvasInnerRef}
        className="canvas-inner illuminated absolute"
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
          willChange: "transform",
        }}
      >
        <CanvasLayout
          items={canvasItems}
          canvasWidth={CANVAS_WIDTH}
          canvasHeight={CANVAS_HEIGHT}
          isDragging={isDragging}
          onFolderClick={handleFolderClick}
          onIllustrationClick={handleIllustrationClick}
        />
      </div>

      {/* Edge vignette overlay */}
      <EdgeVignette />

      {/* Minimap */}
      <Minimap
        items={canvasItems}
        canvasWidth={CANVAS_WIDTH}
        canvasHeight={CANVAS_HEIGHT}
        offsetX={offsetX}
        offsetY={offsetY}
        viewportWidth={viewportSize.width}
        viewportHeight={viewportSize.height}
        onNavigate={panTo}
      />

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
