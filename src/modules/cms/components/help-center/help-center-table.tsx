import { Pencil, Power, RotateCcw } from "lucide-react";

import { Badge, Button } from "@/shared/components/ui";

import type { HelpCenterQuestion } from "../../types/help-center";

interface HelpCenterTableProps {
  questions: HelpCenterQuestion[];
  currentPage: number;
  pageSize: number;
  onEdit: (question: HelpCenterQuestion) => void;
  onToggleStatus: (id: number) => void;
}

export default function HelpCenterTable({
  questions,
  currentPage,
  pageSize,
  onEdit,
  onToggleStatus,
}: HelpCenterTableProps) {
  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-md border border-users-panel-border bg-users-surface"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-right">
          <thead className="bg-users-table-header text-xs text-users-text-muted">
            <tr>
              <th className="px-5 py-4 font-medium">الترتيب</th>
              <th className="px-5 py-4 font-medium">السؤال</th>
              <th className="px-5 py-4 font-medium">التصنيف</th>
              <th className="px-5 py-4 text-center font-medium">الحالة</th>
              <th className="px-5 py-4 text-center font-medium">الإجراءات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-users-table-divider">
            {questions.length > 0 ? (
              questions.map((question, index) => {
                const isActive = question.status === "active";

                return (
                  <tr
                    key={question.id}
                    className="transition-colors hover:bg-users-surface-row-hover"
                  >
                    {/* Order */}
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-users-text-muted">
                      #
                      {String(
                        (currentPage - 1) * pageSize + index + 1,
                      ).padStart(2, "0")}
                    </td>

                    {/* Question */}
                    <td className="min-w-[300px] px-5 py-4">
                      <p className="text-sm font-semibold text-users-text-primary">
                        {question.question}
                      </p>

                      <p
                        dir="ltr"
                        className="mt-1 text-left text-xs text-users-text-subtle"
                      >
                        {question.questionEn}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <Badge
                        variant="outline"
                        className="border-transparent bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                      >
                        {question.category}
                      </Badge>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 text-center">
                      <Badge
                        variant="outline"
                        className={`whitespace-nowrap border-transparent px-3 py-1 text-xs font-medium ${
                          isActive
                            ? "bg-status-active-bg text-status-active-fg"
                            : "bg-status-deleted-bg text-status-deleted-fg"
                        }`}
                      >
                        {isActive ? "نشط" : "مسودة"}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => onEdit(question)}
                          className="cursor-pointer border-users-panel-divider text-users-text-secondary"
                        >
                          <Pencil />
                          تعديل
                        </Button>

                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => onToggleStatus(question.id)}
                          className={`cursor-pointer border-users-panel-divider ${
                            isActive
                              ? "text-destructive hover:bg-destructive/10"
                              : "text-emerald-700 hover:bg-emerald-50"
                          }`}
                        >
                          {isActive ? (
                            <>
                              <Power />
                              تعطيل
                            </>
                          ) : (
                            <>
                              <RotateCcw />
                              تفعيل
                            </>
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-sm text-users-text-subtle"
                >
                  لا توجد أسئلة مطابقة لبحثك
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
