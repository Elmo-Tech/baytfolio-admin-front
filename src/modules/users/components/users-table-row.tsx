import { TableRow, TableCell } from "@/shared/components/ui/table";
import { Eye } from "lucide-react";

import { Badge } from "@/shared/components/ui";
import type { UserTableRow } from "../hooks/use-users-table";

interface UsersTableRowProps {
  row: UserTableRow;
  onSelect: (userId: string) => void;
}

export default function UsersTableRow({ row, onSelect }: UsersTableRowProps) {
  return (
    <TableRow
      tabIndex={0}
      aria-label={`عرض تفاصيل المستخدم ${row.name}`}
      onClick={() => onSelect(row.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter") onSelect(row.id);
      }}
      className="cursor-pointer transition-colors hover:bg-users-surface-row-hover focus-visible:bg-users-surface-row-hover focus-visible:outline-2 focus-visible:outline-users-focus focus-visible:outline-offset-[-2px]"
    >
      <TableCell presentation="standard">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-users-panel-border text-sm font-semibold text-users-brand-navy">
            {row.avatarInitial}
          </div>
          <div>
            <p className="text-sm font-semibold text-users-text-primary">
              {row.name}
            </p>
            <p className="mt-1 text-xs text-users-text-subtle">{row.id}</p>
          </div>
        </div>
      </TableCell>
      <TableCell dir="ltr" presentation="secondary">
        {row.phone}
      </TableCell>
      <TableCell dir="ltr" presentation="secondary">
        {row.email}
      </TableCell>
      <TableCell presentation="secondary">{row.loginMethodLabel}</TableCell>
      <TableCell dir="ltr" presentation="secondary">
        {row.createdAtFormatted}
      </TableCell>
      <TableCell presentation="standard">
        <Badge
          variant="outline"
          className={`whitespace-nowrap border-transparent px-3 py-1 text-xs font-medium ${row.statusBadgeClass}`}
        >
          {row.statusLabel}
        </Badge>
      </TableCell>
      <TableCell presentation="muted">{row.lastLoginFormatted}</TableCell>
      <TableCell presentation="center">
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-users-text-muted"
          title="عرض التفاصيل"
        >
          <Eye size={18} />
        </span>
      </TableCell>
    </TableRow>
  );
}
