import { z } from "zod";

export const categoriesAndTagsSchema = z.object({
  image: z.string().min(1, "يرجى اختيار صورة المحتوى."),

  nameAr: z.string().trim().min(1, "الاسم باللغة العربية حقل إلزامي."),

  nameEn: z.string().trim(),

  order: z
    .string()
    .min(1, "الترتيب حقل إلزامي.")
    .refine(
      (value) => Number.isInteger(Number(value)) && Number(value) > 0,
      "الترتيب يجب أن يكون رقماً صحيحاً أكبر من صفر.",
    ),

  status: z.enum(["نشط", "معطل"]),
});

export type CategoriesAndTagsFormValues = z.infer<
  typeof categoriesAndTagsSchema
>;
