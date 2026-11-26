import type {
  LoginRole,
  LoginRoleContent,
  RoleWithLabel,
} from "../types/login.types";

export const loginRoles: LoginRole[] = ["admin", "vendor"] as const;

export const rolesWithLabels: RoleWithLabel[] = [
  { value: "admin", label: "المدير" },
  { value: "vendor", label: "البائع" },
];

export const loginRoleContent: LoginRoleContent = {
  admin: {
    title: "تسجيل الدخول المدير",
    description:
      "سجّل الدخول إلى بوابة إدارة BaytFolio الموحدة للأصول والعمليات.",
  },
  vendor: {
    title: "تسجيل دخول البائع",
    description:
      "سجّل الدخول إلى بوابة التاجر في BaytFolio لإدارة معرضك وعملياتك.",
  },
};
