"use client";

import { useState, useEffect, useCallback } from "react";
import type { IllustrationSlide } from "@/types/canvas";
import { Dialog } from "@/components/ui/dialog";

interface IllustrationPopupProps {
  slides: IllustrationSlide[];
  initialIndex: number;
  onClose: () => void;
}

export default function IllustrationPopup({
  slides,
  initialIndex,
  onClose,
}: IllustrationPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Arrow-key navigation; Escape and focus management are handled by Base UI Dialog.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  const slide = slides[currentIndex];

  return (
    <Dialog
      open={true}
      onClose={onClose}
      ariaLabel="Illustration viewer"
      popupClassName="items-center justify-center p-4"
    >
      <div className="relative max-w-4xl w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Slide */}
        <div
          key={currentIndex}
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <div
            className="aspect-video flex items-center justify-center text-6xl"
            style={{ backgroundColor: "var(--accent-light)" }}
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              style={{ color: "var(--accent)", opacity: 0.5 }}
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>

          {slide.caption && (
            <div className="p-6">
              <p className="text-base" style={{ color: "var(--text-primary)" }}>
                {slide.caption}
              </p>
              <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
                {currentIndex + 1} of {slides.length}
              </p>
            </div>
          )}
        </div>

        {/* Navigation arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
              aria-label="Previous illustration"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
              aria-label="Next illustration"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Dots indicator */}
        {slides.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="w-2 h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{
                  backgroundColor: i === currentIndex ? "white" : "rgba(255,255,255,0.3)",
                  transform: i === currentIndex ? "scale(1.3)" : "scale(1)",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
}
