"use client";

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export default function ZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}: ZoomControlsProps) {
  const percentage = Math.round(zoom * 100);

  return (
    <div
      className="fixed bottom-4 left-48 z-30 flex items-center gap-1 rounded-xl px-1 py-1"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Zoom out */}
      <button
        onClick={onZoomOut}
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-black/5 cursor-pointer"
        style={{ color: "var(--text-secondary)" }}
        aria-label="Zoom out"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Percentage / reset */}
      <button
        onClick={onResetZoom}
        className="min-w-[52px] h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-black/5 cursor-pointer text-xs font-medium tabular-nums"
        style={{ color: "var(--text-primary)" }}
        aria-label="Reset zoom to 100%"
        title="Reset to 100%"
      >
        {percentage}%
      </button>

      {/* Zoom in */}
      <button
        onClick={onZoomIn}
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-black/5 cursor-pointer"
        style={{ color: "var(--text-secondary)" }}
        aria-label="Zoom in"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}
