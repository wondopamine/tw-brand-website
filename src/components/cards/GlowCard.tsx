"use client";

import { useRef, useCallback, useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const blob = blobRef.current;
      if (!card || !blob) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Blob follows cursor for border glow
      blob.animate(
        [{ transform: `translate(${x - 150}px, ${y - 150}px)` }],
        { duration: 300, fill: "forwards" }
      );

      // Update CSS custom properties so the gradient border radiates from cursor
      card.style.setProperty("--glow-x", `${x}px`);
      card.style.setProperty("--glow-y", `${y}px`);
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`glow-card-outer ${isHovered ? "glow-card-hovered" : ""} ${className ?? ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* The tracking blob — blurred circle that creates the border glow */}
      <div ref={blobRef} className="glow-blob" />
      <div className="glow-card-inner">
        {children}
      </div>
    </div>
  );
}
