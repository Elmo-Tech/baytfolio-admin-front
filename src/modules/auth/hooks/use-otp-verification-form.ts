import { useMemo, useState, useSyncExternalStore } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useOtpDigits } from "@/modules/auth/hooks/use-otp-digits";
import {
  otpVerificationSchema,
  type OtpVerificationValues,
} from "@/modules/auth/schemas/otp-verification.schema";
import {
  createCountdownStore,
  formatCountdown,
} from "@/modules/auth/utils/otp-countdown";

const RESEND_DELAY_SECONDS = 47;
type RequestState = "idle" | "loading" | "error";

export function useOtpVerificationForm() {
  const [requestState, setRequestState] = useState<RequestState>("idle");
  const [resendError, setResendError] = useState(false);

  const countdownStore = useMemo(
    () => createCountdownStore(RESEND_DELAY_SECONDS),
    [],
  );
  const secondsRemaining = useSyncExternalStore(
    countdownStore.subscribe,
    countdownStore.getSnapshot,
    countdownStore.getSnapshot,
  );

  const form = useForm<OtpVerificationValues>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: { code: "" },
  });

  const otpDigits = useOtpDigits({
    onCodeChange: (code) => {
      form.setValue("code", code, { shouldValidate: true });
      setRequestState("idle");
    },
  });

  async function onSubmit() {
    setRequestState("loading");
    await Promise.resolve();
    setRequestState("error");
  }

  function handleResend() {
    if (secondsRemaining === 0) setResendError(true);
  }

  return {
    ...otpDigits,
    canResend: secondsRemaining === 0,
    formattedCountdown: formatCountdown(secondsRemaining),
    requestState,
    resendError,
    errors: form.formState.errors,
    handleResend,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
