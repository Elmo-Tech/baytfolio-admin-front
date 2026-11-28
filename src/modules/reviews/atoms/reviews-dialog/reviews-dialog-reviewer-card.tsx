import { Badge } from "@/shared/components/ui";

import { Mail, Phone, Star, ThumbsUp } from "lucide-react";

import type { Review } from "../../types/reviews.types";
import type { ReviewDialogMeta } from "../../utils/reviews-dialog.utils";

interface ReviewsDialogReviewerCardProps {
  review: Review;
  meta: ReviewDialogMeta;
}

export const ReviewsDialogReviewerCard = ({
  review,
  meta,
}: ReviewsDialogReviewerCardProps) => {
  return (
    <div className="grid gap-4 rounded-xl border border-border bg-white p-4 md:grid-cols-2">
      {/* Reviewer */}
      <div className="flex items-start gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-primary text-lg font-bold text-accent">
          {review.user.initial}
        </div>

        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-primary">{review.user.name}</p>

            <span
              dir="ltr"
              className="rounded-md bg-background px-2 py-0.5 text-[11px] font-medium text-text-secondary"
            >
              {meta.userCode}
            </span>
          </div>

          <p className="flex items-center gap-2 text-xs text-text-secondary">
            <Phone className="size-3.5 text-text-secondary" />
            <span dir="ltr">+20 10 *** 1234</span>
          </p>

          <p className="flex items-center gap-2 text-xs text-text-secondary">
            <Mail className="size-3.5 text-text-secondary" />
            <span dir="ltr">m***@example.com</span>
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex flex-col justify-center gap-2 border-t border-border pt-4 md:border-s md:border-t-0 md:ps-4 md:pt-0">
        <p className="text-xs text-text-secondary">الدرجة الممنوحة من العميل</p>

        <div>
          <Badge
            variant="outline"
            className="border-transparent bg-status-active-bg px-2.5 py-1 text-[11px] font-medium text-status-active-fg"
          >
            <ThumbsUp className="size-3" />
            تقييم إيجابي ({meta.positivePercent}%)
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <div
            role="img"
            className="flex items-center gap-1"
            aria-label={`تقييم ${review.rating} من 5`}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`size-4 ${
                  star <= Math.round(review.rating)
                    ? "fill-accent text-accent"
                    : "fill-transparent text-border"
                }`}
              />
            ))}
          </div>

          <div dir="ltr" className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">
              {review.rating.toFixed(1)}
            </span>
            <span className="text-xs text-text-secondary">/ 5.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
