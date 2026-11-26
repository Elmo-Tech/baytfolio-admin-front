import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw } from "lucide-react";

import { AuthReturnLink } from "./auth-return-link";
import { PasswordField } from "../atoms/password-field";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas/reset-password.schema";
import { BtnV2 } from "@/shared/components/common";
import ArrowIcon from "@/shared/components/ui/arrow-icon";

export const ResetPasswordForm = () => {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {};

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-4">
      <PasswordField
        control={form.control}
        name="password"
        label="كلمة المرور الجديدة"
        autoComplete="new-password"
        description="استخدم كلمة مرور قوية لا تقل عن 8 أحرف وتحتوي على أرقام ورموز."
      />

      <PasswordField
        control={form.control}
        name="confirmPassword"
        label="تأكيد كلمة المرور"
        autoComplete="new-password"
        showPasswordLabel="إظهار تأكيد كلمة المرور"
        hidePasswordLabel="إخفاء تأكيد كلمة المرور"
      />

      <BtnV2 type="submit" className="w-full">
        <span>{"تحديث كلمة المرور"}</span>

        <RotateCcw aria-hidden="true" className="size-4" />
      </BtnV2>

      <AuthReturnLink>
        <ArrowIcon className="size-4" />
        <span>العودة لتسجيل الدخول</span>
      </AuthReturnLink>
    </form>
  );
};
