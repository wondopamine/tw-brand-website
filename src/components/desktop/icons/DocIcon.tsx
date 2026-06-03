"use client";

import { motion } from "motion/react";

interface DocIconProps {
  label: string;
  onClick: () => void;
}

/**
 * macOS-style document icon. Draws the real Finder document shape — a
 * portrait page with a folded top-right corner and a "DOC" type badge —
 * sitting directly on the wallpaper (no app-tile card). Every document
 * is the same file type, so every icon looks identical; the label
 * distinguishes them, exactly like a folder of .doc files in Finder.
 */
export default function DocIcon({ label, onClick }: DocIconProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`Open ${label}`}
      className="group flex w-[112px] cursor-pointer flex-col items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div className="flex h-[88px] w-[88px] items-end justify-center pb-1">
        <DocPage />
      </div>
      <span className="max-w-full break-words text-center text-xs font-medium leading-tight text-text-primary [text-shadow:0_1px_3px_rgba(255,255,255,0.7)]">
        {label}
      </span>
    </motion.button>
  );
}

const LINE_WIDTHS = [34, 30, 36, 26, 32];

function DocPage() {
  return (
    <svg
      width={64}
      height={80}
      viewBox="0 0 72 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_5px_10px_rgba(30,50,90,0.20)]"
      aria-hidden
    >
      {/* Page body with folded top-right corner */}
      <path
        d="M15 7 L44 7 L63 26 L63 78 Q63 84 57 84 L15 84 Q9 84 9 78 L9 13 Q9 7 15 7 Z"
        fill="url(#page-grad)"
        stroke="#D7DBE3"
        strokeWidth={1}
      />
      {/* Folded corner (back of page) */}
      <path d="M44 7 L63 26 L50 26 Q44 26 44 20 Z" fill="#E6E9EF" />
      <path d="M44 7 L63 26 L50 26 Q44 26 44 20 Z" fill="url(#fold-shadow)" />
      <line x1={44} y1={8} x2={44} y2={20} stroke="#D7DBE3" strokeWidth={0.75} />

      {/* TextEdit-style content lines */}
      {LINE_WIDTHS.map((w, i) => (
        <rect
          key={i}
          x={18}
          y={34 + i * 6}
          width={w}
          height={2.4}
          rx={1.2}
          fill="#C7CCD6"
        />
      ))}

      {/* File-type badge */}
      <rect x={17} y={64} width={38} height={13} rx={3.5} fill="var(--accent)" />
      <text
        x={36}
        y={73.2}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize={7.5}
        fontWeight={700}
        letterSpacing={0.6}
        fill="#FFFFFF"
      >
        DOC
      </text>

      <defs>
        <linearGradient id="page-grad" x1="36" y1="7" x2="36" y2="84" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F4F6FA" />
        </linearGradient>
        <linearGradient id="fold-shadow" x1="44" y1="7" x2="56" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CBD0DA" stopOpacity={0.9} />
          <stop offset="1" stopColor="#E6E9EF" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}
