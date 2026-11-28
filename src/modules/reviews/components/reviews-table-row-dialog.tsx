import { BtnV2 } from "@/shared/components/common";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shared/components/ui";
import { DialogHeaderContent } from "../atoms/reviews-dialog/dialog-header-content";
import { ReviewsDialogCommentCard } from "../atoms/reviews-dialog/reviews-dialog-comment-card";
import { ReviewsDialogFooter } from "../atoms/reviews-dialog/reviews-dialog-footer";
import { ReviewsDialogReviewerCard } from "../atoms/reviews-dialog/reviews-dialog-reviewer-card";
import { ReviewsDialogRuleNote } from "../atoms/reviews-dialog/reviews-dialog-rule-note";
import { ReviewsDialogTargetCard } from "../atoms/reviews-dialog/reviews-dialog-target-card";
import { ReviewStatusBadge } from "../atoms/reviews-dialog/review-status-badge";

import { ArrowLeft } from "lucide-react";

import { getReviewDialogMeta } from "../utils/reviews-dialog.utils";

import { statusStyles } from "../constants/reviews.constants";

import type { Review } from "../types/reviews.types";

interface ReviewsTableRowDialogProps {
  review: Review;
}

export const ReviewsTableRowDialog = ({
  review,
}: ReviewsTableRowDialogProps) => {
  const meta = getReviewDialogMeta(review);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <BtnV2
          variant="background"
          size="lg"
          aria-label={`فتح تقييم ${review.user.name}`}
        >
          فتح التقييم
          <ArrowLeft className="size-3" />
        </BtnV2>
      </DialogTrigger>

      <DialogContent className="max-h-[90dvh] gap-0 overflow-y-auto border-border p-0 sm:max-w-[85%] md:max-w-200">
        {/* Header */}
        <DialogHeader className="flex-row items-start justify-between gap-4 border-b border-border/60 p-6 pb-5 text-start">
          <DialogHeaderContent
            reviewsStatusBadge={
              <ReviewStatusBadge
                statusStyle={statusStyles[review.status]}
                reviewStatus={review.status}
              />
            }
          />
        </DialogHeader>

        {/* Meta */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-3 text-xs text-text-secondary">
          <div className="flex flex-wrap items-center gap-3">
            <ReviewStatusBadge
              statusStyle={statusStyles[review.status]}
              reviewStatus={review.status}
            />

            <span>{meta.formattedDate} — 02:45 م</span>
          </div>

          <span className="font-medium text-text-secondary">
            ID: {meta.reviewCode}
          </span>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 pb-6">
          <ReviewsDialogReviewerCard review={review} meta={meta} />

          <ReviewsDialogTargetCard meta={meta} />

          <ReviewsDialogCommentCard comment={meta.comment} />

          <ReviewsDialogRuleNote status={review.status} />
        </div>

        <ReviewsDialogFooter />
      </DialogContent>
    </Dialog>
  );
};
