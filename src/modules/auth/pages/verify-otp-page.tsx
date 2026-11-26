import { OtpVerificationForm } from "../components/otp-verification-form";
import { AuthCard } from "../components/auth-card";
import { AuthLayout } from "../components/auth-layout";

import { ShieldCheck, ShieldUser } from "lucide-react";

export const VerifyOtpPage = () => {
  return (
    <AuthLayout>
      <div className="w-full max-w-2xl">
        <AuthCard className="max-w-none">
          <div className="text-center">
            <div className="mb-5 flex justify-center">
              <span className="flex items-center gap-2 rounded-full bg-auth-soft-bg px-2 py-1 text-xs font-medium text-text-secondary">
                <ShieldUser className="size-4" />
                بوابة الإدارة المركزية
              </span>
            </div>

            <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-lg bg-auth-soft-bg">
              <ShieldCheck
                aria-hidden="true"
                className="size-5 text-auth-navy"
                strokeWidth={1.8}
              />
            </div>

            <h1 className="text-[26px] font-bold text-auth-navy">
              التحقق بخطوتين
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              أدخل رمز التحقق المكون من 6 أرقام للمتابعة.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              تم إرسال الرمز إلى البريد المسجل
              <span className="mr-1 inline-block text-sm text-text-secondary">
                a•••••@baytfolio.com
              </span>
            </p>
          </div>

          <OtpVerificationForm />
        </AuthCard>

        <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-auth-text-muted">
          <ShieldCheck
            aria-hidden="true"
            className="size-4 shrink-0 text-auth-success"
          />
          <span>بروتوكول مصادقة مصرفي مشفر</span>

          <span aria-hidden="true" className="text-auth-divider">
            •
          </span>

          <span className="text-auth-text-muted">Session: #ADM-8831</span>
        </p>
      </div>
    </AuthLayout>
  );
};
