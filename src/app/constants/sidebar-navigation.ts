import {
  Building2,
  ChartNoAxesCombined,
  Clock3,
  FileText,
  Flag,
  Grid2X2,
  Megaphone,
  Settings,
  ShieldUser,
  Shapes,
  Store,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type SidebarBadgeVariant = "orange" | "blue" | "red";

export interface SidebarNavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: number;
  badgeVariant?: SidebarBadgeVariant;
}

export interface SidebarNavGroup {
  title: string;
  items: SidebarNavItem[];
}

export const SIDEBAR_BADGE_STYLES: Record<SidebarBadgeVariant, string> = {
  orange: "bg-badge-warning-bg text-badge-warning-fg",
  blue: "bg-badge-info-bg text-badge-info-fg",
  red: "bg-badge-error-bg text-badge-error-fg",
};

export const SIDEBAR_NAVIGATION_GROUPS: SidebarNavGroup[] = [
  {
    title: "لوحة التحكم",
    items: [{ label: "نظرة عامة", to: "/dashboard", icon: Grid2X2 }],
  },
  {
    title: "العمليات",
    items: [
      {
        label: "طلبات انضمام المعارض",
        to: "/showroom-join-requests",
        icon: Store,
        badge: 14,
        badgeVariant: "orange",
      },
      { label: "المعارض والمصانع", to: "/showrooms", icon: Building2 },
      { label: "المستخدمون", to: "/users", icon: Users },
    ],
  },
  {
    title: "إدارة المحتوى",
    items: [
      { label: "التصنيفات والخصائص", to: "/categories", icon: Shapes },
      {
        label: "التقييمات والبلاغات",
        to: "/reviews-reports",
        icon: Flag,
        badge: 7,
        badgeVariant: "red",
      },
    ],
  },
  {
    title: "التجاري والترويج",
    items: [
      {
        label: "الترويجات",
        to: "/promotions",
        icon: Megaphone,
        badge: 6,
        badgeVariant: "orange",
      },
      {
        label: "الحسابات التجارية والحدود",
        to: "/commercial-accounts",
        icon: Wallet,
      },
    ],
  },
  {
    title: "المحتوى والتقارير",
    items: [
      {
        label: "التحليلات والتقارير",
        to: "/analytics",
        icon: ChartNoAxesCombined,
      },
      { label: "إدارة المحتوى CMS", to: "/cms", icon: FileText },
    ],
  },
  {
    title: "الإدارة",
    items: [
      { label: "المستخدمون والصلاحيات", to: "/admin-users", icon: ShieldUser },
      { label: "الإعدادات العامة", to: "/settings", icon: Settings },
      { label: "سجل العمليات", to: "/activity-log", icon: Clock3 },
    ],
  },
];
