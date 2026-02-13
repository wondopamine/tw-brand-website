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
  /** Extra padding added to canvas-inner for infinite grid effect */
  gridPadding?: number;
}

interface CanvasPanResult {
  offsetX: number;
  offsetY: number;
  zoom: number;
  isDragging: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  panTo: (x: number, y: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

interface MouseRecord {
  x: number;
  y: number;
  t: number;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 1.5;
const ZOOM_STEP = 0.1;

export function useCanvasPan({
  canvasWidth,
  canvasHeight,
  initialOffsetX,
  initialOffsetY,
  momentumDecay = 0.95,
  disabled = false,
  gridPadding = 0,
}: CanvasPanConfig): CanvasPanResult {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Use refs for high-frequency updates, sync to state for re-renders
  const offsetXRef = useRef(initialOffsetX ?? 0);
  const offsetYRef = useRef(initialOffsetY ?? 0);
  const zoomRef = useRef(1);
  const [offset, setOffset] = useState({ x: offsetXRef.current, y: offsetYRef.current });
  const [zoom, setZoom] = useState(1);

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
      const z = zoomRef.current;

      const minX = -(canvasWidth * z - padding);
      const maxX = vw - padding;
      const minY = -(canvasHeight * z - padding);
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

      // Apply transform directly for immediate visual feedback.
      const container = containerRef.current;
      if (container) {
        const canvas = container.firstElementChild as HTMLElement | null;
        if (canvas) {
          const z = zoomRef.current;
          canvas.style.transform = `translate3d(${clamped.x - gridPadding * z}px, ${clamped.y - gridPadding * z}px, 0) scale(${z})`;
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
    [clamp, gridPadding]
  );

  // Apply zoom with transform
  const applyZoom = useCallback(
    (newZoom: number, centerX?: number, centerY?: number) => {
      const oldZoom = zoomRef.current;
      const clampedZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newZoom));
      zoomRef.current = clampedZoom;
      setZoom(clampedZoom);

      // If a center point is provided, adjust offset to zoom toward that point
      if (centerX !== undefined && centerY !== undefined) {
        const zoomRatio = clampedZoom / oldZoom;
        const newOffsetX = centerX - (centerX - offsetXRef.current) * zoomRatio;
        const newOffsetY = centerY - (centerY - offsetYRef.current) * zoomRatio;
        applyOffset(newOffsetX, newOffsetY);
      } else {
        applyOffset(offsetXRef.current, offsetYRef.current);
      }
    },
    [applyOffset]
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

  // Zoom controls
  const zoomIn = useCallback(() => {
    const container = containerRef.current;
    const cx = container ? container.clientWidth / 2 : 0;
    const cy = container ? container.clientHeight / 2 : 0;
    applyZoom(zoomRef.current + ZOOM_STEP, cx, cy);
  }, [applyZoom]);

  const zoomOut = useCallback(() => {
    const container = containerRef.current;
    const cx = container ? container.clientWidth / 2 : 0;
    const cy = container ? container.clientHeight / 2 : 0;
    applyZoom(zoomRef.current - ZOOM_STEP, cx, cy);
  }, [applyZoom]);

  const resetZoom = useCallback(() => {
    const container = containerRef.current;
    const cx = container ? container.clientWidth / 2 : 0;
    const cy = container ? container.clientHeight / 2 : 0;
    applyZoom(1, cx, cy);
  }, [applyZoom]);

  // Mouse handlers
  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    const handleMouseDown = (e: MouseEvent) => {
      // Don't start drag on buttons/links (folder icons, illustration reel)
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a") || target.closest("input") || target.closest("select") || target.closest("[data-sticker]")) {
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
      container.classList.add("is-dragging");
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
      container.style.cursor = "";
      container.classList.remove("is-dragging");

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

    // Wheel / trackpad — with zoom on ctrl/meta
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      stopMomentum();

      if (e.ctrlKey || e.metaKey) {
        // Zoom toward cursor position
        const delta = -e.deltaY * 0.005;
        applyZoom(zoomRef.current + delta, e.clientX, e.clientY);
      } else {
        // Pan
        applyOffset(
          offsetXRef.current - e.deltaX,
          offsetYRef.current - e.deltaY
        );
      }
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
    let lastPinchDist = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a") || target.closest("input") || target.closest("select") || target.closest("[data-sticker]")) return;

      stopMomentum();

      if (e.touches.length === 2) {
        // Pinch zoom start
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastPinchDist = Math.sqrt(dx * dx + dy * dy);
        return;
      }

      if (e.touches.length !== 1) return;

      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartOffsetX = offsetXRef.current;
      touchStartOffsetY = offsetYRef.current;
      isDraggingRef.current = true;
      mouseHistoryRef.current = [{ x: touch.clientX, y: touch.clientY, t: Date.now() }];
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinch zoom
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (lastPinchDist > 0) {
          const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
          const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
          const scale = dist / lastPinchDist;
          applyZoom(zoomRef.current * scale, centerX, centerY);
        }
        lastPinchDist = dist;
        return;
      }

      if (!isDraggingRef.current || e.touches.length !== 1) return;
      e.preventDefault();

      const touch = e.touches[0];
      const tdx = touch.clientX - touchStartX;
      const tdy = touch.clientY - touchStartY;

      applyOffset(touchStartOffsetX + tdx, touchStartOffsetY + tdy);

      const now = Date.now();
      mouseHistoryRef.current.push({ x: touch.clientX, y: touch.clientY, t: now });
      if (mouseHistoryRef.current.length > 5) {
        mouseHistoryRef.current.shift();
      }
    };

    const handleTouchEnd = () => {
      lastPinchDist = 0;
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

    // Default cursor — cards/folders handle their own pointer cursor
    container.style.cursor = "default";

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
  }, [disabled, applyOffset, applyZoom, startMomentum, stopMomentum]);

  // Set initial offset on mount — center the canvas content in the viewport
  useEffect(() => {
    if (typeof window === "undefined") return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const x = initialOffsetX ?? (vw - canvasWidth) / 2;
    const y = initialOffsetY ?? (vh - canvasHeight) / 2;
    applyOffset(x, y);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    offsetX: offset.x,
    offsetY: offset.y,
    zoom,
    isDragging,
    containerRef,
    panTo,
    zoomIn,
    zoomOut,
    resetZoom,
  };
}
