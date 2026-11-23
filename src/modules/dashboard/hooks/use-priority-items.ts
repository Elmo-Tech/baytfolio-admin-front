import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "@/shared/lib/toast";

import { priorityItemsMock } from "../api/priority-items.mock";
import { PRIORITY_ITEMS_PAGE_SIZE } from "../constants/priority-items";
import type {
  PriorityItem,
  PriorityItemStatus,
} from "../types/priority-items.types";
import { filterPriorityItems } from "../utils/filter-priority-items";

export function usePriorityItems() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PriorityItemStatus | "all">(
    "all",
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const filteredItems = filterPriorityItems(
    priorityItemsMock,
    search,
    statusFilter,
  );
  const totalPages = Math.ceil(filteredItems.length / PRIORITY_ITEMS_PAGE_SIZE);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));
  const visibleItems = filteredItems.slice(
    (safePage - 1) * PRIORITY_ITEMS_PAGE_SIZE,
    safePage * PRIORITY_ITEMS_PAGE_SIZE,
  );

  function handleItemAction(item: PriorityItem) {
    if (item.action === "review-approve") {
      void navigate("/showroom-join-requests");
      return;
    }
    if (
      item.action === "review-contract" ||
      item.action === "inspect-showroom"
    ) {
      void navigate("/showrooms");
      return;
    }

    setCompletedIds((prev) =>
      prev.includes(item.id) ? prev : [...prev, item.id],
    );
    toast.success(`تم تسجيل مراجعة العنصر: ${item.item} (${item.detail})`);
  }

  return {
    search,
    statusFilter,
    isFilterOpen,
    visibleItems,
    completedIds,
    totalItems: filteredItems.length,
    safePage,
    totalPages,
    rangeStart:
      visibleItems.length > 0
        ? (safePage - 1) * PRIORITY_ITEMS_PAGE_SIZE + 1
        : 0,
    rangeEnd: Math.min(
      safePage * PRIORITY_ITEMS_PAGE_SIZE,
      filteredItems.length,
    ),
    onSearchChange: (value: string) => {
      setSearch(value);
      setCurrentPage(1);
    },
    onStatusChange: (value: string) => {
      setStatusFilter(value as PriorityItemStatus | "all");
      setCurrentPage(1);
    },
    onToggleFilter: () => setIsFilterOpen((prev) => !prev),
    onPrevPage: () => setCurrentPage((page) => Math.max(page - 1, 1)),
    onNextPage: () =>
      setCurrentPage((page) => Math.min(page + 1, Math.max(totalPages, 1))),
    onItemAction: handleItemAction,
  };
}
