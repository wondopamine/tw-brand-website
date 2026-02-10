"use client";

interface TextCardProps {
  title: string;
  body: string;
}

export default function TextCard({ title, body }: TextCardProps) {
  return (
    <div className="canvas-card p-8 h-full flex flex-col">
      <h3
        className="text-2xl font-bold mb-4"
        style={{
          fontFamily: "var(--font-display, 'Sora', sans-serif)",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h3>
      <p
        className="text-sm md:text-base leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {body}
      </p>
    </div>
  );
}
