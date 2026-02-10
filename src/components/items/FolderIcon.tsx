"use client";

import { motion } from "motion/react";

interface FolderIconProps {
  label: string;
  onClick: () => void;
}

export default function FolderIcon({ label, onClick }: FolderIconProps) {
  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center gap-2 cursor-pointer w-full h-full justify-center"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Open ${label} folder`}
    >
      {/* macOS-style folder icon */}
      <svg
        width="80"
        height="64"
        viewBox="0 0 80 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        {/* Folder back */}
        <path
          d="M4 12C4 8.68629 6.68629 6 10 6H28L34 14H70C73.3137 14 76 16.6863 76 20V54C76 57.3137 73.3137 60 70 60H10C6.68629 60 4 57.3137 4 54V12Z"
          style={{ fill: "var(--folder-icon-bg)" }}
        />
        {/* Folder front */}
        <path
          d="M4 24C4 20.6863 6.68629 18 10 18H70C73.3137 18 76 20.6863 76 24V54C76 57.3137 73.3137 60 70 60H10C6.68629 60 4 57.3137 4 54V24Z"
          style={{ fill: "var(--folder-icon-front)" }}
        />
        {/* Folder highlight */}
        <path
          d="M4 24C4 20.6863 6.68629 18 10 18H70C73.3137 18 76 20.6863 76 24V28H4V24Z"
          fill="white"
          fillOpacity="0.15"
        />
      </svg>
      <span
        className="text-xs font-semibold uppercase tracking-[0.15em]"
        style={{ color: "var(--text-primary)" }}
      >
        {label}
      </span>
    </motion.button>
  );
}
