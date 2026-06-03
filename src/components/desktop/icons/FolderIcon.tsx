"use client";

import { motion } from "motion/react";
import { FolderMark } from "@/components/icons";

interface FolderIconProps {
  label: string;
  onClick: () => void;
}

/**
 * Folder icon — uses the brand-specific FolderMark (two-tone TW Blue
 * folder shape) inside the same tile dimensions as DocIcon and AppIcon
 * for visual rhythm. Click opens the corresponding panel as a Window.
 */
export default function FolderIcon({ label, onClick }: FolderIconProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`Open ${label} folder`}
      className="flex flex-col items-center gap-2 w-[112px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-md"
    >
      <div className="w-[88px] h-[88px] flex items-center justify-center">
        <FolderMark width={80} height={64} className="drop-shadow-sm" />
      </div>
      <span className="text-xs font-semibold text-center text-text-primary leading-tight max-w-full break-words">
        {label}
      </span>
    </motion.button>
  );
}
