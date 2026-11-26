import { ForgotPasswordForm } from "../components/forgot-password-form";
import { AuthCard } from "../components/auth-card";
import { AuthLayout } from "../components/auth-layout";
import { Headset, ShieldCheck, ShieldUser } from "lucide-react";

export const ForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <div className="w-full max-w-2xl">
        <AuthCard className="max-w-none">
          <div className="mb-5 flex justify-start">
            <div className="flex items-center gap-1.5 rounded-md bg-auth-soft-bg px-2.5 py-1.5 text-text-secondary">
              <ShieldUser className="size-4" />

              <span className="whitespace-nowrap text-sm">
                بوابة الإدارة المركزية
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-[26px] font-bold text-auth-navy">
              نسيت كلمة المرور؟
            </h1>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              أدخل البريد الإلكتروني المرتبط بحساب الإدارة وسنرسل لك رابطًا
              لإعادة تعيين كلمة المرور.
            </p>
          </div>

          <ForgotPasswordForm />

          <div className="-mx-6 mt-8 flex items-center justify-between gap-4 border-t border-auth-border bg-auth-surface px-6 py-3 text-sm text-text-secondary sm:-mx-9 sm:px-9">
            <span className="flex items-center gap-1.5">
              <ShieldCheck aria-hidden="true" className="size-3.5 shrink-0" />
              استرداد معتمد عبر تشفير عالي الكفاءة
            </span>
            <span dir="ltr" className="whitespace-nowrap tracking-wide">
              FIPS 140-3 COMPLIANT
            </span>
          </div>
        </AuthCard>

        <p
          dir="rtl"
          className="mt-5 flex items-center justify-center gap-1 text-sm text-text-secondary"
        >
          <Headset
            aria-hidden="true"
            className="size-3.5 shrink-0 text-auth-link-hover"
          />
          <span className="text-auth-link-hover">الدعم الفني والعمليات:</span>
          <a
            href="mailto:sec-ops@baytfolio.com"
            dir="ltr"
            className="text-auth-link hover:underline"
          >
            sec-ops@baytfolio.com
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};
