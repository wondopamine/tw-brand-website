"use client";

import type { ModalContent, ModalSection } from "@/types/modal";

/**
 * Renderer for doc content sourced from modal-contents.ts. Restored
 * from the deleted CardModal.tsx as a standalone component. Handles
 * the 8 section types: heading, paragraph, list, quote, divider,
 * highlight-box, two-column, quadrant.
 */

function SectionRenderer({ section }: { section: ModalSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h3 className="font-display text-[20px] font-semibold tracking-tight leading-snug text-text-primary">
          {section.title}
        </h3>
      );

    case "paragraph":
      return (
        <p className="text-[15px] leading-[1.7] text-text-secondary">
          {section.content}
        </p>
      );

    case "list":
      return (
        <ul className="space-y-2.5">
          {section.items?.map((item, i) => (
            <li
              key={i}
              className="text-[15px] leading-[1.6] flex items-start gap-3 text-text-secondary"
            >
              <span className="mt-[9px] w-1 h-1 rounded-full shrink-0 bg-text-secondary opacity-40" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="border-l-[2px] border-accent pl-5 py-2">
          <p className="text-[15px] italic leading-[1.7] text-text-primary">
            &ldquo;{section.content}&rdquo;
          </p>
          {section.title && (
            <p className="text-[13px] mt-3 font-medium text-text-secondary opacity-70">
              &mdash; {section.title}
            </p>
          )}
        </blockquote>
      );

    case "divider":
      return <div className="my-2 h-px bg-card-border opacity-60" />;

    case "highlight-box":
      return (
        <div
          className={`py-5 px-6 rounded-lg ${
            section.variant === "accent"
              ? "bg-accent/[0.04] border-l-[3px] border-accent"
              : "bg-black/[0.02] border-l-[3px] border-card-border"
          }`}
        >
          {section.title && (
            <h4
              className={`text-[15px] font-semibold mb-2 tracking-tight ${
                section.variant === "accent" ? "text-accent" : "text-text-primary"
              }`}
            >
              {section.title}
            </h4>
          )}
          <p className="text-[14px] leading-[1.7] whitespace-pre-line text-text-secondary">
            {section.content}
          </p>
        </div>
      );

    case "two-column":
      return (
        <div className="grid grid-cols-2 gap-8">
          {section.columns?.map((col, i) => (
            <div key={i}>
              <span className="text-[13px] font-semibold block mb-3 tracking-tight text-text-primary">
                {col.title}
              </span>
              <ul className="space-y-2">
                {col.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-[14px] leading-[1.6] flex items-start gap-2.5 text-text-secondary"
                  >
                    <span className="mt-[8px] w-1 h-1 rounded-full shrink-0 bg-text-secondary opacity-30" />
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
          <div className="absolute left-1/2 top-4 bottom-4 w-px bg-card-border" />
          <div className="absolute top-1/2 left-4 right-4 h-px bg-card-border" />
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-widest text-text-secondary opacity-60">
            {section.quadrantLabels.yAxis}
          </span>
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-widest rotate-90 origin-center text-text-secondary opacity-60">
            {section.quadrantLabels.xAxis}
          </span>
          <div className="absolute top-4 left-4 right-1/2 bottom-1/2 flex items-center justify-center p-3">
            <span className="text-[13px] text-center whitespace-pre-line leading-tight text-text-secondary opacity-60">
              {section.quadrantLabels.topLeft}
            </span>
          </div>
          <div className="absolute top-4 left-1/2 right-4 bottom-1/2 flex items-center justify-center p-3 rounded-lg bg-accent/[0.05]">
            <span className="text-[13px] text-center whitespace-pre-line leading-tight font-semibold text-accent">
              {section.quadrantLabels.topRight}
            </span>
          </div>
          <div className="absolute top-1/2 left-4 right-1/2 bottom-4 flex items-center justify-center p-3">
            <span className="text-[13px] text-center whitespace-pre-line leading-tight text-text-secondary opacity-60">
              {section.quadrantLabels.bottomLeft}
            </span>
          </div>
          <div className="absolute top-1/2 left-1/2 right-4 bottom-4 flex items-center justify-center p-3">
            <span className="text-[13px] text-center whitespace-pre-line leading-tight text-text-secondary opacity-60">
              {section.quadrantLabels.bottomRight}
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function DocContent({ content }: { content: ModalContent }) {
  return (
    <div className="space-y-6">
      {content.subtitle && (
        <p className="text-[14px] text-text-secondary leading-relaxed -mt-1 mb-2">
          {content.subtitle}
        </p>
      )}
      {content.sections.map((section, i) => (
        <SectionRenderer key={i} section={section} />
      ))}
    </div>
  );
}
