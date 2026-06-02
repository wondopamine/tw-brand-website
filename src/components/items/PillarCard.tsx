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
      <span className="text-xs font-bold uppercase tracking-widest mb-2 text-accent">
        {number}
      </span>
      <h3 className="font-display text-xl font-bold mb-3 text-text-primary">
        {title}
      </h3>
      <p className="text-sm leading-relaxed flex-1 text-text-secondary">
        {description}
      </p>
    </div>
  );
}
