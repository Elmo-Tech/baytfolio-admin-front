import type { ReactNode } from "react";
import { Link } from "react-router";
import { useQueryStates } from "nuqs";

import { getAuthPath } from "../utils/auth-paths";
import { loginSearchParams } from "../utils/login-search-params";

export const AuthReturnLink = ({ children }: { children: ReactNode }) => {
  const [params] = useQueryStates(loginSearchParams);

  return (
    <Link
      to={getAuthPath("/login", params.role)}
      className="mx-auto flex w-fit items-center gap-1.5 text-sm font-medium text-auth-link transition-colors hover:text-auth-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-auth-focus/40"
    >
      {children}
    </Link>
  );
};
