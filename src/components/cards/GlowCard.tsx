"use client";

import { useRef, useCallback } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const blob = blobRef.current;
      if (!card || !blob) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Animate the blob to follow cursor with smooth 300ms lag
      blob.animate(
        [{ transform: `translate(${x - 150}px, ${y - 150}px)` }],
        { duration: 300, fill: "forwards" }
      );
    },
    []
  );

  return (
    <div
      ref={cardRef}
      className={`glow-card-outer ${className ?? ""}`}
      onMouseMove={handleMouseMove}
    >
      {/* The tracking blob — blurred circle that creates the border glow */}
      <div ref={blobRef} className="glow-blob" />
      <div className="glow-card-inner">{children}</div>
    </div>
  );
}
