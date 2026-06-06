"use client";

import { fonts, type FontId } from "@/data/typography";

const SAMPLE = "Teaching, with the friction removed.";

/**
 * Geist-style "weights at a glance": one live-rendered row per loaded
 * weight, per font. Clicking a row loads that font + weight into the
 * try-it preview.
 */
export default function WeightList({
  onTryWeight,
}: {
  onTryWeight: (fontId: FontId, weight: number) => void;
}) {
  return (
    <div className="space-y-8">
      {fonts.map((font) => (
        <div key={font.id}>
          <div className="flex items-baseline gap-2 mb-2">
            <h4
              className="text-sm font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {font.name}
            </h4>
            <span
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-secondary)" }}
            >
              {font.role}
            </span>
          </div>

          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid var(--card-border)" }}
          >
            {font.weights.map((w, i) => (
              <button
                key={w.value}
                type="button"
                onClick={() => onTryWeight(font.id, w.value)}
                title={`Try ${font.name} ${w.label} in the playground`}
                className="group flex w-full items-baseline gap-4 px-4 py-3 text-left transition-colors cursor-pointer hover:bg-black/[0.02]"
                style={{
                  borderTop: i > 0 ? "1px solid var(--card-border)" : undefined,
                }}
              >
                <span
                  className="w-24 shrink-0 text-[11px] font-medium tabular-nums"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {w.label}
                  <span className="opacity-60"> · {w.value}</span>
                </span>
                <span
                  className="flex-1 truncate text-[22px] leading-snug"
                  style={{
                    fontFamily: font.cssVar,
                    fontWeight: w.value,
                    color: "var(--text-primary)",
                  }}
                >
                  {SAMPLE}
                </span>
                <span
                  className="shrink-0 text-[11px] font-medium opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: "var(--accent)" }}
                >
                  Try it ↑
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
