import { getPageRange } from "../utils/get-page-range";

type Event = React.MouseEvent;
interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblings?: number;
}

export function usePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  siblings,
}: UsePaginationProps) {
  const from = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const pages = getPageRange(currentPage, totalPages, siblings);

  const goToPage = (page: number, e: Event) => {
    e.preventDefault();

    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const goToPrevious = (e: Event) => {
    goToPage(currentPage - 1, e);
  };

  const goToNext = (e: Event) => {
    goToPage(currentPage + 1, e);
  };

  return {
    pages,
    from,
    to,
    isFirst,
    isLast,
    goToPage,
    goToPrevious,
    goToNext,
  };
}
