import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Info, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/modules/auth/schemas/reset-password.schema";
import ArrowIcon from "@/shared/components/ui/arrow-icon";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";

type RequestState = "idle" | "loading" | "error";

export default function ResetPasswordForm() {
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
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
        <FieldLabel className="text-[#263746]" htmlFor="new-password">
          كلمة المرور الجديدة
        </FieldLabel>
        <div className="relative">
          <Input
            id="new-password"
            type={isNewPasswordVisible ? "text" : "password"}
            autoComplete="new-password"
            dir="ltr"
            className="h-9 border-[#E7DED2] bg-white pl-10 pr-3 text-left text-[#263746] focus-visible:border-[#B8914E] focus-visible:ring-[#B8914E]/20"
            {...register("password", {
              onChange: () => setRequestState("idle"),
            })}
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            aria-label={
              isNewPasswordVisible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
            }
            aria-pressed={isNewPasswordVisible}
            onClick={() => setIsNewPasswordVisible((visible) => !visible)}
            className="absolute top-1/2 left-1.5 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded text-[#9A8B79] hover:bg-[#F7F3ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8914E]/40"
          >
            {isNewPasswordVisible ? (
              <EyeOff aria-hidden="true" className="size-4" />
            ) : (
              <Eye aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>
        <p className="flex items-center gap-1.5 text-sm leading-5 text-[#37434B]">
          <Info aria-hidden="true" className="size-4 shrink-0 text-[#A99780]" />
          <span>
            استخدم كلمة مرور قوية لا تقل عن 8 أحرف وتحتوي على أرقام ورموز.
          </span>
        </p>
        <FieldError errors={[errors.password]} />
      </Field>

      <Field className="gap-2">
        <FieldLabel className="text-[#263746]" htmlFor="confirm-password">
          تأكيد كلمة المرور
        </FieldLabel>
        <div className="relative">
          <Input
            id="confirm-password"
            type={isConfirmationVisible ? "text" : "password"}
            autoComplete="new-password"
            dir="ltr"
            className="h-9 border-[#E7DED2] bg-white pl-10 pr-3 text-left text-[#263746] focus-visible:border-[#B8914E] focus-visible:ring-[#B8914E]/20"
            {...register("confirmPassword", {
              onChange: () => setRequestState("idle"),
            })}
            aria-invalid={!!errors.confirmPassword}
          />
          <button
            type="button"
            aria-label={
              isConfirmationVisible
                ? "إخفاء تأكيد كلمة المرور"
                : "إظهار تأكيد كلمة المرور"
            }
            aria-pressed={isConfirmationVisible}
            onClick={() => setIsConfirmationVisible((visible) => !visible)}
            className="absolute top-1/2 left-1.5 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded text-[#9A8B79] hover:bg-[#F7F3ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8914E]/40"
          >
            {isConfirmationVisible ? (
              <EyeOff aria-hidden="true" className="size-4" />
            ) : (
              <Eye aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>
        <FieldError errors={[errors.confirmPassword]} />
      </Field>

      {requestState === "error" && (
        <p
          role="alert"
          className="rounded-md border border-[#E8C8C3] bg-[#FFF5F3] px-3 py-2 text-center text-sm leading-5 text-[#9E3D31]"
        >
          خدمة تحديث كلمة المرور غير متاحة حاليًا. لم يتم تغيير كلمة المرور.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={requestState === "loading"}
        className="h-10 w-full rounded-md bg-[#172A3A] text-base text-white shadow-sm hover:bg-[#243B4D] focus-visible:border-[#B8914E] focus-visible:ring-[#B8914E]/40"
      >
        <span>
          {requestState === "loading" ? "جارٍ التحديث..." : "تحديث كلمة المرور"}
        </span>
        <RotateCcw aria-hidden="true" className="size-4" />
      </Button>

      <Link
        to="/login"
        className="mx-auto flex w-fit items-center gap-1.5 text-sm font-medium text-[#3F515F] transition-colors hover:text-[#172A3A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8914E]/40"
      >
        <ArrowIcon className="size-4" />
        <span>العودة لتسجيل الدخول</span>
      </Link>
    </form>
  );
}
