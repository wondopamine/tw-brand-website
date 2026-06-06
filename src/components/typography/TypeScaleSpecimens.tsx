"use client";

import { getFont, typeScale } from "@/data/typography";

/**
 * The brand type scale rendered as live specimens — every row in its
 * true face, size, and weight (large display sizes clamp on narrow
 * viewports).
 */
export default function TypeScaleSpecimens() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--card-border)" }}
    >
      {typeScale.map((entry, i) => {
        const font = getFont(entry.fontId);
        return (
          <div
            key={entry.label}
            className="flex items-baseline gap-4 px-4 py-4"
            style={{
              borderTop: i > 0 ? "1px solid var(--card-border)" : undefined,
            }}
          >
            <span className="w-28 shrink-0">
              <span
                className="block text-[11px] font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {entry.label}
              </span>
              <span
                className="block text-[10px] tabular-nums"
                style={{ color: "var(--text-secondary)" }}
              >
                {font.id === "jakarta" ? "Jakarta" : font.name} {entry.weight} ·{" "}
                {entry.size}px
              </span>
            </span>
            <span
              className="flex-1 min-w-0 truncate"
              style={{
                fontFamily: font.cssVar,
                fontWeight: entry.weight,
                fontSize:
                  entry.size > 48 ? `min(${entry.size}px, 12vw)` : entry.size,
                lineHeight: 1.1,
                color: "var(--text-primary)",
                textTransform: entry.uppercase ? "uppercase" : undefined,
                letterSpacing: entry.tracking ? `${entry.tracking}em` : undefined,
              }}
            >
              {entry.sample}
            </span>
          </div>
        );
      })}
    </div>
  );
}
