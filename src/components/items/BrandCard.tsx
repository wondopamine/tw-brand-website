"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BrandCardProps {
  title: string;
  subtitle?: string;
  variant?: "default" | "featured";
  onClick: () => void;
}

export default function BrandCard({
  title,
  subtitle,
  variant = "default",
  onClick,
}: BrandCardProps) {
  if (variant === "featured") {
    return (
      <Button
        variant="featured"
        size="featured"
        onClick={onClick}
        aria-label={`Open ${title}`}
      >
        <div className="leading-[1.05]">
          <div className="text-5xl font-light tracking-[-1.5px]">Why</div>
          <div className="text-5xl font-light tracking-[-1.5px]">
            Aesthetics
          </div>
          <div className="text-5xl font-extrabold italic tracking-[-1.5px]">
            matters?
          </div>
        </div>
      </Button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="text-left h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-2xl"
      aria-label={`Open ${title}`}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-xl text-text-slate">{title}</CardTitle>
          {subtitle && <CardDescription>{subtitle}</CardDescription>}
        </CardHeader>
      </Card>
    </button>
  );
}
