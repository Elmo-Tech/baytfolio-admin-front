import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/modules/auth/schemas/forgot-password.schema";

type RequestState = "idle" | "loading" | "error";

export function useForgotPasswordForm() {
  const [requestState, setRequestState] = useState<RequestState>("idle");

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
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
