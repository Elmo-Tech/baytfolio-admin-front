import { useNavigate } from "react-router";

import {
  TABLE_LOGIN_METHOD_LABELS,
  USER_STATUS_CONFIG,
} from "../constants/user-labels";
import type { User } from "../types/user";
import { formatUserDate, formatUserLastLogin } from "../utils/format-user-date";

export interface UserTableRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatarInitial: string;
  loginMethodLabel: string;
  createdAtFormatted: string;
  lastLoginFormatted: string;
  statusLabel: string;
  statusBadgeClass: string;
}

export function useUsersTable(users: User[]) {
  const navigate = useNavigate();

  const rows: UserTableRow[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    avatarInitial: user.avatarInitial,
    loginMethodLabel: TABLE_LOGIN_METHOD_LABELS[user.loginMethod],
    createdAtFormatted: formatUserDate(user.createdAt),
    lastLoginFormatted: formatUserLastLogin(user.lastLogin),
    statusLabel: USER_STATUS_CONFIG[user.status].tableLabel,
    statusBadgeClass: USER_STATUS_CONFIG[user.status].badgeClass,
  }));

  return {
    rows,
    onRowClick: (userId: string) => navigate(`/users/${userId}`),
  };
}
