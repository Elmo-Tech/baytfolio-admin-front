import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";

type Props = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function ShowroomJoinRequestsPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Results Count */}
      <p className="text-xs text-text-secondary">
        عرض{" "}
        <strong className="text-text-primary">
          {start}-{end}
        </strong>{" "}
        من إجمالي <strong className="text-text-primary">{totalItems}</strong>{" "}
        طلبات
      </p>

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-text-muted">عرض:</span>

        <Select
          value={String(pageSize)}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="h-9 w-[130px] bg-background text-xs">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="10">10 في الصفحة</SelectItem>
            <SelectItem value="20">20 في الصفحة</SelectItem>
            <SelectItem value="50">50 في الصفحة</SelectItem>
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="الصفحة السابقة"
        >
          <ChevronRight size={16} />
        </Button>

        <Button
          type="button"
          size="icon"
          className="pointer-events-none"
          aria-label={`الصفحة الحالية ${currentPage}`}
        >
          {currentPage}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={currentPage >= totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="الصفحة التالية"
        >
          <ChevronLeft size={16} />
        </Button>
      </div>
    </div>
  );
}
