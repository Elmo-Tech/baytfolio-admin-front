import type { ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
  className?: string;
};

export default function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <section
      className={`relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-[#F0EBE4] bg-white shadow-[0_20px_55px_rgba(42,35,25,0.12)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#263746] via-[#C89B3C] to-[#263746]"
      />

      <div className="p-6 pt-8 sm:p-9 sm:pt-11">{children}</div>
    </section>
  );
}
