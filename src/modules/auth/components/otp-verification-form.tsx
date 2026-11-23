import { AlertCircle } from "lucide-react";
import { AuthReturnLink } from "./auth-return-link";

import OtpDigitInputs from "@/modules/auth/components/otp-digit-inputs";
import OtpResendBar from "@/modules/auth/components/otp-resend-bar";
import { useOtpVerificationForm } from "@/modules/auth/hooks/use-otp-verification-form";
import ArrowIcon from "@/shared/components/ui/arrow-icon";
import { AsyncSubmitButton } from "@/shared/components/ui/async-submit-button";
import { FieldError } from "@/shared/components/ui/field";
import { FormAlert } from "@/shared/components/ui/form-alert";

export default function OtpVerificationForm() {
  const {
    digits,
    inputRefs,
    canResend,
    formattedCountdown,
    requestState,
    resendError,
    errors,
    handleDigitChange,
    handleKeyDown,
    handlePaste,
    handleResend,
    onSubmit,
  } = useOtpVerificationForm();

  return (
    <form onSubmit={onSubmit} dir="rtl" className="mt-7 space-y-5">
      <div>
        <OtpDigitInputs
          digits={digits}
          inputRefs={inputRefs}
          onDigitChange={handleDigitChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
        <FieldError
          className="mt-2 text-center text-sm leading-5"
          errors={[errors.code]}
        />
      </div>

      <OtpResendBar
        canResend={canResend}
        formattedCountdown={formattedCountdown}
        onResend={handleResend}
      />

      {resendError && (
        <FormAlert variant="error" className="text-center">
          خدمة إعادة إرسال الرمز غير متاحة حاليًا. لم يتم إرسال رمز جديد.
        </FormAlert>
      )}

      {requestState === "error" && (
        <FormAlert variant="error" className="text-center">
          خدمة التحقق بخطوتين غير متاحة حاليًا. لم يتم التحقق من الرمز.
        </FormAlert>
      )}

      <AsyncSubmitButton
        label="تأكيد"
        loadingLabel="جارٍ التحقق..."
        loading={requestState === "loading"}
        size="lg"
        presentation="auth-submit"
        icon={<ArrowIcon className="size-4" />}
      />

      <div className="rounded-md bg-auth-notice-bg px-3 py-2 text-center text-sm leading-5 text-text-secondary">
        <span className="inline-flex items-center gap-1">
          <AlertCircle
            aria-hidden="true"
            className="size-3.5 text-auth-warning"
          />
          تنتهي صلاحية الرمز خلال 10 دقائق لحماية حسابك.
        </span>
      </div>

      <AuthReturnLink>
        <ArrowIcon className="size-4" />
        <span>العودة لتسجيل الدخول</span>
      </AuthReturnLink>
    </form>
  );
}
