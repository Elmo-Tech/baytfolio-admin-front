import type { ComponentProps } from "react";
import { cn } from "@/shared/utils/cn";

const presentations = {
  notifications:
    "absolute left-0 top-12 z-50 w-64 rounded-lg border border-border-divider bg-card p-4 shadow-lg sm:w-72",
  "profile-menu":
    "absolute left-0 top-14 z-50 w-40 rounded-lg border border-border-divider bg-card p-2 shadow-lg",
} as const;

// Custom non-modal panel. Dismissal, focus and mounting remain with its owner.
export function PopoverPanel({
  presentation,
  className,
  ...props
}: ComponentProps<"div"> & { presentation?: keyof typeof presentations }) {
  return (
    <div
      className={
        presentation ? cn(presentations[presentation], className) : className
      }
      {...props}
    />
  );
}
