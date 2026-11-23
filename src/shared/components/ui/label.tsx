import {
  labelPresentations,
  type LabelPresentation,
} from "./label-presentations";
import * as React from "react";
import { cn } from "@/shared/utils/cn";
import { Label as LabelPrimitive } from "radix-ui";

function Label({
  className,
  unstyled = false,
  presentation,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & {
  unstyled?: boolean;
  presentation?: LabelPresentation;
}) {
  const presentationClass = presentation
    ? labelPresentations[presentation]
    : undefined;
  if (unstyled)
    return (
      <label
        className={presentation ? cn(presentationClass, className) : className}
        {...props}
      />
    );
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        presentationClass,
        className,
      )}
      {...props}
    />
  );
}

export { Label };
