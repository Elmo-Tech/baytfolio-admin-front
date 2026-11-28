import { Badge } from "@/shared/components/ui";

import { promotionTypeStyles } from "../../constants/promotions.constants";
import type { PromotionType } from "../../types/promotions.types";

interface PromotionsTypeBadgeProps {
  type: PromotionType;
}

export const PromotionsTypeBadge = ({ type }: PromotionsTypeBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={`border-transparent px-3 py-1 text-xs font-medium ${promotionTypeStyles[type]}`}
    >
      {type}
    </Badge>
  );
};
