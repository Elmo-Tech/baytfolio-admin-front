import type { ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
  className?: string;
};

export default function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <section
      className={`relative mx-auto w-full max-w-lg overflow-hidden rounded-xl border border-[#F0EBE4] bg-white shadow-xl ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-slate-900 via-amber-500 to-slate-900"
      />

      <div className="p-6 pt-8 sm:p-9 sm:pt-11">{children}</div>
    </section>
  );
}
