import { ShieldCheck } from "lucide-react";

import OtpVerificationForm from "@/modules/auth/components/otp-verification-form";
import AuthCard from "@/modules/auth/components/auth-card";
import AuthLayout from "@/modules/auth/components/auth-layout";
import { authShieldUser } from "@/assets";

export default function VerifyOtpPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-2xl">
        <AuthCard className="!max-w-none">
          {" "}
          <div dir="rtl" className="text-center">
            <div className="mb-5 flex justify-center">
              <span className="flex items-center gap-2 rounded-full bg-[#F2EDE6] px-2 py-1 text-xs font-medium text-[#37434B]">
                <img
                  src={authShieldUser}
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 object-contain"
                />
                بوابة الإدارة المركزية
              </span>
            </div>

            <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-lg bg-[#F2EDE6]">
              <ShieldCheck
                aria-hidden="true"
                className="size-5 text-[#172A3A]"
                strokeWidth={1.8}
              />
            </div>

            <h1 className="text-[26px] font-bold text-[#172A3A]">
              التحقق بخطوتين
            </h1>
            <p className="mt-1 text-sm text-[#37434B]">
              أدخل رمز التحقق المكون من 6 أرقام للمتابعة.
            </p>
            <p className="mt-1 text-sm text-[#37434B]">
              أدخل الرمز المرسل إلى بريدك المسجل عند تفعيل الخدمة.
            </p>
          </div>
          <OtpVerificationForm />
        </AuthCard>

        <p
          dir="rtl"
          className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-[#A99780]"
        >
          <ShieldCheck aria-hidden="true" className="size-4 shrink-0" />
          <span>التحقق بخطوتين قيد الإعداد</span>
        </p>
      </div>
    </AuthLayout>
  );
}
