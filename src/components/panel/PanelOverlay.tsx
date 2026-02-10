"use client";

import { motion } from "motion/react";

interface PanelOverlayProps {
  onClick: () => void;
}

export default function PanelOverlay({ onClick }: PanelOverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 z-40 backdrop-blur-sm cursor-pointer"
      style={{ backgroundColor: "var(--overlay-bg)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    />
  );
}
