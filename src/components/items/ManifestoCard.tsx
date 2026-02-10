"use client";

interface ManifestoCardProps {
  tagline: string;
  description: string;
  quadrantLabels: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
}

export default function ManifestoCard({
  tagline,
  description,
  quadrantLabels,
}: ManifestoCardProps) {
  return (
    <div className="canvas-card p-8 h-full flex flex-col">
      <h2
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{
          fontFamily: "var(--font-display, 'Sora', sans-serif)",
          color: "var(--accent)",
        }}
      >
        {tagline}
      </h2>
      <p
        className="text-sm md:text-base leading-relaxed mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        {description}
      </p>

      {/* Quadrant Diagram */}
      <div className="flex-1 relative min-h-[200px]">
        {/* Axes */}
        <div
          className="absolute left-1/2 top-2 bottom-2 w-px"
          style={{ backgroundColor: "var(--card-border)" }}
        />
        <div
          className="absolute top-1/2 left-2 right-2 h-px"
          style={{ backgroundColor: "var(--card-border)" }}
        />

        {/* Axis labels */}
        <span
          className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: "var(--text-secondary)" }}
        >
          Warmth
        </span>
        <span
          className="absolute top-1/2 -right-1 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-widest rotate-90 origin-center"
          style={{ color: "var(--text-secondary)" }}
        >
          Utility
        </span>

        {/* Quadrant labels */}
        <div className="absolute top-3 left-3 right-1/2 bottom-1/2 flex items-center justify-center p-2">
          <span
            className="text-[11px] text-center whitespace-pre-line leading-tight"
            style={{ color: "var(--text-secondary)" }}
          >
            {quadrantLabels.topLeft}
          </span>
        </div>
        <div
          className="absolute top-3 left-1/2 right-3 bottom-1/2 flex items-center justify-center p-2 rounded-lg"
          style={{ backgroundColor: "var(--accent-light)" }}
        >
          <span
            className="text-[11px] text-center whitespace-pre-line leading-tight font-bold"
            style={{ color: "var(--accent)" }}
          >
            {quadrantLabels.topRight}
          </span>
        </div>
        <div className="absolute top-1/2 left-3 right-1/2 bottom-3 flex items-center justify-center p-2">
          <span
            className="text-[11px] text-center whitespace-pre-line leading-tight"
            style={{ color: "var(--text-secondary)" }}
          >
            {quadrantLabels.bottomLeft}
          </span>
        </div>
        <div className="absolute top-1/2 left-1/2 right-3 bottom-3 flex items-center justify-center p-2">
          <span
            className="text-[11px] text-center whitespace-pre-line leading-tight"
            style={{ color: "var(--text-secondary)" }}
          >
            {quadrantLabels.bottomRight}
          </span>
        </div>
      </div>
    </div>
  );
}
