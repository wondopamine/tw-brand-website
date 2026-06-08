"use client";

import type { FontDef, FontId } from "@/data/typography";

/** Segmented control switching between the two brand fonts. */
export default function FontSwitcher({
  fonts,
  activeFontId,
  onChange,
}: {
  fonts: FontDef[];
  activeFontId: FontId;
  onChange: (id: FontId) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Font family"
      className="flex items-center rounded-md overflow-hidden"
      style={{ border: "1px solid var(--card-border)" }}
    >
      {fonts.map((font) => {
        const isActive = font.id === activeFontId;
        return (
          <button
            key={font.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(font.id)}
            className="px-3 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
            style={{
              background: isActive ? "var(--text-primary)" : "var(--card-bg)",
              color: isActive ? "var(--card-bg)" : "var(--text-secondary)",
              fontFamily: font.cssVar,
            }}
            title={`${font.name} — ${font.role}`}
          >
            {font.name}
          </button>
        );
      })}
    </div>
  );
}
