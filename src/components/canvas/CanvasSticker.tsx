"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { STICKER_COMPONENTS } from "./StickerGraphics";

interface CanvasStickerProps {
  id: string;
  label: string;
  x: number;
  y: number;
  rotation?: number;
  size: number;
  zoom: number;
  onPositionChange: (id: string, x: number, y: number) => void;
}

export default function CanvasSticker({
  id,
  label,
  x,
  y,
  rotation = 0,
  size,
  zoom,
  onPositionChange,
}: CanvasStickerProps) {
  const stickerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });
  const velocityRef = useRef({ vx: 0, vy: 0 });
  const lastMoveRef = useRef({ x: 0, y: 0, t: 0 });
  const [lifted, setLifted] = useState(false);

  // Motion values for 3D fold/flip effect — like peeling a real sticker
  const dragVx = useMotionValue(0);
  const dragVy = useMotionValue(0);

  // Spring-smoothed velocity for natural peel/flip motion
  const springVx = useSpring(dragVx, { stiffness: 180, damping: 16, mass: 0.4 });
  const springVy = useSpring(dragVy, { stiffness: 180, damping: 16, mass: 0.4 });

  // Map velocity to 3D rotations — sticker peel/flip effect
  // Moving right → sticker flips showing its left edge lifting (rotateY)
  // Moving down → sticker curls forward showing top edge lifting (rotateX)
  const rotateY = useTransform(springVx, [-30, 0, 30], [-28, 0, 28]);
  const rotateX = useTransform(springVy, [-30, 0, 30], [22, 0, -22]);

  // Subtle warp — paper doesn't stay flat when peeled
  const skewX = useTransform(springVx, [-30, 0, 30], [-3, 0, 3]);
  const skewY = useTransform(springVy, [-30, 0, 30], [2, 0, -2]);

  const StickerSVG = STICKER_COMPONENTS[id];

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
      lastMoveRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
      velocityRef.current = { vx: 0, vy: 0 };
      dragVx.set(0);
      dragVy.set(0);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isDragging.current) return;

        const now = Date.now();
        const dt = Math.max(now - lastMoveRef.current.t, 1);
        const rawVx = ((moveEvent.clientX - lastMoveRef.current.x) / dt) * 16;
        const rawVy = ((moveEvent.clientY - lastMoveRef.current.y) / dt) * 16;

        // Smooth velocity with exponential moving average
        velocityRef.current.vx = velocityRef.current.vx * 0.55 + rawVx * 0.45;
        velocityRef.current.vy = velocityRef.current.vy * 0.55 + rawVy * 0.45;

        // Clamp for fold effect
        dragVx.set(Math.max(-30, Math.min(30, velocityRef.current.vx)));
        dragVy.set(Math.max(-30, Math.min(30, velocityRef.current.vy)));

        lastMoveRef.current = { x: moveEvent.clientX, y: moveEvent.clientY, t: now };

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
        // Reset velocities — spring animates back to flat
        dragVx.set(0);
        dragVy.set(0);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [id, x, y, zoom, onPositionChange, dragVx, dragVy]
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
      lastMoveRef.current = { x: touch.clientX, y: touch.clientY, t: Date.now() };
      velocityRef.current = { vx: 0, vy: 0 };
      dragVx.set(0);
      dragVy.set(0);

      const handleTouchMove = (moveEvent: TouchEvent) => {
        if (!isDragging.current || moveEvent.touches.length !== 1) return;
        moveEvent.preventDefault();

        const t = moveEvent.touches[0];
        const now = Date.now();
        const dt = Math.max(now - lastMoveRef.current.t, 1);
        const rawVx = ((t.clientX - lastMoveRef.current.x) / dt) * 16;
        const rawVy = ((t.clientY - lastMoveRef.current.y) / dt) * 16;

        velocityRef.current.vx = velocityRef.current.vx * 0.55 + rawVx * 0.45;
        velocityRef.current.vy = velocityRef.current.vy * 0.55 + rawVy * 0.45;

        dragVx.set(Math.max(-30, Math.min(30, velocityRef.current.vx)));
        dragVy.set(Math.max(-30, Math.min(30, velocityRef.current.vy)));

        lastMoveRef.current = { x: t.clientX, y: t.clientY, t: now };

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
        dragVx.set(0);
        dragVy.set(0);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };

      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    },
    [id, x, y, zoom, onPositionChange, dragVx, dragVy]
  );

  if (!StickerSVG) return null;

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
        perspective: 800,
      }}
      initial={{ opacity: 0, scale: 0, rotate: rotation }}
      animate={{
        opacity: 1,
        scale: lifted ? 1.12 : 1,
        rotate: rotation,
      }}
      transition={{
        opacity: { duration: 0.4, delay: 0.6 },
        scale: { type: "spring", stiffness: 350, damping: 22 },
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      aria-label={`Sticker: ${label}`}
    >
      {/* 3D fold/flip wrapper — simulates peeling a real sticker */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          skewX,
          skewY,
          transformStyle: "preserve-3d",
          width: size,
          height: size,
          filter: lifted
            ? "drop-shadow(0 12px 20px rgba(0, 0, 0, 0.2)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
            : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.06))",
          transition: "filter 0.25s ease",
        }}
      >
        <StickerSVG size={size} />
      </motion.div>
    </motion.div>
  );
}
