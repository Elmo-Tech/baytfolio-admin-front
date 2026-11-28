import { Badge } from "@/shared/components/ui";

import { promotionStatusStyles } from "../../constants/promotions.constants";
import type { PromotionStatus } from "../../types/promotions.types";

interface PromotionsStatusBadgeProps {
  status: PromotionStatus;
}

export const PromotionsStatusBadge = ({
  status,
}: PromotionsStatusBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={`border-transparent px-3 py-1 text-xs font-medium ${promotionStatusStyles[status]}`}
    >
      {status}
    </Badge>
  );
};
