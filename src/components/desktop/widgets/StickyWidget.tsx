"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

interface StickyWidgetProps {
  quote: string;
  highlight?: string;
  attribution?: string;
  rotation?: number;
  /**
   * Shared viewport pointer position (clientX / clientY). When omitted
   * (e.g. the touch-first mobile layout) the parallax tilt is disabled.
   */
  pointerX?: MotionValue<number>;
  pointerY?: MotionValue<number>;
}

const MAX_TILT = 12; // degrees
const FALLOFF = 20; // px of cursor distance per degree of tilt
const SPRING = { stiffness: 150, damping: 18, mass: 0.4 };

/**
 * Sticky-note widget. Always visible on the desktop. Tilts in 3D toward
 * the cursor as it moves across the page (each note pivots around its own
 * centre), layered on top of its resting paper skew. Honours
 * prefers-reduced-motion by holding still.
 */
export default function StickyWidget({
  quote,
  highlight,
  attribution,
  rotation = 0,
  pointerX,
  pointerY,
}: StickyWidgetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const centerX = useMotionValue(0);
  const centerY = useMotionValue(0);
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  const px = pointerX ?? fallbackX;
  const py = pointerY ?? fallbackY;
  // Reactive 0/1 gate fed into the transforms (a ref read inside useTransform
  // would not recompute, so reduced-motion toggles must arrive as a MotionValue).
  const gate = useMotionValue(Boolean(pointerX) ? 1 : 0);

  useEffect(() => {
    const node = ref.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncGate = () => gate.set(Boolean(pointerX) && !mq.matches ? 1 : 0);
    syncGate();

    const measure = () => {
      const r = node?.getBoundingClientRect();
      if (r) {
        centerX.set(r.left + r.width / 2);
        centerY.set(r.top + r.height / 2);
      }
    };
    measure();
    // Re-measure on element resize (font load, reflow) and viewport resize so
    // the pivot tracks the note's real centre rather than its mount position.
    const ro = new ResizeObserver(measure);
    if (node) ro.observe(node);
    window.addEventListener("resize", measure);
    mq.addEventListener("change", syncGate);
    document.fonts?.ready.then(measure).catch(() => {});

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", syncGate);
    };
  }, [centerX, centerY, gate, pointerX]);

  const clamp = (v: number) => Math.max(-MAX_TILT, Math.min(MAX_TILT, v));
  const rotateYTarget = useTransform(
    [px, centerX, gate] as MotionValue<number>[],
    ([pointer, center, on]: number[]) => (on ? clamp((pointer - center) / FALLOFF) : 0)
  );
  const rotateXTarget = useTransform(
    [py, centerY, gate] as MotionValue<number>[],
    ([pointer, center, on]: number[]) => (on ? clamp(-(pointer - center) / FALLOFF) : 0)
  );
  const rotateY = useSpring(rotateYTarget, SPRING);
  const rotateX = useSpring(rotateXTarget, SPRING);

  const renderQuote = () => {
    if (!highlight) return <span>{quote}</span>;
    const parts = quote.split(highlight);
    if (parts.length < 2) return <span>{quote}</span>;
    return (
      <>
        {parts[0]}
        <mark className="bg-white/50 px-0.5 rounded-sm">{highlight}</mark>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        rotate: rotation,
        transformPerspective: 800,
      }}
      className="w-[240px] select-text rounded-sm bg-quote-highlight p-4 shadow-[0_6px_16px_-4px_rgba(0,0,0,0.15),0_2px_4px_-2px_rgba(0,0,0,0.08)]"
    >
      <blockquote className="font-display text-[14px] leading-[1.4] font-medium text-text-primary">
        &ldquo;{renderQuote()}&rdquo;
      </blockquote>
      {attribution && (
        <p className="mt-3 text-[11px] font-medium text-text-primary/70">
          &mdash; {attribution}
        </p>
      )}
    </motion.div>
  );
}
