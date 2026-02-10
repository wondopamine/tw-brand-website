"use client";

import { motion } from "motion/react";
import type { CanvasItem as CanvasItemType, IllustrationSlide } from "@/types/canvas";
import HeroText from "@/components/items/HeroText";
import ManifestoCard from "@/components/items/ManifestoCard";
import PillarCard from "@/components/items/PillarCard";
import TextCard from "@/components/items/TextCard";
import QuoteCard from "@/components/items/QuoteCard";
import UtilityCard from "@/components/items/UtilityCard";
import IllustrationReel from "@/components/items/IllustrationReel";
import FolderIcon from "@/components/items/FolderIcon";

interface CanvasItemProps {
  item: CanvasItemType;
  onFolderClick: (panelId: string) => void;
  onIllustrationClick: (slides: IllustrationSlide[], index: number) => void;
}

export default function CanvasItem({
  item,
  onFolderClick,
  onIllustrationClick,
}: CanvasItemProps) {
  const content = (() => {
    switch (item.type) {
      case "hero-text":
        return <HeroText title={item.title} subtitle={item.subtitle} />;
      case "manifesto-card":
        return (
          <ManifestoCard
            tagline={item.tagline}
            description={item.description}
            quadrantLabels={item.quadrantLabels}
          />
        );
      case "pillar-card":
        return (
          <PillarCard
            number={item.number}
            title={item.title}
            description={item.description}
          />
        );
      case "text-card":
        return <TextCard title={item.title} body={item.body} />;
      case "quote-card":
        return (
          <QuoteCard
            quote={item.quote}
            highlight={item.highlight}
            attribution={item.attribution}
          />
        );
      case "utility-card":
        return (
          <UtilityCard
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        );
      case "illustration-reel":
        return (
          <IllustrationReel
            thumbnailSrc={item.thumbnailSrc}
            thumbnailAlt={item.thumbnailAlt}
            illustrations={item.illustrations}
            onOpen={(index) => onIllustrationClick(item.illustrations, index)}
          />
        );
      case "folder":
        return (
          <FolderIcon
            label={item.label}
            onClick={() => onFolderClick(item.panelId)}
          />
        );
      default:
        return null;
    }
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      {content}
    </motion.div>
  );
}
