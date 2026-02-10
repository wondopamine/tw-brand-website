"use client";

interface BrandCardProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
  onClick: () => void;
}

export default function BrandCard({
  title,
  subtitle,
  accentColor,
  onClick,
}: BrandCardProps) {
  return (
    <button
      onClick={onClick}
      className="canvas-card p-6 h-full flex flex-col text-left w-full cursor-pointer"
      aria-label={`Open ${title}`}
    >
      <h3
        className="text-xl font-bold mb-2"
        style={{
          fontFamily: "var(--font-display, 'Sora', sans-serif)",
          color: accentColor ?? "var(--text-primary)",
        }}
      >
        {title}
      </h3>
      {subtitle && (
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitle}
        </p>
      )}
      <div className="mt-4 flex items-center gap-1">
        <span
          className="text-xs font-medium"
          style={{ color: "var(--accent)" }}
        >
          View details
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: "var(--accent)" }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </button>
  );
}
