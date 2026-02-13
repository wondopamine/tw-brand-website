"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import CanvasItem from "./CanvasItem";
import type { CanvasItem as CanvasItemType } from "@/types/canvas";
import type { IllustrationSlide } from "@/types/canvas";

interface CanvasLayoutProps {
  items: CanvasItemType[];
  canvasWidth: number;
  canvasHeight: number;
  isDragging: boolean;
  gridPadding?: number;
  onFolderClick: (panelId: string) => void;
  onIllustrationClick: (slides: IllustrationSlide[], index: number) => void;
  onCardClick: (modalId: string) => void;
}

/** Spinner shown while canvas items are "loading" */
function CanvasSpinner() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center gap-5">
        {/* Spinner ring */}
        <div className="canvas-spinner" />
        {/* Label */}
        <motion.p
          className="text-sm font-medium tracking-widest uppercase select-none"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Loading workspace
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function CanvasLayout({
  items,
  canvasWidth,
  canvasHeight,
  isDragging,
  gridPadding = 0,
  onFolderClick,
  onIllustrationClick,
  onCardClick,
}: CanvasLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show spinner for 1.2s, then reveal items
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="absolute"
      style={{
        left: gridPadding,
        top: gridPadding,
        width: canvasWidth,
        height: canvasHeight,
        pointerEvents: isDragging ? "none" : "auto",
      }}
    >
      <AnimatePresence mode="wait">
        {isLoading && <CanvasSpinner key="spinner" />}
      </AnimatePresence>

      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: item.position.x,
            top: item.position.y,
            width: item.size.width,
            height: item.size.height,
            zIndex: item.zIndex ?? 1,
            rotate: item.rotation ?? 0,
            // Hero text overflows its box so large font sizes
            // bleed under surrounding cards instead of being clipped
            overflow: item.type === "hero-text" ? "visible" : undefined,
          }}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={
            isLoading
              ? { opacity: 0, y: 30, scale: 0.95 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{
            duration: 0.5,
            delay: isLoading ? 0 : 0.1 + index * 0.06,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <CanvasItem
            item={item}
            onFolderClick={onFolderClick}
            onIllustrationClick={onIllustrationClick}
            onCardClick={onCardClick}
          />
        </motion.div>
      ))}
    </div>
  );
}
