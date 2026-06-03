/**
 * Icon barrel.
 *
 * Generic UI icons (`X`, `ChevronLeft`, `ZoomIn`, etc.) re-exported from
 * lucide-react so consuming code uses one import path.
 *
 * Brand-specific marks (`FolderMark`, `IllustrationStack`) live in their
 * own files because they are not generic UI icons — they're TW visual
 * identity elements that have no lucide analogue.
 */

// Generic UI icons from lucide
export {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Image as ImageIcon,
} from "lucide-react";

// TW brand marks
export { FolderMark } from "./FolderMark";
export { IllustrationStack } from "./IllustrationStack";
