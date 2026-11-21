import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import {
  loginSchema,
  type LoginFormValues,
} from "@/modules/auth/schemas/login.schema";

export function useLoginForm() {
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberDevice: false,
    },
  });

  function onSubmit(values: LoginFormValues) {
    toast.success(`تم تسجيل الدخول بنجاح (${values.email})`);
    navigate("/dashboard");
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
