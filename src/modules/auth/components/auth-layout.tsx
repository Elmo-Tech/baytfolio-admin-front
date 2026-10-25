import type { ReactNode } from "react";
import AuthBrand from "@/modules/auth/components/auth-brand";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div
      dir="rtl"
      className="flex min-h-screen flex-col bg-[#F7F3ED] text-[#1B2935]"
    >
      <header className="flex w-full items-center justify-between gap-4 px-4 py-5 sm:px-10">
        <AuthBrand />

        <div
          dir="rtl"
          className="flex shrink-0 items-center gap-2 rounded-full border border-[#DDE7DF] bg-[#F2F7F2] px-3 py-1.5 text-xs font-medium text-[#52735B]"
        >
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full bg-[#5E9B6B]"
          />
          <span>نظام معتمد داخليًا</span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8">
        {children}
      </main>

      <footer className="border-t border-[#E7DED2] px-6 py-5 sm:px-10">
        <div className="flex items-center justify-start gap-2 text-right text-xs">
          <span dir="ltr">© {currentYear} BaytFolio Inc.</span>
          <span className="text-[#B5A28C]">—</span>
          <span>نظام إدارة العمليات والمنصة</span>
        </div>
      </footer>
    </div>
  );
}
