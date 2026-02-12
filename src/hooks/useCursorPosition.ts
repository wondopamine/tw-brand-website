"use client";

import { useEffect, type RefObject } from "react";

export function useCursorPosition(
  canvasRef: RefObject<HTMLElement | null>,
  offsetX: number,
  offsetY: number,
  zoom: number = 1
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Convert screen-space cursor to canvas-inner local coordinates.
      // The canvas-inner has transform: translate3d(tx, ty, 0) scale(z)
      // with transformOrigin: 0 0.
      //
      // The translate applied is: offsetX - GRID_PADDING * zoom (see CanvasViewport).
      // After translate, scale is applied from origin (0,0).
      //
      // To find the local coordinate within canvas-inner:
      //   localX = (screenX - translateX) / zoom
      //   localY = (screenY - translateY) / zoom
      //
      // translateX = offsetX - GRID_PADDING * zoom, but the CSS var --cursor-x/y
      // is used by the mask which operates in canvas-inner's own coordinate space,
      // so we need the position relative to canvas-inner's top-left (pre-scale).
      //
      // The canvas-inner's screen position top-left = (offsetX - GRID_PADDING * zoom, offsetY - GRID_PADDING * zoom)
      // A point in canvas-inner local coords = (screenX - canvasScreenLeft) / zoom
      //
      // But canvasScreenLeft = offsetX - GRID_PADDING * zoom
      // So localX = (screenX - offsetX + GRID_PADDING * zoom) / zoom
      //           = (screenX - offsetX) / zoom + GRID_PADDING
      const canvasX = (e.clientX - offsetX) / zoom + 2000;
      const canvasY = (e.clientY - offsetY) / zoom + 2000;
      canvas.style.setProperty("--cursor-x", `${canvasX}px`);
      canvas.style.setProperty("--cursor-y", `${canvasY}px`);

      // Scale the mask and glow radii inversely with zoom so they appear
      // the same on-screen size regardless of zoom level.
      // At zoom 1 → 400px / 250px. At zoom 0.5 → 800px. At zoom 1.5 → 267px.
      canvas.style.setProperty("--cursor-radius", `${Math.round(400 / zoom)}px`);
      canvas.style.setProperty("--cursor-glow-radius", `${Math.round(250 / zoom)}px`);
    };

    const handleMouseLeave = () => {
      canvas.style.setProperty("--cursor-x", "-1000px");
      canvas.style.setProperty("--cursor-y", "-1000px");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [canvasRef, offsetX, offsetY, zoom]);
}
