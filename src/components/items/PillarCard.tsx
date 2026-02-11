"use client";

interface PillarCardProps {
  number: string;
  title: string;
  description: string;
}

export default function PillarCard({
  number,
  title,
  description,
}: PillarCardProps) {
  return (
    <div className="canvas-card p-6 h-full flex flex-col">
      <span
        className="text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color: "var(--accent)" }}
      >
        {number}
      </span>
      <h3
        className="text-xl font-bold mb-3"
        style={{
          fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: "var(--text-secondary)" }}
      >
        {description}
      </p>
    </div>
  );
}
