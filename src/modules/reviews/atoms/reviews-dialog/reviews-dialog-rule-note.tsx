import { Info } from "lucide-react";

import type { ReviewStatus } from "../../types/reviews.types";

interface ReviewsDialogRuleNoteProps {
  status: ReviewStatus;
}

export const ReviewsDialogRuleNote = ({
  status,
}: ReviewsDialogRuleNoteProps) => {
  const isPublished = status === "منشور";

  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-info/5 p-4">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-info/30 text-info">
        <Info className="size-3.5" />
      </span>

      <p className="text-xs leading-6 text-text-secondary">
        <span className="font-bold text-primary">قاعدة الاحتساب للمنصة: </span>

        {isPublished ? (
          <>
            هذا التقييم منشور ومعتمد ويُحتسب في متوسط التقييم العام (Average
            Rating) وإجمالي عدد التقييمات.
          </>
        ) : (
          <>
            هذا التقييم بحالة (
            <span className="font-semibold text-status-pending-fg">
              {status}
            </span>
            ) ولن يُحتسب في متوسط التقييم العام (Average Rating) حتى يتم اعتماده
            ونشره.
          </>
        )}
      </p>
    </div>
  );
};
