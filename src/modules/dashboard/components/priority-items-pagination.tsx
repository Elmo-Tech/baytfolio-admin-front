import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared/components/ui";

interface PriorityItemsPaginationProps {
  rangeStart: number;
  rangeEnd: number;
  totalItems: number;
  safePage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export default function PriorityItemsPagination({
  rangeStart,
  rangeEnd,
  totalItems,
  safePage,
  totalPages,
  onPrevPage,
  onNextPage,
}: PriorityItemsPaginationProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-users-panel-divider px-5 py-3 text-sm sm:flex-row">
      <p className="text-users-text-muted">
        عرض{" "}
        <span className="font-semibold text-users-text-primary">
          {rangeStart}-{rangeEnd}
        </span>{" "}
        من {totalItems} عنصر
      </p>

      <div
        className="flex items-center gap-1"
        aria-label="صفحات العناصر ذات الأولوية"
      >
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onPrevPage}
          disabled={safePage === 1}
          aria-label="الصفحة السابقة"
          className="size-8 border-border text-text-muted shadow-none"
        >
          <ChevronRight size={16} />
        </Button>

        <span className="min-w-16 text-center text-xs text-users-text-secondary">
          {safePage} / {Math.max(totalPages, 1)}
        </span>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onNextPage}
          disabled={safePage >= totalPages || totalPages === 0}
          aria-label="الصفحة التالية"
          className="size-8 border-border text-text-muted shadow-none"
        >
          <ChevronLeft size={16} />
        </Button>
      </div>
    </div>
  );
}
