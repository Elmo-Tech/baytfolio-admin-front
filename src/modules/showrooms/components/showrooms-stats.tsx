import { Ban, BadgeCheck, CalendarClock, Store } from "lucide-react";

import { StatCard } from "@/shared/components/ui";

const stats = [
  {
    title: "إجمالي المعارض والمصانع",
    value: 142,
    description: "إجمالي المسجلة بالنظام",
    icon: Store,
    iconClassName: "bg-users-stat-neutral-bg text-users-stat-neutral-fg",
    valueClassName: "text-users-text-primary",
    descriptionClassName: "text-text-muted",
  },
  {
    title: "المعارض النشطة",
    value: 126,
    description: "جاهزة وتستقبل الطلبات",
    icon: BadgeCheck,
    iconClassName: "bg-users-stat-success-bg text-users-stat-success-fg",
    valueClassName: "text-users-stat-success-fg",
    descriptionClassName: "text-users-stat-success-fg",
  },
  {
    title: "المعارض الموقوفة",
    value: 9,
    description: "تتطلب تدقيقًا إداريًا",
    icon: Ban,
    iconClassName: "bg-users-stat-error-bg text-users-stat-error-fg",
    valueClassName: "text-users-stat-error-fg",
    descriptionClassName: "text-users-stat-error-fg",
  },
  {
    title: "عقود قاربت على الانتهاء",
    value: 7,
    description: "متبقي أقل من 30 يومًا",
    icon: CalendarClock,
    iconClassName: "bg-users-stat-warning-bg text-users-stat-warning-fg",
    valueClassName: "text-users-stat-warning-fg",
    descriptionClassName: "text-users-stat-warning-fg",
  },
];

export default function ShowroomsStats() {
  return (
    <section
      dir="rtl"
      aria-label="إحصائيات المعارض والمصانع"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          iconClassName={stat.iconClassName}
          valueClassName={stat.valueClassName}
          descriptionClassName={stat.descriptionClassName}
          className="min-h-[108px] rounded-lg border-border-warm p-4 shadow-sm"
        />
      ))}
    </section>
  );
}
