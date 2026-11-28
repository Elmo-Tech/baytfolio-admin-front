import { TableCell, TableRow } from "@/shared/components/common";
import { PromotionsContentCell } from "../../atoms/promotions-table/promotions-content-cell";
import { PromotionsStatusBadge } from "../../atoms/promotions-table/promotions-status-badge";
import { PromotionsTypeBadge } from "../../atoms/promotions-table/promotions-type-badge";
import { PromotionsRequestDialog } from "./promotions-request-dialog";

import { formatMoney } from "../../utils/promotions-formatters";

import type { PromotionRequest } from "../../types/promotions.types";

interface PromotionsRequestsTableRowProps {
  request: PromotionRequest;
}

export const PromotionsRequestsTableRow = ({
  request,
}: PromotionsRequestsTableRowProps) => {
  return (
    <TableRow>
      {/* Type */}
      <TableCell className="ps-4">
        <PromotionsTypeBadge type={request.type} />
      </TableCell>

      {/* Content */}
      <TableCell>
        <PromotionsContentCell content={request.content} />
      </TableCell>

      {/* Showroom */}
      <TableCell className="text-sm text-text-secondary">
        {request.showroom}
      </TableCell>

      {/* Duration Label */}
      <TableCell className="text-sm text-text-secondary">
        {request.durationLabel}
      </TableCell>

      {/* Daily Price */}
      <TableCell className="text-sm text-text-secondary">
        {formatMoney(request.dailyPrice)}
      </TableCell>

      {/* Total Vale */}
      <TableCell className="text-sm font-semibold text-primary">
        {formatMoney(request.totalValue)}
      </TableCell>

      {/* Date */}
      <TableCell>
        <span dir="ltr" className="text-sm text-text-secondary">
          {request.requestDate}
        </span>
      </TableCell>

      {/* Status */}
      <TableCell className="text-center">
        <PromotionsStatusBadge status={request.status} />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-center">
        <PromotionsRequestDialog request={request} />
      </TableCell>
    </TableRow>
  );
};
