import {
  Store,
  Users,
  Sofa,
  Archive,
  Megaphone,
  ClipboardClock,
  type LucideIcon,
} from "lucide-react";

import { StatCard } from "@/shared/components/ui";
import { dashboardMock } from "../api/dashboard.mock";
import type {
  DashboardMetricId,
  DashboardMetricTone,
} from "../types/dashboard.types";

const metricIcons: Record<DashboardMetricId, LucideIcon> = {
  "active-showrooms": Store,
  "registered-users": Users,
  "published-rooms": Sofa,
  "published-packages": Archive,
  "active-promotions": Megaphone,
  "pending-reviews": ClipboardClock,
};

const metricIconStyles: Record<DashboardMetricId, string> = {
  "active-showrooms": "bg-users-stat-neutral-bg text-users-stat-neutral-fg",
  "registered-users": "bg-users-stat-success-bg text-users-stat-success-fg",
  "published-rooms": "bg-badge-info-bg text-badge-info-fg",
  "published-packages": "bg-users-stat-warning-bg text-users-stat-warning-fg",
  "active-promotions": "bg-badge-warning-bg text-badge-warning-fg",
  "pending-reviews": "bg-badge-error-bg text-badge-error-fg",
};

const descriptionStyles: Record<DashboardMetricTone, string> = {
  success: "text-users-stat-success-fg",
  warning: "text-users-stat-warning-fg",
  danger: "text-badge-error-fg",
  muted: "text-text-muted",
};

export default function DashboardStats() {
  return (
    <section
      dir="rtl"
      aria-label="إحصائيات لوحة التحكم"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6"
    >
      {dashboardMock.metrics.map((metric) => {
        const Icon = metricIcons[metric.id];

        return (
          <StatCard
            key={metric.id}
            title={metric.label}
            value={metric.value}
            description={metric.description}
            icon={Icon}
            iconClassName={metricIconStyles[metric.id]}
            titleClassName="text-dashboard-label font-semibold text-text-primary"
            valueClassName="text-dashboard-value text-text-primary"
            descriptionClassName={descriptionStyles[metric.descriptionTone]}
            className="min-h-[120px] border-border-subtle bg-card shadow-card"
          />
        );
      })}
    </section>
  );
}
