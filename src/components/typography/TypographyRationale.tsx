"use client";

import { ExternalLink } from "lucide-react";
import { fonts, usageGuidelines } from "@/data/typography";

/**
 * The absorbed Typography folder content: per-font rationale + Google
 * Fonts links, then the usage Do/Don't grid.
 */
export default function TypographyRationale() {
  return (
    <div className="space-y-6">
      {fonts.map((font) => (
        <div
          key={font.id}
          className="flex flex-col gap-2 p-4 rounded-lg border border-card-border bg-canvas-bg/50"
        >
          <div className="flex items-center justify-between gap-3">
            <span
              className="text-base font-semibold text-text-primary"
              style={{ fontFamily: font.cssVar }}
            >
              {font.name}
              <span className="ml-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                {font.role}
              </span>
            </span>
            <a
              href={font.resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded"
              aria-label={`Open ${font.resource.label} (external link)`}
            >
              Google Fonts
              <ExternalLink className="size-3" />
            </a>
          </div>
          <p className="text-[13px] leading-relaxed text-text-secondary">
            {font.summary}
          </p>
          <p className="text-[13px] leading-relaxed text-text-secondary">
            <span className="font-semibold text-text-primary">
              Why we picked it:{" "}
            </span>
            {font.rationale}
          </p>
        </div>
      ))}

      {/* Usage Do / Don't — mirrors the PanelBody guideline treatment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          className="rounded-xl p-4"
          style={{
            backgroundColor: "rgba(52, 211, 153, 0.08)",
            border: "1px solid rgba(52, 211, 153, 0.2)",
          }}
        >
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block mb-2">
            Do
          </span>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {usageGuidelines.doText}
          </p>
        </div>
        <div
          className="rounded-xl p-4"
          style={{
            backgroundColor: "rgba(248, 113, 113, 0.08)",
            border: "1px solid rgba(248, 113, 113, 0.2)",
          }}
        >
          <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-2">
            Don&apos;t
          </span>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {usageGuidelines.dontText}
          </p>
        </div>
      </div>
    </div>
  );
}
