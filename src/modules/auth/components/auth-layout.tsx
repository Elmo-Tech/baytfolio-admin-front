import type { ReactNode } from "react";
import { AuthBrand } from "./auth-brand";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-background text-auth-page-text">
      <header className="flex w-full items-center justify-between gap-4 px-4 py-5 sm:px-10">
        <AuthBrand />

        <div className="flex shrink-0 items-center gap-2 rounded-full border border-auth-success-border bg-auth-success-bg px-3 py-1.5 text-base font-medium text-auth-success-fg">
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full bg-auth-success-indicator"
          />
          <span className="text-sm">نظام معتمد داخليًا</span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8">
        {children}
      </main>

      <footer className="border-t border-auth-border-input px-6 py-5 sm:px-10">
        <div className="flex items-center justify-start gap-2 text-right text-sm">
          <span dir="ltr">© {currentYear} BaytFolio Inc.</span>
          <span className="text-auth-text-muted-alt">—</span>
          <span>نظام إدارة العمليات والمنصة</span>
        </div>
      </footer>
    </div>
  );
};
