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
        <table className="w-full min-w-[1100px] text-right">
          <thead className="bg-users-table-header text-xs text-users-text-muted">
            <tr>
              <th className="px-5 py-4 font-medium">المستخدم</th>
              <th className="px-5 py-4 font-medium">رقم الهاتف</th>
              <th className="px-5 py-4 font-medium">البريد الإلكتروني</th>
              <th className="px-5 py-4 font-medium">طريقة الدخول</th>
              <th className="px-5 py-4 font-medium">تاريخ التسجيل</th>
              <th className="px-5 py-4 font-medium">الحالة</th>
              <th className="px-5 py-4 font-medium">آخر تسجيل دخول</th>
              <th className="px-5 py-4 text-center font-medium">الإجراءات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-users-table-divider">
            {rows.length > 0 ? (
              rows.map((row) => (
                <UsersTableRow key={row.id} row={row} onSelect={onRowClick} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-12 text-center text-sm text-users-text-subtle"
                >
                  لا توجد نتائج مطابقة لبحثك
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
