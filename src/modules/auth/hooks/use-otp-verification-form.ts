import { useMemo, useState, useSyncExternalStore } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useQueryStates } from "nuqs";

import {
  otpVerificationSchema,
  type OtpVerificationValues,
} from "@/modules/auth/schemas/otp-verification.schema";
import { getAuthPath } from "@/modules/auth/utils/auth-paths";
import {
  createCountdownStore,
  formatCountdown,
} from "@/modules/auth/utils/otp-countdown";
import { loginSearchParams } from "@/modules/auth/utils/login-search-params";

const RESEND_DELAY_SECONDS = 47;
type RequestState = "idle" | "loading" | "error";

export function useOtpVerificationForm() {
  const navigate = useNavigate();
  const [params] = useQueryStates(loginSearchParams);
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

  async function onSubmit() {
    setRequestState("loading");
    await Promise.resolve();
    navigate(getAuthPath("/admin/forgot-password/reset", params.role));
  }

  function handleResend() {
    if (secondsRemaining === 0) setResendError(true);
  }

  function handleCodeChange() {
    if (requestState !== "idle") {
      setRequestState("idle");
    }
  }

  return {
    form,
    canResend: secondsRemaining === 0,
    formattedCountdown: formatCountdown(secondsRemaining),
    requestState,
    resendError,
    handleResend,
    handleCodeChange,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
