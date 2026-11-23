import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared/components/ui";
import type { PageItem } from "../utils/users-pagination-view";

interface UsersPageNumbersProps {
  currentPage: number;
  pageNumbers: PageItem[];
  isFirstPage: boolean;
  isLastPage: boolean;
  onPageChange: (page: number) => void;
}

export default function UsersPageNumbers({
  currentPage,
  pageNumbers,
  isFirstPage,
  isLastPage,
  onPageChange,
}: UsersPageNumbersProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="outline"
        size="icon"
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="الصفحة السابقة"
        presentation="pagination-arrow"
      >
        <ChevronRight size={16} />
      </Button>

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-1 text-sm text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <Button
            key={page}
            type="button"
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`size-8 rounded-md px-2 text-xs shadow-none ${
              currentPage === page
                ? "border-primary bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                : "border-border bg-background text-foreground hover:bg-muted"
            }`}
          >
            {page}
          </Button>
        ),
      )}

      <Button
        type="button"
        variant="outline"
        size="icon"
        disabled={isLastPage}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="الصفحة التالية"
        presentation="pagination-arrow"
      >
        <ChevronLeft size={16} />
      </Button>
    </div>
  );
}
