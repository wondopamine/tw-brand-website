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
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-[60] cursor-default"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal — Linear-inspired centered layout */}
          <motion.div
            className="fixed inset-0 z-[70] overflow-y-auto pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="min-h-full flex items-start justify-center py-16 sm:py-20 px-4 sm:px-6">
              <motion.div
                className="relative w-full max-w-[680px] flex flex-col rounded-2xl overflow-hidden pointer-events-auto cursor-default"
                style={{
                  backgroundColor: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.2)",
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ type: "spring", damping: 32, stiffness: 400, mass: 0.7 }}
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-opacity hover:opacity-60 cursor-pointer"
                  style={{ color: "var(--text-secondary)" }}
                  aria-label="Close modal"
                >
                  <svg
                    width="16"
                    height="16"
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
                <div className="px-10 pt-10 pb-2 shrink-0">
                  <h2
                    className="text-[28px] sm:text-[32px] font-bold pr-10 tracking-tight"
                    style={{
                      fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
                      color: "var(--text-primary)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.022em",
                    }}
                  >
                    {content.title}
                  </h2>
                  {content.description && (
                    <p
                      className="text-[15px] mt-3 leading-[1.6]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {content.description}
                    </p>
                  )}
                </div>

                {/* Thin separator */}
                <div
                  className="mx-10 mt-4"
                  style={{ height: 1, backgroundColor: "var(--card-border)", opacity: 0.6 }}
                />

                {/* Content */}
                <div className="px-10 py-8">
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
