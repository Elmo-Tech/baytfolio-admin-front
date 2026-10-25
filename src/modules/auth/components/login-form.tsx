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

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  function onSubmit(values: LoginFormValues) {
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} dir="rtl" className="space-y-5">
      {/* Email */}
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

      {/* Password */}
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

      {/* Remember Device & Forgot Password */}
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

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-lg bg-[#172A3A] text-base text-white shadow-sm hover:bg-[#243B4D] focus-visible:border-[#B8914E] focus-visible:ring-[#B8914E]/40"
      >
        <span>تسجيل الدخول</span>
        <ArrowIcon className="size-5" />
      </Button>
    </form>
  );
}
