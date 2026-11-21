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
        <table className="w-full min-w-[560px] text-right">
          <thead className="bg-background text-text-secondary">
            <tr>
              <th className="px-5 py-4 text-base font-semibold">
                المعرض / المصنع
              </th>
              <th className="px-3 py-4 text-center text-base font-semibold">
                غرف منشورة
              </th>
              <th className="px-3 py-4 text-center text-base font-semibold">
                باقات
              </th>
              <th className="px-3 py-4 text-center text-base font-semibold">
                إجمالي المحتوى
              </th>
              <th className="px-3 py-4 text-center text-base font-semibold">
                الإجراء
              </th>
            </tr>
          </thead>

          <tbody>
            {showrooms.map((showroom, index) => (
              <ActiveShowroomRow
                key={showroom.id}
                showroom={showroom}
                isFirst={index === 0}
              />
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
