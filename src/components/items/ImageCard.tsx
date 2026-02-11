"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import type { ImageCardImage } from "@/types/canvas";

interface ImageCardProps {
  images: ImageCardImage[];
  caption?: string;
}

/** Fisher-Yates shuffle — returns a new shuffled array */
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ImageCard({ images, caption }: ImageCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [order, setOrder] = useState<number[]>(() =>
    images.map((_, i) => i)
  );

  // Shuffle and advance on click
  const handleClick = useCallback(() => {
    const nextIdx = (currentIndex + 1) % images.length;
    if (nextIdx === 0) {
      // completed a cycle — reshuffle
      setOrder(shuffleArray(images.map((_, i) => i)));
    }
    setCurrentIndex(nextIdx);
  }, [currentIndex, images]);

  const activeImage = useMemo(
    () => images[order[currentIndex]],
    [images, order, currentIndex]
  );

  return (
    <button
      onClick={handleClick}
      className="canvas-card w-full overflow-hidden cursor-pointer group relative rounded-2xl"
      aria-label={`Shuffle image: ${activeImage.alt}`}
    >
      {/* Image — fills the card, no caption below */}
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={order[currentIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={2000}
              height={1000}
              className="w-full h-auto object-cover"
              sizes="380px"
            />
          </motion.div>
        </AnimatePresence>

        {/* Hover overlay — dark gradient with description text sliding up */}
        <div className="absolute inset-0 flex items-end pointer-events-none">
          <div
            className="w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            {/* Gradient backdrop */}
            <div
              className="px-5 pt-12 pb-4"
              style={{
                background:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)",
              }}
            >
              <p
                className="text-[13px] leading-relaxed font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                style={{
                  color: "rgba(255, 255, 255, 0.95)",
                  fontFamily:
                    "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
                }}
              >
                {activeImage.description}
              </p>
            </div>
          </div>
        </div>

        {/* Image counter badge — bottom-right, always visible */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3">
            <span
              className="text-[10px] font-semibold px-2 py-1 rounded-full"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                backdropFilter: "blur(8px)",
              }}
            >
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
