"use client";

import type { PanelContent } from "@/types/panel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PanelBody from "./PanelBody";

interface FolderModalProps {
  content: PanelContent | null;
  onClose: () => void;
}

export default function FolderModal({ content, onClose }: FolderModalProps) {
  const isOpen = content !== null;

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-full max-w-[680px] sm:max-w-[680px] p-0 bg-card-bg border border-card-border rounded-2xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.2)] gap-0 ring-0 overflow-hidden">
        {content && (
          <>
            <DialogHeader className="px-10 pt-10 pb-2 shrink-0 gap-3">
              <DialogTitle className="font-display text-[28px] sm:text-[32px] font-bold pr-10 leading-[1.2] text-text-primary tracking-[-0.022em]">
                {content.title}
              </DialogTitle>
              {content.description && (
                <DialogDescription className="text-[15px] leading-[1.6] text-text-secondary">
                  {content.description}
                </DialogDescription>
              )}
            </DialogHeader>

            {/* Thin separator */}
            <div className="mx-10 mt-4 h-px bg-card-border opacity-60" />

            {/* Content */}
            <div className="px-10 py-8">
              <PanelBody items={content.items} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
