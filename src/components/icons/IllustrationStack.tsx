interface IllustrationStackProps {
  className?: string;
}

/**
 * Brand-specific stacked-cards preview mark used as the illustration-reel
 * trigger on the canvas. Three angled accent-light rectangles with a
 * solid accent foreground card containing an image-frame glyph.
 */
export function IllustrationStack({ className }: IllustrationStackProps) {
  return (
    <div className={`relative w-24 h-24 ${className ?? ""}`}>
      {[2, 1, 0].map((i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-lg"
          style={{
            backgroundColor: "var(--accent)",
            opacity: 0.2 + i * 0.25,
            transform: `rotate(${(i - 1) * 6}deg) translateY(${-i * 4}px)`,
            border: "1px solid var(--card-border)",
          }}
        />
      ))}
      <div className="absolute inset-0 rounded-lg flex items-center justify-center bg-accent-light border border-accent">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-accent"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
    </div>
  );
}
