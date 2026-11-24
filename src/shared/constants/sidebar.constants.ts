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
} from "lucide-react";

import type {
  SidebarLinks,
  SidebarBadgeStyles,
} from "../types/sidebar-links.types";

export const sidebarLinks: SidebarLinks[] = [
  {
    title: "لوحة التحكم",
    items: [{ label: "نظرة عامة", to: "/admin/overview", icon: Grid2X2 }],
  },
  {
    title: "العمليات",
    items: [
      {
        label: "طلبات انضمام المعارض",
        to: "/admin/showroom-join-requests",
        icon: Store,
        badge: 14,
        badgeVariant: "orange",
      },
      { label: "المعارض والمصانع", to: "/admin/showrooms", icon: Building2 },
      { label: "المستخدمون", to: "/admin/users", icon: Users },
    ],
  },
  {
    title: "إدارة المحتوى",
    items: [
      { label: "التصنيفات والخصائص", to: "/admin/categories", icon: Shapes },
      {
        label: "التقييمات والبلاغات",
        to: "/admin/reviews-reports",
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
        to: "/admin/promotions",
        icon: Megaphone,
        badge: 6,
        badgeVariant: "orange",
      },
      {
        label: "الحسابات التجارية والحدود",
        to: "/admin/commercial-accounts",
        icon: Wallet,
      },
    ],
  },
  {
    title: "المحتوى والتقارير",
    items: [
      {
        label: "التحليلات والتقارير",
        to: "/admin/analytics",
        icon: ChartNoAxesCombined,
      },
      { label: "إدارة المحتوى CMS", to: "/admin/cms", icon: FileText },
    ],
  },
  {
    title: "الإدارة",
    items: [
      {
        label: "المستخدمون والصلاحيات",
        to: "/admin/team",
        icon: ShieldUser,
      },
      { label: "الإعدادات العامة", to: "/admin/settings", icon: Settings },
      { label: "سجل العمليات", to: "/admin/activity-log", icon: Clock3 },
    ],
  },
];

export const sidebarBadgeStyles: SidebarBadgeStyles = {
  orange: "bg-badge-warning-bg text-badge-warning-fg",
  blue: "bg-badge-info-bg text-badge-info-fg",
  red: "bg-badge-error-bg text-badge-error-fg",
};
