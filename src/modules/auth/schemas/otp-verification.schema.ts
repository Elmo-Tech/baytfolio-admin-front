import { z } from "zod";

export const otpVerificationSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "أدخل رمز التحقق المكون من 6 أرقام"),
});

export type OtpVerificationValues = z.infer<typeof otpVerificationSchema>;
