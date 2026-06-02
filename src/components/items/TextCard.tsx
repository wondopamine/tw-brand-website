"use client";

interface TextCardProps {
  title: string;
  body: string;
}

export default function TextCard({ title, body }: TextCardProps) {
  return (
    <div className="canvas-card p-8 h-full flex flex-col">
      <h3 className="font-display text-2xl font-bold mb-4 text-text-primary">
        {title}
      </h3>
      <p className="text-sm md:text-base leading-relaxed text-text-secondary">
        {body}
      </p>
    </div>
  );
}
