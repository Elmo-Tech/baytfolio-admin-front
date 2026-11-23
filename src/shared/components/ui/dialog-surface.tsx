import { cn } from "@/shared/utils/cn";
import { dialogPresentations } from "./dialog-presentations";
import type { ComponentProps, ReactNode } from "react";
import { createPortal } from "react-dom";

interface DialogSurfaceProps {
  children: ReactNode;
  presentation?: keyof typeof dialogPresentations;
  overlayProps: ComponentProps<"div"> & { "data-help-center-modal"?: true };
  surfaceProps: ComponentProps<"section">;
}

// Custom compatibility adapter for the existing dialog contracts. Introducing
// a new focus trap, Escape handler or scroll lock would change their behavior.
// The caller retains labels, backdrop dismissal, classes and mounted identity.
export function DialogSurface({
  children,
  presentation,
  overlayProps,
  surfaceProps,
}: DialogSurfaceProps) {
  const styles = presentation ? dialogPresentations[presentation] : undefined;
  return createPortal(
    <div
      {...overlayProps}
      className={
        styles
          ? cn(styles.overlay, overlayProps.className)
          : overlayProps.className
      }
    >
      <section
        {...surfaceProps}
        className={
          styles
            ? cn(styles.surface, surfaceProps.className)
            : surfaceProps.className
        }
      >
        {children}
      </section>
    </div>,
    document.body,
  );
}
