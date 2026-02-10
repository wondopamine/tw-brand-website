"use client";

import { useTheme, type Theme } from "@/hooks/useTheme";

const themes: { key: Theme; icon: string; label: string }[] = [
  { key: "light", icon: "\u2600\uFE0F", label: "Light" },
  { key: "dark", icon: "\uD83C\uDF19", label: "Dark" },
  { key: "blue", icon: "\uD83D\uDC8E", label: "Blue" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="fixed top-4 right-4 z-50 flex gap-1 rounded-full p-1"
        style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
        <div className="w-[120px] h-[36px]" />
      </div>
    );
  }

  return (
    <div
      className="fixed top-4 right-4 z-50 flex gap-1 rounded-full p-1 backdrop-blur-sm"
      style={{
        backgroundColor: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        boxShadow: "0 2px 8px var(--shadow-color)",
      }}
    >
      {themes.map((t) => (
        <button
          key={t.key}
          onClick={() => setTheme(t.key)}
          className="relative rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200"
          style={{
            backgroundColor:
              theme === t.key ? "var(--accent)" : "transparent",
            color:
              theme === t.key
                ? t.key === "blue"
                  ? "var(--accent)"
                  : "#FFFFFF"
                : "var(--text-secondary)",
          }}
          aria-label={`Switch to ${t.label} theme`}
          title={t.label}
        >
          <span className="text-base">{t.icon}</span>
        </button>
      ))}
    </div>
  );
}
