"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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

/**
 * Generates horizontal dotted guide lines based on font metrics.
 * Mimics the Vercel Geist font playground grid:
 * - Cap height line
 * - x-height line
 * - Baseline
 * - Descender line
 * These are approximate ratios for Plus Jakarta Sans.
 */
function TypoGrid({ fontSize, lineCount }: { fontSize: number; lineCount: number }) {
  const lineHeight = fontSize * 0.95; // matches leading-[0.95]
  const capHeight = fontSize * 0.72;
  const xHeight = fontSize * 0.50;
  const descender = fontSize * 0.22;

  const lines: { y: number; dashed: boolean; strong: boolean }[] = [];

  for (let i = 0; i < lineCount; i++) {
    const baseY = i * lineHeight;
    // Baseline (bottom of capital letters)
    lines.push({ y: baseY + capHeight, dashed: true, strong: true });
    // Cap height (top of capital letters)
    lines.push({ y: baseY, dashed: true, strong: false });
    // x-height
    lines.push({ y: baseY + (capHeight - xHeight), dashed: true, strong: false });
    // Descender
    lines.push({ y: baseY + capHeight + descender, dashed: true, strong: false });
  }

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ overflow: "visible" }}
    >
      {lines.map((line, i) => (
        <line
          key={i}
          x1="0"
          y1={line.y}
          x2="100%"
          y2={line.y}
          stroke={line.strong ? "rgba(0, 0, 0, 0.12)" : "rgba(0, 0, 0, 0.06)"}
          strokeWidth="1"
          strokeDasharray={line.strong ? "6 4" : "2 6"}
        />
      ))}
      {/* Vertical edge markers — small crosshairs at left/right */}
      {lines.filter((_, i) => i % 4 === 0).map((line, i) => (
        <g key={`cross-${i}`}>
          <line x1="0" y1={line.y - 4} x2="0" y2={line.y + 4} stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          <line x1="-4" y1={line.y} x2="4" y2={line.y} stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

export default function HeroText({ title, subtitle }: HeroTextProps) {
  const [weight, setWeight] = useState(700);
  const [fontSize, setFontSize] = useState(72);
  const [spacing, setSpacing] = useState(0);
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  const [italic, setItalic] = useState(false);

  const handleWeightChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setWeight(Number(e.target.value));
  }, []);

  // Prevent any event from propagating to the canvas pan handler
  const stopProp = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  const lineCount = subtitle ? 2 : 1;

  return (
    <div
      className="flex flex-col h-full select-none"
      style={{ fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)" }}
      data-sticker
      onMouseDown={stopProp}
      onTouchStart={stopProp}
    >
      {/* ===== Typography Controls Bar ===== */}
      <motion.div
        className="relative flex items-center gap-3 mb-5 flex-wrap"
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
            <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
                background: align === a.value ? "var(--text-primary)" : "var(--card-bg)",
                color: align === a.value ? "var(--card-bg)" : "var(--text-secondary)",
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
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
            Size
          </span>
          <span className="text-[11px] font-semibold tabular-nums w-7 text-right" style={{ color: "var(--text-primary)" }}>
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
          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
            Spacing
          </span>
          <span className="text-[11px] font-semibold tabular-nums w-8 text-right" style={{ color: "var(--text-primary)" }}>
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
            <path d="M2 7a5 5 0 1 1 1 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M2 3v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </motion.div>

      {/* ===== Text Preview with dynamic typographic grid ===== */}
      <motion.div
        className="relative flex-1 flex items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Dynamic dotted grid — responsive to font size */}
        <TypoGrid fontSize={fontSize} lineCount={lineCount + 1} />

        <div
          className="relative w-full leading-[0.95]"
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: weight,
            fontStyle: italic ? "italic" : "normal",
            letterSpacing: `${spacing * 0.01}em`,
            textAlign: align,
            color: "var(--accent)",
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
          }}
        >
          {title}
          {subtitle && (
            <>
              <br />
              {subtitle}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
