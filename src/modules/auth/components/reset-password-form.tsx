import { Info, RotateCcw } from "lucide-react";
import { AuthReturnLink } from "./auth-return-link";

import { useResetPasswordForm } from "@/modules/auth/hooks/use-reset-password-form";
import ArrowIcon from "@/shared/components/ui/arrow-icon";
import { AsyncSubmitButton } from "@/shared/components/ui/async-submit-button";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { FormAlert } from "@/shared/components/ui/form-alert";
import { PasswordInput } from "@/shared/components/ui/password-input";

export default function ResetPasswordForm() {
  const {
    form: {
      register,
      formState: { errors },
    },
    requestState,
    resetRequestState,
    onSubmit,
  } = useResetPasswordForm();

  return (
    <form onSubmit={onSubmit} dir="rtl" className="mt-5 space-y-4">
      <Field className="gap-2">
        <FieldLabel className="text-auth-text-label" htmlFor="new-password">
          كلمة المرور الجديدة
        </FieldLabel>
        <PasswordInput
          id="new-password"
          autoComplete="new-password"
          dir="ltr"
          className="h-9 border-auth-border-input bg-card text-left text-auth-text-label focus-visible:border-auth-focus focus-visible:ring-auth-focus/20"
          {...register("password", { onChange: resetRequestState })}
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
          {...register("confirmPassword", { onChange: resetRequestState })}
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
        presentation="auth-submit"
        icon={<RotateCcw aria-hidden="true" className="size-4" />}
      />

      <AuthReturnLink>
        <ArrowIcon className="size-4" />
        <span>العودة لتسجيل الدخول</span>
      </AuthReturnLink>
    </form>
  );
}
