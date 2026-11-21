import { usePriorityItems } from "../hooks/use-priority-items";
import PriorityItemRow from "./priority-item-row";
import PriorityItemsPagination from "./priority-items-pagination";
import PriorityItemsToolbar from "./priority-items-toolbar";

export default function PriorityItems() {
  const state = usePriorityItems();

  return (
    <section aria-labelledby="priority-items-heading" className="space-y-4">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="priority-items-heading"
            className="flex items-center gap-2 text-xl font-bold text-text-primary"
          >
            <span className="size-2.5 rounded-full bg-users-stat-success-fg" />
            العناصر ذات الأولوية
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            عناصر تحتاج إلى متابعة لضمان سير العمليات بسلاسة
          </p>
        </div>
      </header>

      <div className="rounded-md border border-users-panel-border bg-users-surface shadow-sm">
        <PriorityItemsToolbar
          search={state.search}
          statusFilter={state.statusFilter}
          isFilterOpen={state.isFilterOpen}
          onSearchChange={state.onSearchChange}
          onStatusChange={state.onStatusChange}
          onToggleFilter={state.onToggleFilter}
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-right">
            <thead className="bg-users-table-header text-xs text-users-text-muted">
              <tr>
                <th className="px-5 py-4 font-medium">النوع</th>
                <th className="px-5 py-4 font-medium">العنصر / التفاصيل</th>
                <th className="px-5 py-4 font-medium">الجهة / المعرض</th>
                <th className="px-5 py-4 font-medium">الحالة</th>
                <th className="px-5 py-4 font-medium">آخر تحديث</th>
                <th className="px-5 py-4 text-center font-medium">الإجراء</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-users-table-divider">
              {state.visibleItems.length > 0 ? (
                state.visibleItems.map((item) => (
                  <PriorityItemRow
                    key={item.id}
                    item={item}
                    isCompleted={state.completedIds.includes(item.id)}
                    onAction={state.onItemAction}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-users-text-subtle"
                  >
                    لا توجد نتائج مطابقة للبحث أو التصفية
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <PriorityItemsPagination
          rangeStart={state.rangeStart}
          rangeEnd={state.rangeEnd}
          totalItems={state.totalItems}
          safePage={state.safePage}
          totalPages={state.totalPages}
          onPrevPage={state.onPrevPage}
          onNextPage={state.onNextPage}
        />
      </div>
    </section>
  );
}
