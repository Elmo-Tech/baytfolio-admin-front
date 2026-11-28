import { TableCell, TableRow } from "@/shared/components/common";
import { Badge } from "@/shared/components/ui";
import { ReviewsTableRowDialog } from "./reviews-table-row-dialog";

import { Star } from "lucide-react";

import { statusStyles } from "../constants/reviews.constants";

import type { Review } from "../types/reviews.types";

interface ReviewsTableRowProps {
  review: Review;
}

export const ReviewsTableRow = ({ review }: ReviewsTableRowProps) => {
  const comment = review.comment.trim() || review.supplier;

  return (
    <TableRow>
      {/* User */}
      <TableCell className="ps-4">
        <div className="flex min-w-48 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-primary text-sm font-semibold text-primary-foreground">
            {review.user.initial}
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-semibold text-primary">
              {review.user.name}
            </p>

            <p dir="ltr" className="mt-1 text-xs text-text-muted">
              {review.user.username}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Rating */}
      <TableCell className="font-semibold">
        <div className="flex items-center gap-2">
          <Star className="fill-accent text-accent size-3.5" />
          {"5 / " + review.rating}{" "}
        </div>
      </TableCell>

      {/* Reviewed on */}
      <TableCell className="min-w-40">
        <p className="text-sm font-medium text-primary">{review.category}</p>
      </TableCell>

      {/* Showroom */}
      <TableCell className="min-w-36 text-sm text-text-secondary">
        {review.item}
      </TableCell>

      {/* Comment */}
      <TableCell className="min-w-72 whitespace-normal">
        <p
          className="text-sm leading-5 text-text-secondary line-clamp-1"
          title={comment}
        >
          {comment || "—"}
        </p>
      </TableCell>

      {/* Status */}
      <TableCell className="text-center">
        <Badge
          variant="outline"
          className={`whitespace-nowrap border-transparent px-3 py-1 text-xs font-medium ${
            statusStyles[review.status]
          }`}
        >
          {review.status}
        </Badge>
      </TableCell>

      {/* Date */}
      <TableCell>
        <span dir="ltr" className="text-sm text-text-secondary">
          {review.date}
        </span>
      </TableCell>

      {/* Actions */}
      <TableCell className="text-center">
        <ReviewsTableRowDialog review={review} />
      </TableCell>
    </TableRow>
  );
};
