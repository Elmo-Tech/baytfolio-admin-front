import { TableCell } from "@/shared/components/ui/table";
import { BadgeCheck } from "lucide-react";

import type { Showroom } from "../types/showroom";
import { getShowroomInitials } from "../utils/showrooms-table.utils";

interface ShowroomTableRowIdentityProps {
  showroom: Showroom;
}

export default function ShowroomTableRowIdentity({
  showroom,
}: ShowroomTableRowIdentityProps) {
  const isVerified = showroom.isVerified === true;

  return (
    <>
      <TableCell presentation="standard">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-warm bg-users-stat-neutral-bg text-sm font-semibold text-users-stat-neutral-fg">
            {getShowroomInitials(showroom.name)}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="whitespace-nowrap text-sm font-semibold text-users-text-primary">
                {showroom.name}
              </p>
              {isVerified && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-users-stat-warning-bg bg-users-stat-warning-bg px-2 py-1 text-xs font-medium text-users-stat-warning-fg">
                  <BadgeCheck size={13} />
                  موثق
                </span>
              )}
            </div>
            <p
              dir="ltr"
              className="mt-1 text-right text-xs text-users-text-subtle"
            >
              {showroom.reference}
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell presentation="standard">
        <div className="space-y-1">
          <p className="whitespace-nowrap text-sm font-medium text-users-text-primary">
            {showroom.managerName}
          </p>
          <p dir="ltr" className="text-right text-xs text-users-text-muted">
            {showroom.managerPhone}
          </p>
        </div>
      </TableCell>
    </>
  );
}
