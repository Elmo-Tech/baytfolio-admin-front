import { AuthReturnLink } from "./auth-return-link";
import { OtpResendBar } from "../components/otp-resend-bar";
import { BtnV2 } from "@/shared/components/common";
import ArrowIcon from "@/shared/components/ui/arrow-icon";
import {
  FieldError,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui";
import { AlertCircle } from "lucide-react";

import { useOtpVerificationForm } from "../hooks/use-otp-verification-form";
import { Controller } from "react-hook-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const OTP_LENGTH = 6;

export const OtpVerificationForm = () => {
  const {
    form,
    canResend,
    formattedCountdown,
    handleResend,
    handleCodeChange,
    onSubmit,
  } = useOtpVerificationForm();

  return (
    <form onSubmit={onSubmit} id="verify-otp-form" className="mt-7 space-y-5">
      <div>
        <Controller
          control={form.control}
          name="code"
          render={({ field, fieldState }) => (
            <>
              <InputOTP
                {...field}
                maxLength={OTP_LENGTH}
                pattern={REGEXP_ONLY_DIGITS}
                onChange={(value) => {
                  field.onChange(value);
                  handleCodeChange();
                }}
                aria-invalid={fieldState.invalid}
                containerClassName="justify-center"
              >
                <InputOTPGroup className="rounded-md gap-2">
                  {Array.from({ length: OTP_LENGTH }, (_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="size-9 min-[430px]:size-11 xs:size-12 rounded-lg sm:rounded-xl border text-xl font-inter font-bold"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              <FieldError
                className="mt-2 text-center text-sm leading-5"
                errors={[fieldState.error]}
              />
            </>
          )}
        />
      </div>

      <OtpResendBar
        canResend={canResend}
        formattedCountdown={formattedCountdown}
        onResend={handleResend}
      />

      <BtnV2 type="submit" form="verify-otp-form" className="w-full">
        تأكيد <ArrowIcon className="size-4" />
      </BtnV2>

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
};
