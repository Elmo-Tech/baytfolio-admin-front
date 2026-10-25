import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Info, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/modules/auth/schemas/forgot-password.schema";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
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

    // No password-reset service is configured in this application yet.
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
        <FieldLabel className="text-[#263746]" htmlFor="recovery-email">
          البريد الإلكتروني
        </FieldLabel>

        <div className="relative">
          <Mail
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#A99780]"
          />
          <Input
            id="recovery-email"
            type="email"
            autoComplete="email"
            dir="ltr"
            placeholder="admin@baytfolio.com"
            className="h-10 border-[#E7DED2] bg-[#FBF9F6] pl-10 pr-3 text-left text-[#263746] placeholder:text-[#B5A894] focus-visible:border-[#B8914E] focus-visible:ring-[#B8914E]/20"
            {...register("email", {
              onChange: () => setRequestState("idle"),
            })}
            aria-invalid={!!errors.email}
          />
        </div>

        <p className="flex items-center gap-1.5 text-xs leading-5 text-[#9A8B79]">
          <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" /> يجب
          أن يكون البريد مسجلاً ضمن صلاحيات الإدارة المعتمدة.
        </p>
        <FieldError errors={[errors.email]} />
      </Field>

      {requestState === "error" && (
        <p
          role="alert"
          className="rounded-md border border-[#E8C8C3] bg-[#FFF5F3] px-3 py-2 text-xs leading-5 text-[#9E3D31]"
        >
          خدمة استعادة كلمة المرور غير متاحة حاليًا. لم يتم إرسال أي بريد
          إلكتروني.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={requestState === "loading"}
        className="h-10 w-full rounded-md bg-[#172A3A] text-sm text-white shadow-sm hover:bg-[#243B4D] focus-visible:border-[#B8914E] focus-visible:ring-[#B8914E]/40"
      >
        <span>
          {requestState === "loading"
            ? "جارٍ التحقق..."
            : "إرسال رابط الاستعادة"}
        </span>
        <ArrowRight aria-hidden="true" className="size-4" />{" "}
      </Button>

      <Link
        to="/login"
        className="mx-auto flex w-fit items-center gap-1.5 text-sm font-medium text-[#3F515F] transition-colors hover:text-[#172A3A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8914E]/40"
      >
        <ArrowIcon className="size-4" /> <span>العودة لتسجيل الدخول</span>
      </Link>
    </form>
  );
}
