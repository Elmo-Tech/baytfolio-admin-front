import LoginForm from "@/modules/auth/components/login-form";
import AuthCard from "@/modules/auth/components/auth-card";
import AuthLayout from "@/modules/auth/components/auth-layout";
import { authShieldUser, baytfolioIcon } from "@/assets";

export function LoginPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-2xl">
        <AuthCard className="!max-w-none">
          {" "}
          <div
            dir="rtl"
            className="mb-7 flex items-start justify-between gap-3"
          >
            <div className="flex items-center gap-2" dir="ltr">
              <div className="flex flex-col items-start">
                <p className="text-lg font-bold text-[#102131]">BaytFolio</p>
                <span dir="rtl" className="text-base text-[#A99780]">
                  المسؤول الأعلى
                </span>
              </div>

              <img
                src={baytfolioIcon}
                alt=""
                aria-hidden="true"
                className="h-10 w-10 shrink-0 object-contain"
              />
            </div>

            <div className="flex items-center gap-2 rounded-md bg-[#F2EDE6] px-3 py-2">
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
          <div className="mb-7 text-right">
            <h1 className="mb-2 text-[26px] font-bold">تسجيل الدخول</h1>

            <p className="text-sm leading-6 text-[#37434B]">
              سجّل الدخول إلى بوابة إدارة BaytFolio الموحدة للأصول
              والعمليات.{" "}
            </p>
          </div>
          <LoginForm
            onSubmit={async () => {
              throw new Error(
                "خدمة تسجيل الدخول غير متاحة حاليًا. لم يتم إرسال أي طلب.",
              );
            }}
          />{" "}
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
export default LoginPage;
