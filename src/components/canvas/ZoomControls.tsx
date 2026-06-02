"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

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
    <div className="fixed bottom-4 left-48 z-30 flex items-center gap-1 rounded-xl px-1 py-1 bg-white/85 border border-black/10 backdrop-blur-md">
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomOut}
        aria-label="Zoom out"
        className="text-text-secondary"
      >
        <Minus />
      </Button>

      <Button
        variant="ghost"
        onClick={onResetZoom}
        aria-label="Reset zoom to 100%"
        title="Reset to 100%"
        className="min-w-[52px] text-xs font-medium tabular-nums text-text-primary"
      >
        {percentage}%
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomIn}
        aria-label="Zoom in"
        className="text-text-secondary"
      >
        <Plus />
      </Button>
    </div>
  );
}
