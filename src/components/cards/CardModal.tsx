"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ModalContent, ModalSection } from "@/data/modal-contents";

interface CardModalProps {
  content: ModalContent | null;
  onClose: () => void;
}

function SectionRenderer({ section }: { section: ModalSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h3
          className="text-xl font-bold mt-4"
          style={{
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
            color: "var(--text-primary)",
          }}
        >
          {section.title}
        </h3>
      );

    case "paragraph":
      return (
        <p
          className="text-[15px] leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {section.content}
        </p>
      );

    case "list":
      return (
        <ul className="space-y-3">
          {section.items?.map((item, i) => (
            <li
              key={i}
              className="text-[15px] leading-relaxed flex items-start gap-3"
              style={{ color: "var(--text-secondary)" }}
            >
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "var(--accent)" }}
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote
          className="border-l-2 pl-5 py-3 my-2"
          style={{ borderColor: "var(--accent)" }}
        >
          <p
            className="text-[15px] italic leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            &ldquo;{section.content}&rdquo;
          </p>
          {section.title && (
            <p
              className="text-xs mt-3 font-medium uppercase tracking-wider"
              style={{ color: "var(--text-secondary)" }}
            >
              &mdash; {section.title}
            </p>
          )}
        </blockquote>
      );

    case "divider":
      return (
        <div
          className="h-px my-4"
          style={{ backgroundColor: "var(--card-border)" }}
        />
      );

    case "highlight-box":
      return (
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor:
              section.variant === "accent"
                ? "var(--accent-light)"
                : "rgba(0,0,0,0.02)",
            border: `1px solid ${
              section.variant === "accent"
                ? "rgba(0, 100, 255, 0.15)"
                : "var(--card-border)"
            }`,
          }}
        >
          {section.title && (
            <h4
              className="text-[15px] font-bold mb-2"
              style={{
                color:
                  section.variant === "accent"
                    ? "var(--accent)"
                    : "var(--text-primary)",
              }}
            >
              {section.title}
            </h4>
          )}
          <p
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ color: "var(--text-secondary)" }}
          >
            {section.content}
          </p>
        </div>
      );

    case "two-column":
      return (
        <div className="grid grid-cols-2 gap-4">
          {section.columns?.map((col, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{
                backgroundColor:
                  i === 0
                    ? "rgba(52, 211, 153, 0.06)"
                    : "rgba(248, 113, 113, 0.06)",
                border: `1px solid ${
                  i === 0
                    ? "rgba(52, 211, 153, 0.15)"
                    : "rgba(248, 113, 113, 0.15)"
                }`,
              }}
            >
              <span
                className={`text-xs font-bold uppercase tracking-wider block mb-3 ${
                  i === 0 ? "text-emerald-500" : "text-red-400"
                }`}
              >
                {col.title}
              </span>
              <ul className="space-y-2">
                {col.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
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
        <div className="relative h-[280px] mx-auto max-w-[420px]">
          <div
            className="absolute left-1/2 top-2 bottom-2 w-px"
            style={{ backgroundColor: "var(--card-border)" }}
          />
          <div
            className="absolute top-1/2 left-2 right-2 h-px"
            style={{ backgroundColor: "var(--card-border)" }}
          />
          <span
            className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-secondary)" }}
          >
            {section.quadrantLabels.yAxis}
          </span>
          <span
            className="absolute top-1/2 -right-1 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-widest rotate-90 origin-center"
            style={{ color: "var(--text-secondary)" }}
          >
            {section.quadrantLabels.xAxis}
          </span>
          <div className="absolute top-3 left-3 right-1/2 bottom-1/2 flex items-center justify-center p-2">
            <span
              className="text-xs text-center whitespace-pre-line leading-tight"
              style={{ color: "var(--text-secondary)" }}
            >
              {section.quadrantLabels.topLeft}
            </span>
          </div>
          <div
            className="absolute top-3 left-1/2 right-3 bottom-1/2 flex items-center justify-center p-2 rounded-lg"
            style={{ backgroundColor: "var(--accent-light)" }}
          >
            <span
              className="text-xs text-center whitespace-pre-line leading-tight font-bold"
              style={{ color: "var(--accent)" }}
            >
              {section.quadrantLabels.topRight}
            </span>
          </div>
          <div className="absolute top-1/2 left-3 right-1/2 bottom-3 flex items-center justify-center p-2">
            <span
              className="text-xs text-center whitespace-pre-line leading-tight"
              style={{ color: "var(--text-secondary)" }}
            >
              {section.quadrantLabels.bottomLeft}
            </span>
          </div>
          <div className="absolute top-1/2 left-1/2 right-3 bottom-3 flex items-center justify-center p-2">
            <span
              className="text-xs text-center whitespace-pre-line leading-tight"
              style={{ color: "var(--text-secondary)" }}
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

          {/* Centered modal — Stripe-style wide scrollable overlay */}
          <motion.div
            className="fixed inset-0 z-[70] overflow-y-auto pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Centering wrapper — allows modal to be taller than viewport and scroll */}
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
                {/* Close button — fixed in corner */}
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
                  {content.subtitle && (
                    <p
                      className="text-base mt-3 leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {content.subtitle}
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div className="mx-12 h-px" style={{ backgroundColor: "var(--card-border)" }} />

                {/* Content — all inline, scrolls with page */}
                <div className="px-12 py-10">
                  <div className="space-y-8">
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
