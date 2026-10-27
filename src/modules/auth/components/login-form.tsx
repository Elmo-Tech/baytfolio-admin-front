import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail } from "lucide-react";

import {
  loginSchema,
  type LoginFormValues,
} from "@/modules/auth/schemas/login.schema";

import { Input } from "@/shared/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Button } from "@/shared/components/ui/button";
import ArrowIcon from "@/shared/components/ui/arrow-icon";

type LoginFormProps = {
  onSubmit: (values: {
    email: string;
    password: string;
  }) => Promise<void> | void;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberDevice: false,
    },
  });

  async function handleLogin(values: LoginFormValues) {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const { email, password } = values;
      await onSubmit({ email, password });

      reset({
        email: values.email,
        password: "",
        rememberDevice: values.rememberDevice,
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "حدث خطأ أثناء تسجيل الدخول.",
      );

      reset({
        email: values.email,
        password: "",
        rememberDevice: values.rememberDevice,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} dir="rtl" className="space-y-5">
      {submitError && (
        <p role="alert" className="text-sm text-red-600">
          {submitError}
        </p>
      )}

      <Field>
        <FieldLabel className="text-[#263746]" htmlFor="email">
          البريد الإلكتروني
        </FieldLabel>

        <div className="relative">
          <Mail
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#A99780]"
          />

          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="admin@baytfolio.com"
            dir="ltr"
            className="h-11 border-[#DDD4C7] bg-[#FFFEFC] pl-10 pr-3 text-left text-[#263746] placeholder:text-[#A99780] focus-visible:border-[#B8914E] focus-visible:ring-[#B8914E]/20"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
        </div>

        <FieldError errors={[errors.email]} />
      </Field>

      <Field>
        <FieldLabel className="text-[#263746]" htmlFor="password">
          كلمة المرور
        </FieldLabel>

        <div className="relative">
          <Input
            id="password"
            dir="ltr"
            type={isPasswordVisible ? "text" : "password"}
            autoComplete="current-password"
            placeholder="أدخل كلمة المرور"
            className="h-11 border-[#DDD4C7] bg-[#FFFEFC] pl-10 pr-3 text-left text-[#263746] placeholder:text-[#A99780] focus-visible:border-[#B8914E] focus-visible:ring-[#B8914E]/20"
            {...register("password")}
            aria-invalid={!!errors.password}
          />

          <button
            type="button"
            className="absolute top-1/2 left-1.5 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-[#8B7964] transition-colors hover:bg-[#F7F3ED] hover:text-[#263746] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8914E]/40"
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            aria-label={
              isPasswordVisible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
            }
            aria-pressed={isPasswordVisible}
          >
            {isPasswordVisible ? (
              <EyeOff aria-hidden="true" className="size-4" />
            ) : (
              <Eye aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>

        <FieldError errors={[errors.password]} />
      </Field>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 text-sm">
        <a
          href="/forgot-password"
          className="font-medium text-[#9C7636] transition-colors hover:text-[#765522] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8914E]/40"
        >
          هل نسيت كلمة المرور؟
        </a>

        <label className="flex cursor-pointer items-center gap-2 text-[#5F6C75]">
          <input
            type="checkbox"
            className="size-4 rounded border-[#CFC2B1] accent-[#A97C32]"
            {...register("rememberDevice")}
          />
          <span>تذكرني على هذا الجهاز</span>
        </label>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-12 w-full rounded-lg bg-[#172A3A] text-base text-white shadow-sm hover:bg-[#243B4D] focus-visible:border-[#B8914E] focus-visible:ring-[#B8914E]/40"
      >
        <span>{isSubmitting ? "جارٍ تسجيل الدخول…" : "تسجيل الدخول"}</span>
        {!isSubmitting && <ArrowIcon className="size-5" />}
      </Button>
    </form>
  );
}

export default LoginForm;
