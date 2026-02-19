"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";

interface CanvasStickerProps {
  id: string;
  label: string;
  x: number;
  y: number;
  rotation?: number;
  size: number;
  zoom: number;
  entranceDelay?: number;
  imageSrc?: string;
  onPositionChange: (id: string, x: number, y: number) => void;
}

/**
 * Physics-driven illustration sticker with realistic fold/flip when dragged.
 *
 * The sticker uses a physics model that simulates air resistance:
 * - Drag velocity is tracked per-frame via an exponential moving average.
 * - Velocity maps through springs to 3D transforms (rotateX/Y, skew)
 *   giving the sticker a natural "caught by air" bend in the direction
 *   opposite to motion — like holding paper out a car window.
 * - On release the spring animates back to flat (all transforms -> 0).
 * - A subtle compression on the cross-axis simulates the paper buckling
 *   under air pressure.
 */
export default function CanvasSticker({
  id,
  label,
  x,
  y,
  rotation = 0,
  size,
  zoom,
  entranceDelay = 0.6,
  imageSrc,
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

  // Softer spring for illustration images — more natural paper-in-wind feel
  const springCfg = { stiffness: 220, damping: 16, mass: 0.4 };
  const springVx = useSpring(dragVx, springCfg);
  const springVy = useSpring(dragVy, springCfg);

  // Primary rotations — moving right bends left edge up (like air pushing from right)
  //                      moving down curls top edge forward
  const rotateY = useTransform(springVx, [-40, 0, 40], [-28, 0, 28]);
  const rotateX = useTransform(springVy, [-40, 0, 40], [24, 0, -24]);

  // Paper warp — shear deformation simulates flexible material catching wind
  const skewX = useTransform(springVx, [-40, 0, 40], [-5, 0, 5]);
  const skewY = useTransform(springVy, [-40, 0, 40], [3, 0, -3]);

  // Air resistance compression — fast motion compresses along cross-axis
  // Like holding a sheet of paper in the wind, it buckles inward
  const absVx: MotionValue<number> = useTransform(springVx, (v: number) => Math.abs(v));
  const absVy: MotionValue<number> = useTransform(springVy, (v: number) => Math.abs(v));
  const scaleY = useTransform(absVx, [0, 40], [1, 0.93]);
  const scaleX = useTransform(absVy, [0, 40], [1, 0.93]);

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

  if (!imageSrc) return null;

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
        pointerEvents: "auto",
      }}
      initial={{ opacity: 0, scale: 0, rotate: rotation }}
      animate={{
        opacity: 1,
        scale: lifted ? 1.08 : 1,
        rotate: rotation,
      }}
      transition={{
        opacity: { duration: 0.4, delay: entranceDelay },
        scale: { type: "spring", stiffness: 400, damping: 20 },
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      aria-label={`Illustration: ${label}`}
    >
      {/* 3D fold/flip wrapper — physics-driven transforms simulate air resistance */}
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
            ? "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.2)) drop-shadow(0 8px 12px rgba(0, 0, 0, 0.1))"
            : "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.08)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.04))",
          transition: "filter 0.25s ease",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={label}
          width={size}
          height={size}
          draggable={false}
          style={{
            width: size,
            height: size,
            objectFit: "contain",
            userSelect: "none",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
