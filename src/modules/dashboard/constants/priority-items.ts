import {
  Ban,
  FileText,
  Gavel,
  Megaphone,
  Sofa,
  Store,
  type LucideIcon,
} from "lucide-react";

import type { PriorityItemType } from "../types/priority-items.types";

export {
  PRIORITY_STATUS_CONFIG,
  PRIORITY_STATUS_OPTIONS,
} from "./priority-item-statuses";

export const PRIORITY_ITEMS_PAGE_SIZE = 6;

export const PRIORITY_TYPE_CONFIG: Record<
  PriorityItemType,
  { label: string; icon: LucideIcon; className: string }
> = {
  "join-request": {
    label: "طلب انضمام",
    icon: Store,
    className:
      "border-badge-warning-fg bg-badge-warning-bg text-badge-warning-fg",
  },
  "room-review": {
    label: "مراجعة غرفة",
    icon: Sofa,
    className: "border-badge-info-fg bg-badge-info-bg text-badge-info-fg",
  },
  "ownership-dispute": {
    label: "نزاع حقوق ملكية",
    icon: Gavel,
    className: "border-badge-error-fg bg-badge-error-bg text-badge-error-fg",
  },
  "promotion-request": {
    label: "طلب ترويج تجاري",
    icon: Megaphone,
    className:
      "border-users-stat-warning-fg bg-users-stat-warning-bg text-users-stat-warning-fg",
  },
  "contract-renewal": {
    label: "تنبيه تجديد عقد",
    icon: FileText,
    className:
      "border-badge-warning-fg bg-badge-warning-bg text-badge-warning-fg",
  },
  "suspended-showroom": {
    label: "معرض موقوف",
    icon: Ban,
    className:
      "border-users-stat-neutral-fg bg-users-stat-neutral-bg text-users-stat-neutral-fg",
  },
};
