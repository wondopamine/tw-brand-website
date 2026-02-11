"use client";

import type {
  CanvasItem as CanvasItemType,
  IllustrationSlide,
} from "@/types/canvas";
import GlowCard from "@/components/cards/GlowCard";
import HeroText from "@/components/items/HeroText";
import ManifestoCard from "@/components/items/ManifestoCard";
import PillarCard from "@/components/items/PillarCard";
import TextCard from "@/components/items/TextCard";
import QuoteCard from "@/components/items/QuoteCard";
import UtilityCard from "@/components/items/UtilityCard";
import IllustrationReel from "@/components/items/IllustrationReel";
import BrandCard from "@/components/items/BrandCard";
import ImageCard from "@/components/items/ImageCard";
import FolderIcon from "@/components/items/FolderIcon";

interface CanvasItemProps {
  item: CanvasItemType;
  onFolderClick: (panelId: string) => void;
  onIllustrationClick: (slides: IllustrationSlide[], index: number) => void;
  onCardClick: (modalId: string) => void;
}

const GLOW_CARD_TYPES = new Set([
  "manifesto-card",
  "pillar-card",
  "text-card",
  "quote-card",
  "utility-card",
  "illustration-reel",
  "brand-card",
  "image-card",
]);

export default function CanvasItem({
  item,
  onFolderClick,
  onIllustrationClick,
  onCardClick,
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
      case "brand-card":
        return (
          <BrandCard
            title={item.title}
            subtitle={item.subtitle}
            onClick={() => onCardClick(item.modalId)}
          />
        );
      case "image-card":
        return (
          <ImageCard
            images={item.images}
            caption={item.caption}
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

  const wrapped = GLOW_CARD_TYPES.has(item.type) ? (
    <GlowCard>{content}</GlowCard>
  ) : (
    content
  );

  return (
    <div className="h-full">
      {wrapped}
    </div>
  );
}
