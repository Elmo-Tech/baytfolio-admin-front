import { useNavigate } from "react-router";
import { Eye } from "lucide-react";

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

const statusStyles: Record<User["status"], string> = {
  active: "bg-[#e8f5ef] text-[#16845d]",
  suspended: "bg-[#fff0f0] text-[#e5484d]",
  pending_deletion: "bg-[#fff4e5] text-[#d97706]",
  deleted: "bg-[#f1f1f1] text-[#777777]",
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

  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-md border border-[#f0ebe5] bg-white"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-right">
          <thead className="bg-[#faf8f5] text-xs text-[#8b8176]">
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

          <tbody className="divide-y divide-[#f3eee8]">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="transition hover:bg-[#fcfbf9]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0ebe5] text-sm font-semibold text-[#102233]">
                        {user.avatarInitial}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#1d2935]">
                          {user.name}
                        </p>
                        <p className="mt-1 text-xs text-[#9a9187]">{user.id}</p>
                      </div>
                    </div>
                  </td>

                  <td
                    dir="ltr"
                    className="whitespace-nowrap px-5 py-4 text-sm text-[#46515d]"
                  >
                    {user.phone}
                  </td>

                  <td
                    dir="ltr"
                    className="whitespace-nowrap px-5 py-4 text-sm text-[#46515d]"
                  >
                    {user.email}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-[#46515d]">
                    {loginMethodLabels[user.loginMethod]}
                  </td>

                  <td
                    dir="ltr"
                    className="whitespace-nowrap px-5 py-4 text-sm text-[#46515d]"
                  >
                    {formatDate(user.createdAt)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${statusStyles[user.status]}`}
                    >
                      {statusLabels[user.status]}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-[#8b8176]">
                    {formatLastLogin(user.lastLogin)}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => navigate(`/users/${user.id}`)}
                      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-[#8b8176] transition hover:bg-[#f0ebe5] hover:text-[#102233]"
                      title="عرض التفاصيل"
                      aria-label={`عرض تفاصيل ${user.name}`}
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-12 text-center text-sm text-[#9a9187]"
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
