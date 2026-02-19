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
  onItemHover?: (id: string | null) => void;
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
        <div className="canvas-spinner" />
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

/* ------------------------------------------------------------------ */
/*  Entrance sequencing — items appear in groups with meaningful       */
/*  staggered delays so the canvas "builds up" rather than popping    */
/*  in all at once.                                                    */
/*                                                                     */
/*  Phase 1: Hero text (center)                       0.0s            */
/*  Phase 2: Brand cards (ring around hero)           0.4s – 1.2s     */
/*  Phase 3: Image card / illustration reel           1.3s – 1.5s     */
/*  Phase 4: Folders (bottom row, left to right)      1.6s – 2.1s     */
/* ------------------------------------------------------------------ */
function getEntranceDelay(item: CanvasItemType, index: number): number {
  switch (item.type) {
    case "hero-text":
      return 0;
    case "brand-card":
      return 0.35 + ((item.mobileOrder ?? index) - 1) * 0.14;
    case "illustration-reel":
    case "image-card":
      return 1.3 + ((item.mobileOrder ?? index) - 5) * 0.1;
    case "folder":
      return 1.6 + ((item.mobileOrder ?? 9) - 9) * 0.1;
    default:
      return 0.5 + index * 0.1;
  }
}

type CubicBezier = [number, number, number, number];

function getEntranceStyle(item: CanvasItemType) {
  switch (item.type) {
    case "hero-text":
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as CubicBezier,
      };
    case "brand-card":
      return {
        initial: { opacity: 0, y: 40, scale: 0.92 },
        animate: { opacity: 1, y: 0, scale: 1 },
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as CubicBezier,
      };
    case "folder":
      return {
        initial: { opacity: 0, y: 20, scale: 0.85 },
        animate: { opacity: 1, y: 0, scale: 1 },
        duration: 0.45,
        ease: [0.34, 1.56, 0.64, 1] as CubicBezier, // slight overshoot bounce
      };
    default:
      return {
        initial: { opacity: 0, y: 30, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as CubicBezier,
      };
  }
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
  onItemHover,
}: CanvasLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

      {items.map((item, index) => {
        const style = getEntranceStyle(item);
        const delay = getEntranceDelay(item, index);

        return (
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
              overflow: item.type === "hero-text" ? "visible" : undefined,
            }}
            initial={style.initial}
            animate={isLoading ? style.initial : style.animate}
            transition={{
              duration: style.duration,
              delay: isLoading ? 0 : delay,
              ease: style.ease,
            }}
            onMouseEnter={() => onItemHover?.(item.id)}
            onMouseLeave={() => onItemHover?.(null)}
          >
            <CanvasItem
              item={item}
              onFolderClick={onFolderClick}
              onIllustrationClick={onIllustrationClick}
              onCardClick={onCardClick}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
