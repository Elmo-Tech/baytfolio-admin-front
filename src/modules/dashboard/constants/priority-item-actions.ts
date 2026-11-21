import {
  CalendarCheck,
  ClipboardCheck,
  Eye,
  FileText,
  Gavel,
  ScanSearch,
  type LucideIcon,
} from "lucide-react";

import type { PriorityItemAction } from "../types/priority-items.types";

export const PRIORITY_ACTION_CONFIG: Record<
  PriorityItemAction,
  { label: string; icon: LucideIcon; className: string }
> = {
  "review-approve": {
    label: "مراجعة واعتماد",
    icon: ClipboardCheck,
    className:
      "border-brand-navy bg-brand-navy !text-white hover:bg-brand-navy/90 hover:!text-white",
  },
  "inspect-room": {
    label: "فحص الغرفة",
    icon: ScanSearch,
    className:
      "border-brand-navy bg-transparent text-brand-navy hover:bg-users-stat-neutral-bg hover:!text-brand-navy",
  },
  "handle-report": {
    label: "معالجة البلاغ",
    icon: Gavel,
    className:
      "border-badge-error-fg bg-badge-error-fg !text-white hover:bg-badge-error-fg/90 hover:!text-white",
  },
  "schedule-publish": {
    label: "جدولة النشر",
    icon: CalendarCheck,
    className:
      "border-brand-navy bg-transparent text-brand-navy hover:bg-users-stat-neutral-bg hover:!text-brand-navy",
  },
  "review-contract": {
    label: "مراجعة العقد",
    icon: FileText,
    className:
      "border-brand-navy bg-transparent text-brand-navy hover:bg-users-stat-neutral-bg hover:!text-brand-navy",
  },
  "inspect-showroom": {
    label: "فحص المعرض",
    icon: Eye,
    className:
      "border-brand-navy bg-transparent text-brand-navy hover:bg-users-stat-neutral-bg hover:!text-brand-navy",
  },
};
