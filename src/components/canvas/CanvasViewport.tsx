"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCanvasPan } from "@/hooks/useCanvasPan";
import { useCursorPosition } from "@/hooks/useCursorPosition";
import { canvasItems, CANVAS_WIDTH, CANVAS_HEIGHT } from "@/data/canvas-items";
import { panelContents } from "@/data/panel-contents";
import { modalContents } from "@/data/modal-contents";
import { defaultStickers } from "@/data/stickers";
import CanvasLayout from "./CanvasLayout";
import StackLayout from "./StackLayout";
import EdgeVignette from "./EdgeVignette";
import CanvasSticker from "./CanvasSticker";
import Minimap from "@/components/minimap/Minimap";
import FolderModal from "@/components/panel/FolderModal";
import CardModal from "@/components/cards/CardModal";
import IllustrationPopup from "@/components/items/IllustrationPopup";
import ZoomControls from "@/components/canvas/ZoomControls";
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

  // Sticker positions — initialised from default data
  const [stickerPositions, setStickerPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    defaultStickers.forEach((s) => {
      positions[s.id] = { ...s.defaultPosition };
    });
    return positions;
  });

  const handleStickerMove = useCallback((id: string, x: number, y: number) => {
    setStickerPositions((prev) => ({
      ...prev,
      [id]: { x, y },
    }));
  }, []);

  const isOverlayOpen =
    openPanel !== null || illustrationPopup !== null || openModal !== null;

  // 2D canvas panning with zoom
  const { offsetX, offsetY, zoom, isDragging, containerRef, panTo, zoomIn, zoomOut, resetZoom } = useCanvasPan({
    canvasWidth: CANVAS_WIDTH,
    canvasHeight: CANVAS_HEIGHT,
    disabled: isOverlayOpen || !isDesktop,
    gridPadding: GRID_PADDING,
  });

  // Cursor tracking for grid highlight (pass zoom so mask tracks correctly at all zoom levels)
  useCursorPosition(canvasInnerRef, offsetX, offsetY, zoom);

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
        <FolderModal
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
           Content is placed via absolute positioning within CANVAS_WIDTH x CANVAS_HEIGHT,
           offset by the GRID_PADDING so it sits in the center of this larger div.
           Transform includes scale for zoom — handled by useCanvasPan directly. */}
      <div
        ref={canvasInnerRef}
        className="canvas-inner illuminated absolute"
        style={{
          width: CANVAS_WIDTH + GRID_PADDING * 2,
          height: CANVAS_HEIGHT + GRID_PADDING * 2,
          transformOrigin: "0 0",
          transform: `translate3d(${offsetX - GRID_PADDING * zoom}px, ${offsetY - GRID_PADDING * zoom}px, 0) scale(${zoom})`,
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

        {/* Draggable stickers — rendered inside canvas-inner so they move with the canvas */}
        <div
          className="absolute"
          style={{
            left: GRID_PADDING,
            top: GRID_PADDING,
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            pointerEvents: isDragging ? "none" : "auto",
          }}
        >
          {defaultStickers.map((sticker) => {
            const pos = stickerPositions[sticker.id] ?? sticker.defaultPosition;
            return (
              <CanvasSticker
                key={sticker.id}
                id={sticker.id}
                emoji={sticker.emoji}
                label={sticker.label}
                x={pos.x}
                y={pos.y}
                rotation={sticker.rotation}
                shape={sticker.shape}
                size={sticker.size}
                bg={sticker.bg}
                zoom={zoom}
                onPositionChange={handleStickerMove}
              />
            );
          })}
        </div>
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
        zoom={zoom}
        onNavigate={panTo}
      />

      {/* Zoom controls */}
      <ZoomControls
        zoom={zoom}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetZoom={resetZoom}
      />

      {/* Folder modal (replaces side panel) */}
      <FolderModal
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
