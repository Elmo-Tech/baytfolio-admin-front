import { Ban, Clock3, Users, UserRoundCheck } from "lucide-react";

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
          <article
            key={item.title}
            className="flex min-h-[108px] flex-col justify-between rounded-md border border-users-panel-border bg-users-surface p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-text-muted">
                  {item.title}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <h3 className="text-2xl font-bold leading-none text-users-text-primary">
                    {item.value.toLocaleString("en-US")}
                  </h3>

                  {item.percentage && (
                    <span className="rounded-sm bg-users-stat-success-bg px-2 py-1 text-[10px] font-semibold text-users-stat-success-fg">
                      {item.percentage}
                    </span>
                  )}
                </div>
              </div>

              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-sm ${item.iconBackground}`}
              >
                <Icon size={20} strokeWidth={1.9} className={item.iconColor} />
              </div>
            </div>

            <p className={`mt-4 text-[11px] ${item.descriptionColor}`}>
              {item.description}
            </p>
          </article>
        );
      })}
    </section>
  );
}
