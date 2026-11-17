import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Info, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/modules/auth/schemas/forgot-password.schema";
import { AsyncSubmitButton } from "@/shared/components/ui/async-submit-button";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { FormAlert } from "@/shared/components/ui/form-alert";
import { Input } from "@/shared/components/ui/input";
import ArrowIcon from "@/shared/components/ui/arrow-icon";

type RequestState = "idle" | "loading" | "error";

export default function ForgotPasswordForm() {
  const [requestState, setRequestState] = useState<RequestState>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit() {
    setRequestState("loading");

    await Promise.resolve();
    setRequestState("error");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      dir="rtl"
      className="mt-7 space-y-5"
    >
      <Field className="gap-2">
        <FieldLabel className="text-auth-text-label" htmlFor="recovery-email">
          البريد الإلكتروني
        </FieldLabel>

        <div className="relative">
          <Mail
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-auth-text-muted"
          />
          <Input
            id="recovery-email"
            type="email"
            autoComplete="email"
            dir="ltr"
            placeholder="admin@baytfolio.com"
            className="h-10 border-auth-border-input bg-auth-surface pl-10 pr-3 text-left text-auth-text-label placeholder:text-auth-text-placeholder focus-visible:border-auth-focus focus-visible:ring-auth-focus/20"
            {...register("email", {
              onChange: () => setRequestState("idle"),
            })}
            aria-invalid={!!errors.email}
          />
        </div>

        <p className="flex items-center gap-1.5 text-sm leading-5 text-text-secondary">
          <Info
            aria-hidden="true"
            className="size-4 shrink-0 text-auth-text-muted"
          />
          <span>يجب أن يكون البريد مسجلاً ضمن صلاحيات الإدارة المعتمدة.</span>
        </p>
        <FieldError errors={[errors.email]} />
      </Field>

      {requestState === "error" && (
        <FormAlert variant="error">
          خدمة استعادة كلمة المرور غير متاحة حاليًا. لم يتم إرسال أي بريد
          إلكتروني.
        </FormAlert>
      )}

      <AsyncSubmitButton
        label="إرسال رابط الاستعادة"
        loadingLabel="جارٍ التحقق..."
        loading={requestState === "loading"}
        size="lg"
        className="h-10 w-full rounded-md bg-auth-navy text-base text-primary-foreground shadow-sm hover:bg-auth-navy-hover focus-visible:border-auth-focus focus-visible:ring-auth-focus/40"
        icon={<ArrowRight aria-hidden="true" className="size-4" />}
      />

      <Link
        to="/login"
        className="mx-auto flex w-fit items-center gap-1.5 text-sm font-medium text-auth-link transition-colors hover:text-auth-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-auth-focus/40"
      >
        <ArrowIcon className="size-4" /> <span>العودة لتسجيل الدخول</span>
      </Link>
    </form>
  );
}
