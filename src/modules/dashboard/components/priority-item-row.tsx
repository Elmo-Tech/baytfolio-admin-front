import { TableRow, TableCell } from "@/shared/components/ui/table";
import { Check } from "lucide-react";

import { Button } from "@/shared/components/ui";
import { PRIORITY_ACTION_CONFIG } from "../constants/priority-item-actions";
import {
  PRIORITY_STATUS_CONFIG,
  PRIORITY_TYPE_CONFIG,
} from "../constants/priority-items";
import type { PriorityItem } from "../types/priority-items.types";

interface PriorityItemRowProps {
  item: PriorityItem;
  isCompleted: boolean;
  onAction: (item: PriorityItem) => void;
}

export default function PriorityItemRow({
  item,
  isCompleted,
  onAction,
}: PriorityItemRowProps) {
  const typeConfig = PRIORITY_TYPE_CONFIG[item.type];
  const TypeIcon = typeConfig.icon;
  const status = PRIORITY_STATUS_CONFIG[item.status];
  const action = PRIORITY_ACTION_CONFIG[item.action];
  const ActionIcon = isCompleted ? Check : action.icon;
  const isUrgent = item.status === "urgent-dispute-closed" && !isCompleted;
  const urgentText = isUrgent ? "text-badge-error-fg" : "";

  return (
    <TableRow
      className={`transition-colors hover:bg-users-surface-row-hover ${
        isUrgent ? "bg-badge-error-bg/20" : ""
      }`}
    >
      <TableCell presentation="standard">
        <span
          className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${typeConfig.className}`}
        >
          <TypeIcon size={14} strokeWidth={1.8} aria-hidden="true" />
          {typeConfig.label}
        </span>
      </TableCell>

      <TableCell presentation="standard">
        <p
          className={`text-sm font-semibold ${urgentText || "text-brand-navy"}`}
        >
          {item.item}
        </p>
        <p className="mt-1 text-xs text-text-muted">{item.detail}</p>
      </TableCell>

      <TableCell presentation="standard">
        <div className="flex flex-col gap-1 text-right">
          <span className="text-sm text-users-text-detail">
            {item.organization}
          </span>
          <span className={`text-xs ${urgentText || "text-text-muted"}`}>
            {item.organizationDetail}
          </span>
        </div>
      </TableCell>

      <TableCell presentation="standard">
        <span
          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${status.className}`}
        >
          <span className={`size-1.5 rounded-full ${status.dotClass}`} />
          {status.label}
        </span>
      </TableCell>

      <TableCell
        className={`whitespace-nowrap px-5 py-4 text-sm ${urgentText || "text-users-text-muted"}`}
      >
        {item.updatedAt}
      </TableCell>

      <TableCell presentation="center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isCompleted}
          onClick={() => onAction(item)}
          className={`h-8 gap-1.5 whitespace-nowrap rounded-md px-3 text-xs shadow-none ${
            isCompleted ? "opacity-60" : action.className
          }`}
        >
          <ActionIcon size={14} strokeWidth={1.8} aria-hidden="true" />
          {isCompleted ? "تمت المراجعة" : action.label}
        </Button>
      </TableCell>
    </TableRow>
  );
}
