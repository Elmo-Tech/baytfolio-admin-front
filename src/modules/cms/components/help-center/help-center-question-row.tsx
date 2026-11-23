import { Pencil, Power, RotateCcw } from "lucide-react";
import { Badge, Button } from "@/shared/components/ui";
import { TableRow, TableCell } from "@/shared/components/ui/table";
import type { HelpCenterQuestion } from "../../types/help-center";

interface Props {
  question: HelpCenterQuestion;
  index: number;
  currentPage: number;
  pageSize: number;
  onEdit: (question: HelpCenterQuestion) => void;
  onToggleStatus: (id: number) => void;
}
export default function HelpCenterQuestionRow({
  question,
  index,
  currentPage,
  pageSize,
  onEdit,
  onToggleStatus,
}: Props) {
  const isActive = question.status === "active";
  return (
    <TableRow className="transition-colors hover:bg-users-surface-row-hover">
      {/* Order */}
      <TableCell presentation="muted">
        #{String((currentPage - 1) * pageSize + index + 1).padStart(2, "0")}
      </TableCell>

      {/* Question */}
      <TableCell className="min-w-[300px] px-5 py-4">
        <p className="text-sm font-semibold text-users-text-primary">
          {question.question}
        </p>

        <p dir="ltr" className="mt-1 text-left text-xs text-users-text-subtle">
          {question.questionEn}
        </p>
      </TableCell>

      {/* Category */}
      <TableCell className="whitespace-nowrap px-5 py-4">
        <Badge
          variant="outline"
          className="border-transparent bg-help-category-background px-3 py-1 text-xs font-medium text-help-category-foreground"
        >
          {question.category}
        </Badge>
      </TableCell>

      {/* Status */}
      <TableCell presentation="center">
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
      </TableCell>

      {/* Actions */}
      <TableCell presentation="standard">
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
                : "text-help-reactivate-foreground hover:bg-help-reactivate-background"
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
      </TableCell>
    </TableRow>
  );
}
