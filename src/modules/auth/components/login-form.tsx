import { EmailField } from "../atoms/email-field";
import { PasswordField } from "../atoms/password-field";
import { LoginRememberDeviceField } from "../atoms/login-form/login-remember-device-field";
import { BtnV2 } from "@/shared/components/common";

import { Loader2, ArrowLeft } from "lucide-react";

import { Link } from "react-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormValues } from "../schemas/login.schema";

import { getAuthPath } from "../utils/auth-paths";

import type { LoginRole } from "../types/login.types";

export const LoginForm = ({ role }: { role: LoginRole }) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberDevice: false,
    },
  });

  const onSubmit = () => {};

  const isSubmitting = form.formState.isSubmitting;
  const formId = `login-form-${role}`;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id={formId}
      data-role={role}
      className="space-y-5"
    >
      <EmailField control={form.control} name="email" />

      <PasswordField
        control={form.control}
        name="password"
        placeholder="أدخل كلمة المرور"
      />

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 text-sm">
        <Link
          to={getAuthPath("/forgot-password", role)}
          className="font-medium text-auth-link transition-colors hover:text-auth-link-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-auth-focus/40"
        >
          هل نسيت كلمة المرور؟
        </Link>

        <LoginRememberDeviceField control={form.control} />
      </div>

      <BtnV2
        type="submit"
        disabled={isSubmitting}
        form={formId}
        className="w-full"
      >
        {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}

        {isSubmitting ? (
          <Loader2 aria-hidden="true" className="size-4 animate-spin" />
        ) : (
          <ArrowLeft className="size-4" />
        )}
      </BtnV2>
    </form>
  );
};
