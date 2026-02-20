"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "motion/react";

interface HeroTextProps {
  title: string;
  subtitle?: string;
}

/* ------------------------------------------------------------------ */
/*  Design System Type Scale                                           */
/* ------------------------------------------------------------------ */
const TYPE_PRESETS = [
  { label: "Display",   fontSize: 72, weight: 700, spacing: -2,   lineCount: 4 },
  { label: "Heading 1", fontSize: 56, weight: 700, spacing: -1.5, lineCount: 4 },
  { label: "Heading 2", fontSize: 40, weight: 600, spacing: -0.5, lineCount: 3 },
  { label: "Heading 3", fontSize: 32, weight: 600, spacing: -0.3, lineCount: 3 },
  { label: "Heading 4", fontSize: 24, weight: 600, spacing: 0,    lineCount: 3 },
  { label: "Lead",      fontSize: 20, weight: 500, spacing: 0,    lineCount: 2 },
  { label: "Large",     fontSize: 18, weight: 400, spacing: 0,    lineCount: 2 },
  { label: "Body",      fontSize: 16, weight: 400, spacing: 0,    lineCount: 2 },
  { label: "Small",     fontSize: 14, weight: 500, spacing: 0.3,  lineCount: 2 },
  { label: "Muted",     fontSize: 12, weight: 500, spacing: 0.5,  lineCount: 2 },
] as const;

const WEIGHTS = [
  { label: "Light", value: 300 },
  { label: "Regular", value: 400 },
  { label: "Medium", value: 500 },
  { label: "Semi Bold", value: 600 },
  { label: "Bold", value: 700 },
  { label: "Black", value: 900 },
] as const;

const ALIGNS = [
  { label: "Left", value: "left", icon: "align-left" },
  { label: "Center", value: "center", icon: "align-center" },
  { label: "Right", value: "right", icon: "align-right" },
] as const;

/* Brand colour palette for the colour picker */
const COLOUR_PALETTE = [
  { label: "TW Blue", value: "#0064FF" },
  { label: "Blue 900", value: "#1E3A8A" },
  { label: "Blue 700", value: "#1D4ED8" },
  { label: "Blue 500", value: "#3B82F6" },
  { label: "Blue 300", value: "#93C5FD" },
  { label: "Blue 100", value: "#DBEAFE" },
  { label: "Dark", value: "#1a1a1a" },
  { label: "Gray", value: "#6B6B73" },
] as const;

/* ------------------------------------------------------------------ */
/*  Cross (+) marker                                                   */
/* ------------------------------------------------------------------ */
const CROSS_SIZE = 21;
const CROSS_COLOR = "rgb(200, 200, 200)";

