export interface FilterOption {
  value: string;
  label: string;
}

export const STATUS_FILTER_OPTIONS: FilterOption[] = [
  { value: "all", label: "كل الحالات" },
  { value: "active", label: "نشط" },
  { value: "suspended", label: "محظور" },
  { value: "pending_deletion", label: "طلب حذف" },
  { value: "deleted", label: "محذوف" },
];

export const LOGIN_METHOD_FILTER_OPTIONS: FilterOption[] = [
  { value: "all", label: "كل طرق الدخول" },
  { value: "phone_password", label: "الهاتف وكلمة المرور" },
  { value: "google", label: "Google" },
  { value: "apple", label: "Apple" },
];

export const SORT_ORDER_OPTIONS: FilterOption[] = [
  { value: "newest", label: "الأحدث تسجيلًا" },
  { value: "oldest", label: "الأقدم تسجيلًا" },
];
