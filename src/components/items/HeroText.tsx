"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "motion/react";

interface HeroTextProps {
  title: string;
  subtitle?: string;
}

/* ------------------------------------------------------------------ */
/*  Design System Type Scale — user-centric labels inspired by ShadCN */
/*  Each preset maps to a constrained size with appropriate weight    */
/*  and letter-spacing for that scale level.                          */
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

/* ------------------------------------------------------------------ */
/*  Cross (+) marker — exactly like Vercel Geist grid intersections.  */
/* ------------------------------------------------------------------ */
const CROSS_SIZE = 21;

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
          borderRight: "1px solid rgb(168, 168, 168)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "50%",
          left: 0,
          width: CROSS_SIZE,
          height: 0,
          borderBottom: "1px solid rgb(168, 168, 168)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashed guide line — matches Vercel Geist exactly.                 */
/* ------------------------------------------------------------------ */
function GuideLine() {
  return (
    <div
      className="w-full pointer-events-none"
      style={{
        height: 1,
        backgroundImage:
          "repeating-linear-gradient(90deg, rgb(168, 168, 168), rgb(168, 168, 168) 4px, transparent 4px, transparent 10px)",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Snap Slider — draggable range input that snaps to preset indices  */
/*  Shows tick marks and the current preset label.                    */
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
      // Map ratio to index (0 = largest = Display, last = smallest = Muted)
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

  // Percentage position of the thumb
  const thumbPercent = total > 1 ? (presetIndex / (total - 1)) * 100 : 0;
  const currentPreset = TYPE_PRESETS[presetIndex];

  return (
    <div
      className="flex items-center gap-3"
      style={{ pointerEvents: "auto" }}
    >
      {/* Preset label */}
      <span
        className="text-[10px] font-semibold tracking-wide tabular-nums whitespace-nowrap min-w-[64px] text-right"
        style={{ color: "var(--accent)" }}
      >
        {currentPreset.label}
      </span>

      {/* Slider track */}
      <div
        ref={trackRef}
        className="relative flex items-center cursor-pointer"
        style={{ width: 140, height: 24, touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Track line */}
        <div
          className="absolute"
          style={{
            left: 0,
            right: 0,
            height: 2,
            background: "var(--card-border)",
            borderRadius: 1,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />

        {/* Active portion */}
        <div
          className="absolute"
          style={{
            left: 0,
            width: `${thumbPercent}%`,
            height: 2,
            background: "var(--accent)",
            borderRadius: 1,
            top: "50%",
            transform: "translateY(-50%)",
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
                left: `${pct}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: i === presetIndex ? 6 : 4,
                height: i === presetIndex ? 6 : 4,
                borderRadius: "50%",
                background: i <= presetIndex ? "var(--accent)" : "var(--card-border)",
                transition: "all 0.15s ease",
              }}
            />
          );
        })}

        {/* Draggable thumb */}
        <div
          className="absolute"
          style={{
            left: `${thumbPercent}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            border: "2px solid white",
            transition: "left 0.1s ease",
            cursor: "grab",
          }}
        />
      </div>

      {/* Size readout */}
      <span
        className="text-[10px] font-semibold tabular-nums min-w-[28px]"
        style={{ color: "var(--text-secondary)" }}
      >
        {currentPreset.fontSize}px
      </span>
    </div>
  );
}

/* ================================================================== */
/*  Main Component                                                     */
/* ================================================================== */
export default function HeroText({ title, subtitle }: HeroTextProps) {
  const [activePreset, setActivePreset] = useState(0); // Display (largest) default
  const [weight, setWeight] = useState<number>(TYPE_PRESETS[0].weight);
  const [fontSize, setFontSize] = useState<number>(TYPE_PRESETS[0].fontSize);
  const [spacing, setSpacing] = useState<number>(TYPE_PRESETS[0].spacing);
  const [align, setAlign] = useState<"left" | "center" | "right">("center"); // center default
  const [italic, setItalic] = useState(false);
  const [lineCount, setLineCount] = useState<number>(TYPE_PRESETS[0].lineCount);

  const handlePresetSelect = useCallback((index: number) => {
    const preset = TYPE_PRESETS[index];
    setActivePreset(index);
    setFontSize(preset.fontSize);
    setWeight(preset.weight);
    setSpacing(preset.spacing);
    setLineCount(preset.lineCount);
  }, []);

  const handleWeightChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setWeight(Number(e.target.value));
    },
    []
  );

  const stopProp = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  const guideRow = fontSize;

  // Build the preview text — repeat lines to fill lineCount
  const previewLines: string[] = [];
  const sourceLines = subtitle ? [title, subtitle] : [title];
  for (let i = 0; i < lineCount; i++) {
    previewLines.push(sourceLines[i % sourceLines.length]);
  }

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
      {/* ===== Controls Bar ===== */}
      <motion.div
        className="relative flex items-center gap-2 px-0 pt-0 pb-4 flex-wrap"
        style={{ zIndex: 50, pointerEvents: "auto" }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* Weight selector */}
        <div
          className="relative flex items-center rounded-md px-3 py-1.5"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <select
            value={weight}
            onChange={handleWeightChange}
            className="appearance-none bg-transparent text-xs font-medium pr-4 cursor-pointer outline-none"
            style={{ color: "var(--text-primary)", pointerEvents: "auto" }}
          >
            {WEIGHTS.map((w) => (
              <option key={w.value} value={w.value}>
                {w.label}
              </option>
            ))}
          </select>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="absolute right-2.5 pointer-events-none"
            style={{ color: "var(--text-secondary)" }}
          >
            <path
              d="M2.5 4L5 6.5L7.5 4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Italic toggles */}
        <div
          className="flex items-center rounded-md overflow-hidden"
          style={{ border: "1px solid var(--card-border)" }}
        >
          <button
            onClick={() => setItalic(false)}
            className="px-2.5 py-1.5 text-xs font-semibold transition-colors"
            style={{
              background: !italic ? "var(--text-primary)" : "var(--card-bg)",
              color: !italic ? "var(--card-bg)" : "var(--text-secondary)",
            }}
          >
            I
          </button>
          <button
            onClick={() => setItalic(true)}
            className="px-2.5 py-1.5 text-xs transition-colors"
            style={{
              background: italic ? "var(--text-primary)" : "var(--card-bg)",
              color: italic ? "var(--card-bg)" : "var(--text-secondary)",
              fontStyle: "italic",
              fontFamily: "serif",
            }}
          >
            I
          </button>
        </div>

        {/* Alignment buttons */}
        <div
          className="flex items-center rounded-md overflow-hidden"
          style={{ border: "1px solid var(--card-border)" }}
        >
          {ALIGNS.map((a) => (
            <button
              key={a.value}
              onClick={() => setAlign(a.value as "left" | "center" | "right")}
              className="px-2 py-1.5 transition-colors"
              style={{
                background:
                  align === a.value ? "var(--text-primary)" : "var(--card-bg)",
                color:
                  align === a.value ? "var(--card-bg)" : "var(--text-secondary)",
              }}
              title={a.label}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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

        {/* Spacer */}
        <div className="flex-1" />

        {/* Snappable Size Slider */}
        <SnapSlider
          presetIndex={activePreset}
          onChange={handlePresetSelect}
        />

        {/* Spacing display */}
        <div className="flex items-center gap-1">
          <span
            className="text-[10px] font-medium uppercase tracking-wider"
            style={{ color: "var(--text-secondary)" }}
          >
            Spacing
          </span>
          <span
            className="text-[10px] font-semibold tabular-nums"
            style={{ color: "var(--text-primary)" }}
          >
            {spacing > 0 ? "+" : ""}{spacing}%
          </span>
        </div>

        {/* Reset button */}
        <button
          onClick={() => {
            setActivePreset(0);
            setWeight(TYPE_PRESETS[0].weight);
            setFontSize(TYPE_PRESETS[0].fontSize);
            setSpacing(TYPE_PRESETS[0].spacing);
            setLineCount(TYPE_PRESETS[0].lineCount);
            setAlign("center");
            setItalic(false);
          }}
          className="p-1.5 rounded-md transition-colors hover:opacity-70"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            color: "var(--text-secondary)",
          }}
          title="Reset"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7a5 5 0 1 1 1 3"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path
              d="M2 3v4h4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </motion.div>

      {/* ===== Content area — Vercel Geist style ===== */}
      <motion.div
        className="relative flex-1 flex flex-col justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ overflow: "visible" }}
      >
        {/* Cross (+) marker — top-left corner */}
        <CrossMarker
          style={{
            top: -(CROSS_SIZE / 2),
            left: -(CROSS_SIZE / 2),
          }}
        />

        {/* Textarea wrapper with guide lines */}
        <div className="relative w-full" style={{ lineHeight: 0 }}>
          {/* Guide lines — one per text line boundary (lineCount + 1 lines total) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              display: "grid",
              gridAutoRows: `${guideRow}px`,
              zIndex: 0,
            }}
          >
            {/* Top border guide line */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
                <GuideLine />
              </div>
            </div>
            {/* One guide line per row boundary */}
            {Array.from({ length: lineCount }).map((_, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
                  <GuideLine />
                </div>
              </div>
            ))}
          </div>

          {/* Text */}
          <div
            className="relative w-full"
            style={{
              fontSize: `${fontSize}px`,
              fontWeight: weight,
              fontStyle: italic ? "italic" : "normal",
              letterSpacing: `${spacing * 0.01}em`,
              lineHeight: 1,
              textAlign: align,
              color: "var(--accent)",
              fontFamily:
                "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
              zIndex: 1,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {previewLines.join("\n")}
          </div>
        </div>

        {/* Cross (+) marker — bottom-right corner */}
        <CrossMarker
          style={{
            bottom: -(CROSS_SIZE / 2),
            right: -(CROSS_SIZE / 2),
          }}
        />
      </motion.div>
    </div>
  );
}
