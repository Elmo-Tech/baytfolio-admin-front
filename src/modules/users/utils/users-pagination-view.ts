import { getPageNumbers, getPaginationRange } from "@/shared/utils/pagination";
export type { PageItem } from "@/shared/utils/pagination";

interface UsersPaginationParams {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export function getUsersPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
}: UsersPaginationParams) {
  return {
    ...getPaginationRange(currentPage, pageSize, totalItems),
    formattedTotalItems: totalItems.toLocaleString("en-US"),
    pageNumbers: getPageNumbers(currentPage, totalPages),
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages || totalPages === 0,
  };
}
