"use client";

import { useRef, useCallback, useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const blob = blobRef.current;
      const inner = innerRef.current;
      if (!card || !blob || !inner) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Blob follows cursor for border glow
      blob.animate(
        [{ transform: `translate(${x - 150}px, ${y - 150}px)` }],
        { duration: 300, fill: "forwards" }
      );

      // 3D tilt — rotate toward the cursor position
      // Clamp rotation to ±6 degrees for subtle effect
      const rotateY = ((x - centerX) / centerX) * 6;
      const rotateX = -((y - centerY) / centerY) * 6;

      inner.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    const inner = innerRef.current;
    if (inner) {
      inner.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
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
      <div ref={innerRef} className="glow-card-inner" style={{ transition: "transform 0.15s ease-out" }}>
        {children}
      </div>
    </div>
  );
}
