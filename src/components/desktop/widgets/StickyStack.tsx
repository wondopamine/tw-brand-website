"use client";

import { useState } from "react";
import { motion, useReducedMotion, type MotionValue } from "motion/react";
import StickyWidget from "./StickyWidget";

export interface StickyNote {
  id: string;
  quote: string;
  highlight?: string;
  attribution?: string;
  rotation?: number;
}

interface StickyStackProps {
  notes: StickyNote[];
  /** Shared viewport pointer position — tilts the top card only. */
  pointerX?: MotionValue<number>;
  pointerY?: MotionValue<number>;
}

const DEPTH_Y = 10; // px each card behind peeks below the one above
const DEPTH_SCALE = 0.045;

/**
 * A pile of sticky notes. Only the top note is fully readable; the rest
 * peek out underneath with their natural paper rotations. Clicking (or
 * Enter/Space) sends the top note to the bottom of the pile, shuffling
 * the next quote into view.
 */
export default function StickyStack({ notes, pointerX, pointerY }: StickyStackProps) {
  // Front-to-back render order, as indices into `notes`.
  const [order, setOrder] = useState<number[]>(() => notes.map((_, i) => i));
  const reduceMotion = useReducedMotion();

  if (notes.length === 0) return null;

  const shuffle = () => {
    setOrder(([top, ...rest]) => [...rest, top]);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Shuffle to the next quote (${notes.length} notes)`}
      onClick={shuffle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          shuffle();
        }
      }}
      className="grid w-[240px] cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      style={{ paddingBottom: (notes.length - 1) * DEPTH_Y }}
    >
      {notes.map((note, i) => {
        const depth = order.indexOf(i);
        const isTop = depth === 0;
        return (
          <motion.div
            key={note.id}
            animate={{
              y: depth * DEPTH_Y,
              scale: 1 - depth * DEPTH_SCALE,
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 260, damping: 24, mass: 0.7 }
            }
            style={{
              gridArea: "1 / 1",
              zIndex: notes.length - depth,
              transformOrigin: "top center",
            }}
            aria-hidden={!isTop}
          >
            <StickyWidget
              quote={note.quote}
              highlight={note.highlight}
              attribution={note.attribution}
              rotation={note.rotation}
              pointerX={isTop ? pointerX : undefined}
              pointerY={isTop ? pointerY : undefined}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
