import type { TabValues } from "../types/categories-and-tags.types";

export const cateAndTagsTableNameHeaders: Record<TabValues, string> = {
  categories: "اسم التصنيفات",
  tags: "اسم التاجات",
};

export const cateAndTagsPaginationLabels: Record<TabValues, string> = {
  categories: "تصنيف",
  tags: "تاج",
};

export const cateAndTagsTableHeaders = {
  image: "صورة المحتوى",
  status: "الحالة",
  order: "الترتيب",
  actions: "الإجراءات",
} as const;
