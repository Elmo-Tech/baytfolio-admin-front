import { Clock3, KeyRound } from "lucide-react";
import ResetPasswordForm from "@/modules/auth/components/reset-password-form";
import AuthCard from "@/modules/auth/components/auth-card";
import AuthLayout from "@/modules/auth/components/auth-layout";
import { authShieldUser } from "@/assets";

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-2xl">
        <AuthCard className="!max-w-none">
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

            <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-lg bg-[#F2EDE6]">
              <KeyRound aria-hidden="true" className="size-5 text-[#172A3A]" />
            </div>

            <h1 className="text-[26px] font-bold text-[#172A3A]">
              إنشاء كلمة مرور جديدة
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#37434B]">
              أدخل كلمة المرور الجديدة لحساب الإدارة الخاص بك للمتابعة بصلاحيات
              آمنة.
            </p>
          </div>

          <div
            dir="rtl"
            className="mt-5 flex items-center justify-start gap-3 rounded-md border border-[#EEE7DE] bg-[#F8F4EF] px-3 py-2.5"
          >
            <img
              src={authShieldUser}
              alt=""
              aria-hidden="true"
              className="size-5 shrink-0 object-contain"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(67%) sepia(10%) saturate(600%) hue-rotate(350deg) brightness(90%)",
              }}
            />

            <div className="min-w-0 text-right">
              <p className="text-xs text-[#A99780]">الحساب المرتبط</p>
              <p
                dir="ltr"
                className="truncate text-sm font-medium text-[#172A3A]"
              >
                admin-security@baytfolio.sa
              </p>
            </div>
          </div>

          <ResetPasswordForm />

          <div
            dir="rtl"
            className="-mx-6 mt-7 flex flex-wrap items-center justify-center gap-2 border-t border-[#F0EBE4] px-6 pt-3 text-sm text-[#A99780] sm:-mx-9 sm:px-9"
          >
            <span className="inline-flex items-center gap-1.5">
              <KeyRound aria-hidden="true" className="size-4 shrink-0" />
              تشفير فيدرالي FIPS
            </span>

            <span aria-hidden="true" className="text-[#E5DCCF]">
              •
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 aria-hidden="true" className="size-4 shrink-0" />
              صلاحية الرابط 15 دقيقة
            </span>
          </div>
        </AuthCard>

        <p dir="rtl" className="mt-5 text-center text-sm text-[#A99780]">
          تواجه مشكلة في الاستعادة؟{" "}
          <a
            href="mailto:sec-ops@baytfolio.com"
            className="font-medium text-[#435562] hover:underline"
          >
            تواصل مع الدعم التقني المؤسسي
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
