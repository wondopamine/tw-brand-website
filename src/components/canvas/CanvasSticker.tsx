"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";
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

/**
 * Physics-driven sticker with realistic fold/flip when dragged.
 *
 * The sticker uses a simple physics model:
 * - Drag velocity is tracked per-frame via an exponential moving average.
 * - Velocity is mapped through springs to 3D transforms (rotateX/Y, skew)
 *   with high stiffness + moderate damping, giving the sticker the snappy
 *   "peel off the surface, flip in the direction of motion" effect seen in
 *   real die-cut vinyl stickers.
 * - On release the spring animates back to flat (all transforms → 0).
 * - A subtle "corner lift" scale-Y compression is added so the sticker
 *   looks like it buckles slightly when moved fast.
 */
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

  /* ---- motion values that drive the 3D fold ---- */
  const dragVx = useMotionValue(0);
  const dragVy = useMotionValue(0);

  // High stiffness + low mass = snappy response that overshoots slightly
  const springCfg = { stiffness: 280, damping: 14, mass: 0.35 };
  const springVx = useSpring(dragVx, springCfg);
  const springVy = useSpring(dragVy, springCfg);

  // Primary rotations — moving right flips the left edge up (rotateY)
  //                      moving down curls the top edge forward (rotateX)
  const rotateY = useTransform(springVx, [-40, 0, 40], [-35, 0, 35]);
  const rotateX = useTransform(springVy, [-40, 0, 40], [30, 0, -30]);

  // Paper warp — shear + compression for natural fold
  const skewX = useTransform(springVx, [-40, 0, 40], [-6, 0, 6]);
  const skewY = useTransform(springVy, [-40, 0, 40], [4, 0, -4]);

  // Buckle: fast motion compresses the sticker along the cross-axis
  const absVx: MotionValue<number> = useTransform(springVx, (v: number) => Math.abs(v));
  const absVy: MotionValue<number> = useTransform(springVy, (v: number) => Math.abs(v));
  const scaleY = useTransform(absVx, [0, 40], [1, 0.92]);
  const scaleX = useTransform(absVy, [0, 40], [1, 0.92]);

  const StickerSVG = STICKER_COMPONENTS[id];

  /* ---- drag handlers ---- */
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

        // Exponential moving average for smooth velocity
        velocityRef.current.vx = velocityRef.current.vx * 0.5 + rawVx * 0.5;
        velocityRef.current.vy = velocityRef.current.vy * 0.5 + rawVy * 0.5;

        // Clamp and feed to spring
        dragVx.set(Math.max(-40, Math.min(40, velocityRef.current.vx)));
        dragVy.set(Math.max(-40, Math.min(40, velocityRef.current.vy)));

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

  /* ---- touch support ---- */
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

        velocityRef.current.vx = velocityRef.current.vx * 0.5 + rawVx * 0.5;
        velocityRef.current.vy = velocityRef.current.vy * 0.5 + rawVy * 0.5;

        dragVx.set(Math.max(-40, Math.min(40, velocityRef.current.vx)));
        dragVy.set(Math.max(-40, Math.min(40, velocityRef.current.vy)));

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
        perspective: 600,
      }}
      initial={{ opacity: 0, scale: 0, rotate: rotation }}
      animate={{
        opacity: 1,
        scale: lifted ? 1.15 : 1,
        rotate: rotation,
      }}
      transition={{
        opacity: { duration: 0.4, delay: 0.6 },
        scale: { type: "spring", stiffness: 400, damping: 20 },
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      aria-label={`Sticker: ${label}`}
    >
      {/* 3D fold/flip wrapper — physics-driven transforms */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          skewX,
          skewY,
          scaleX,
          scaleY,
          transformStyle: "preserve-3d",
          width: size,
          height: size,
          filter: lifted
            ? "drop-shadow(0 16px 24px rgba(0, 0, 0, 0.25)) drop-shadow(0 6px 8px rgba(0, 0, 0, 0.12))"
            : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.06))",
          transition: "filter 0.2s ease",
        }}
      >
        <StickerSVG size={size} />
      </motion.div>
    </motion.div>
  );
}
