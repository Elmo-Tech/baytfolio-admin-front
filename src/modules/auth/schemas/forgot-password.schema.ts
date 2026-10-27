import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("أدخل بريدًا إلكترونيًا صحيحًا"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