function CrossMarker({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ width: CROSS_SIZE, height: CROSS_SIZE, ...style }}
    >
      <div
        className="absolute"
        style={{
          left: "50%",
          top: 0,
          width: 0,
          height: CROSS_SIZE,
          borderRight: `1px solid ${CROSS_COLOR}`,
        }}
      />
      <div
        className="absolute"
        style={{
          top: "50%",
          left: 0,
          width: CROSS_SIZE,
          height: 0,
          borderBottom: `1px solid ${CROSS_COLOR}`,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashed guide line                                                  */
/* ------------------------------------------------------------------ */
function GuideLine() {
  return (
    <div
      className="w-full pointer-events-none"
      style={{
        height: 0,
        borderBottom: "1px dashed rgb(200, 200, 200)",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Snap Slider                                                        */
/* ------------------------------------------------------------------ */
function SnapSlider({
  presetIndex,
  onChange,
}: {
  presetIndex: number;
  onChange: (index: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const total = TYPE_PRESETS.length;

  const getIndexFromEvent = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return presetIndex;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return Math.round(ratio * (total - 1));
    },
    [presetIndex, total]
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

  const thumbPercent = total > 1 ? (presetIndex / (total - 1)) * 100 : 0;
  const currentPreset = TYPE_PRESETS[presetIndex];

  return (
    <div className="flex items-center gap-2.5" style={{ pointerEvents: "auto" }}>
      <span
        className="text-[10px] font-semibold tracking-wide whitespace-nowrap min-w-[56px] text-right"
        style={{ color: "var(--accent)" }}
      >
        {currentPreset.label}
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
        {TYPE_PRESETS.map((_, i) => {
          const pct = total > 1 ? (i / (total - 1)) * 100 : 0;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${pct}%`, top: "50%",
                transform: "translate(-50%, -50%)",
                width: 3, height: 3, borderRadius: "50%",
                background: i <= presetIndex ? "var(--accent)" : "var(--card-border)",
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
        {currentPreset.fontSize}
      </span>
    </div>
  );
}

/* ================================================================== */
/*  Main Component                                                     */
/* ================================================================== */
export default function HeroText({ title, subtitle }: HeroTextProps) {
  const [activePreset, setActivePreset] = useState(0);
  const [weight, setWeight] = useState<number>(TYPE_PRESETS[0].weight);
  const [fontSize, setFontSize] = useState<number>(TYPE_PRESETS[0].fontSize);
  const [spacing, setSpacing] = useState<number>(TYPE_PRESETS[0].spacing);
  const [align, setAlign] = useState<"left" | "center" | "right">("center");
  const [italic, setItalic] = useState(false);
  const [lineCount, setLineCount] = useState<number>(TYPE_PRESETS[0].lineCount);
  const [textColor, setTextColor] = useState("#0064FF");

  const handlePresetSelect = useCallback((index: number) => {
    const preset = TYPE_PRESETS[index];
    setActivePreset(index);
    setFontSize(preset.fontSize);
    setWeight(preset.weight);
    setSpacing(preset.spacing);
    setLineCount(preset.lineCount);
  }, []);

  const stopProp = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  // Build preview lines: split title + subtitle by newlines
  const allSourceLines: string[] = [title];
  if (subtitle) {
    allSourceLines.push(...subtitle.split("\n"));
  }
  const previewLines: string[] = [];
  for (let i = 0; i < lineCount; i++) {
    previewLines.push(allSourceLines[i % allSourceLines.length]);
  }

  // Total content height = lineCount * fontSize (line-height: 1)
  const contentHeight = lineCount * fontSize;

  return (
    <div
      className="flex flex-col h-full"
      style={{
        fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
        backgroundColor: "var(--canvas-bg)",
        position: "relative",
        zIndex: 1,
      }}
      data-sticker
      onMouseDown={stopProp}
      onTouchStart={stopProp}
    >
      {/* ===== Controls Bar — center-aligned ===== */}
      <motion.div
        className="relative flex items-center justify-center gap-2 px-0 pt-0 pb-5 flex-wrap"
        style={{ zIndex: 50, pointerEvents: "auto" }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* Weight selector — using native select with proper pointer events */}
        <div
          className="relative flex items-center rounded-md px-2.5 py-1"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <select
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            onMouseDown={(e) => e.stopPropagation()}
            className="appearance-none bg-transparent text-[11px] font-medium pr-4 cursor-pointer outline-none"
            style={{ color: "var(--text-primary)", pointerEvents: "auto", position: "relative", zIndex: 10 }}
          >
            {WEIGHTS.map((w) => (
              <option key={w.value} value={w.value}>
                {w.label}
              </option>
            ))}
          </select>
          <svg
            width="10" height="10" viewBox="0 0 10 10" fill="none"
            className="absolute right-2 pointer-events-none"
            style={{ color: "var(--text-secondary)" }}
          >
            <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Italic toggle */}
        <div
          className="flex items-center rounded-md overflow-hidden"
          style={{ border: "1px solid var(--card-border)" }}
        >
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setItalic(false)}
            className="px-2 py-1 text-[11px] font-semibold transition-colors"
            style={{
              background: !italic ? "var(--text-primary)" : "var(--card-bg)",
              color: !italic ? "var(--card-bg)" : "var(--text-secondary)",
            }}
          >
            I
          </button>
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setItalic(true)}
            className="px-2 py-1 text-[11px] transition-colors"
            style={{
              background: italic ? "var(--text-primary)" : "var(--card-bg)",
              color: italic ? "var(--card-bg)" : "var(--text-secondary)",
              fontStyle: "italic", fontFamily: "serif",
            }}
          >
            I
          </button>
        </div>

        {/* Alignment */}
        <div
          className="flex items-center rounded-md overflow-hidden"
          style={{ border: "1px solid var(--card-border)" }}
        >
          {ALIGNS.map((a) => (
            <button
              key={a.value}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => setAlign(a.value as "left" | "center" | "right")}
              className="px-1.5 py-1 transition-colors"
              style={{
                background: align === a.value ? "var(--text-primary)" : "var(--card-bg)",
                color: align === a.value ? "var(--card-bg)" : "var(--text-secondary)",
              }}
              title={a.label}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                {a.icon === "align-left" && (
                  <>
                    <line x1="1" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="1" y1="7" x2="9" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="1" y1="11" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
                {a.icon === "align-center" && (
                  <>
                    <line x1="1" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="3" y1="7" x2="11" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="2" y1="11" x2="12" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
                {a.icon === "align-right" && (
                  <>
                    <line x1="1" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="5" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          ))}
        </div>

        {/* Colour picker — small swatches */}
        <div className="flex items-center gap-1 ml-1">
          {COLOUR_PALETTE.map((c) => (
            <button
              key={c.value}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => setTextColor(c.value)}
              className="rounded-full transition-all"
              style={{
                width: textColor === c.value ? 16 : 12,
                height: textColor === c.value ? 16 : 12,
                background: c.value,
                border: textColor === c.value
                  ? "2px solid var(--text-primary)"
                  : "1.5px solid var(--card-border)",
                cursor: "pointer",
              }}
              title={c.label}
            />
          ))}
        </div>

        {/* Size slider */}
        <div className="ml-1">
          <SnapSlider presetIndex={activePreset} onChange={handlePresetSelect} />
        </div>

        {/* Reset */}
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => {
            setActivePreset(0);
            setWeight(TYPE_PRESETS[0].weight);
            setFontSize(TYPE_PRESETS[0].fontSize);
            setSpacing(TYPE_PRESETS[0].spacing);
            setLineCount(TYPE_PRESETS[0].lineCount);
            setAlign("center");
            setItalic(false);
            setTextColor("#0064FF");
          }}
          className="p-1 rounded-md transition-colors hover:opacity-60"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            color: "var(--text-secondary)",
          }}
          title="Reset"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M2 7a5 5 0 1 1 1 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M2 3v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </motion.div>

      {/* ===== Typography Playground Content ===== */}
      {/*
        Layout from the reference screenshot:
        - Outer border (1px solid light gray) wraps the entire playground
        - Cross (+) at top-left corner and bottom-right corner, sitting ON the border
        - Dashed horizontal guide lines: one at the top of each text line
          and one at the bottom of the last line = lineCount + 1 total
        - Text sits within the guide lines, line-height: 1
      */}
      <motion.div
        className="relative flex-1"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ overflow: "visible" }}
      >
        {/* Outer border — wraps the text content area precisely */}
        <div
          className="relative"
          style={{
            border: "1px solid rgb(220, 220, 220)",
            height: contentHeight,
            overflow: "visible",
          }}
        >
          {/* Cross (+) — top-left, centered on the corner of the border */}
          <CrossMarker
            style={{
              top: -(CROSS_SIZE / 2),
              left: -(CROSS_SIZE / 2),
            }}
          />

          {/* Cross (+) — bottom-right, centered on the corner */}
          <CrossMarker
            style={{
              bottom: -(CROSS_SIZE / 2),
              right: -(CROSS_SIZE / 2),
            }}
          />

          {/* Dashed guide lines — exactly lineCount + 1 horizontal lines
              evenly spaced within the content height.
              Top line at y=0, bottom line at y=contentHeight,
              intermediate lines at y = i * fontSize */}
          {Array.from({ length: lineCount + 1 }).map((_, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                top: i * fontSize,
                left: 0,
                right: 0,
              }}
            >
              <GuideLine />
            </div>
          ))}

          {/* Text content — positioned inside the bordered area */}
          <div
            className="absolute inset-0"
            style={{
              fontSize: `${fontSize}px`,
              fontWeight: weight,
              fontStyle: italic ? "italic" : "normal",
              letterSpacing: `${spacing * 0.01}em`,
              lineHeight: 1,
              textAlign: align,
              color: textColor,
              fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              padding: 0,
              margin: 0,
            }}
          >
            {previewLines.join("\n")}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
