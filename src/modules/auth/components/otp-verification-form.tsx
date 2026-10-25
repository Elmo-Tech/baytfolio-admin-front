import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Clock3 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import {
  otpVerificationSchema,
  type OtpVerificationValues,
} from "@/modules/auth/schemas/otp-verification.schema";
import ArrowIcon from "@/shared/components/ui/arrow-icon";
import { Button } from "@/shared/components/ui/button";
import { FieldError } from "@/shared/components/ui/field";

const OTP_LENGTH = 6;
const RESEND_DELAY_SECONDS = 47;

type RequestState = "idle" | "loading" | "error";

function formatCountdown(seconds: number) {
  return `00:${String(seconds).padStart(2, "0")}`;
}

export default function OtpVerificationForm() {
  const [digits, setDigits] = useState<string[]>(() =>
    Array<string>(OTP_LENGTH).fill(""),
  );
  const [secondsRemaining, setSecondsRemaining] =
    useState(RESEND_DELAY_SECONDS);
  const [requestState, setRequestState] = useState<RequestState>("idle");
  const [resendError, setResendError] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpVerificationValues>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    if (secondsRemaining === 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsRemaining((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [secondsRemaining]);

  function updateDigits(nextDigits: string[]) {
    const code = nextDigits.join("");
    setDigits(nextDigits);
    setValue("code", code, { shouldValidate: true });
    setRequestState("idle");
  }

  function focusInput(index: number) {
    inputRefs.current[index]?.focus();
  }

  function handleDigitChange(index: number, value: string) {
    const enteredDigits = value.replace(/\D/g, "");

    if (!enteredDigits) {
      const nextDigits = [...digits];
      nextDigits[index] = "";
      updateDigits(nextDigits);
      return;
    }

    const nextDigits = [...digits];
    enteredDigits
      .slice(0, OTP_LENGTH - index)
      .split("")
      .forEach((digit, offset) => {
        nextDigits[index + offset] = digit;
      });
    updateDigits(nextDigits);
    focusInput(Math.min(index + enteredDigits.length, OTP_LENGTH - 1));
  }

  function handleKeyDown(
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      event.preventDefault();
      const nextDigits = [...digits];
      nextDigits[index - 1] = "";
      updateDigits(nextDigits);
      focusInput(index - 1);
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  }

  function handlePaste(
    index: number,
    event: React.ClipboardEvent<HTMLInputElement>,
  ) {
    const pastedDigits = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pastedDigits) {
      return;
    }

    event.preventDefault();
    handleDigitChange(index, pastedDigits);
  }

  async function onSubmit() {
    setRequestState("loading");

    // No OTP verification service is configured in this application yet.
    await Promise.resolve();
    setRequestState("error");
  }

  function handleResend() {
    if (secondsRemaining > 0) {
      return;
    }

    // No OTP resend service is configured in this application yet.
    setResendError(true);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      dir="rtl"
      className="mt-7 space-y-5"
    >
      <div>
        <div dir="ltr" className="flex justify-center gap-1.5 sm:gap-2">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              aria-label={`رقم رمز التحقق ${index + 1}`}
              className="size-10 rounded-md border border-[#E7DED2] bg-[#FBF9F6] text-center text-lg font-semibold text-[#172A3A] outline-none transition-colors placeholder:text-[#B7AA97] focus:border-[#B8914E] focus:ring-2 focus:ring-[#B8914E]/20 sm:size-11"
              inputMode="numeric"
              maxLength={1}
              pattern="[0-9]*"
              type="text"
              value={digit}
              onChange={(event) => handleDigitChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={(event) => handlePaste(index, event)}
            />
          ))}
        </div>
        <FieldError
          className="mt-2 text-center text-sm leading-5"
          errors={[errors.code]}
        />
      </div>

      <div className="flex items-center justify-between text-sm leading-5">
        <button
          type="button"
          disabled={secondsRemaining > 0}
          onClick={handleResend}
          className="cursor-pointer font-medium text-[#A99780] transition-colors enabled:text-[#9C7636] enabled:hover:underline disabled:cursor-not-allowed disabled:opacity-70"
        >
          طلب رمز جديد
        </button>
        <span className="flex items-center gap-1.5 text-[#5A6872]">
          <Clock3 aria-hidden="true" className="size-3.5 text-[#A99780]" />
          {secondsRemaining > 0 ? (
            <>
              إعادة الإرسال خلال:
              <b dir="ltr" className="font-semibold text-[#172A3A]">
                {formatCountdown(secondsRemaining)}
              </b>
            </>
          ) : (
            "يمكنك طلب رمز جديد الآن"
          )}
        </span>
      </div>

      {resendError && (
        <p
          role="alert"
          className="rounded-md border border-[#E8C8C3] bg-[#FFF5F3] px-3 py-2 text-center text-sm leading-5 text-[#9E3D31]"
        >
          خدمة إعادة إرسال الرمز غير متاحة حاليًا. لم يتم إرسال رمز جديد.
        </p>
      )}

      {requestState === "error" && (
        <p
          role="alert"
          className="rounded-md border border-[#E8C8C3] bg-[#FFF5F3] px-3 py-2 text-center text-sm leading-5 text-[#9E3D31]"
        >
          خدمة التحقق بخطوتين غير متاحة حاليًا. لم يتم التحقق من الرمز.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={requestState === "loading"}
        className="h-10 w-full rounded-md bg-[#172A3A] text-base text-white shadow-sm hover:bg-[#243B4D] focus-visible:border-[#B8914E] focus-visible:ring-[#B8914E]/40"
      >
        <span>{requestState === "loading" ? "جارٍ التحقق..." : "تأكيد"}</span>
        <ArrowIcon className="size-4" />
      </Button>

      <div className="rounded-md bg-[#F6F1EA] px-3 py-2 text-center text-sm leading-5 text-[#806F5C]">
        <span className="inline-flex items-center gap-1">
          <AlertCircle aria-hidden="true" className="size-3.5 text-[#C58C43]" />
          تنتهي صلاحية الرمز خلال 10 دقائق لحماية حسابك.
        </span>
      </div>

      <Link
        to="/login"
        className="mx-auto flex w-fit items-center gap-1.5 text-sm font-medium text-[#3F515F] transition-colors hover:text-[#172A3A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8914E]/40"
      >
        <ArrowIcon className="size-4" />
        <span>العودة لتسجيل الدخول</span>
      </Link>
    </form>
  );
}
