import { getPageNumbers } from "@/shared/utils/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";

interface HelpCenterPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function HelpCenterPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: HelpCenterPaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div dir="rtl">
      <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-border bg-muted/30 px-4 py-3 sm:flex-row">
        {/* Items Count */}
        <p className="text-sm text-muted-foreground">
          عرض{" "}
          <span className="font-semibold text-foreground">
            {startItem}–{endItem}
          </span>{" "}
          من إجمالي{" "}
          <span className="font-semibold text-foreground">
            {totalItems.toLocaleString("en-US")}
          </span>{" "}
          أسئلة
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Page Size */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>عرض:</span>

            <Select
              dir="rtl"
              value={String(pageSize)}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <SelectTrigger
                aria-label="عدد الأسئلة في الصفحة"
                className="h-8 w-[115px] cursor-pointer rounded-md border-border bg-background px-2 text-xs shadow-none"
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="7">7 في الصفحة</SelectItem>
                <SelectItem value="10">10 في الصفحة</SelectItem>
                <SelectItem value="20">20 في الصفحة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              aria-label="الصفحة السابقة"
              presentation="pagination-arrow"
            >
              <ChevronRight size={16} />
            </Button>

            {getPageNumbers(currentPage, totalPages).map((page, index) =>
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
              disabled={currentPage >= totalPages || totalPages === 0}
              onClick={() => onPageChange(currentPage + 1)}
              aria-label="الصفحة التالية"
              presentation="pagination-arrow"
            >
              <ChevronLeft size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
