export const JOIN_REQUEST_DATE_OPTIONS = [
  { value: "all", label: "تاريخ التقديم: الكل" },
  { value: "last7", label: "آخر 7 أيام" },
  { value: "last30", label: "آخر 30 يومًا" },
] as const;

export const JOIN_REQUEST_SORT_OPTIONS = [
  { value: "newest", label: "الترتيب: الأحدث" },
  { value: "oldest", label: "الترتيب: الأقدم" },
] as const;

export const JOIN_REQUEST_TABLE_HEADINGS = [
  "رقم الطلب",
  "المعرض / المصنع",
  "نوع النشاط",
  "مسؤول التواصل",
  "بيانات التواصل",
  "تاريخ التقديم",
  "الحالة",
  "الإجراء",
] as const;
