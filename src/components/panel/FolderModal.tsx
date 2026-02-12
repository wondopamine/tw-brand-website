"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { PanelContent } from "@/types/panel";
import PanelBody from "./PanelBody";

interface FolderModalProps {
  content: PanelContent | null;
  onClose: () => void;
}

export default function FolderModal({ content, onClose }: FolderModalProps) {
  const isOpen = content !== null;

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

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
          {/* Overlay — click to close */}
          <motion.div
            className="fixed inset-0 z-[60] cursor-default"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Centered modal — same pattern as CardModal */}
          <motion.div
            className="fixed inset-0 z-[70] overflow-y-auto pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="min-h-full flex items-start justify-center py-12 sm:py-16 px-4 sm:px-6">
              <motion.div
                className="relative w-full max-w-[960px] flex flex-col rounded-2xl overflow-hidden pointer-events-auto cursor-default"
                style={{
                  backgroundColor: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.03)",
                }}
                initial={{ opacity: 0, scale: 0.96, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 30 }}
                transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.8 }}
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-black/5 cursor-pointer"
                  style={{
                    color: "var(--text-secondary)",
                    border: "1px solid var(--card-border)",
                    backgroundColor: "var(--card-bg)",
                  }}
                  aria-label="Close modal"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Header */}
                <div className="px-12 pt-12 pb-8 shrink-0">
                  <h2
                    className="text-3xl sm:text-4xl font-bold pr-14"
                    style={{
                      fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {content.title}
                  </h2>
                  {content.description && (
                    <p
                      className="text-base mt-3 leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {content.description}
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div className="mx-12 h-px" style={{ backgroundColor: "var(--card-border)" }} />

                {/* Content — renders PanelBody with all interactive items */}
                <div className="px-12 py-10">
                  <PanelBody items={content.items} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
