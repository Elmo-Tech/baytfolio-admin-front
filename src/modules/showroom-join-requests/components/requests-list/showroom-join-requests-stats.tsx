import { CheckCircle2, Handshake, RefreshCw, Store } from "lucide-react";

import type { ShowroomJoinRequest } from "../../types/showroom-join-requests.types";

type Props = {
  requests: ShowroomJoinRequest[];
};

export default function ShowroomJoinRequestsStats({ requests }: Props) {
  const stats = [
    {
      id: "new",
      title: "طلبات جديدة",
      value: requests.filter((item) => item.status === "new").length,
      description: "جديدة بانتظار المراجعة",
      badge: "جديد",
      icon: Store,
      iconColor: "text-info",
      badgeColor: "bg-info/10 text-info",
      borderColor: "border-info/20",
    },
    {
      id: "under_review",
      title: "قيد المراجعة",
      value: requests.filter((item) => item.status === "under_review").length,
      description: "خاضعة للتقييم الأولي",
      badge: "تحت الدراسة",
      icon: RefreshCw,
      iconColor: "text-primary",
      badgeColor: "bg-primary/10 text-primary",
      borderColor: "border-primary/20",
    },
    {
      id: "pending_agreement",
      title: "بانتظار الاتفاق",
      value: requests.filter((item) => item.status === "pending_agreement")
        .length,
      description: "صياغة مسودة الشروط والتأهيل",
      badge: "مفاوضة",
      icon: Handshake,
      iconColor: "text-warning",
      badgeColor: "bg-warning/10 text-warning",
      borderColor: "border-warning/20",
    },
    {
      id: "approved",
      title: "معتمدة لبدء التجهيز",
      value: requests.filter((item) => item.status === "approved").length,
      description: "جاهزة للتهيئة وتوقيع العقد",
      badge: "معتمد",
      icon: CheckCircle2,
      iconColor: "text-success",
      badgeColor: "bg-success/10 text-success",
      borderColor: "border-success/20",
    },
  ];

  return (
    <section
      aria-label="إحصائيات طلبات انضمام المعارض"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <article
            key={stat.id}
            className={`flex min-h-[112px] flex-col justify-between rounded-lg border ${stat.borderColor} bg-card p-3.5 transition-shadow duration-200 hover:shadow-md`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xs font-medium text-text-secondary">
                {stat.title}
              </h3>
              <Icon size={17} strokeWidth={2} className={stat.iconColor} />
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p
                className={`text-2xl font-bold tabular-nums ${stat.iconColor}`}
              >
                {stat.value}
              </p>
              <span
                className={`inline-flex items-center rounded-sm px-2 py-1 text-[10px] font-medium ${stat.badgeColor}`}
              >
                {stat.badge}
              </span>
            </div>
            <p className="mt-2 text-right text-[11px] leading-5 text-text-muted">
              {stat.description}
            </p>
          </article>
        );
      })}
    </section>
  );
}
