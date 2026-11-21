import { Clock3 } from "lucide-react";

import { ACTIVITY_STATUS_COLORS } from "../constants/dashboard-insights";
import type { RecentActivity } from "../types/dashboard-insights.types";
import DashboardInsightCard from "./dashboard-insight-card";

interface RecentActivityCardProps {
  activities: RecentActivity[];
  onShowAll: () => void;
}

export default function RecentActivityCard({
  activities,
  onShowAll,
}: RecentActivityCardProps) {
  return (
    <DashboardInsightCard
      title="سجل النشاط الأخير"
      icon={<Clock3 size={22} />}
      action="عرض سجل العمليات"
      onAction={onShowAll}
      footerLabel="سجل العمليات مؤمن ومؤرشف"
      footerAction="عرض سجل العمليات"
      onFooterAction={onShowAll}
    >
      <div className="relative flex-1 py-2">
        <div className="absolute bottom-6 right-1.5 top-6 w-0.5 bg-border-warm" />

        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="relative flex gap-3">
              <span
                className={`relative z-10 mt-1.5 size-3 shrink-0 rounded-full ring-4 ring-card ${ACTIVITY_STATUS_COLORS[activity.status]}`}
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
    </DashboardInsightCard>
  );
}
