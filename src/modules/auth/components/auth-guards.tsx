import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useSession } from "@/modules/auth/hooks/use-auth";
import { safeReturnPath } from "@/modules/auth/utils/return-path";
import type { DashboardScope } from "@/modules/auth/types/auth";

export function AuthLoading() {
  return (
    <p role="status" dir="rtl" lang="ar" className="p-8">
      جارٍ التحقق من الجلسة…
    </p>
  );
}

export function RequireSession({ scope }: { scope?: DashboardScope }) {
  const session = useSession();
  const location = useLocation();
  if (session.isPending) return <AuthLoading />;
  if (session.isError)
    return (
      <div className="p-8" role="alert">
        تعذّر التحقق من الجلسة.{" "}
        <button onClick={() => void session.refetch()}>إعادة المحاولة</button>
      </div>
    );
  if (!session.data) {
    const returnTo = `${location.pathname}${location.search}${location.hash}`;
    return (
      <Navigate
        to={`/login?returnTo=${encodeURIComponent(returnTo)}`}
        replace
      />
    );
  }
  if (scope && session.data.user.scope !== scope)
    return (
      <main dir="rtl" lang="ar" className="mx-auto max-w-lg p-8">
        <h1 className="text-2xl font-semibold">
          لا يمكنك فتح هذه الداشبورد بهذا الحساب.
        </h1>
        <Link
          className="mt-4 inline-block underline"
          to={`/${session.data.user.scope}`}
        >
          العودة إلى داشبورد حسابك
        </Link>
      </main>
    );
  return <Outlet />;
}
export function GuestOnly() {
  const session = useSession();
  const [params] = useSearchParams();
  if (session.isPending) return <AuthLoading />;
  if (session.isError)
    return (
      <div role="alert" className="p-8">
        تعذّر التحقق من الجلسة.{" "}
        <button onClick={() => void session.refetch()}>إعادة المحاولة</button>
      </div>
    );
  if (session.data)
    return (
      <Navigate
        to={safeReturnPath(
          params.get("returnTo"),
          `/${session.data.user.scope}`,
        )}
        replace
      />
    );
  return <Outlet />;
}
