import { Ban, Clock3, Users, UserRoundCheck } from "lucide-react";

import { mockUsersStats } from "../api/users.mock";

const statsItems = [
  {
    title: "إجمالي المستخدمين",
    value: mockUsersStats.totalUsers,
    description: "إجمالي الحسابات المسجلة عبر التطبيق والموقع",
    icon: Users,
    iconColor: "text-[#102233]",
    iconBackground: "bg-[#e9ecef]",
    descriptionColor: "text-[#aa9985]",
  },
  {
    title: "المستخدمون النشطون",
    value: mockUsersStats.activeUsers,
    percentage: "96.5%",
    description: "حسابات مكتملة دون قيود أمنية",
    icon: UserRoundCheck,
    iconColor: "text-[#28866d]",
    iconBackground: "bg-[#eaf3ef]",
    descriptionColor: "text-[#28866d]",
  },
  {
    title: "المستخدمون المحظورون",
    value: mockUsersStats.suspendedUsers,
    description: "تم تقييدهم إداريًا لمخالفة الشروط",
    icon: Ban,
    iconColor: "text-[#e05252]",
    iconBackground: "bg-[#fbeeee]",
    descriptionColor: "text-[#e05252]",
  },
  {
    title: "طلبات حذف الحساب",
    value: mockUsersStats.pendingDeletionUsers,
    description: "بانتظار انتهاء مهلة الحذف القانونية",
    icon: Clock3,
    iconColor: "text-[#e58a27]",
    iconBackground: "bg-[#fbf3e8]",
    descriptionColor: "text-[#e58a27]",
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
            className="flex min-h-[108px] flex-col justify-between rounded-md border border-[#f0ebe5] bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-[#aa9985]">
                  {item.title}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <h3 className="text-2xl font-bold leading-none text-[#1d2935]">
                    {item.value.toLocaleString("en-US")}
                  </h3>

                  {item.percentage && (
                    <span className="rounded-sm bg-[#eaf3ef] px-2 py-1 text-[10px] font-semibold text-[#28866d]">
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
