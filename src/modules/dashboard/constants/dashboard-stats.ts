import {
  Archive,
  ClipboardClock,
  Megaphone,
  Sofa,
  Store,
  Users,
  type LucideIcon,
} from "lucide-react";

import type {
  DashboardMetricId,
  DashboardMetricTone,
} from "../types/dashboard.types";

export const METRIC_ICONS: Record<DashboardMetricId, LucideIcon> = {
  "active-showrooms": Store,
  "registered-users": Users,
  "published-rooms": Sofa,
  "published-packages": Archive,
  "active-promotions": Megaphone,
  "pending-reviews": ClipboardClock,
};

export const METRIC_ICON_STYLES: Record<DashboardMetricId, string> = {
  "active-showrooms": "bg-users-stat-neutral-bg text-users-stat-neutral-fg",
  "registered-users": "bg-users-stat-success-bg text-users-stat-success-fg",
  "published-rooms": "bg-badge-info-bg text-badge-info-fg",
  "published-packages": "bg-users-stat-warning-bg text-users-stat-warning-fg",
  "active-promotions": "bg-badge-warning-bg text-badge-warning-fg",
  "pending-reviews": "bg-badge-error-bg text-badge-error-fg",
};

export const METRIC_DESCRIPTION_STYLES: Record<DashboardMetricTone, string> = {
  success: "text-users-stat-success-fg",
  warning: "text-users-stat-warning-fg",
  danger: "text-badge-error-fg",
  muted: "text-text-muted",
};
