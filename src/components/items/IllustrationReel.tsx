"use client";

import type { IllustrationSlide } from "@/types/canvas";
import { Card } from "@/components/ui/card";
import { IllustrationStack } from "@/components/icons";

interface IllustrationReelProps {
  thumbnailSrc: string;
  thumbnailAlt: string;
  illustrations: IllustrationSlide[];
  onOpen: (index: number) => void;
}

export default function IllustrationReel({
  thumbnailAlt,
  illustrations,
  onOpen,
}: IllustrationReelProps) {
  return (
    <button
      onClick={() => onOpen(0)}
      className="w-full h-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-2xl"
      aria-label={`View ${thumbnailAlt}`}
    >
      <Card className="h-full flex flex-col items-center justify-center gap-4 p-6">
        {/* Brand-specific stacked-cards preview */}
        <IllustrationStack />

        <div className="text-center">
          <span className="text-sm font-semibold block text-text-primary">
            Illustrations
          </span>
          <span className="text-xs mt-1 block text-text-secondary">
            {illustrations.length} images &middot; Click to view
          </span>
        </div>
      </Card>
    </button>
  );
}
