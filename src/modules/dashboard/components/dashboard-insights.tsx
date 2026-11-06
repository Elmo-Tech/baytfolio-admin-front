import { AlertTriangle, BarChart3, Clock3 } from "lucide-react";
import { toast } from "sonner";

import {
  activeShowroomsMock,
  expiringContractsMock,
  recentActivitiesMock,
} from "../api/dashboard-insights.mock";

import type { RecentActivity } from "../types/dashboard-insights.types";

const activityColors: Record<RecentActivity["status"], string> = {
  success: "bg-users-stat-success-fg",
  info: "bg-info",
  error: "bg-users-stat-error-fg",
  warning: "bg-warning",
};

function InsightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`flex min-w-0 flex-col rounded-2xl border border-border-warm bg-card p-5 shadow-card ${className}`}
    >
      {children}
    </article>
  );
}

function CardHeader({
  title,
  icon,
  action,
  onAction,
}: {
  title: string;
  icon: React.ReactNode;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border-divider pb-4">
      <div className="flex min-w-0 items-center gap-2">
        <span className="shrink-0 text-brand-gold-strong">{icon}</span>

        <h3 className="truncate text-base font-bold text-text-primary">
          {title}
        </h3>
      </div>

      {action && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 cursor-pointer text-sm font-semibold text-brand-navy transition-colors hover:text-brand-gold-strong"
        >
          {action}
        </button>
      )}
    </div>
  );
}

function TopActiveShowrooms() {
  const handleShowAll = () => {
    toast.info("صفحة المعارض الأكثر نشاطًا قيد التطوير");
  };

  return (
    <InsightCard>
      <CardHeader
        title="أكثر المعارض نشاطًا"
        icon={<BarChart3 size={22} />}
        action="عرض الكل"
        onAction={handleShowAll}
      />

      <div className="flex-1 divide-y divide-border-divider">
        {activeShowroomsMock.map((showroom, index) => (
          <div key={showroom.id} className="flex items-center gap-3 py-5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border-warm bg-surface-admin text-sm font-bold text-text-primary">
              {index + 1}
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-text-primary">
                {showroom.name}
              </p>

              <p className="mt-1 text-xs leading-5 text-text-muted">
                {showroom.rooms} غرفة | {showroom.packages} باقة |{" "}
                {showroom.views} مشاهدة | {showroom.interactions} تفاعل
              </p>
            </div>

            <span
              className={`shrink-0 rounded-md border px-2.5 py-1 text-sm font-bold ${
                showroom.growth >= 15
                  ? "border-users-stat-success-fg/30 bg-users-stat-success-bg text-users-stat-success-fg"
                  : "border-border-warm bg-surface-admin text-text-secondary-strong"
              }`}
            >
              +{showroom.growth}%
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border-divider pt-4 text-sm">
        <span className="text-text-muted">معدل التفاعل خلال آخر 30 يومًا</span>

        <button
          type="button"
          onClick={handleShowAll}
          className="shrink-0 cursor-pointer font-semibold text-brand-navy transition-colors hover:text-brand-gold-strong"
        >
          عرض الكل
        </button>
      </div>
    </InsightCard>
  );
}

function RecentActivity() {
  const handleShowAll = () => {
    toast.info("صفحة سجل العمليات قيد التطوير");
  };

  return (
    <InsightCard>
      <CardHeader
        title="سجل النشاط الأخير"
        icon={<Clock3 size={22} />}
        action="عرض سجل العمليات"
        onAction={handleShowAll}
      />

      <div className="relative flex-1 py-2">
        <div className="absolute bottom-6 right-1.5 top-6 w-0.5 bg-border-warm" />

        <div className="space-y-5">
          {recentActivitiesMock.map((activity) => (
            <div key={activity.id} className="relative flex gap-3">
              <span
                className={`relative z-10 mt-1.5 size-3 shrink-0 rounded-full ring-4 ring-card ${activityColors[activity.status]}`}
              />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-6 text-text-primary">
                  {activity.title}
                </p>

                <p className="mt-1 text-xs leading-5 text-text-muted">
                  بواسطة: {activity.user} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border-divider pt-4 text-sm">
        <span className="text-text-muted">سجل العمليات مؤمن ومؤرشف</span>

        <button
          type="button"
          onClick={handleShowAll}
          className="shrink-0 cursor-pointer font-semibold text-brand-navy transition-colors hover:text-brand-gold-strong"
        >
          عرض سجل العمليات
        </button>
      </div>
    </InsightCard>
  );
}

function ExpiringContracts() {
  const handleShowAll = () => {
    toast.info("صفحة الحسابات التجارية والعقود قيد التطوير");
  };

  return (
    <InsightCard>
      <CardHeader
        title="العقود القريبة من الانتهاء"
        icon={<AlertTriangle size={22} />}
        action="4 معارض"
        onAction={handleShowAll}
      />

      <div className="flex-1 divide-y divide-border-divider">
        {expiringContractsMock.map((contract) => {
          const needsAttention = contract.remainingDays <= 13;

          return (
            <div key={contract.id} className="flex items-center gap-3 py-5">
              <span
                className={`shrink-0 rounded-lg border px-2 py-1.5 text-sm font-bold ${
                  needsAttention
                    ? "border-users-stat-warning-fg/40 bg-users-stat-warning-bg text-users-stat-warning-fg"
                    : "border-badge-info-fg/30 bg-badge-info-bg text-badge-info-fg"
                }`}
              >
                {contract.remainingDays}d
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-text-primary">
                  {contract.organization}
                </p>

                <p className="mt-1 text-xs leading-5 text-text-muted">
                  ينتهي في: {contract.expiryDate}
                </p>

                <p className="text-xs text-text-muted">
                  متبقي {contract.remainingDays} أيام
                </p>
              </div>

              <button
                type="button"
                onClick={handleShowAll}
                className={`max-w-24 shrink-0 cursor-pointer rounded-md border px-2 py-2 text-xs font-semibold transition-colors ${
                  needsAttention
                    ? "border-users-stat-warning-fg/40 bg-users-stat-warning-bg text-users-stat-warning-fg hover:bg-users-stat-warning-bg/80"
                    : "border-badge-info-fg/30 bg-badge-info-bg text-badge-info-fg hover:bg-badge-info-bg/80"
                }`}
              >
                {needsAttention ? "قارب على الانتهاء" : "متابعة التجديد"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border-divider pt-4 text-sm">
        <span className="text-text-muted">إشعارات التجديد التلقائية مفعلة</span>

        <button
          type="button"
          onClick={handleShowAll}
          className="shrink-0 cursor-pointer font-semibold text-brand-navy transition-colors hover:text-brand-gold-strong"
        >
          عرض الحسابات التجارية والعقود
        </button>
      </div>
    </InsightCard>
  );
}

export default function DashboardInsights() {
  return (
    <section
      aria-label="تفاصيل نشاط المنصة والعقود"
      className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3"
    >
      <TopActiveShowrooms />
      <RecentActivity />
      <ExpiringContracts />
    </section>
  );
}
