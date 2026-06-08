/**
 * "Aa" tile glyph for the Typography app — shared by the dock tile and
 * the mobile app icon. SVG text scales with its container, unlike a
 * fixed font-size.
 */
export default function AaGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontFamily="var(--font-display, 'Plus Jakarta Sans', sans-serif)"
        fontWeight="800"
        fontSize="13"
        fill="currentColor"
      >
        Aa
      </text>
    </svg>
  );
}
