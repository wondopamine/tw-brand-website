"use client";

import type { IllustrationSlide } from "@/types/canvas";

interface IllustrationReelProps {
  thumbnailSrc: string;
  thumbnailAlt: string;
  illustrations: IllustrationSlide[];
  onOpen: (index: number) => void;
}

export default function IllustrationReel({
  thumbnailAlt,
  illustrations,
  onOpen,
}: IllustrationReelProps) {
  return (
    <button
      onClick={() => onOpen(0)}
      className="canvas-card w-full h-full overflow-hidden cursor-pointer flex flex-col items-center justify-center p-6 gap-4"
      aria-label={`View ${thumbnailAlt}`}
    >
      {/* Stacked cards preview */}
      <div className="relative w-24 h-24">
        {[2, 1, 0].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-lg"
            style={{
              backgroundColor: "var(--accent)",
              opacity: 0.2 + i * 0.25,
              transform: `rotate(${(i - 1) * 6}deg) translateY(${-i * 4}px)`,
              border: "1px solid var(--card-border)",
            }}
          />
        ))}
        <div
          className="absolute inset-0 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: "var(--accent-light)",
            border: "1px solid var(--accent)",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ color: "var(--accent)" }}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
      </div>

      <div className="text-center">
        <span
          className="text-sm font-semibold block"
          style={{ color: "var(--text-primary)" }}
        >
          Illustrations
        </span>
        <span
          className="text-xs mt-1 block"
          style={{ color: "var(--text-secondary)" }}
        >
          {illustrations.length} images &middot; Click to view
        </span>
      </div>
    </button>
  );
}
