import { DirectionProvider } from "@/shared/components/ui";
import { QueryProvider } from "./query-provider";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { Toaster } from "sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <DirectionProvider dir="rtl">
      <QueryProvider>
        <NuqsAdapter>
          <Toaster dir="rtl" position={"top-center"} />

          {children}
        </NuqsAdapter>
      </QueryProvider>
    </DirectionProvider>
  );
}
