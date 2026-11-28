import { TableCell, TableRow } from "@/shared/components/common";
import { PromotionsContentCell } from "../../atoms/promotions-table/promotions-content-cell";
import { PromotionsDurationBadge } from "../../atoms/promotions-table/promotions-duration-badge";
import { PromotionsStatusBadge } from "../../atoms/promotions-table/promotions-status-badge";
import { PromotionsTypeBadge } from "../../atoms/promotions-table/promotions-type-badge";

import type { Promotion } from "../../types/promotions.types";
import { formatMoney } from "../../utils/promotions-formatters";

interface PromotionsCurrentTableRowProps {
  promotion: Promotion;
}

export const PromotionsCurrentTableRow = ({
  promotion,
}: PromotionsCurrentTableRowProps) => {
  return (
    <TableRow>
      {/* Type */}
      <TableCell className="ps-4">
        <PromotionsTypeBadge type={promotion.type} />
      </TableCell>

      {/* Content */}
      <TableCell>
        <PromotionsContentCell content={promotion.content} />
      </TableCell>

      {/* Showroom */}
      <TableCell>{promotion.showroom}</TableCell>

      {/* Start Date */}
      <TableCell>{promotion.startDate}</TableCell>

      {/* End Date */}
      <TableCell>{promotion.endDate}</TableCell>

      {/* Remaning */}
      <TableCell>
        <PromotionsDurationBadge label={promotion.remaining} />
      </TableCell>

      {/* Daily Price */}
      <TableCell>{formatMoney(promotion.dailyPrice)}</TableCell>

      {/* Total Value */}
      <TableCell className="font-semibold">
        {formatMoney(promotion.totalValue)}
      </TableCell>

      {/* Status */}
      <TableCell className="text-center">
        <PromotionsStatusBadge status={promotion.status} />
      </TableCell>
    </TableRow>
  );
};
