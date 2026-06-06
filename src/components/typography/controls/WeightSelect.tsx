"use client";

import type { FontWeight } from "@/data/typography";

/**
 * Weight dropdown driven by the active font's loaded weights —
 * synthesized faces can never be selected.
 */
export default function WeightSelect({
  weights,
  value,
  onChange,
}: {
  weights: FontWeight[];
  value: number;
  onChange: (weight: number) => void;
}) {
  return (
    <div
      className="relative flex items-center rounded-md px-3.5 py-2"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
      }}
    >
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="appearance-none bg-transparent text-sm font-medium pr-5 cursor-pointer outline-none"
        style={{ color: "var(--text-primary)" }}
        aria-label="Font weight"
      >
        {weights.map((w) => (
          <option key={w.value} value={w.value}>
            {w.label}
          </option>
        ))}
      </select>
      <svg
        width="14" height="14" viewBox="0 0 10 10" fill="none"
        className="absolute right-2 pointer-events-none"
        style={{ color: "var(--text-secondary)" }}
      >
        <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
