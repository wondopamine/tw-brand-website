"use client";

export type TextAlign = "left" | "center" | "right";

const ALIGNS: { label: string; value: TextAlign; icon: string }[] = [
  { label: "Left", value: "left", icon: "align-left" },
  { label: "Center", value: "center", icon: "align-center" },
  { label: "Right", value: "right", icon: "align-right" },
];

/** Segmented alignment control, extracted from the former HeroText playground. */
export default function AlignToggle({
  align,
  onChange,
}: {
  align: TextAlign;
  onChange: (align: TextAlign) => void;
}) {
  return (
    <div
      className="flex items-center rounded-md overflow-hidden"
      style={{ border: "1px solid var(--card-border)" }}
    >
      {ALIGNS.map((a) => (
        <button
          key={a.value}
          type="button"
          onClick={() => onChange(a.value)}
          className="px-2.5 py-2 transition-colors cursor-pointer"
          style={{
            background: align === a.value ? "var(--text-primary)" : "var(--card-bg)",
            color: align === a.value ? "var(--card-bg)" : "var(--text-secondary)",
          }}
          title={a.label}
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            {a.icon === "align-left" && (
              <>
                <line x1="1" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="1" y1="7" x2="9" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="1" y1="11" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
            {a.icon === "align-center" && (
              <>
                <line x1="1" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="7" x2="11" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="2" y1="11" x2="12" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
            {a.icon === "align-right" && (
              <>
                <line x1="1" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="5" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      ))}
    </div>
  );
}
