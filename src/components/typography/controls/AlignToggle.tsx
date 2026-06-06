"use client";

export type TextAlign = "left" | "center" | "right";

const ALIGNS: { label: string; value: TextAlign; icon: React.ReactNode }[] = [
  {
    label: "Left",
    value: "left",
    icon: (
      <>
        <line x1="1" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="1" y1="7" x2="9" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="1" y1="11" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Center",
    value: "center",
    icon: (
      <>
        <line x1="1" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3" y1="7" x2="11" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="11" x2="12" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Right",
    value: "right",
    icon: (
      <>
        <line x1="1" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="5" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
];

/** Segmented text-alignment control for the Typography playground. */
export default function AlignToggle({
  align,
  onChange,
}: {
  align: TextAlign;
  onChange: (align: TextAlign) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Text alignment"
      className="flex items-center rounded-md overflow-hidden"
      style={{ border: "1px solid var(--card-border)" }}
    >
      {ALIGNS.map((a) => (
        <button
          key={a.value}
          type="button"
          onClick={() => onChange(a.value)}
          aria-pressed={align === a.value}
          aria-label={`Align ${a.label.toLowerCase()}`}
          className="px-2.5 py-2 transition-colors cursor-pointer"
          style={{
            background: align === a.value ? "var(--text-primary)" : "var(--card-bg)",
            color: align === a.value ? "var(--card-bg)" : "var(--text-secondary)",
          }}
          title={a.label}
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
            {a.icon}
          </svg>
        </button>
      ))}
    </div>
  );
}
