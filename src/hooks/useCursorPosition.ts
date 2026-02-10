"use client";

import { useEffect, type RefObject } from "react";

export function useCursorPosition(
  canvasRef: RefObject<HTMLElement | null>,
  offsetX: number,
  offsetY: number
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      // +2000 accounts for grid padding offset on canvas-inner
      const canvasX = e.clientX - offsetX + 2000;
      const canvasY = e.clientY - offsetY + 2000;
      canvas.style.setProperty("--cursor-x", `${canvasX}px`);
      canvas.style.setProperty("--cursor-y", `${canvasY}px`);
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
  }, [canvasRef, offsetX, offsetY]);
}
