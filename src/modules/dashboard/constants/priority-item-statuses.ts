import type { PriorityItemStatus } from "../types/priority-items.types";

export const PRIORITY_STATUS_OPTIONS: Array<{
  value: PriorityItemStatus | "all";
  label: string;
}> = [
  { value: "all", label: "كل الحالات" },
  { value: "documents-complete", label: "مكتمل المستندات" },
  { value: "dimensions-review", label: "فحص الأبعاد والصور" },
  { value: "urgent-dispute-closed", label: "نزاع عاجل • مغلق" },
  { value: "eligibility-verified", label: "تم التحقق من الأهلية" },
  { value: "notification-sent", label: "إشعار مرسل" },
  { value: "awaiting-update", label: "بانتظار التحديث" },
];

export const PRIORITY_STATUS_CONFIG: Record<
  PriorityItemStatus,
  { label: string; className: string; dotClass: string }
> = {
  "documents-complete": {
    label: "مكتمل المستندات",
    className:
      "border-users-stat-success-fg bg-users-stat-success-bg text-users-stat-success-fg",
    dotClass: "bg-users-stat-success-fg",
  },
  "dimensions-review": {
    label: "فحص الأبعاد والصور",
    className:
      "border-users-stat-warning-fg bg-users-stat-warning-bg text-users-stat-warning-fg",
    dotClass: "bg-users-stat-warning-fg",
  },
  "urgent-dispute-closed": {
    label: "نزاع عاجل • مغلق",
    className: "border-badge-error-fg bg-badge-error-bg text-badge-error-fg",
    dotClass: "bg-badge-error-fg",
  },
  "eligibility-verified": {
    label: "تم التحقق من الأهلية",
    className:
      "border-users-stat-success-fg bg-users-stat-success-bg text-users-stat-success-fg",
    dotClass: "bg-users-stat-success-fg",
  },
  "notification-sent": {
    label: "إشعار مرسل",
    className:
      "border-users-stat-warning-fg bg-users-stat-warning-bg text-users-stat-warning-fg",
    dotClass: "bg-users-stat-warning-fg",
  },
  "awaiting-update": {
    label: "بانتظار التحديث",
    className:
      "border-users-stat-neutral-fg bg-users-stat-neutral-bg text-users-stat-neutral-fg",
    dotClass: "bg-users-stat-neutral-fg",
  },
};
