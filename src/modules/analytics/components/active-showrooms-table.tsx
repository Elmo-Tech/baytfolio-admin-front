import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
} from "@/shared/components/ui/table";
import ActiveShowroomRow, {
  type ActiveShowroomRowData,
} from "./active-showroom-row";

interface ActiveShowroomsTableProps {
  showrooms: ActiveShowroomRowData[];
}

export default function ActiveShowroomsTable({
  showrooms,
}: ActiveShowroomsTableProps) {
  return (
    <article className="h-full min-w-0 overflow-hidden rounded-lg border border-border-subtle bg-card shadow-sm">
      <div className="flex min-h-[84px] items-center justify-between gap-3 border-b border-border-divider px-5 py-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">
            المعارض الأكثر نشاطًا بالمحتوى
          </h2>
          <p className="mt-1.5 text-sm text-text-muted">
            أعلى المعارض والمصانع مساهمة في الغرف والباقات المنشورة
          </p>
        </div>
        <span className="shrink-0 rounded-md bg-background px-3 py-1.5 text-sm font-semibold text-text-secondary">
          أعلى 5
        </span>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full min-w-[560px] text-right">
          <TableHeader className="bg-background text-text-secondary">
            <TableRow>
              <TableHead presentation="analytics-leading">
                المعرض / المصنع
              </TableHead>
              <TableHead presentation="analytics">غرف منشورة</TableHead>
              <TableHead presentation="analytics">باقات</TableHead>
              <TableHead presentation="analytics">إجمالي المحتوى</TableHead>
              <TableHead presentation="analytics">الإجراء</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {showrooms.map((showroom, index) => (
              <ActiveShowroomRow
                key={showroom.id}
                showroom={showroom}
                isFirst={index === 0}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </article>
  );
}
