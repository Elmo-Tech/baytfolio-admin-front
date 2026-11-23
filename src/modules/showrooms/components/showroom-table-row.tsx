import { Button } from "@/shared/components/ui/button";
import { TableRow, TableCell } from "@/shared/components/ui/table";
import { Eye } from "lucide-react";

import type { Showroom } from "../types/showroom";
import { activityLabels, formatDate } from "../utils/showrooms-table.utils";
import ContractStatusBadge from "./contract-status-badge";
import ShowroomStatusBadge from "./showroom-status-badge";
import ShowroomTableRowIdentity from "./showroom-table-row-identity";

interface ShowroomTableRowProps {
  showroom: Showroom;
  onSelect: (showroomId: string) => void;
}

export default function ShowroomTableRow({
  showroom,
  onSelect,
}: ShowroomTableRowProps) {
  return (
    <TableRow
      onClick={() => onSelect(showroom.id)}
      className="transition-colors hover:bg-users-surface-row-hover"
    >
      <ShowroomTableRowIdentity showroom={showroom} />

      <TableCell presentation="secondary">
        {activityLabels[showroom.activity]}
      </TableCell>

      <TableCell presentation="standard">
        <ShowroomStatusBadge status={showroom.status} />
      </TableCell>

      <TableCell presentation="standard">
        <ContractStatusBadge status={showroom.contractStatus} />
      </TableCell>

      <TableCell presentation="secondary">
        <span className="font-semibold text-users-text-primary">
          {showroom.rooms.used}
        </span>
        <span className="text-users-text-muted"> / {showroom.rooms.total}</span>
      </TableCell>

      <TableCell presentation="secondary">
        <span className="font-semibold text-users-text-primary">
          {showroom.packages.used}
        </span>
        <span className="text-users-text-muted">
          {" "}
          / {showroom.packages.total}
        </span>
      </TableCell>

      <TableCell
        dir="ltr"
        className="whitespace-nowrap px-5 py-4 text-right text-sm text-users-text-secondary"
      >
        {formatDate(showroom.contractEndDate)}
      </TableCell>

      <TableCell presentation="center">
        <Button
          unstyled
          type="button"
          title="عرض التفاصيل"
          aria-label={`عرض تفاصيل ${showroom.name}`}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(showroom.id);
          }}
          className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-users-text-muted transition-colors hover:bg-users-stat-neutral-bg hover:text-users-text-primary"
        >
          <Eye size={18} />
        </Button>
      </TableCell>
    </TableRow>
  );
}
