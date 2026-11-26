import { z } from "zod";

export const emailSchema = z.email("أدخل بريدًا إلكترونيًا صحيحًا");

export const passwordSchema = z
  .string()
  .min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف");
