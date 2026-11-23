import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui/table";
import HelpCenterQuestionRow from "./help-center-question-row";

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
        <Table className="w-full min-w-[900px] text-right">
          <TableHeader className="bg-users-table-header text-xs text-users-text-muted">
            <TableRow>
              <TableHead presentation="standard">الترتيب</TableHead>
              <TableHead presentation="standard">السؤال</TableHead>
              <TableHead presentation="standard">التصنيف</TableHead>
              <TableHead presentation="center">الحالة</TableHead>
              <TableHead presentation="center">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-users-table-divider">
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <HelpCenterQuestionRow
                  key={question.id}
                  question={question}
                  index={index}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  onEdit={onEdit}
                  onToggleStatus={onToggleStatus}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} presentation="empty">
                  لا توجد أسئلة مطابقة لبحثك
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
