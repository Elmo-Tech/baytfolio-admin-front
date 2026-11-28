import {
  BedDouble,
  ClipboardList,
  Megaphone,
  Package,
  PanelsTopLeft,
  SlidersHorizontal,
} from "lucide-react";

import type {
  PromotionType,
  PromotionsTabItem,
} from "../types/promotions.types";

export const promotionTypeStyles: Record<PromotionType, string> = {
  غرفة: "bg-muted text-text-secondary",
  باقة: "bg-badge-warning-bg text-badge-warning-fg",
  Banner: "bg-badge-info-bg text-badge-info-fg",
};

export const promotionTypeIcons = {
  غرفة: BedDouble,
  باقة: Package,
  Banner: PanelsTopLeft,
} as const;

export const promotionStatusStyles: Record<string, string> = {
  نشط: "bg-status-active-bg text-status-active-fg",
  "بانتظار المراجعة": "bg-status-pending-bg text-status-pending-fg",
  مرفوض: "bg-status-suspended-bg text-status-suspended-fg",
  مخفي: "bg-status-deleted-bg text-status-deleted-fg",
};

export const promotionTypeOptions = ["all", "غرفة", "باقة", "Banner"];

export const promotionsTabs: PromotionsTabItem[] = [
  {
    value: "current",
    label: "الترويجات الحالية",
    count: 8,
    icon: Megaphone,
  },
  {
    value: "requests",
    label: "طلبات الترويج",
    count: 6,
    icon: ClipboardList,
  },
  {
    value: "pricing",
    label: "الأسعار والإعدادات",
    icon: SlidersHorizontal,
  },
];
