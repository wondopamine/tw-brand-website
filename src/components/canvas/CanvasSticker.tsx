"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

// 6 organic blob clip-paths (generated from smooth bezier blobs)
const BLOB_PATHS = [
  // 0 — soft pebble
  "M44,8 C58,2 78,6 88,20 C98,34 96,56 88,72 C80,88 60,96 44,92 C28,88 10,78 4,62 C-2,46 6,24 16,14 C26,4 34,12 44,8Z",
  // 1 — squished circle
  "M50,4 C68,0 90,14 96,34 C102,54 92,76 76,88 C60,100 36,98 20,86 C4,74 -2,52 4,34 C10,16 32,8 50,4Z",
  // 2 — organic drop
  "M48,6 C64,0 84,10 92,28 C100,46 98,68 86,82 C74,96 54,100 38,94 C22,88 8,72 4,54 C0,36 8,18 22,10 C36,2 40,10 48,6Z",
  // 3 — cloud blob
  "M40,6 C56,-2 80,4 90,18 C100,32 102,54 92,70 C82,86 62,98 42,96 C22,94 6,82 2,64 C-2,46 4,26 14,16 C24,6 30,12 40,6Z",
  // 4 — potato
  "M46,4 C62,0 86,8 94,24 C102,40 100,62 90,78 C80,94 58,100 40,96 C22,92 6,78 2,58 C-2,38 6,18 18,8 C30,-2 36,8 46,4Z",
  // 5 — river stone
  "M52,6 C70,2 88,16 94,36 C100,56 94,78 78,90 C62,102 38,100 22,88 C6,76 -2,56 2,36 C6,16 22,4 38,2 C48,0 44,8 52,6Z",
];

interface CanvasStickerProps {
  id: string;
  emoji: string;
  label: string;
  x: number;
  y: number;
  rotation?: number;
  shape: number;
  size: number;
  bg: string;
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
  shape,
  size,
  bg,
  zoom,
  onPositionChange,
}: CanvasStickerProps) {
  const stickerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });
  const velocityRef = useRef({ vx: 0, vy: 0 });
  const lastMoveRef = useRef({ x: 0, y: 0, t: 0 });
  const [lifted, setLifted] = useState(false);

  // Motion values for 3D fold/flip effect
  const dragVx = useMotionValue(0);
  const dragVy = useMotionValue(0);

  // Spring-smoothed velocity for natural fold/flip motion
  const springVx = useSpring(dragVx, { stiffness: 200, damping: 20, mass: 0.5 });
  const springVy = useSpring(dragVy, { stiffness: 200, damping: 20, mass: 0.5 });

  // Map velocity to 3D rotations — fold/curl effect
  // Horizontal movement → rotateY (flipping left/right)
  // Vertical movement → rotateX (folding forward/back)
  const rotateY = useTransform(springVx, [-30, 0, 30], [-25, 0, 25]);
  const rotateX = useTransform(springVy, [-30, 0, 30], [20, 0, -20]);

  // Slight skew for paper-like deformation
  const skewX = useTransform(springVx, [-30, 0, 30], [-4, 0, 4]);
  const scaleY = useTransform(springVy, [-20, 0, 20], [0.92, 1, 0.92]);

  const clipPath = BLOB_PATHS[shape % BLOB_PATHS.length];
  const fontSize = Math.round(size * 0.5);

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
        const rawVx = (moveEvent.clientX - lastMoveRef.current.x) / dt * 16;
        const rawVy = (moveEvent.clientY - lastMoveRef.current.y) / dt * 16;

        // Smooth velocity with exponential moving average
        velocityRef.current.vx = velocityRef.current.vx * 0.6 + rawVx * 0.4;
        velocityRef.current.vy = velocityRef.current.vy * 0.6 + rawVy * 0.4;

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
        // Reset velocities — spring will animate back to 0
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
        const rawVx = (t.clientX - lastMoveRef.current.x) / dt * 16;
        const rawVy = (t.clientY - lastMoveRef.current.y) / dt * 16;

        velocityRef.current.vx = velocityRef.current.vx * 0.6 + rawVx * 0.4;
        velocityRef.current.vy = velocityRef.current.vy * 0.6 + rawVy * 0.4;

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
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: lifted ? 1.15 : 1,
        rotate: rotation,
      }}
      transition={{
        opacity: { duration: 0.4, delay: 0.6 },
        scale: { type: "spring", stiffness: 300, damping: 18 },
        rotate: { type: "spring", stiffness: 200, damping: 15 },
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      aria-label={`Sticker: ${label}`}
    >
      {/* Inner wrapper with 3D fold/flip transforms */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          skewX,
          scaleY,
          transformStyle: "preserve-3d",
          width: size,
          height: size,
        }}
      >
        {/* Organic blob shape via inline SVG clipPath */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          style={{ position: "absolute", width: 0, height: 0 }}
        >
          <defs>
            <clipPath id={`blob-${id}`} clipPathUnits="objectBoundingBox" transform="scale(0.01)">
              <path d={clipPath} />
            </clipPath>
          </defs>
        </svg>

        <div
          style={{
            width: size,
            height: size,
            clipPath: `url(#blob-${id})`,
            backgroundColor: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize,
            boxShadow: lifted
              ? "0 16px 32px rgba(0, 0, 0, 0.18), 0 6px 12px rgba(0, 0, 0, 0.1)"
              : "0 3px 10px rgba(0, 0, 0, 0.08)",
            transition: "box-shadow 0.25s ease",
            lineHeight: 1,
          }}
        >
          {emoji}
        </div>

        {/* Subtle shadow underneath the blob shape (offset down) */}
        {lifted && (
          <div
            style={{
              position: "absolute",
              top: 6,
              left: 4,
              width: size,
              height: size,
              clipPath: `url(#blob-${id})`,
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              filter: "blur(6px)",
              zIndex: -1,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
