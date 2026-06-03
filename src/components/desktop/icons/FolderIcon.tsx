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
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`Open ${label} folder`}
      className="flex flex-col items-center gap-2 w-[112px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-md"
    >
      <div className="w-[88px] h-[88px] flex items-end justify-center pb-2">
        <FolderMark width={82} height={66} className="drop-shadow-[0_5px_10px_rgba(30,50,90,0.20)]" />
      </div>
      <span className="max-w-full break-words text-center text-xs font-medium leading-tight text-text-primary [text-shadow:0_1px_3px_rgba(255,255,255,0.7)]">
        {label}
      </span>
    </motion.button>
  );
}
