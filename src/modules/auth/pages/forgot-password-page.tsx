import ForgotPasswordForm from "@/modules/auth/components/forgot-password-form";
import AuthCard from "@/modules/auth/components/auth-card";
import AuthLayout from "@/modules/auth/components/auth-layout";
import { authShieldUser } from "@/assets";
import { Headset, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-2xl">
        {" "}
        <AuthCard className="!max-w-none">
          {" "}
          <div dir="ltr" className="mb-5 flex justify-start">
            <div
              dir="rtl"
              className="flex items-center gap-1.5 rounded-md bg-[#F2EDE6] px-2.5 py-1.5"
            >
              <img
                src={authShieldUser}
                alt=""
                aria-hidden="true"
                className="h-4 w-4 shrink-0 object-contain"
              />
              <span className="whitespace-nowrap text-sm text-[#37434B]">
                بوابة الإدارة المركزية
              </span>
            </div>
          </div>
          <div dir="rtl" className="text-right">
            <h1 className="text-[26px] font-bold text-[#172A3A]">
              نسيت كلمة المرور؟
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#37434B]">
              أدخل البريد الإلكتروني المرتبط بحساب الإدارة وسنرسل لك رابطًا
              لإعادة تعيين كلمة المرور.
            </p>
          </div>
          <ForgotPasswordForm />
          <div
            dir="rtl"
            className="-mx-6 mt-8 flex items-center justify-between gap-4 border-t border-[#F0EBE4] bg-[#FBF9F6] px-6 py-3 text-sm text-[#6F4E37] sm:-mx-9 sm:px-9"
          >
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
          className="mt-5 flex items-center justify-center gap-1 text-sm text-[#6F4E37]"
        >
          <Headset aria-hidden="true" className="size-3.5 shrink-0" />
          <span>الدعم الفني والعمليات:</span>
          <a
            href="mailto:sec-ops@baytfolio.com"
            dir="ltr"
            className="text-[#435562] hover:underline"
          >
            sec-ops@baytfolio.com
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
