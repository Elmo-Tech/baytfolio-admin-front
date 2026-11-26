import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export const AuthCard = ({ children, className }: AuthCardProps) => {
  return (
    <section
      className={cn(
        "relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-auth-border bg-card shadow-auth-card",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-auth-text-label via-auth-gold to-auth-text-label"
      />

      <div className="p-6 pt-8 sm:p-9 sm:pt-11">{children}</div>
    </section>
  );
};
