"use client";

import { useState, useEffect, useCallback } from "react";
import type { IllustrationSlide } from "@/types/canvas";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "@/components/icons";

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
    <Dialog open={true} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-4xl sm:max-w-4xl w-full p-4 bg-transparent border-0 ring-0 shadow-none"
      >
        <DialogTitle className="sr-only">Illustration viewer</DialogTitle>
        <div className="relative w-full">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-12 right-0 rounded-full text-white/80 hover:text-white hover:bg-transparent"
        >
          <X className="size-6" />
        </Button>

        {/* Slide */}
        <div
          key={currentIndex}
          className="rounded-2xl overflow-hidden bg-card-bg border border-card-border"
        >
          <div className="aspect-video flex items-center justify-center text-6xl bg-accent-light">
            <ImageIcon
              className="text-accent opacity-50"
              strokeWidth={0.5}
              size={120}
            />
          </div>

          {slide.caption && (
            <div className="p-6">
              <p className="text-base text-text-primary">{slide.caption}</p>
              <p className="text-sm mt-2 text-text-secondary">
                {currentIndex + 1} of {slides.length}
              </p>
            </div>
          )}
        </div>

        {/* Navigation arrows */}
        {slides.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon-lg"
              onClick={goPrev}
              aria-label="Previous illustration"
              className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 text-white/60 hover:text-white hover:bg-black/50"
            >
              <ChevronLeft className="size-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon-lg"
              onClick={goNext}
              aria-label="Next illustration"
              className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 text-white/60 hover:text-white hover:bg-black/50"
            >
              <ChevronRight className="size-6" />
            </Button>
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
      </DialogContent>
    </Dialog>
  );
}
