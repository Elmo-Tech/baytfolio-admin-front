import { TableRow, TableCell } from "@/shared/components/ui/table";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export interface ActiveShowroomRowData {
  id: string;
  name: string;
  rooms: number;
  packages: number;
  total: number;
}

interface ActiveShowroomRowProps {
  showroom: ActiveShowroomRowData;
  isFirst: boolean;
}

export default function ActiveShowroomRow({
  showroom,
  isFirst,
}: ActiveShowroomRowProps) {
  return (
    <TableRow className="border-t border-border-divider transition-colors hover:bg-background/50">
      <TableCell presentation="analytics-leading">
        <div className="flex items-center gap-3">
          <span
            className={[
              "flex size-10 shrink-0 items-center justify-center rounded-md text-sm font-bold",
              isFirst
                ? "bg-brand-navy text-brand-gold"
                : "bg-background text-text-secondary",
            ].join(" ")}
          >
            {showroom.id}
          </span>
          <p className="truncate text-base font-semibold text-text-primary">
            {showroom.name}
          </p>
        </div>
      </TableCell>

      <TableCell presentation="analytics-number">{showroom.rooms}</TableCell>
      <TableCell presentation="analytics-number">{showroom.packages}</TableCell>
      <TableCell className="px-3 py-5 text-center text-base font-bold tabular-nums text-text-primary">
        {showroom.total}
      </TableCell>

      <TableCell presentation="analytics-center">
        <Link
          to={`/showrooms/${showroom.id}`}
          aria-label={`فتح معرض ${showroom.name}`}
          className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-border-subtle bg-card px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-brand-navy hover:bg-background"
        >
          <span>فتح المعرض</span>
          <ArrowLeft size={16} className="shrink-0 text-text-muted" />
        </Link>
      </TableCell>
    </TableRow>
  );
}
