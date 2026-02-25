"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Cursor SVG — small stamp-handle indicator that follows the mouse   */
/*  Simple circle outline with a tiny crosshair dot at center          */
/* ------------------------------------------------------------------ */
const CURSOR_SIZE = 40;

function CursorSVG() {
  return (
    <svg
      width={CURSOR_SIZE}
      height={CURSOR_SIZE}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring — the stamp handle */}
      <circle cx="20" cy="20" r="16" stroke="rgba(0, 80, 200, 0.45)" strokeWidth="1" fill="none" />
      {/* Center dot — marks exact click point */}
      <circle cx="20" cy="20" r="2" fill="rgba(0, 80, 200, 0.5)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Imprint SVG — the actual stamp mark left on click                  */
/*  Circular badge: double ring + "TW" text + diagonal slash           */
/*  Visually distinct from the cursor indicator above                  */
/* ------------------------------------------------------------------ */
const IMPRINT_SIZE = 80;

function ImprintSVG() {
  const c = "rgba(0, 80, 200, 0.28)";
  return (
    <svg
      width={IMPRINT_SIZE}
      height={IMPRINT_SIZE}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle cx="40" cy="40" r="36" stroke={c} strokeWidth="1.5" fill="none" />
      {/* Inner circle */}
      <circle cx="40" cy="40" r="28" stroke={c} strokeWidth="0.8" fill="none" />
      {/* "TW" brand text */}
      <text
        x="40"
        y="45"
        textAnchor="middle"
        fontFamily="var(--font-display, 'Plus Jakarta Sans', sans-serif)"
        fontSize="18"
        fontWeight="800"
        letterSpacing="3"
        fill={c}
      >
        TW
      </text>
      {/* Diagonal slash — gives it that postal-stamp feel */}
      <line x1="12" y1="68" x2="68" y2="12" stroke={c} strokeWidth="0.8" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface StampImprint {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

interface CanvasStampProps {
  offsetX: number;
  offsetY: number;
  zoom: number;
  gridPadding: number;
  disabled?: boolean;
}

let stampIdCounter = 0;

/* ------------------------------------------------------------------ */
/*  Hook: manages stamp imprint state + click listener                 */
/* ------------------------------------------------------------------ */
export function useCanvasStamp({
  offsetX,
  offsetY,
  zoom,
  gridPadding,
  disabled = false,
}: CanvasStampProps) {
  const [imprints, setImprints] = useState<StampImprint[]>([]);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (disabled) return;

      // Only stamp on empty background — skip interactive elements
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("select") ||
        target.closest("a") ||
        target.closest("[data-sticker]") ||
        target.closest(".glow-card-outer") ||
        target.closest(".canvas-card")
      ) {
        return;
      }

      // Convert screen coords → canvas-inner local coords
      const canvasX = (e.clientX - offsetX) / zoom + gridPadding;
      const canvasY = (e.clientY - offsetY) / zoom + gridPadding;
      const rotation = Math.random() * 40 - 20; // ±20°

      const id = ++stampIdCounter;
      setImprints((prev) => [...prev, { id, x: canvasX, y: canvasY, rotation }]);

      // Remove after 3s (matches CSS animation duration)
      setTimeout(() => {
        setImprints((prev) => prev.filter((s) => s.id !== id));
      }, 3000);
    },
    [offsetX, offsetY, zoom, gridPadding, disabled]
  );

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  return imprints;
}

/* ------------------------------------------------------------------ */
/*  Cursor — fixed to viewport, follows mouse. Render outside canvas.  */
/*  Shows a simple ring + crosshair indicating "stamp mode"            */
/* ------------------------------------------------------------------ */
export function StampCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      // Position so the center dot aligns exactly with the mouse pointer
      ref.current.style.transform = `translate(${e.clientX - CURSOR_SIZE / 2}px, ${e.clientY - CURSOR_SIZE / 2}px)`;

      // Hide stamp cursor when over interactive elements
      const target = e.target as HTMLElement;
      const overInteractive =
        !!target.closest("button") ||
        !!target.closest("select") ||
        !!target.closest("a") ||
        !!target.closest("[data-sticker]") ||
        !!target.closest(".glow-card-outer") ||
        !!target.closest(".canvas-card");

      ref.current.style.opacity = overInteractive ? "0" : "0.9";
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    setVisible(true);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: visible ? 0.9 : 0,
        transition: "opacity 0.15s ease",
        willChange: "transform",
      }}
    >
      <CursorSVG />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Imprints — render inside canvas-inner so they pan/zoom with it.    */
/*  Each imprint is centered exactly on the click point via             */
/*  translate(-50%, -50%).                                              */
/* ------------------------------------------------------------------ */
export function StampImprints({ imprints }: { imprints: StampImprint[] }) {
  return (
    <>
      {imprints.map((stamp) => (
        <div
          key={stamp.id}
          style={{
            position: "absolute",
            left: stamp.x,
            top: stamp.y,
            pointerEvents: "none",
            zIndex: 1,
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            ["--stamp-rot" as any]: `${stamp.rotation}deg`,
            animation: "stamp-appear 3s ease-out forwards",
          }}
        >
          {/* Offset by half so the imprint center = the click point */}
          <div style={{ marginLeft: -(IMPRINT_SIZE / 2), marginTop: -(IMPRINT_SIZE / 2) }}>
            <ImprintSVG />
          </div>
        </div>
      ))}
    </>
  );
}
