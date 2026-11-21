import {
  Ban,
  Clock3,
  Users,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import type { UsersStats } from "../types/user";

export interface UserStatConfig {
  key: keyof UsersStats;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBackground: string;
  descriptionColor: string;
  percentage?: string;
}

export const USER_STATS_CONFIG: UserStatConfig[] = [
  {
    key: "totalUsers",
    title: "إجمالي المستخدمين",
    description: "إجمالي الحسابات المسجلة عبر التطبيق والموقع",
    icon: Users,
    iconColor: "text-users-stat-neutral-fg",
    iconBackground: "bg-users-stat-neutral-bg",
    descriptionColor: "text-text-muted",
  },
  {
    key: "activeUsers",
    title: "المستخدمون النشطون",
    percentage: "96.5%",
    description: "حسابات مكتملة دون قيود أمنية",
    icon: UserRoundCheck,
    iconColor: "text-users-stat-success-fg",
    iconBackground: "bg-users-stat-success-bg",
    descriptionColor: "text-users-stat-success-fg",
  },
  {
    key: "suspendedUsers",
    title: "المستخدمون المحظورون",
    description: "تم تقييدهم إداريًا لمخالفة الشروط",
    icon: Ban,
    iconColor: "text-users-stat-error-fg",
    iconBackground: "bg-users-stat-error-bg",
    descriptionColor: "text-users-stat-error-fg",
  },
  {
    key: "pendingDeletionUsers",
    title: "طلبات حذف الحساب",
    description: "بانتظار انتهاء مهلة الحذف القانونية",
    icon: Clock3,
    iconColor: "text-users-stat-warning-fg",
    iconBackground: "bg-users-stat-warning-bg",
    descriptionColor: "text-users-stat-warning-fg",
  },
];
