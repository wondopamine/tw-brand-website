"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ModalContent, ModalSection } from "@/data/modal-contents";

interface CardModalProps {
  content: ModalContent | null;
  onClose: () => void;
}

/* ------------------------------------------------------------------ */
/*  Linear-inspired Section Renderer                                   */
/*  Minimal, typography-driven hierarchy. No excessive color usage.     */
/*  TW blue (--accent / #0064FF) used only for emphasis moments.       */
/* ------------------------------------------------------------------ */
function SectionRenderer({ section }: { section: ModalSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h3
          className="text-[20px] font-semibold tracking-tight"
          style={{
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
            color: "var(--text-primary)",
            lineHeight: 1.33,
            letterSpacing: "-0.012em",
          }}
        >
          {section.title}
        </h3>
      );

    case "paragraph":
      return (
        <p
          className="text-[15px] leading-[1.7]"
          style={{ color: "var(--text-secondary)" }}
        >
          {section.content}
        </p>
      );

    case "list":
      return (
        <ul className="space-y-2.5 ml-0">
          {section.items?.map((item, i) => (
            <li
              key={i}
              className="text-[15px] leading-[1.6] flex items-start gap-3"
              style={{ color: "var(--text-secondary)" }}
            >
              <span
                className="mt-[9px] w-1 h-1 rounded-full shrink-0"
                style={{ backgroundColor: "var(--text-secondary)", opacity: 0.4 }}
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote
          className="border-l-[2px] pl-5 py-2"
          style={{ borderColor: "var(--accent)" }}
        >
          <p
            className="text-[15px] italic leading-[1.7]"
            style={{ color: "var(--text-primary)" }}
          >
            &ldquo;{section.content}&rdquo;
          </p>
          {section.title && (
            <p
              className="text-[13px] mt-3 font-medium"
              style={{ color: "var(--text-secondary)", opacity: 0.7 }}
            >
              &mdash; {section.title}
            </p>
          )}
        </blockquote>
      );

    case "divider":
      return (
        <div
          className="my-2"
          style={{
            height: 1,
            backgroundColor: "var(--card-border)",
            opacity: 0.6,
          }}
        />
      );

    case "highlight-box":
      return (
        <div
          className="py-5 px-6 rounded-lg"
          style={{
            backgroundColor:
              section.variant === "accent"
                ? "rgba(0, 100, 255, 0.04)"
                : "rgba(0, 0, 0, 0.02)",
            borderLeft: section.variant === "accent"
              ? "3px solid var(--accent)"
              : "3px solid var(--card-border)",
          }}
        >
          {section.title && (
            <h4
              className="text-[15px] font-semibold mb-2 tracking-tight"
              style={{
                color: section.variant === "accent"
                  ? "var(--accent)"
                  : "var(--text-primary)",
              }}
            >
              {section.title}
            </h4>
          )}
          <p
            className="text-[14px] leading-[1.7] whitespace-pre-line"
            style={{ color: "var(--text-secondary)" }}
          >
            {section.content}
          </p>
        </div>
      );

    case "two-column":
      return (
        <div className="grid grid-cols-2 gap-8">
          {section.columns?.map((col, i) => (
            <div key={i}>
              <span
                className="text-[13px] font-semibold block mb-3 tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {col.title}
              </span>
              <ul className="space-y-2">
                {col.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-[14px] leading-[1.6] flex items-start gap-2.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="mt-[8px] w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: "var(--text-secondary)", opacity: 0.3 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "quadrant":
      if (!section.quadrantLabels) return null;
      return (
        <div className="relative h-[260px] mx-auto max-w-[400px]">
          <div
            className="absolute left-1/2 top-4 bottom-4 w-px"
            style={{ backgroundColor: "var(--card-border)" }}
          />
          <div
            className="absolute top-1/2 left-4 right-4 h-px"
            style={{ backgroundColor: "var(--card-border)" }}
          />
          <span
            className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-secondary)", opacity: 0.6 }}
          >
            {section.quadrantLabels.yAxis}
          </span>
          <span
            className="absolute top-1/2 -right-1 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-widest rotate-90 origin-center"
            style={{ color: "var(--text-secondary)", opacity: 0.6 }}
          >
            {section.quadrantLabels.xAxis}
          </span>
          <div className="absolute top-4 left-4 right-1/2 bottom-1/2 flex items-center justify-center p-3">
            <span
              className="text-[13px] text-center whitespace-pre-line leading-tight"
              style={{ color: "var(--text-secondary)", opacity: 0.6 }}
            >
              {section.quadrantLabels.topLeft}
            </span>
          </div>
          <div
            className="absolute top-4 left-1/2 right-4 bottom-1/2 flex items-center justify-center p-3 rounded-lg"
            style={{ backgroundColor: "rgba(0, 100, 255, 0.05)" }}
          >
            <span
              className="text-[13px] text-center whitespace-pre-line leading-tight font-semibold"
              style={{ color: "var(--accent)" }}
            >
              {section.quadrantLabels.topRight}
            </span>
          </div>
          <div className="absolute top-1/2 left-4 right-1/2 bottom-4 flex items-center justify-center p-3">
            <span
              className="text-[13px] text-center whitespace-pre-line leading-tight"
              style={{ color: "var(--text-secondary)", opacity: 0.6 }}
            >
              {section.quadrantLabels.bottomLeft}
            </span>
          </div>
          <div className="absolute top-1/2 left-1/2 right-4 bottom-4 flex items-center justify-center p-3">
            <span
              className="text-[13px] text-center whitespace-pre-line leading-tight"
              style={{ color: "var(--text-secondary)", opacity: 0.6 }}
            >
              {section.quadrantLabels.bottomRight}
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function CardModal({ content, onClose }: CardModalProps) {
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

          {/* Modal — Linear-inspired centered prose */}
          <motion.div
            className="fixed inset-0 z-[70] overflow-y-auto pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="min-h-full flex items-start justify-center py-16 sm:py-20 px-4 sm:px-6">
              <motion.div
                className="relative w-full max-w-[680px] flex flex-col pointer-events-auto cursor-default rounded-2xl overflow-hidden"
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

                {/* Header — generous whitespace, no border below */}
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
                  {content.subtitle && (
                    <p
                      className="text-[15px] mt-3 leading-[1.6]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {content.subtitle}
                    </p>
                  )}
                </div>

                {/* Thin separator */}
                <div
                  className="mx-10 mt-4"
                  style={{ height: 1, backgroundColor: "var(--card-border)", opacity: 0.6 }}
                />

                {/* Content — Linear-style prose spacing */}
                <div className="px-10 py-8">
                  <div className="space-y-6">
                    {content.sections.map((section, i) => (
                      <SectionRenderer key={i} section={section} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
