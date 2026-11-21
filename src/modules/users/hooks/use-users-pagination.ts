export type PageItem = number | "...";

interface UseUsersPaginationParams {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export function useUsersPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
}: UseUsersPaginationParams) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  let pageNumbers: PageItem[];
  if (totalPages <= 5) {
    pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  } else if (currentPage <= 3) {
    pageNumbers = [1, 2, 3, 4, "...", totalPages];
  } else if (currentPage >= totalPages - 2) {
    pageNumbers = [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  } else {
    pageNumbers = [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }

  return {
    startItem,
    endItem,
    formattedTotalItems: totalItems.toLocaleString("en-US"),
    pageNumbers,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages || totalPages === 0,
  };
}
