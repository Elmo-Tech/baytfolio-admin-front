import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/modules/auth/schemas/reset-password.schema";
import ArrowIcon from "@/shared/components/ui/arrow-icon";
import { AsyncSubmitButton } from "@/shared/components/ui/async-submit-button";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { FormAlert } from "@/shared/components/ui/form-alert";
import { PasswordInput } from "@/shared/components/ui/password-input";

type RequestState = "idle" | "loading" | "error";

export default function ResetPasswordForm() {
  const [requestState, setRequestState] = useState<RequestState>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit() {
    setRequestState("loading");

    // No password-reset service or reset-token flow is configured yet.
    await Promise.resolve();
    setRequestState("error");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      dir="rtl"
      className="mt-5 space-y-4"
    >
      <Field className="gap-2">
        <FieldLabel className="text-auth-text-label" htmlFor="new-password">
          كلمة المرور الجديدة
        </FieldLabel>
        <PasswordInput
          id="new-password"
          autoComplete="new-password"
          dir="ltr"
          className="h-9 border-auth-border-input bg-card text-left text-auth-text-label focus-visible:border-auth-focus focus-visible:ring-auth-focus/20"
          {...register("password", {
            onChange: () => setRequestState("idle"),
          })}
          aria-invalid={!!errors.password}
          showPasswordLabel="إظهار كلمة المرور"
          hidePasswordLabel="إخفاء كلمة المرور"
        />
        <p className="flex items-center gap-1.5 text-sm leading-5 text-text-secondary">
          <Info
            aria-hidden="true"
            className="size-4 shrink-0 text-auth-text-muted"
          />
          <span>
            استخدم كلمة مرور قوية لا تقل عن 8 أحرف وتحتوي على أرقام ورموز.
          </span>
        </p>
        <FieldError errors={[errors.password]} />
      </Field>

      <Field className="gap-2">
        <FieldLabel className="text-auth-text-label" htmlFor="confirm-password">
          تأكيد كلمة المرور
        </FieldLabel>
        <PasswordInput
          id="confirm-password"
          autoComplete="new-password"
          dir="ltr"
          className="h-9 border-auth-border-input bg-card text-left text-auth-text-label focus-visible:border-auth-focus focus-visible:ring-auth-focus/20"
          {...register("confirmPassword", {
            onChange: () => setRequestState("idle"),
          })}
          aria-invalid={!!errors.confirmPassword}
          showPasswordLabel="إظهار تأكيد كلمة المرور"
          hidePasswordLabel="إخفاء تأكيد كلمة المرور"
        />
        <FieldError errors={[errors.confirmPassword]} />
      </Field>

      {requestState === "error" && (
        <FormAlert variant="error" className="text-center">
          خدمة تحديث كلمة المرور غير متاحة حاليًا. لم يتم تغيير كلمة المرور.
        </FormAlert>
      )}

      <AsyncSubmitButton
        label="تحديث كلمة المرور"
        loadingLabel="جارٍ التحديث..."
        loading={requestState === "loading"}
        size="lg"
        className="h-10 w-full rounded-md bg-auth-navy text-base text-primary-foreground shadow-sm hover:bg-auth-navy-hover focus-visible:border-auth-focus focus-visible:ring-auth-focus/40"
        icon={<RotateCcw aria-hidden="true" className="size-4" />}
      />

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
