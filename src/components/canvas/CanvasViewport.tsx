"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCanvasPan } from "@/hooks/useCanvasPan";
import { useCursorPosition } from "@/hooks/useCursorPosition";
import { canvasItems, CANVAS_WIDTH, CANVAS_HEIGHT } from "@/data/canvas-items";
import { panelContents } from "@/data/panel-contents";
import { modalContents } from "@/data/modal-contents";
import CanvasLayout from "./CanvasLayout";
import StackLayout from "./StackLayout";
import EdgeVignette from "./EdgeVignette";
import Minimap from "@/components/minimap/Minimap";
import PanelDrawer from "@/components/panel/PanelDrawer";
import CardModal from "@/components/cards/CardModal";
import IllustrationPopup from "@/components/items/IllustrationPopup";
import type { IllustrationSlide } from "@/types/canvas";
import type { PanelContent } from "@/types/panel";
import type { ModalContent } from "@/data/modal-contents";

const GRID_PADDING = 2000;

export default function CanvasViewport() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const canvasInnerRef = useRef<HTMLDivElement>(null);

  const [openPanel, setOpenPanel] = useState<PanelContent | null>(null);
  const [openModal, setOpenModal] = useState<ModalContent | null>(null);
  const [illustrationPopup, setIllustrationPopup] = useState<{
    slides: IllustrationSlide[];
    initialIndex: number;
  } | null>(null);

  const isOverlayOpen =
    openPanel !== null || illustrationPopup !== null || openModal !== null;

  // 2D canvas panning
  const { offsetX, offsetY, isDragging, containerRef, panTo } = useCanvasPan({
    canvasWidth: CANVAS_WIDTH,
    canvasHeight: CANVAS_HEIGHT,
    disabled: isOverlayOpen || !isDesktop,
    gridPadding: GRID_PADDING,
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

  const handleCardClick = useCallback((modalId: string) => {
    const content = modalContents[modalId];
    if (content) setOpenModal(content);
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
          onCardClick={handleCardClick}
        />
        <PanelDrawer
          content={openPanel}
          onClose={() => setOpenPanel(null)}
        />
        <CardModal
          content={openModal}
          onClose={() => setOpenModal(null)}
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
      {/* Canvas inner — oversized so grid never ends visually.
           Content is placed via absolute positioning within CANVAS_WIDTH × CANVAS_HEIGHT,
           offset by the GRID_PADDING so it sits in the center of this larger div. */}
      <div
        ref={canvasInnerRef}
        className="canvas-inner illuminated absolute"
        style={{
          width: CANVAS_WIDTH + GRID_PADDING * 2,
          height: CANVAS_HEIGHT + GRID_PADDING * 2,
          transform: `translate3d(${offsetX - GRID_PADDING}px, ${offsetY - GRID_PADDING}px, 0)`,
          willChange: "transform",
        }}
      >
        <CanvasLayout
          items={canvasItems}
          canvasWidth={CANVAS_WIDTH}
          canvasHeight={CANVAS_HEIGHT}
          isDragging={isDragging}
          gridPadding={GRID_PADDING}
          onFolderClick={handleFolderClick}
          onIllustrationClick={handleIllustrationClick}
          onCardClick={handleCardClick}
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

      {/* Panel drawer (folders) */}
      <PanelDrawer
        content={openPanel}
        onClose={() => setOpenPanel(null)}
      />

      {/* Card modal */}
      <CardModal
        content={openModal}
        onClose={() => setOpenModal(null)}
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
