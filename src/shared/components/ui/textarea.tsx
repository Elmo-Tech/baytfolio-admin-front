import type { ComponentProps } from "react";
import { cn } from "@/shared/utils/cn";
import {
  textareaPresentations,
  type TextareaPresentation,
} from "./textarea-presentations";

// Native-compatible local UI adapter. Existing editors intentionally retain
// their own dimensions, resize, focus and placeholder styles.
export function Textarea({
  presentation,
  className,
  ...props
}: ComponentProps<"textarea"> & { presentation?: TextareaPresentation }) {
  return (
    <textarea
      className={
        presentation
          ? cn(textareaPresentations[presentation], className)
          : className
      }
      {...props}
    />
  );
}
