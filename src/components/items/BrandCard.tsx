"use client";

interface BrandCardProps {
  title: string;
  subtitle?: string;
  variant?: "default" | "featured";
  onClick: () => void;
  variant?: "default" | "featured";
}

export default function BrandCard({
  title,
  subtitle,
  variant = "default",
  onClick,
  variant,
}: BrandCardProps) {
  if (variant === "featured") {
    return (
      <button
        onClick={onClick}
        className="h-full w-full text-left cursor-pointer"
        style={{
          background: "#0064FF",
          borderRadius: 24,
          position: "relative",
          overflow: "hidden",
          border: "none",
          outline: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "28px 28px 32px",
        }}
        aria-label={`Open ${title}`}
      >
        <div
          style={{
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
            color: "#fff",
            lineHeight: 1.05,
          }}
        >
          <div style={{ fontSize: 48, fontWeight: 300, letterSpacing: "-1.5px" }}>
            Why
          </div>
          <div style={{ fontSize: 48, fontWeight: 300, letterSpacing: "-1.5px" }}>
            Aesthetics
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              fontStyle: "italic",
              letterSpacing: "-1.5px",
            }}
          >
            matters?
          </div>
        className="canvas-card p-6 h-full min-h-[260px] flex flex-col text-left w-full cursor-pointer"
        style={{ backgroundColor: "#0064FF" }}
        aria-label={`Open ${title}`}
      >
        <div className="flex-1 flex items-end">
          <h3
            className="font-semibold leading-none"
            style={{ color: "#FFFFFF", fontSize: "clamp(28px, 5vw, 42px)" }}
          >
            Why<br />
            Aesthetic<br />
            <span style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Matters?
            </span>
          </h3>
        </div>
      </button>
    );
  }

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
