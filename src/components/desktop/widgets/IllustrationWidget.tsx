"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import type { IllustrationSlide } from "@/types/desktop";

interface IllustrationWidgetProps {
  slides: IllustrationSlide[];
}

const INTERVAL = 4500; // ms between auto-crossfades

/**
 * A passive framed-photo widget for the desktop, modelled on the macOS
 * Photos widget: the image fills the rounded card edge to edge (no inner
 * matting), and it quietly crossfades through the illustration library on
 * its own. Cycling pauses while hovered and respects
 * prefers-reduced-motion (holds on the first image).
 */
export default function IllustrationWidget({ slides }: IllustrationWidgetProps) {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (slides.length <= 1) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const id = window.setInterval(() => {
      // Hold while hovered or when the tab is backgrounded (avoids queued
      // crossfades snapping on return).
      if (paused.current || document.hidden) return;
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL);

    return () => window.clearInterval(id);
  }, [slides.length]);

  const slide = slides[index];
  if (!slide) return null;

  return (
    <div
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      className="relative aspect-square w-[240px] overflow-hidden rounded-[18px] bg-white shadow-[0_3px_10px_-4px_rgba(20,40,90,0.14)] ring-1 ring-black/[0.04]"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
    </div>
  );
}
