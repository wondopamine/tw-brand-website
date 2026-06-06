"use client";

import { motion } from "motion/react";
import { ExternalLink, Sparkles } from "lucide-react";

type AppIconProps = {
  label: string;
  icon?: React.ReactNode;
} & (
  | { href: string; onClick?: never }
  | { href?: never; onClick: () => void }
);

const TILE_CLASS =
  "flex flex-col items-center gap-2 w-[112px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-md";

/**
 * App icon — same tile size as DocIcon/FolderIcon, with a brand-accented
 * background. Two modes:
 *   • href    — external app: <a target="_blank"> with an external-link badge
 *   • onClick — in-OS app: <button> opening a window, no badge
 */
export default function AppIcon({ label, href, onClick, icon }: AppIconProps) {
  const tile = (
    <>
      <div className="relative w-[88px] h-[88px] rounded-2xl bg-accent shadow-[0_1px_3px_rgba(0,100,255,0.25)] flex items-center justify-center">
        {icon ?? <Sparkles className="size-9 text-white" strokeWidth={1.5} />}
        {/* External-link badge — bottom-right corner, external apps only */}
        {href && (
          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-md bg-white/95 flex items-center justify-center shadow-sm">
            <ExternalLink className="size-3 text-accent" strokeWidth={2.5} />
          </div>
        )}
      </div>
      <span className="text-xs font-semibold text-center text-text-primary leading-tight max-w-full break-words">
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        aria-label={`Open ${label} (external app, opens in new tab)`}
        className={TILE_CLASS}
      >
        {tile}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`Open ${label}`}
      className={TILE_CLASS}
    >
      {tile}
    </motion.button>
  );
}
