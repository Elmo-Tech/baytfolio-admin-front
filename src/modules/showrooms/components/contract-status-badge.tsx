import { Badge } from "@/shared/components/ui";

import type { ContractStatus } from "../types/showroom";

interface ContractStatusBadgeProps {
  status: ContractStatus;
}

const statusConfig: Record<
  ContractStatus,
  { label: string; className: string }
> = {
  active: {
    label: "ساري",
    className: "bg-status-active-bg text-status-active-fg",
  },
  expiring: {
    label: "قارب على الانتهاء",
    className: "bg-status-pending-bg text-status-pending-fg",
  },
  expired: {
    label: "منتهي",
    className: "bg-status-suspended-bg text-status-suspended-fg",
  },
};

export default function ContractStatusBadge({
  status,
}: ContractStatusBadgeProps) {
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
