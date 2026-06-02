"use client";

import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";
import type { ReactNode } from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** aria-label for screen readers when there is no visible Title */
  ariaLabel?: string;
  backdropClassName?: string;
  popupClassName?: string;
  /** Set false to allow click-through outside the popup (rare) */
  modal?: boolean;
  children: ReactNode;
}

/**
 * Accessible dialog primitive built on Base UI.
 * Handles focus trap, Escape, scroll lock, portal, inert background.
 * Animations are driven by CSS data attributes (data-[starting-style],
 * data-[ending-style]) on .tw-dialog-backdrop and .tw-dialog-popup
 * — see globals.css.
 */
export function Dialog({
  open,
  onClose,
  ariaLabel,
  backdropClassName,
  popupClassName,
  modal = true,
  children,
}: DialogProps) {
  return (
    <BaseDialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      modal={modal}
    >
      <BaseDialog.Portal>
        <BaseDialog.Backdrop
          className={`tw-dialog-backdrop fixed inset-0 z-[60] ${backdropClassName ?? ""}`}
        />
        <BaseDialog.Popup
          aria-label={ariaLabel}
          className={`tw-dialog-popup fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto outline-none ${popupClassName ?? ""}`}
        >
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
