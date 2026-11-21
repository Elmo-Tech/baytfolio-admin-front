import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/modules/auth/schemas/reset-password.schema";

type RequestState = "idle" | "loading" | "error";

export function useResetPasswordForm() {
  const [requestState, setRequestState] = useState<RequestState>("idle");
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit() {
    setRequestState("loading");
    await Promise.resolve();
    setRequestState("error");
  }

  function resetRequestState() {
    if (requestState !== "idle") {
      setRequestState("idle");
    }
  }

  return {
    form,
    requestState,
    resetRequestState,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
