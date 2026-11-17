import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Clock3 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import {
  otpVerificationSchema,
  type OtpVerificationValues,
} from "@/modules/auth/schemas/otp-verification.schema";
import ArrowIcon from "@/shared/components/ui/arrow-icon";
import { AsyncSubmitButton } from "@/shared/components/ui/async-submit-button";
import { FieldError } from "@/shared/components/ui/field";
import { FormAlert } from "@/shared/components/ui/form-alert";

const OTP_LENGTH = 6;
const RESEND_DELAY_SECONDS = 47;

type RequestState = "idle" | "loading" | "error";

type CountdownStore = {
  getSnapshot: () => number;
  subscribe: (listener: () => void) => () => void;
};

function createCountdownStore(initialSeconds: number): CountdownStore {
  let startedAt: number | null = null;
  let timer: ReturnType<typeof window.setInterval> | undefined;
  const listeners = new Set<() => void>();

  function getSnapshot() {
    if (startedAt === null) {
      return initialSeconds;
    }

    const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
    return Math.max(0, initialSeconds - elapsedSeconds);
  }

  function stopTimer() {
    if (timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  }

  function notify() {
    const secondsRemaining = getSnapshot();
    listeners.forEach((listener) => listener());

    if (secondsRemaining === 0) {
      stopTimer();
    }
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);

    if (startedAt === null) {
      startedAt = Date.now();
    }

    if (timer === undefined && getSnapshot() > 0) {
      timer = window.setInterval(notify, 1000);
    }

    return () => {
      listeners.delete(listener);

      if (listeners.size === 0) {
        stopTimer();
      }
    };
  }

  return { getSnapshot, subscribe };
}

function formatCountdown(seconds: number) {
  return `00:${String(seconds).padStart(2, "0")}`;
}

export default function OtpVerificationForm() {
  const [digits, setDigits] = useState<string[]>(() =>
    Array<string>(OTP_LENGTH).fill(""),
  );
  const [requestState, setRequestState] = useState<RequestState>("idle");
  const [resendError, setResendError] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const countdownStore = useMemo(
    () => createCountdownStore(RESEND_DELAY_SECONDS),
    [],
  );
  const secondsRemaining = useSyncExternalStore(
    countdownStore.subscribe,
    countdownStore.getSnapshot,
    countdownStore.getSnapshot,
  );
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpVerificationValues>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: { code: "" },
  });

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
              className="size-10 rounded-md border border-auth-border-input bg-auth-surface text-center text-lg font-semibold text-auth-navy outline-none transition-colors placeholder:text-auth-otp-placeholder focus:border-auth-focus focus:ring-2 focus:ring-auth-focus/20 sm:size-11"
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
          className="cursor-pointer font-medium text-auth-text-muted transition-colors enabled:text-auth-link-hover enabled:hover:underline disabled:cursor-not-allowed disabled:opacity-70"
        >
          طلب رمز جديد
        </button>
        <span className="flex items-center gap-1.5 text-text-secondary">
          <Clock3
            aria-hidden="true"
            className="size-3.5 text-auth-text-muted"
          />
          {secondsRemaining > 0 ? (
            <>
              إعادة الإرسال خلال:
              <b dir="ltr" className="font-semibold text-auth-navy">
                {formatCountdown(secondsRemaining)}
              </b>
            </>
          ) : (
            "يمكنك طلب رمز جديد الآن"
          )}
        </span>
      </div>

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
        className="h-10 w-full rounded-md bg-auth-navy text-base text-primary-foreground shadow-sm hover:bg-auth-navy-hover focus-visible:border-auth-focus focus-visible:ring-auth-focus/40"
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

      <Link
        to="/login"
        className="mx-auto flex w-fit items-center gap-1.5 text-sm font-medium text-auth-link transition-colors hover:text-auth-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-auth-focus/40"
      >
        <ArrowIcon className="size-4" />
        <span>العودة لتسجيل الدخول</span>
      </Link>
    </form>
  );
}
