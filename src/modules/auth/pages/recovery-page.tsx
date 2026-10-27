import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthFrame } from "@/modules/auth/components/auth-frame";
import { RecoveryEmailForm } from "@/modules/auth/components/recovery-email-form";
import { RecoveryCodeForm } from "@/modules/auth/components/recovery-code-form";
import { NewPasswordForm } from "@/modules/auth/components/new-password-form";
import { useRecovery } from "@/modules/auth/hooks/use-recovery";
import { DEMO_RECOVERY_CODE } from "@/modules/auth/constants/demo-accounts";
export function RecoveryPage() {
  const [step, setStep] = useState<"email" | "code" | "password" | "done">(
    "email",
  );
  const [email, setEmail] = useState("");
  const recovery = useRecovery();
  return (
    <AuthFrame>
      <h1 className="mb-6 text-2xl font-semibold">استرجاع كلمة المرور</h1>
      {step === "email" && (
        <RecoveryEmailForm
          onSubmit={async (value) => {
            await recovery.request.mutateAsync(value);
            setEmail(value);
            setStep("code");
          }}
        />
      )}
      {step === "code" && (
        <>
          <p className="mb-4" role="status">
            إذا كان الحساب متاحًا، يمكنك استرجاع كلمة المرور. رمز التجربة:{" "}
            <code>{DEMO_RECOVERY_CODE}</code> (صالح 5 دقائق). لا يتم إرسال بريد
            فعلي.
          </p>
          <RecoveryCodeForm
            onSubmit={async (code) => {
              await recovery.verify.mutateAsync({ email, code });
              setStep("password");
            }}
          />
        </>
      )}
      {step === "password" && (
        <NewPasswordForm
          onSubmit={async (password) => {
            try {
              await recovery.reset.mutateAsync({ email, password });
              setEmail("");
              setStep("done");
            } finally {
              recovery.reset.reset();
            }
          }}
        />
      )}
      {step === "done" && (
        <p role="status">
          تم تغيير كلمة المرور داخل التجربة. يمكنك تسجيل الدخول الآن.
        </p>
      )}
      {step !== "email" && step !== "done" && (
        <button
          className="mt-5 block underline"
          onClick={() => {
            setEmail("");
            setStep("email");
          }}
        >
          بدء الاسترجاع من جديد
        </button>
      )}
      <Link className="mt-5 inline-block underline" to="/login">
        العودة إلى تسجيل الدخول
      </Link>
    </AuthFrame>
  );
}
