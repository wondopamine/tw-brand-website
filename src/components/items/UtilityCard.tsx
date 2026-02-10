"use client";

interface UtilityCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function UtilityCard({
  title,
  description,
  icon,
}: UtilityCardProps) {
  return (
    <div className="canvas-card p-6 h-full flex flex-col items-center text-center">
      <span className="text-4xl mb-4" role="img" aria-hidden="true">
        {icon}
      </span>
      <h3
        className="text-lg font-bold mb-2"
        style={{
          fontFamily: "var(--font-display, 'Sora', sans-serif)",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {description}
      </p>
    </div>
  );
}
