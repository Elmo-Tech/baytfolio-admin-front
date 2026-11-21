import { BarChart3 } from "lucide-react";

import type { ActiveShowroom } from "../types/dashboard-insights.types";
import DashboardInsightCard from "./dashboard-insight-card";

interface TopActiveShowroomsCardProps {
  showrooms: ActiveShowroom[];
  onShowAll: () => void;
}

export default function TopActiveShowroomsCard({
  showrooms,
  onShowAll,
}: TopActiveShowroomsCardProps) {
  return (
    <DashboardInsightCard
      title="أكثر المعارض نشاطًا"
      icon={<BarChart3 size={22} />}
      action="عرض الكل"
      onAction={onShowAll}
      footerLabel="معدل التفاعل خلال آخر 30 يومًا"
      footerAction="عرض الكل"
      onFooterAction={onShowAll}
    >
      <div className="flex-1 divide-y divide-border-divider">
        {showrooms.map((showroom, index) => (
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
    </DashboardInsightCard>
  );
}
