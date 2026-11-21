import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";

import { pageSizes } from "../utils/showrooms-search-params";
import ShowroomsPaginationControls from "./showrooms-pagination-controls";

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
                {pageSizes.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size} في الصفحة
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ShowroomsPaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
