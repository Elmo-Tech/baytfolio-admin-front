import {
  Images,
  Megaphone,
  MessageSquare,
  Package,
  Store,
  Users,
  type LucideIcon,
} from "lucide-react";

export const ANALYTICS_PERIODS = [
  { label: "هذا الشهر", value: "month" },
  { label: "آخر 3 أشهر", value: "3months" },
  { label: "هذا العام", value: "year" },
  { label: "فترة مخصصة", value: "custom" },
] as const;

export type AnalyticsPeriod = (typeof ANALYTICS_PERIODS)[number]["value"];

export const ANALYTICS_STAT_ICONS: Record<string, LucideIcon> = {
  users: Users,
  store: Store,
  images: Images,
  package: Package,
  reviews: MessageSquare,
  megaphone: Megaphone,
};
