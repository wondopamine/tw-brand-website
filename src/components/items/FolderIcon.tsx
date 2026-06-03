"use client";

import { motion } from "motion/react";
import { FolderMark } from "@/components/icons";

interface FolderIconProps {
  label: string;
  onClick: () => void;
}

export default function FolderIcon({ label, onClick }: FolderIconProps) {
  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center gap-2 w-full h-full justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-md"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Open ${label} folder`}
    >
      <FolderMark className="drop-shadow-md" />
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-text-primary">
        {label}
      </span>
    </motion.button>
  );
}
