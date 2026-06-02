"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface UtilityCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function UtilityCard({
  title,
  description,
  icon,
}: UtilityCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="items-center text-center [&>*]:justify-self-center">
        <span className="text-4xl mb-2" role="img" aria-hidden="true">
          {icon}
        </span>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-text-secondary text-center">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
