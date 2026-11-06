import { useNavigate } from "react-router";
import { Eye } from "lucide-react";
import { Badge } from "@/shared/components/ui";

import type { User } from "../types/user";

interface UsersTableProps {
  users: User[];
}

const statusLabels: Record<User["status"], string> = {
  active: "نشط",
  suspended: "محظور",
  pending_deletion: "طلب حذف",
  deleted: "محذوف",
};

const loginMethodLabels: Record<User["loginMethod"], string> = {
  phone_password: "الهاتف وكلمة المرور",
  google: "Google",
  apple: "Apple",
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-GB").format(new Date(date));
};

const formatLastLogin = (date: string) => {
  const loginDate = new Date(date);
  const today = new Date();

  const isToday = loginDate.toDateString() === today.toDateString();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isYesterday = loginDate.toDateString() === yesterday.toDateString();

  const time = new Intl.DateTimeFormat("ar-EG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(loginDate);

  if (isToday) return `اليوم، ${time}`;
  if (isYesterday) return `أمس، ${time}`;

  return formatDate(date);
};

export default function UsersTable({ users }: UsersTableProps) {
  const navigate = useNavigate();

  const handleRowClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

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
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  tabIndex={0}
                  aria-label={`عرض تفاصيل المستخدم ${user.name}`}
                  onClick={() => handleRowClick(user.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleRowClick(user.id);
                    }
                  }}
                  className="cursor-pointer transition-colors hover:bg-users-surface-row-hover focus-visible:bg-users-surface-row-hover focus-visible:outline-2 focus-visible:outline-users-focus focus-visible:outline-offset-[-2px]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-users-panel-border text-sm font-semibold text-users-brand-navy">
                        {user.avatarInitial}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-users-text-primary">
                          {user.name}
                        </p>
                        <p className="mt-1 text-xs text-users-text-subtle">
                          {user.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td
                    dir="ltr"
                    className="whitespace-nowrap px-5 py-4 text-sm text-users-text-secondary"
                  >
                    {user.phone}
                  </td>

                  <td
                    dir="ltr"
                    className="whitespace-nowrap px-5 py-4 text-sm text-users-text-secondary"
                  >
                    {user.email}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-users-text-secondary">
                    {loginMethodLabels[user.loginMethod]}
                  </td>

                  <td
                    dir="ltr"
                    className="whitespace-nowrap px-5 py-4 text-sm text-users-text-secondary"
                  >
                    {formatDate(user.createdAt)}
                  </td>

                  <td className="px-5 py-4">
                    <Badge
                      variant="outline"
                      className={`whitespace-nowrap border-transparent px-3 py-1 text-xs font-medium ${
                        user.status === "active"
                          ? "bg-status-active-bg text-status-active-fg"
                          : user.status === "suspended"
                            ? "bg-status-suspended-bg text-status-suspended-fg"
                            : user.status === "pending_deletion"
                              ? "bg-status-pending-bg text-status-pending-fg"
                              : "bg-status-deleted-bg text-status-deleted-fg"
                      }`}
                    >
                      {statusLabels[user.status]}
                    </Badge>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-users-text-muted">
                    {formatLastLogin(user.lastLogin)}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-users-text-muted"
                      title="عرض التفاصيل"
                    >
                      <Eye size={18} />
                    </span>
                  </td>
                </tr>
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
