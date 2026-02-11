"use client";

interface PanelHeaderProps {
  title: string;
  onClose: () => void;
}

export default function PanelHeader({ title, onClose }: PanelHeaderProps) {
  return (
    <div
      className="flex items-center justify-between px-6 py-5 border-b shrink-0"
      style={{ borderColor: "var(--card-border)" }}
    >
      <h2
        className="text-lg font-bold uppercase tracking-wider"
        style={{
          fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h2>
      <button
        onClick={onClose}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-70"
        style={{ color: "var(--text-secondary)" }}
        aria-label="Close panel"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
