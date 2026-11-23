import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui/table";
import { useUsersTable } from "../hooks/use-users-table";
import type { User } from "../types/user";
import UsersTableRow from "./users-table-row";

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const { rows, onRowClick } = useUsersTable(users);

  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-md border border-users-panel-border bg-users-surface"
    >
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[1100px] text-right">
          <TableHeader className="bg-users-table-header text-xs text-users-text-muted">
            <TableRow>
              <TableHead presentation="standard">المستخدم</TableHead>
              <TableHead presentation="standard">رقم الهاتف</TableHead>
              <TableHead presentation="standard">البريد الإلكتروني</TableHead>
              <TableHead presentation="standard">طريقة الدخول</TableHead>
              <TableHead presentation="standard">تاريخ التسجيل</TableHead>
              <TableHead presentation="standard">الحالة</TableHead>
              <TableHead presentation="standard">آخر تسجيل دخول</TableHead>
              <TableHead presentation="center">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-users-table-divider">
            {rows.length > 0 ? (
              rows.map((row) => (
                <UsersTableRow key={row.id} row={row} onSelect={onRowClick} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} presentation="empty">
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
