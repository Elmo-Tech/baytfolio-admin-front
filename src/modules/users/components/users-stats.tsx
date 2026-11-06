import { Ban, Clock3, Users, UserRoundCheck } from "lucide-react";

import { StatCard } from "@/shared/components/ui";
import { mockUsersStats } from "../api/users.mock";

const statsItems = [
  {
    title: "إجمالي المستخدمين",
    value: mockUsersStats.totalUsers,
    description: "إجمالي الحسابات المسجلة عبر التطبيق والموقع",
    icon: Users,
    iconColor: "text-users-stat-neutral-fg",
    iconBackground: "bg-users-stat-neutral-bg",
    descriptionColor: "text-text-muted",
  },
  {
    title: "المستخدمون النشطون",
    value: mockUsersStats.activeUsers,
    percentage: "96.5%",
    description: "حسابات مكتملة دون قيود أمنية",
    icon: UserRoundCheck,
    iconColor: "text-users-stat-success-fg",
    iconBackground: "bg-users-stat-success-bg",
    descriptionColor: "text-users-stat-success-fg",
  },
  {
    title: "المستخدمون المحظورون",
    value: mockUsersStats.suspendedUsers,
    description: "تم تقييدهم إداريًا لمخالفة الشروط",
    icon: Ban,
    iconColor: "text-users-stat-error-fg",
    iconBackground: "bg-users-stat-error-bg",
    descriptionColor: "text-users-stat-error-fg",
  },
  {
    title: "طلبات حذف الحساب",
    value: mockUsersStats.pendingDeletionUsers,
    description: "بانتظار انتهاء مهلة الحذف القانونية",
    icon: Clock3,
    iconColor: "text-users-stat-warning-fg",
    iconBackground: "bg-users-stat-warning-bg",
    descriptionColor: "text-users-stat-warning-fg",
  },
];

export default function UsersStats() {
  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {statsItems.map((item) => {
        const Icon = item.icon;

        return (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            description={item.description}
            icon={Icon}
            iconClassName={`${item.iconBackground} ${item.iconColor}`}
            descriptionClassName={item.descriptionColor}
            valueAdornment={
              item.percentage && (
                <span className="rounded-sm bg-users-stat-success-bg px-2 py-1 text-[10px] font-semibold text-users-stat-success-fg">
                  {item.percentage}
                </span>
              )
            }
          />
        );
      })}
    </section>
  );
}
