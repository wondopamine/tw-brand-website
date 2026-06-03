"use client";

import { motion } from "motion/react";
import { FileText } from "lucide-react";

interface DocIconProps {
  label: string;
  onClick: () => void;
}

/**
 * Doc icon — rounded-square tile + glyph + label. Click opens the
 * corresponding doc as a Window overlay. Visual rhythm consistent with
 * AppIcon and FolderIcon (same 88×88 tile, same label treatment).
 */
export default function DocIcon({ label, onClick }: DocIconProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`Open ${label}`}
      className="flex flex-col items-center gap-2 w-[112px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-md"
    >
      <div className="w-[88px] h-[88px] rounded-2xl bg-card-bg border border-card-border shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-center justify-center">
        <FileText className="size-9 text-accent" strokeWidth={1.5} />
      </div>
      <span className="text-xs font-semibold text-center text-text-primary leading-tight max-w-full break-words">
        {label}
      </span>
    </motion.button>
  );
}
