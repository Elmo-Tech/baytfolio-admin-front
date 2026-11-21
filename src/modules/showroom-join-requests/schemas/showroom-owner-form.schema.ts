import { z } from "zod";

export const ownerSchema = z.object({
  name: z.string().min(1, "يرجى إدخال الاسم الكامل"),
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  phone: z.string().min(1, "يرجى إدخال رقم الهاتف"),
});

export type OwnerFormValues = z.infer<typeof ownerSchema>;
