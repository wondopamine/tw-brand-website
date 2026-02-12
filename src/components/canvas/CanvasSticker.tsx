"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";

interface CanvasStickerProps {
  id: string;
  emoji: string;
  label: string;
  x: number;
  y: number;
  rotation?: number;
  zoom: number;
  onPositionChange: (id: string, x: number, y: number) => void;
}

export default function CanvasSticker({
  id,
  emoji,
  label,
  x,
  y,
  rotation = 0,
  zoom,
  onPositionChange,
}: CanvasStickerProps) {
  const stickerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });
  const [lifted, setLifted] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      isDragging.current = true;
      setLifted(true);

      dragStartRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        startX: x,
        startY: y,
      };

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isDragging.current) return;

        const dx = (moveEvent.clientX - dragStartRef.current.mouseX) / zoom;
        const dy = (moveEvent.clientY - dragStartRef.current.mouseY) / zoom;

        onPositionChange(
          id,
          dragStartRef.current.startX + dx,
          dragStartRef.current.startY + dy
        );
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        setLifted(false);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [id, x, y, zoom, onPositionChange]
  );

  // Touch support
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.stopPropagation();
      if (e.touches.length !== 1) return;

      isDragging.current = true;
      setLifted(true);

      const touch = e.touches[0];
      dragStartRef.current = {
        mouseX: touch.clientX,
        mouseY: touch.clientY,
        startX: x,
        startY: y,
      };

      const handleTouchMove = (moveEvent: TouchEvent) => {
        if (!isDragging.current || moveEvent.touches.length !== 1) return;
        moveEvent.preventDefault();

        const t = moveEvent.touches[0];
        const dx = (t.clientX - dragStartRef.current.mouseX) / zoom;
        const dy = (t.clientY - dragStartRef.current.mouseY) / zoom;

        onPositionChange(
          id,
          dragStartRef.current.startX + dx,
          dragStartRef.current.startY + dy
        );
      };

      const handleTouchEnd = () => {
        isDragging.current = false;
        setLifted(false);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };

      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    },
    [id, x, y, zoom, onPositionChange]
  );

  return (
    <motion.div
      ref={stickerRef}
      data-sticker
      className="absolute select-none"
      style={{
        left: x,
        top: y,
        zIndex: lifted ? 100 : 20,
        cursor: lifted ? "grabbing" : "grab",
        rotate: rotation,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: lifted ? 1.2 : 1,
      }}
      transition={{
        opacity: { duration: 0.3, delay: 0.5 },
        scale: { type: "spring", stiffness: 400, damping: 20 },
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      aria-label={`Sticker: ${label}`}
    >
      <div
        className="flex items-center justify-center rounded-2xl transition-shadow"
        style={{
          width: 56,
          height: 56,
          fontSize: 32,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          boxShadow: lifted
            ? "0 12px 28px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)"
            : "0 2px 8px rgba(0, 0, 0, 0.06)",
          backdropFilter: "blur(8px)",
        }}
      >
        {emoji}
      </div>
    </motion.div>
  );
}
