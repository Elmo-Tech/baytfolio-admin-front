import { Button } from "@/shared/components/ui";
import { PRIORITY_ACTION_CONFIG } from "../constants/priority-item-actions";
import {
  PRIORITY_STATUS_CONFIG,
  PRIORITY_TYPE_CONFIG,
} from "../constants/priority-items";
import type { PriorityItem } from "../types/priority-items.types";

interface PriorityItemRowProps {
  item: PriorityItem;
}

export default function PriorityItemRow({ item }: PriorityItemRowProps) {
  const typeConfig = PRIORITY_TYPE_CONFIG[item.type];
  const TypeIcon = typeConfig.icon;
  const status = PRIORITY_STATUS_CONFIG[item.status];
  const action = PRIORITY_ACTION_CONFIG[item.action];
  const ActionIcon = action.icon;
  const isUrgent = item.status === "urgent-dispute-closed";

  return (
    <tr
      className={`transition-colors hover:bg-users-surface-row-hover ${
        isUrgent ? "bg-badge-error-bg/20" : ""
      }`}
    >
      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${typeConfig.className}`}
        >
          <TypeIcon size={14} strokeWidth={1.8} aria-hidden="true" />
          {typeConfig.label}
        </span>
      </td>

      <td className="px-5 py-4">
        <p
          className={`text-sm font-semibold ${
            isUrgent ? "text-badge-error-fg" : "text-brand-navy"
          }`}
        >
          {item.item}
        </p>
        <p className="mt-1 text-xs text-text-muted">{item.detail}</p>
      </td>

      <td className="px-5 py-4">
        <div className="flex flex-col gap-1 text-right">
          <span className="text-sm text-users-text-detail">
            {item.organization}
          </span>
          <span
            className={`text-xs ${
              isUrgent ? "text-badge-error-fg" : "text-text-muted"
            }`}
          >
            {item.organizationDetail}
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${status.className}`}
        >
          <span className={`size-1.5 rounded-full ${status.dotClass}`} />
          {status.label}
        </span>
      </td>

      <td
        className={`whitespace-nowrap px-5 py-4 text-sm ${
          isUrgent ? "text-badge-error-fg" : "text-users-text-muted"
        }`}
      >
        {item.updatedAt}
      </td>

      <td className="px-5 py-4 text-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={`h-8 gap-1.5 whitespace-nowrap rounded-md px-3 text-xs shadow-none ${action.className}`}
        >
          <ActionIcon size={14} strokeWidth={1.8} aria-hidden="true" />
          {action.label}
        </Button>
      </td>
    </tr>
  );
}
