import type { ComponentProps } from "react";
import { Button } from "@/shared/components/ui/button";

type Props = ComponentProps<"button"> & { active: boolean };

// Existing legal-content language option; no new selection or keyboard policy.
export function ContentLanguageButton({ active, children, ...props }: Props) {
  return (
    <Button
      unstyled
      type="button"
      {...props}
      className={`rounded px-4 py-2 text-xs font-medium transition ${
        active
          ? "bg-users-brand-navy text-primary-foreground"
          : "text-users-text-secondary hover:bg-users-surface"
      }`}
    >
      {children}
    </Button>
  );
}
