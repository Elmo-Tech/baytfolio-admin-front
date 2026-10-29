import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("أدخل بريدًا إلكترونيًا صحيحًا"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
  rememberDevice: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
