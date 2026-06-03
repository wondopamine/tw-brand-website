"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface ManifestoCardProps {
  tagline: string;
  description: string;
  quadrantLabels: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
}

export default function ManifestoCard({
  tagline,
  description,
  quadrantLabels,
}: ManifestoCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-3xl md:text-4xl text-accent">
          {tagline}
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        {/* Quadrant Diagram — bespoke brand visualization, kept as-is */}
        <div className="relative h-full min-h-[200px]">
          {/* Axes */}
          <div className="absolute left-1/2 top-2 bottom-2 w-px bg-card-border" />
          <div className="absolute top-1/2 left-2 right-2 h-px bg-card-border" />

          {/* Axis labels */}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-widest text-text-secondary">
            Warmth
          </span>
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-widest rotate-90 origin-center text-text-secondary">
            Utility
          </span>

          {/* Quadrant labels */}
          <div className="absolute top-3 left-3 right-1/2 bottom-1/2 flex items-center justify-center p-2">
            <span className="text-[11px] text-center whitespace-pre-line leading-tight text-text-secondary">
              {quadrantLabels.topLeft}
            </span>
          </div>
          <div className="absolute top-3 left-1/2 right-3 bottom-1/2 flex items-center justify-center p-2 rounded-lg bg-accent-light">
            <span className="text-[11px] text-center whitespace-pre-line leading-tight font-bold text-accent">
              {quadrantLabels.topRight}
            </span>
          </div>
          <div className="absolute top-1/2 left-3 right-1/2 bottom-3 flex items-center justify-center p-2">
            <span className="text-[11px] text-center whitespace-pre-line leading-tight text-text-secondary">
              {quadrantLabels.bottomLeft}
            </span>
          </div>
          <div className="absolute top-1/2 left-1/2 right-3 bottom-3 flex items-center justify-center p-2">
            <span className="text-[11px] text-center whitespace-pre-line leading-tight text-text-secondary">
              {quadrantLabels.bottomRight}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
