"use client";

interface BrandCardProps {
  title: string;
  subtitle?: string;
  onClick: () => void;
}

export default function BrandCard({
  title,
  subtitle,
  onClick,
}: BrandCardProps) {
  return (
    <button
      onClick={onClick}
      className="canvas-card p-6 h-full flex flex-col text-left w-full cursor-pointer"
      aria-label={`Open ${title}`}
    >
      <h3
        className="text-xl font-semibold mb-2"
        style={{
          fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
          color: "var(--text-slate)",
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
    </button>
  );
}
