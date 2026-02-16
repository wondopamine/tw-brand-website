"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";

interface HeroTextProps {
  title: string;
  subtitle?: string;
}

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
/*  Two 1px lines (21px long) overlapping at center to form a "+" .   */
/* ------------------------------------------------------------------ */
const CROSS_SIZE = 21;

function CrossMarker({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: CROSS_SIZE,
        height: CROSS_SIZE,
        ...style,
      }}
    >
      {/* Vertical bar */}
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
      {/* Horizontal bar */}
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
/*  Dashed guide line — matches Vercel Geist exactly:                 */
/*  repeating-linear-gradient: 4px gray dash, 6px transparent gap     */
/*  Color: rgb(168, 168, 168), height: 1px                            */
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

export default function HeroText({ title, subtitle }: HeroTextProps) {
  const [weight, setWeight] = useState(700);
  const [fontSize, setFontSize] = useState(72);
  const [spacing, setSpacing] = useState(0);
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  const [italic, setItalic] = useState(false);

  const handleWeightChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setWeight(Number(e.target.value));
    },
    []
  );

  const stopProp = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  const lineCount = subtitle ? 2 : 1;
  // Guide row height = fontSize (line-height: 1), matching Vercel Geist's --margin
  const guideRow = fontSize;

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
        className="relative flex items-center gap-3 px-0 pt-0 pb-4 flex-wrap"
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
                  align === a.value
                    ? "var(--text-primary)"
                    : "var(--card-bg)",
                color:
                  align === a.value
                    ? "var(--card-bg)"
                    : "var(--text-secondary)",
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

        {/* Size slider */}
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] font-medium uppercase tracking-wider"
            style={{ color: "var(--text-secondary)" }}
          >
            Size
          </span>
          <span
            className="text-[11px] font-semibold tabular-nums w-7 text-right"
            style={{ color: "var(--text-primary)" }}
          >
            {fontSize}
          </span>
          <input
            type="range"
            min={40}
            max={220}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="typo-slider"
            style={{ width: 90 }}
          />
        </div>

        {/* Spacing slider */}
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] font-medium uppercase tracking-wider"
            style={{ color: "var(--text-secondary)" }}
          >
            Spacing
          </span>
          <span
            className="text-[11px] font-semibold tabular-nums w-8 text-right"
            style={{ color: "var(--text-primary)" }}
          >
            {spacing}%
          </span>
          <input
            type="range"
            min={-10}
            max={30}
            value={spacing}
            onChange={(e) => setSpacing(Number(e.target.value))}
            className="typo-slider"
            style={{ width: 90 }}
          />
        </div>

        {/* Reset button */}
        <button
          onClick={() => {
            setWeight(700);
            setFontSize(72);
            setSpacing(0);
            setAlign("left");
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
      {/* The content area uses CSS grid with grid-auto-rows set to the
          current fontSize. Dashed guide lines sit between rows. The text
          is positioned on top. Overflow is visible so large text can
          bleed naturally beyond the bounding box. */}
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
          {/* Guide lines container — uses CSS Grid so rows = fontSize.
              Each row boundary gets a dashed guide line. */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              display: "grid",
              gridAutoRows: `${guideRow}px`,
              marginTop: guideRow,
              zIndex: 0,
            }}
          >
            {/* Render guide lines: one per row boundary. The margin-top
                on each line shifts it so it sits at the baseline position
                within each row (approximately 85% down = cap height). */}
            {Array.from({ length: lineCount + 2 }).map((_, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: `${-guideRow * 0.15 - 1}px`,
                    left: 0,
                    right: 0,
                  }}
                >
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
            {title}
            {subtitle && (
              <>
                {"\n"}
                {subtitle}
              </>
            )}
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
