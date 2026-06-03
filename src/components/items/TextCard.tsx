"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TextCardProps {
  title: string;
  body: string;
}

export default function TextCard({ title, body }: TextCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm md:text-base leading-relaxed text-text-secondary">
          {body}
        </p>
      </CardContent>
    </Card>
  );
}
