"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IllustrationSlide } from "@/types/desktop";

interface IllustrationWidgetProps {
  slides: IllustrationSlide[];
}

/**
 * Inline swipeable illustration carousel. Replaces the old stickers +
 * IllustrationPopup pair. Lives on the desktop as a passive-but-
 * interactive widget; users can swipe (mouse drag / touch / arrows /
 * dots) to browse the illustration library without leaving the desktop.
 */
export default function IllustrationWidget({ slides }: IllustrationWidgetProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (delta: number) => {
      setDirection(delta);
      setIndex((i) => (i + delta + slides.length) % slides.length);
    },
    [slides.length]
  );

  // Keyboard navigation when widget has focus
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [go]);

  const slide = slides[index];
  const showNav = slides.length > 1;

  return (
    <div className="w-[320px] bg-card-bg border border-card-border rounded-2xl overflow-hidden shadow-[0_6px_16px_-4px_rgba(0,0,0,0.08)]">
      {/* Illustration frame */}
      <div
        className="relative aspect-[4/3] bg-accent-light overflow-hidden"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            drag={showNav ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) go(1);
              else if (info.offset.x > 50) go(-1);
            }}
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            <Image
              src={slide.imageSrc}
              alt={slide.alt}
              width={320}
              height={240}
              className="w-full h-full object-contain p-8 pointer-events-none"
              sizes="320px"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next overlays */}
        {showNav && (
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => go(-1)}
              aria-label="Previous illustration"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white shadow-sm"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => go(1)}
              aria-label="Next illustration"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white shadow-sm"
            >
              <ChevronRight className="size-4" />
            </Button>
          </>
        )}
      </div>

      {/* Caption + dot indicator */}
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <p className="font-display text-sm font-semibold text-text-primary truncate">
          {slide.caption}
        </p>
        {showNav && (
          <div className="flex items-center gap-1.5 shrink-0">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  i === index
                    ? "w-4 h-1.5 bg-accent"
                    : "w-1.5 h-1.5 bg-card-border hover:bg-text-secondary"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
