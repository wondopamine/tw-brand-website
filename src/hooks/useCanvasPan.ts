"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { animate } from "motion";

interface CanvasPanConfig {
  canvasWidth: number;
  canvasHeight: number;
  initialOffsetX?: number;
  initialOffsetY?: number;
  momentumDecay?: number;
  disabled?: boolean;
}

interface CanvasPanResult {
  offsetX: number;
  offsetY: number;
  isDragging: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  panTo: (x: number, y: number) => void;
}

interface MouseRecord {
  x: number;
  y: number;
  t: number;
}

export function useCanvasPan({
  canvasWidth,
  canvasHeight,
  initialOffsetX,
  initialOffsetY,
  momentumDecay = 0.95,
  disabled = false,
}: CanvasPanConfig): CanvasPanResult {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Use refs for high-frequency updates, sync to state for re-renders
  const offsetXRef = useRef(initialOffsetX ?? 0);
  const offsetYRef = useRef(initialOffsetY ?? 0);
  const [offset, setOffset] = useState({ x: offsetXRef.current, y: offsetYRef.current });

  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const totalMovementRef = useRef(0);
  const mouseHistoryRef = useRef<MouseRecord[]>([]);
  const momentumRafRef = useRef<number | null>(null);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const syncRafRef = useRef<number | null>(null);

  // Clamp offsets to keep canvas partially visible
  const clamp = useCallback(
    (ox: number, oy: number): { x: number; y: number } => {
      const container = containerRef.current;
      if (!container) return { x: ox, y: oy };

      const vw = container.clientWidth;
      const vh = container.clientHeight;
      const padding = 200;

      const minX = -(canvasWidth - padding);
      const maxX = vw - padding;
      const minY = -(canvasHeight - padding);
      const maxY = vh - padding;

      return {
        x: Math.min(maxX, Math.max(minX, ox)),
        y: Math.min(maxY, Math.max(minY, oy)),
      };
    },
    [canvasWidth, canvasHeight]
  );

  // Apply offset (ref + schedule state sync)
  const applyOffset = useCallback(
    (x: number, y: number) => {
      const clamped = clamp(x, y);
      offsetXRef.current = clamped.x;
      offsetYRef.current = clamped.y;

      // Apply transform directly for immediate visual feedback
      const container = containerRef.current;
      if (container) {
        const canvas = container.firstElementChild as HTMLElement | null;
        if (canvas) {
          canvas.style.transform = `translate3d(${clamped.x}px, ${clamped.y}px, 0)`;
        }
      }

      // Batch state updates
      if (!syncRafRef.current) {
        syncRafRef.current = requestAnimationFrame(() => {
          setOffset({ x: offsetXRef.current, y: offsetYRef.current });
          syncRafRef.current = null;
        });
      }
    },
    [clamp]
  );

  // Stop any running momentum
  const stopMomentum = useCallback(() => {
    if (momentumRafRef.current) {
      cancelAnimationFrame(momentumRafRef.current);
      momentumRafRef.current = null;
    }
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
  }, []);

  // Start momentum after drag release
  const startMomentum = useCallback(
    (vx: number, vy: number) => {
      let velocityX = vx;
      let velocityY = vy;

      const tick = () => {
        velocityX *= momentumDecay;
        velocityY *= momentumDecay;

        if (Math.abs(velocityX) < 0.5 && Math.abs(velocityY) < 0.5) {
          momentumRafRef.current = null;
          return;
        }

        applyOffset(
          offsetXRef.current + velocityX,
          offsetYRef.current + velocityY
        );

        momentumRafRef.current = requestAnimationFrame(tick);
      };

      momentumRafRef.current = requestAnimationFrame(tick);
    },
    [momentumDecay, applyOffset]
  );

  // panTo — smooth animated pan (for minimap)
  const panTo = useCallback(
    (x: number, y: number) => {
      stopMomentum();
      const clamped = clamp(x, y);

      const startX = offsetXRef.current;
      const startY = offsetYRef.current;

      animationRef.current = animate(0, 1, {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: (progress) => {
          const currentX = startX + (clamped.x - startX) * progress;
          const currentY = startY + (clamped.y - startY) * progress;
          applyOffset(currentX, currentY);
        },
        onComplete: () => {
          animationRef.current = null;
        },
      });
    },
    [clamp, applyOffset, stopMomentum]
  );

  // Mouse handlers
  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    const handleMouseDown = (e: MouseEvent) => {
      // Don't start drag on buttons/links (folder icons, illustration reel)
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a")) {
        return;
      }

      stopMomentum();
      isDraggingRef.current = true;
      setIsDragging(true);
      totalMovementRef.current = 0;
      mouseHistoryRef.current = [{ x: e.clientX, y: e.clientY, t: Date.now() }];

      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        offsetX: offsetXRef.current,
        offsetY: offsetYRef.current,
      };

      container.style.cursor = "grabbing";
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      totalMovementRef.current = Math.abs(dx) + Math.abs(dy);

      applyOffset(
        dragStartRef.current.offsetX + dx,
        dragStartRef.current.offsetY + dy
      );

      // Track velocity
      const now = Date.now();
      mouseHistoryRef.current.push({ x: e.clientX, y: e.clientY, t: now });
      // Keep last 5 entries
      if (mouseHistoryRef.current.length > 5) {
        mouseHistoryRef.current.shift();
      }
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;

      isDraggingRef.current = false;
      setIsDragging(false);
      container.style.cursor = "grab";

      // Calculate velocity for momentum
      const history = mouseHistoryRef.current;
      if (history.length >= 2) {
        const recent = history[history.length - 1];
        const older = history[0];
        const dt = recent.t - older.t;

        if (dt > 0 && dt < 200) {
          const vx = ((recent.x - older.x) / dt) * 16; // Scale to ~60fps frame
          const vy = ((recent.y - older.y) / dt) * 16;

          if (Math.abs(vx) > 1 || Math.abs(vy) > 1) {
            startMomentum(vx, vy);
          }
        }
      }
    };

    // Wheel / trackpad
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      stopMomentum();

      applyOffset(
        offsetXRef.current - e.deltaX,
        offsetYRef.current - e.deltaY
      );
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("wheel", handleWheel, { passive: false });

    // Touch handlers
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartOffsetX = 0;
    let touchStartOffsetY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a")) return;

      stopMomentum();
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartOffsetX = offsetXRef.current;
      touchStartOffsetY = offsetYRef.current;
      isDraggingRef.current = true;
      mouseHistoryRef.current = [{ x: touch.clientX, y: touch.clientY, t: Date.now() }];
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      e.preventDefault();

      const touch = e.touches[0];
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;

      applyOffset(touchStartOffsetX + dx, touchStartOffsetY + dy);

      const now = Date.now();
      mouseHistoryRef.current.push({ x: touch.clientX, y: touch.clientY, t: now });
      if (mouseHistoryRef.current.length > 5) {
        mouseHistoryRef.current.shift();
      }
    };

    const handleTouchEnd = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;

      const history = mouseHistoryRef.current;
      if (history.length >= 2) {
        const recent = history[history.length - 1];
        const older = history[0];
        const dt = recent.t - older.t;

        if (dt > 0 && dt < 200) {
          const vx = ((recent.x - older.x) / dt) * 16;
          const vy = ((recent.y - older.y) / dt) * 16;
          if (Math.abs(vx) > 1 || Math.abs(vy) > 1) {
            startMomentum(vx, vy);
          }
        }
      }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);

    // Set initial cursor
    container.style.cursor = "grab";

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);

      if (syncRafRef.current) cancelAnimationFrame(syncRafRef.current);
      stopMomentum();
    };
  }, [disabled, applyOffset, startMomentum, stopMomentum]);

  // Set initial offset on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const vw = window.innerWidth;
    const x = initialOffsetX ?? (vw - canvasWidth) / 2;
    const y = initialOffsetY ?? 100;
    applyOffset(x, y);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    offsetX: offset.x,
    offsetY: offset.y,
    isDragging,
    containerRef,
    panTo,
  };
}
