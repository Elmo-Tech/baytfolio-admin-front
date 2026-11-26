import { AuthReturnLink } from "./auth-return-link";
import { EmailField } from "../atoms/email-field";
import { BtnV2 } from "@/shared/components/common";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useQueryStates } from "nuqs";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schemas/forgot-password.schema";
import { getAuthPath } from "../utils/auth-paths";
import { loginSearchParams } from "../utils/login-search-params";

import { ArrowLeft, ArrowRight } from "lucide-react";

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [params] = useQueryStates(loginSearchParams);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = () => {
    navigate(getAuthPath("/admin/forgot-password/otp", params.role));
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 space-y-5">
      <EmailField
        control={form.control}
        name="email"
        description="يجب أن يكون البريد مسجلاً ضمن صلاحيات الإدارة المعتمدة."
      />

      <BtnV2
        type="submit"
        size="lg"
        className="h-10 w-full rounded-md bg-auth-navy text-base text-primary-foreground shadow-sm hover:bg-auth-navy-hover focus-visible:border-auth-focus focus-visible:ring-auth-focus/40"
      >
        <span>{"إرسال رابط الاستعادة"}</span>

        <ArrowLeft aria-hidden="true" className="size-4" />
      </BtnV2>

      <AuthReturnLink>
        <ArrowRight className="size-4" /> <span>العودة لتسجيل الدخول</span>
      </AuthReturnLink>
    </form>
  );
};
