import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  type LoginFormValues,
} from "@/modules/auth/schemas/login-schema";

import { Input } from "@/shared/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Button } from "@/shared/components/ui/button";

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
    },
  });

  function onSubmit(values: LoginFormValues) {
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} dir="rtl" className="space-y-5">
      <Field>
        <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="admin@baytfolio.com"
          {...register("email")}
          aria-invalid={!!errors.email}
        />
        <FieldError errors={[errors.email]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="password">كلمة المرور</FieldLabel>
        <Input
          id="password"
          type="password"
          placeholder="أدخل كلمة المرور"
          {...register("password")}
          aria-invalid={!!errors.password}
        />
        <FieldError errors={[errors.password]} />
      </Field>

      <Button type="submit" className="w-full">
        تسجيل الدخول
      </Button>
    </form>
  );
}
