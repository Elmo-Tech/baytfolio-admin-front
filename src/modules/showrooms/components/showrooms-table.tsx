import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui/table";
import { useNavigate } from "react-router";

import type { Showroom } from "../types/showroom";
import ShowroomTableRow from "./showroom-table-row";

interface ShowroomsTableProps {
  showrooms: Showroom[];
}

const tableHeadings = [
  "المعرض / المصنع",
  "نوع النشاط",
  "المسؤول",
  "حالة المعرض",
  "حالة العقد",
  "الغرف",
  "الباقات",
  "نهاية العقد",
  "الإجراءات",
];

export default function ShowroomsTable({ showrooms }: ShowroomsTableProps) {
  const navigate = useNavigate();

  const handleShowroomClick = (showroomId: string) => {
    navigate(`/showrooms/${showroomId}`);
  };

  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-lg border border-users-panel-border bg-users-surface"
    >
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[1250px] text-right">
          <TableHeader className="bg-users-table-header text-xs text-users-text-muted">
            <TableRow>
              {tableHeadings.map((heading, idx) => (
                <TableHead
                  key={heading}
                  className={`px-5 py-4 font-medium ${idx === tableHeadings.length - 1 ? "text-center" : ""}`}
                >
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-users-table-divider">
            {showrooms.length > 0 ? (
              showrooms.map((showroom) => (
                <ShowroomTableRow
                  key={showroom.id}
                  showroom={showroom}
                  onSelect={handleShowroomClick}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} presentation="empty">
                  لا توجد نتائج مطابقة لبحثك
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
