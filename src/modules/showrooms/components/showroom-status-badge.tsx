import { Badge } from "@/shared/components/ui";

import type { ShowroomStatus } from "../types/showroom";

interface ShowroomStatusBadgeProps {
  status: ShowroomStatus;
}

const statusConfig: Record<
  ShowroomStatus,
  { label: string; className: string }
> = {
  active: {
    label: "نشط",
    className: "bg-status-active-bg text-status-active-fg",
  },
  suspended: {
    label: "موقوف",
    className: "bg-status-suspended-bg text-status-suspended-fg",
  },
};

export default function ShowroomStatusBadge({
  status,
}: ShowroomStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={`whitespace-nowrap border-transparent px-3 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </Badge>
  );
}
