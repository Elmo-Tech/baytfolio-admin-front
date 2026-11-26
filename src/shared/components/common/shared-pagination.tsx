import { cn } from "@/lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui";

import { usePagination } from "../../hooks/use-pagination";

interface SharedPaginationProps {
  paginationLabel: string;
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const SharedPagination = ({
  paginationLabel,
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  className,
}: SharedPaginationProps) => {
  const { pages, from, to, isFirst, isLast, goToPage, goToPrevious, goToNext } =
    usePagination({
      currentPage,
      totalPages: Math.ceil(totalItems / pageSize),
      totalItems,
      pageSize,
      onPageChange,
    });

  return (
    <div className={cn("shared-pagination pt-12 pb-8", className)}>
      <div className="bg-white p-4 rounded-lg border border-border shadow-sm flex flex-wrap flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-xs font-medium text-text-secondary leading-5 flex items-center gap-1">
          عرض النتائج من{" "}
          <span className="font-inter font-semibold text-primary">{from}</span>
          إلي{" "}
          <span className="font-inter font-semibold text-primary">{to}</span> من
          أصل{" "}
          <span className="font-inter font-semibold text-primary">
            {totalItems}
          </span>{" "}
          {paginationLabel}
        </p>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                text="السابق"
                onClick={(e) => {
                  goToPrevious(e);
                }}
                aria-disabled={isFirst}
                className={isFirst ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {pages.map((item) =>
              typeof item === "number" ? (
                <PaginationItem key={item}>
                  <PaginationLink
                    href="#"
                    isActive={item === currentPage}
                    onClick={(e) => {
                      goToPage(item, e);
                    }}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem key={item}>
                  <PaginationEllipsis />
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                text="التالي"
                onClick={(e) => {
                  goToNext(e);
                }}
                aria-disabled={isLast}
                className={isLast ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
