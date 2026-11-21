import { useState } from "react";

import { priorityItemsMock } from "../api/priority-items.mock";
import { PRIORITY_ITEMS_PAGE_SIZE } from "../constants/priority-items";
import type { PriorityItemStatus } from "../types/priority-items.types";
import { filterPriorityItems } from "../utils/filter-priority-items";

export function usePriorityItems() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PriorityItemStatus | "all">(
    "all",
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  return {
    search,
    statusFilter,
    isFilterOpen,
    visibleItems,
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
  };
}
