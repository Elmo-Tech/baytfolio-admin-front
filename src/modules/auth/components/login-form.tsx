import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";

import {
  loginSchema,
  type LoginFormValues,
} from "@/modules/auth/schemas/login.schema";

import { Input } from "@/shared/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Button } from "@/shared/components/ui/button";
import { PasswordInput } from "@/shared/components/ui/password-input";
import ArrowIcon from "@/shared/components/ui/arrow-icon";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberDevice: false,
    },
  });

  function onSubmit() {
    // Authentication is not connected to a backend yet.
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} dir="rtl" className="space-y-5">
      {/* Email */}
      <Field>
        <FieldLabel className="text-auth-text-label" htmlFor="email">
          البريد الإلكتروني
        </FieldLabel>

        <div className="relative">
          <Mail
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-auth-text-muted"
          />

          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="admin@baytfolio.com"
            dir="ltr"
            className="h-11 border-auth-border-login bg-auth-input-bg-login pl-10 pr-3 text-left text-auth-text-label placeholder:text-auth-text-muted focus-visible:border-auth-focus focus-visible:ring-auth-focus/20"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
        </div>

        <FieldError errors={[errors.email]} />
      </Field>

      {/* Password */}
      <Field>
        <FieldLabel className="text-auth-text-label" htmlFor="password">
          كلمة المرور
        </FieldLabel>

        <PasswordInput
          id="password"
          dir="ltr"
          autoComplete="current-password"
          placeholder="أدخل كلمة المرور"
          className="h-11 border-auth-border-login bg-auth-input-bg-login text-left text-auth-text-label placeholder:text-auth-text-muted focus-visible:border-auth-focus focus-visible:ring-auth-focus/20"
          {...register("password")}
          aria-invalid={!!errors.password}
          visibilityButtonClassName="size-8"
        />

        <FieldError errors={[errors.password]} />
      </Field>

      {/* Remember Device & Forgot Password */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 text-sm">
        <a
          href="/forgot-password"
          className="font-medium text-auth-link transition-colors hover:text-auth-link-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-auth-focus/40"
        >
          هل نسيت كلمة المرور؟
        </a>

        <label className="flex cursor-pointer items-center gap-2 text-auth-text-secondary">
          <input
            type="checkbox"
            className="size-4 rounded border-auth-checkbox-border accent-auth-checkbox-accent"
            {...register("rememberDevice")}
          />
          <span>تذكرني على هذا الجهاز</span>
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-lg bg-auth-navy text-base text-primary-foreground shadow-sm hover:bg-auth-navy-hover focus-visible:border-auth-focus focus-visible:ring-auth-focus/40"
      >
        <span>تسجيل الدخول</span>
        <ArrowIcon className="size-5" />
      </Button>
    </form>
  );
}
