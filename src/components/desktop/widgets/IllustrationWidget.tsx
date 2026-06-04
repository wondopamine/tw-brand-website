"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { IllustrationSlide } from "@/types/desktop";

interface IllustrationWidgetProps {
  slides: IllustrationSlide[];
}

const INTERVAL = 4500; // ms between auto-crossfades

/**
 * A framed-photo widget for the desktop, modelled on the macOS Photos
 * widget: the image fills the rounded card edge to edge (no inner
 * matting), and it quietly crossfades through the illustration library on
 * its own. Clicking (or Enter/Space) skips ahead to the next illustration
 * and restarts the timer. Cycling pauses while hovered and respects
 * prefers-reduced-motion (no auto-advance; click still works).
 */
export default function IllustrationWidget({ slides }: IllustrationWidgetProps) {
  const [index, setIndex] = useState(0);
  // Bumped on every manual advance so the auto timer restarts from zero
  // instead of firing right after a click.
  const [timerEpoch, setTimerEpoch] = useState(0);
  const paused = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (slides.length <= 1 || reduceMotion) return;

    const id = window.setInterval(() => {
      // Hold while hovered or when the tab is backgrounded (avoids queued
      // crossfades snapping on return).
      if (paused.current || document.hidden) return;
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL);

    return () => window.clearInterval(id);
  }, [slides.length, reduceMotion, timerEpoch]);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
    setTimerEpoch((e) => e + 1);
  }, [slides.length]);

  const slide = slides[index];
  if (!slide) return null;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Show next illustration (${index + 1} of ${slides.length})`}
      onClick={advance}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          advance();
        }
      }}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className="group relative aspect-square w-[240px] cursor-pointer select-none overflow-hidden rounded-[18px] bg-white shadow-[0_3px_10px_-4px_rgba(20,40,90,0.14)] ring-1 ring-black/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.99 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0"
          aria-hidden={false}
        >
          <Image
            src={slide.imageSrc}
            alt={slide.alt}
            fill
            sizes="240px"
            className="object-cover"
            draggable={false}
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Position dots — visible on hover/focus so the widget stays quiet */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {slides.map((s, i) => (
          <span
            key={s.id}
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
              i === index ? "bg-white" : "bg-white/45"
            }`}
            style={{
              boxShadow: "0 0 3px rgba(0,0,0,0.35)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
