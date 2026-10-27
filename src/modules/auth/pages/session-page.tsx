import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useLogout, useSession } from "@/modules/auth/hooks/use-auth";
import { useAuthService } from "@/modules/auth/providers/service-context";
import { AuthFrame } from "@/modules/auth/components/auth-frame";

export function SessionPage() {
  const { data: session } = useSession();
  const logout = useLogout();
  const service = useAuthService();
  if (!session) return null;
  return (
    <AuthFrame>
      <h1 className="text-2xl font-semibold">
        جلسة {session.user.scope === "vendor" ? "Vendor" : "Admin"} التجريبية
      </h1>
      <p className="mt-4">مرحبًا، {session.user.name}</p>
      <p className="mt-2">الدور: {session.user.role}</p>
      <p dir="ltr" className="mt-2 text-start">
        {session.user.email}
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        هذه صفحة لفحص تسجيل الدخول فقط. الأدوار المعروضة لا تمنح صلاحيات باك
        إند. مدة الجلسة التجريبية 20 دقيقة.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <button
          disabled={logout.isPending}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
          onClick={() =>
            void logout
              .mutateAsync()
              .then(() => toast.success("تم تسجيل الخروج."))
              .catch(() => toast.error("تعذّر تسجيل الخروج."))
          }
        >
          {logout.isPending ? "جارٍ الخروج…" : "تسجيل الخروج"}
        </button>
        <button className="underline" onClick={() => service.expireSession()}>
          تجربة انتهاء الجلسة
        </button>
      </div>
      <Link
        className="mt-6 inline-block underline"
        to={session.user.scope === "vendor" ? "/admin" : "/vendor"}
      >
        اختبار المسار الخاص بالداشبورد الآخر
      </Link>
    </AuthFrame>
  );
}
