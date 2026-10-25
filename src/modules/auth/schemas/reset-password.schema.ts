import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")
      .regex(/\d/, "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل")
      .regex(/[^A-Za-z0-9]/, "يجب أن تحتوي كلمة المرور على رمز واحد على الأقل"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
