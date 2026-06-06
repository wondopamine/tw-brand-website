"use client";

import { useCallback, useRef } from "react";

export interface SizeStop {
  label: string;
  value: number;
}

/**
 * Snap slider over a discrete set of size stops.
 * Generalized from the former HeroText SnapSlider (preset-bound) to
 * accept arbitrary stops.
 */
export default function SizeControl({
  stops,
  index,
  onChange,
}: {
  stops: SizeStop[];
  index: number;
  onChange: (index: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const total = stops.length;

  const getIndexFromEvent = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return index;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return Math.round(ratio * (total - 1));
    },
    [index, total]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      e.preventDefault();
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      onChange(getIndexFromEvent(e.clientX));
    },
    [onChange, getIndexFromEvent]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      e.stopPropagation();
      onChange(getIndexFromEvent(e.clientX));
    },
    [onChange, getIndexFromEvent]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const thumbPercent = total > 1 ? (index / (total - 1)) * 100 : 0;
  const current = stops[index];

  return (
    <div className="flex items-center gap-2.5" style={{ pointerEvents: "auto" }}>
      <span
        className="text-[10px] font-semibold tracking-wide whitespace-nowrap min-w-[40px] text-right"
        style={{ color: "var(--accent)" }}
      >
        {current.label}
      </span>

      <div
        ref={trackRef}
        className="relative flex items-center cursor-pointer"
        style={{ width: 120, height: 20, touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Track */}
        <div
          className="absolute"
          style={{
            left: 0, right: 0, height: 1,
            background: "var(--card-border)",
            top: "50%", transform: "translateY(-50%)",
          }}
        />
        {/* Active fill */}
        <div
          className="absolute"
          style={{
            left: 0, width: `${thumbPercent}%`, height: 1,
            background: "var(--accent)",
            top: "50%", transform: "translateY(-50%)",
          }}
        />
        {/* Tick marks */}
        {stops.map((_, i) => {
          const pct = total > 1 ? (i / (total - 1)) * 100 : 0;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${pct}%`, top: "50%",
                transform: "translate(-50%, -50%)",
                width: 3, height: 3, borderRadius: "50%",
                background: i <= index ? "var(--accent)" : "var(--card-border)",
                transition: "all 0.15s ease",
              }}
            />
          );
        })}
        {/* Thumb */}
        <div
          className="absolute"
          style={{
            left: `${thumbPercent}%`, top: "50%",
            transform: "translate(-50%, -50%)",
            width: 12, height: 12, borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            border: "2px solid white",
            transition: "left 0.1s ease",
            cursor: "grab",
          }}
        />
      </div>

      <span
        className="text-[10px] font-medium tabular-nums min-w-[24px]"
        style={{ color: "var(--text-secondary)" }}
      >
        {current.value}
      </span>
    </div>
  );
}
