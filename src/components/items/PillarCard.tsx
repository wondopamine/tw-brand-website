"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PillarCardProps {
  number: string;
  title: string;
  description: string;
}

export default function PillarCard({
  number,
  title,
  description,
}: PillarCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <span className="text-xs font-bold uppercase tracking-widest text-accent">
          {number}
        </span>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
