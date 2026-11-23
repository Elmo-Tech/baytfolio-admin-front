import type { ComponentProps } from "react";
import { Toaster as Sonner } from "sonner";

// Preserve the existing Sonner configuration and toast API in one local UI
// integration. The application provider still owns position and richColors.
export function Toaster(props: ComponentProps<typeof Sonner>) {
  return <Sonner {...props} />;
}
