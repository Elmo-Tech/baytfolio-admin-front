export type UserStatus =
  "active" | "suspended" | "pending_deletion" | "deleted";

export type UserLoginMethod = "phone_password" | "google" | "apple";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  loginMethod: UserLoginMethod;
  status: UserStatus;
  createdAt: string;
  lastLogin: string;
  avatarInitial: string;
}

export interface UsersStats {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
  pendingDeletionUsers: number;
}
