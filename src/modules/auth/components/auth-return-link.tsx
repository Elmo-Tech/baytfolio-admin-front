import type { ReactNode } from "react";
import { Link } from "react-router";

export function AuthReturnLink({ children }: { children: ReactNode }) {
  return (
    <Link
      to="/admin/login"
      className="mx-auto flex w-fit items-center gap-1.5 text-sm font-medium text-auth-link transition-colors hover:text-auth-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-auth-focus/40"
    >
      {children}
    </Link>
  );
}
