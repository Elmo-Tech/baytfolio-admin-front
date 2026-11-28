import { Badge } from "@/shared/components/ui";

import type { ReviewStatus } from "../../types/reviews.types";

interface ReviewStatusBadgeProps {
  statusStyle: string;
  reviewStatus: ReviewStatus;
}

export const ReviewStatusBadge = ({
  statusStyle,
  reviewStatus,
}: ReviewStatusBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={`border-transparent px-2.5 py-1 text-[11px] font-medium ${
        statusStyle
      }`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {reviewStatus}
    </Badge>
  );
};
