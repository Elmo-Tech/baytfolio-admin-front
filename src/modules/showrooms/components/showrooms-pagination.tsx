import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";

interface ShowroomsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function ShowroomsPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: ShowroomsPaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div dir="rtl">
      <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-border-warm bg-card px-4 py-3 sm:flex-row">
        <p className="text-sm text-text-secondary">
          عرض{" "}
          <span className="font-semibold text-text-primary">
            {startItem}–{endItem}
          </span>{" "}
          من إجمالي{" "}
          <span className="font-semibold text-text-primary">
            {totalItems.toLocaleString("en-US")}
          </span>{" "}
          معرض ومصنع
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>عرض:</span>

            <Select
              dir="rtl"
              value={String(pageSize)}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <SelectTrigger
                aria-label="عدد المعارض في الصفحة"
                className="h-8 w-[100px] border-border bg-background px-2 text-xs shadow-none"
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="8">8 في الصفحة</SelectItem>
                <SelectItem value="10">10 في الصفحة</SelectItem>
                <SelectItem value="20">20 في الصفحة</SelectItem>
                <SelectItem value="50">50 في الصفحة</SelectItem>
              </SelectContent>
            </Select>
          </div>

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

            {getPageNumbers().map((page, index) =>
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
                  onClick={() => {
                    if (typeof page === "number") onPageChange(page);
                  }}
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
        </div>
      </div>
    </div>
  );
}
