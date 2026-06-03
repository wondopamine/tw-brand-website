"use client";

import { motion } from "motion/react";
import { ExternalLink, Sparkles } from "lucide-react";

interface AppIconProps {
  label: string;
  href: string;
}

/**
 * App icon — same tile size as DocIcon/FolderIcon, but with a brand-
 * accented background and an external-link badge to signal "this opens
 * elsewhere." Renders as an <a target="_blank" rel="noopener noreferrer">.
 */
export default function AppIcon({ label, href }: AppIconProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`Open ${label} (external app, opens in new tab)`}
      className="flex flex-col items-center gap-2 w-[112px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-md"
    >
      <div className="relative w-[88px] h-[88px] rounded-2xl bg-accent shadow-[0_1px_3px_rgba(0,100,255,0.25)] flex items-center justify-center">
        <Sparkles className="size-9 text-white" strokeWidth={1.5} />
        {/* External-link badge — bottom-right corner */}
        <div className="absolute bottom-1 right-1 w-5 h-5 rounded-md bg-white/95 flex items-center justify-center shadow-sm">
          <ExternalLink className="size-3 text-accent" strokeWidth={2.5} />
        </div>
      </div>
      <span className="text-xs font-semibold text-center text-text-primary leading-tight max-w-full break-words">
        {label}
      </span>
    </motion.a>
  );
}
