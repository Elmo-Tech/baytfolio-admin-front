import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared/components/ui";

import { getPageNumbers } from "../utils/showrooms-pagination.utils";

interface ShowroomsPaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ShowroomsPaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: ShowroomsPaginationControlsProps) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="outline"
        size="icon"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="الصفحة السابقة"
        className="size-8 border-border bg-background text-muted-foreground shadow-none"
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
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground"
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
        disabled={currentPage >= totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="الصفحة التالية"
        className="size-8 border-border bg-background text-muted-foreground shadow-none"
      >
        <ChevronLeft size={16} />
      </Button>
    </div>
  );
}
