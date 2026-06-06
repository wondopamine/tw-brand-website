"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Brand colour palette — Figma design system style                   */
/*  Full TW blue ramp (matches color/twblue in Figma library)          */
/* ------------------------------------------------------------------ */
const COLOUR_PALETTE = [
  { label: "Teacher & School Blue", value: "#0064FF" },
  { label: "Blue 50",   value: "#EFF6FF" },
  { label: "Blue 100",  value: "#DBEAFE" },
  { label: "Blue 200",  value: "#BFDBFE" },
  { label: "Blue 300",  value: "#93C5FD" },
  { label: "Blue 400",  value: "#60A5FA" },
  { label: "Blue 500",  value: "#3B82F6" },
  { label: "Blue 600",  value: "#2563EB" },
  { label: "Blue 700",  value: "#1D4ED8" },
  { label: "Blue 800",  value: "#1E40AF" },
  { label: "Blue 900",  value: "#1E3A8A" },
  { label: "Blue 950",  value: "#172554" },
  { label: "Dark",      value: "#1a1a1a" },
  { label: "Gray",      value: "#6B6B73" },
] as const;

const LIGHT_SWATCHES = ["#EFF6FF", "#DBEAFE", "#BFDBFE"];

/* ------------------------------------------------------------------ */
/*  Figma-style Colour Picker                                          */
/*  Square swatches in a grid, like Figma's design system colour panel */
/* ------------------------------------------------------------------ */
export default function ColourPicker({
  selectedColor,
  onSelect,
}: {
  selectedColor: string;
  onSelect: (color: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Dismiss on outside click; capture-phase Escape closes only the dropdown
  // (stopPropagation keeps it from also dismissing the parent dialog).
  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="relative" style={{ pointerEvents: "auto" }}>
      {/* Trigger — current colour swatch */}
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Text colour: ${selectedColor}`}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:opacity-80 cursor-pointer"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
      >
        <div
          className="rounded-[3px]"
          style={{
            width: 14,
            height: 14,
            background: selectedColor,
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        />
        <span
          className="text-[10px] font-medium uppercase tracking-wider"
          style={{ color: "var(--text-secondary)" }}
        >
          {selectedColor}
        </span>
        <svg
          width="8" height="8" viewBox="0 0 10 10" fill="none"
          style={{ color: "var(--text-secondary)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s ease" }}
        >
          <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown — Figma-style colour grid */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 z-[100] rounded-lg overflow-hidden"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
            minWidth: 220,
          }}
        >
          <SwatchSection
            title="color/twblue"
            colors={COLOUR_PALETTE.slice(0, 12)}
            selectedColor={selectedColor}
            onSelect={(c) => { onSelect(c); setIsOpen(false); }}
          />
          {/* Separator */}
          <div
            className="mx-3"
            style={{ height: 1, background: "var(--card-border)", opacity: 0.6 }}
          />
          <SwatchSection
            title="Neutral"
            colors={COLOUR_PALETTE.slice(12)}
            selectedColor={selectedColor}
            onSelect={(c) => { onSelect(c); setIsOpen(false); }}
          />
        </div>
      )}
    </div>
  );
}

function SwatchSection({
  title,
  colors,
  selectedColor,
  onSelect,
}: {
  title: string;
  colors: readonly { label: string; value: string }[];
  selectedColor: string;
  onSelect: (color: string) => void;
}) {
  return (
    <>
      <div className="px-3 pt-3 pb-1.5">
        <span
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: "var(--text-secondary)" }}
        >
          {title}
        </span>
      </div>

      {/* Swatch grid — 7 per row (like Figma library) */}
      <div
        className="px-3 pb-3 grid gap-1"
        style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
      >
        {colors.map((c) => {
          const isSelected = selectedColor === c.value;
          const isLight = LIGHT_SWATCHES.includes(c.value);
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => onSelect(c.value)}
              aria-label={`${c.label} — ${c.value}`}
              className="relative cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                background: c.value,
                border: isSelected
                  ? "2px solid var(--text-primary)"
                  : "1px solid rgba(0,0,0,0.08)",
                outline: isSelected ? "2px solid var(--card-bg)" : "none",
                outlineOffset: -3,
                transition: "all 0.1s ease",
              }}
              title={`${c.label} — ${c.value}`}
            >
              {/* Selected indicator — checkmark */}
              {isSelected && (
                <svg
                  className="absolute"
                  style={{
                    top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    filter: isLight ? "none" : "drop-shadow(0 0 1px rgba(0,0,0,0.3))",
                  }}
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                >
                  <path
                    d="M2.5 6L5 8.5L9.5 3.5"
                    stroke={isLight ? "var(--text-primary)" : "white"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
