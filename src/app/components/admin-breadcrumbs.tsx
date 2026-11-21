import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

import type { BreadcrumbItem } from "../utils/get-breadcrumbs";

interface AdminBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function AdminBreadcrumbs({ items }: AdminBreadcrumbsProps) {
  return (
    <nav
      aria-label="مسار التنقل"
      className="hidden min-w-0 flex-1 items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs min-[721px]:flex sm:gap-2 sm:text-sm"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex shrink-0 items-center gap-1.5 sm:gap-2"
          >
            {index > 0 && (
              <ChevronLeft
                size={14}
                className="shrink-0 text-text-muted-icon sm:size-4"
              />
            )}

            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="shrink-0 text-text-muted transition-colors hover:text-brand-navy"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={
                  isLast
                    ? "shrink-0 font-semibold text-text-primary"
                    : "shrink-0 text-text-muted"
                }
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
