"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { PanelContent } from "@/types/panel";
import PanelBody from "./PanelBody";

interface PanelDrawerProps {
  content: PanelContent | null;
  onClose: () => void;
}

export default function PanelDrawer({ content, onClose }: PanelDrawerProps) {
  const isOpen = content !== null;

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && content && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 backdrop-blur-sm cursor-pointer"
            style={{ backgroundColor: "var(--overlay-bg)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            className="fixed right-0 top-0 h-full w-full sm:w-[480px] z-50 flex flex-col"
            style={{
              backgroundColor: "var(--card-bg)",
              borderLeft: "1px solid var(--card-border)",
              boxShadow: "-8px 0 30px var(--shadow-lg)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b shrink-0"
              style={{ borderColor: "var(--card-border)" }}
            >
              <h2
                className="text-lg font-bold uppercase tracking-wider"
                style={{
                  fontFamily: "var(--font-display, 'Sora', sans-serif)",
                  color: "var(--text-primary)",
                }}
              >
                {content.title}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-70"
                style={{ color: "var(--text-secondary)" }}
                aria-label="Close panel"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {content.description && (
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {content.description}
                </p>
              )}
              <PanelBody items={content.items} />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
