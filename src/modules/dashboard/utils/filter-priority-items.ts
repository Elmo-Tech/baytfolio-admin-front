import {
  PRIORITY_STATUS_CONFIG,
  PRIORITY_TYPE_CONFIG,
} from "../constants/priority-items";
import type {
  PriorityItem,
  PriorityItemStatus,
} from "../types/priority-items.types";

export function filterPriorityItems(
  items: PriorityItem[],
  search: string,
  statusFilter: PriorityItemStatus | "all",
) {
  const query = search.trim().toLocaleLowerCase("ar");

  return items.filter((item) => {
    const searchText = `${item.item} ${item.detail} ${item.organization} ${
      item.organizationDetail
    } ${PRIORITY_TYPE_CONFIG[item.type].label} ${
      PRIORITY_STATUS_CONFIG[item.status].label
    }`.toLocaleLowerCase("ar");

    const matchesSearch = searchText.includes(query);
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
}
