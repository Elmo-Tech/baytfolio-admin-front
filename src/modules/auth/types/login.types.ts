export type LoginRole = "admin" | "vendor";

export type RoleWithLabel = { value: LoginRole; label: string };

export type LoginRoleContent = Record<
  LoginRole,
  { title: string; description: string }
>;
