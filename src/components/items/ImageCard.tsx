"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import type { ImageCardImage } from "@/types/canvas";
import { Card } from "@/components/ui/card";

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

export default function ImageCard({ images }: ImageCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [order, setOrder] = useState<number[]>(() =>
    images.map((_, i) => i)
  );

  const handleClick = useCallback(() => {
    const nextIdx = (currentIndex + 1) % images.length;
    if (nextIdx === 0) {
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
      className="w-full h-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-2xl"
      aria-label={`Shuffle image: ${activeImage.alt}`}
    >
      <Card className="p-0 gap-0 group relative">
        {/* Image — fills the card */}
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
                width={760}
                height={412}
                className="w-full h-auto object-cover"
                sizes="380px"
              />
            </motion.div>
          </AnimatePresence>

          {/* Hover overlay — dark gradient with description sliding up */}
          <div className="absolute inset-0 flex items-end pointer-events-none">
            <div className="w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <div className="px-5 pt-12 pb-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <p className="font-display text-[13px] leading-relaxed font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-white/95">
                  {activeImage.description}
                </p>
              </div>
            </div>
          </div>

          {/* Image counter badge */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3">
              <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-black/35 text-white/90 backdrop-blur-sm">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>
      </Card>
    </button>
  );
}
