import { useState } from "react";
import { useParams } from "react-router";

import { mockUsers } from "../api/users.mock";
import type { UserLoginMethod, UserStatus } from "../types/user";

export const LOGIN_METHOD_LABELS: Record<UserLoginMethod, string> = {
  phone_password: "Phone + Password",
  google: "Google",
  apple: "Apple",
};

const STATUS_LABELS: Record<UserStatus, string> = {
  active: "نشط",
  suspended: "موقوف",
  deleted: "محذوف",
  pending_deletion: "في انتظار الحذف",
};

export function useUserDetails() {
  const { userId } = useParams();
  const [isBlocked, setIsBlocked] = useState(false);

  const user = mockUsers.find((item) => item.id === userId);
  const currentStatus: UserStatus = isBlocked
    ? "suspended"
    : (user?.status ?? "active");
  const isActive = user?.status === "active" && !isBlocked;

  return {
    user,
    isActive,
    currentStatus,
    statusLabel: STATUS_LABELS[currentStatus],
    loginMethodLabel: user ? LOGIN_METHOD_LABELS[user.loginMethod] : "",
    handleBlockUser: () => setIsBlocked(true),
  };
}
