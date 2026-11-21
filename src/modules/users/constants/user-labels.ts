import type { UserLoginMethod, UserStatus } from "../types/user";

export const LOGIN_METHOD_LABELS: Record<UserLoginMethod, string> = {
  phone_password: "Phone + Password",
  google: "Google",
  apple: "Apple",
};

export const TABLE_LOGIN_METHOD_LABELS: Record<UserLoginMethod, string> = {
  phone_password: "الهاتف وكلمة المرور",
  google: "Google",
  apple: "Apple",
};

export const USER_STATUS_CONFIG: Record<
  UserStatus,
  {
    label: string;
    shortLabel: string;
    tableLabel: string;
    description: string;
    color: string;
    dot: string;
    badgeClass: string;
  }
> = {
  active: {
    label: "نشط ومتاح للوصول",
    shortLabel: "نشط",
    tableLabel: "نشط",
    description:
      "الحساب يعمل بشكل طبيعي ويمتلك صلاحية الوصول إلى بقية موقع BaytFolio.",
    color: "text-users-status-active-fg",
    dot: "bg-users-status-active-fg",
    badgeClass: "bg-status-active-bg text-status-active-fg",
  },
  suspended: {
    label: "الحساب موقوف",
    shortLabel: "موقوف",
    tableLabel: "محظور",
    description: "هذا الحساب موقوف حاليًا ولا يمكنه الوصول إلى المنصة.",
    color: "text-users-status-error-fg",
    dot: "bg-users-status-error-fg",
    badgeClass: "bg-status-suspended-bg text-status-suspended-fg",
  },
  pending_deletion: {
    label: "في انتظار الحذف",
    shortLabel: "في انتظار الحذف",
    tableLabel: "طلب حذف",
    description: "هذا الحساب في انتظار استكمال إجراءات الحذف.",
    color: "text-users-status-pending-fg",
    dot: "bg-users-status-pending-dot",
    badgeClass: "bg-status-pending-bg text-status-pending-fg",
  },
  deleted: {
    label: "حساب محذوف",
    shortLabel: "محذوف",
    tableLabel: "محذوف",
    description: "تم حذف هذا الحساب ولا يمكنه الوصول إلى المنصة.",
    color: "text-users-status-deleted-fg",
    dot: "bg-users-status-deleted-dot",
    badgeClass: "bg-status-deleted-bg text-status-deleted-fg",
  },
};
