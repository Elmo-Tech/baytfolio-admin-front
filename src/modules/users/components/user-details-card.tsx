import { ShieldCheck, UserRound } from "lucide-react";
import type { User } from "../types/user";

interface UserDetailsCardProps {
  user: User;
}

const loginMethodLabels = {
  phone_password: "Phone + Password",
  google: "Google",
  apple: "Apple",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB").format(new Date(date));
}

export default function UserDetailsCard({ user }: UserDetailsCardProps) {
  const accountFields = [
    { label: "الاسم الكامل", value: user.name },
    { label: "رقم الهاتف", value: user.phone },
    { label: "البريد الإلكتروني", value: user.email },
    {
      label: "طريقة تسجيل الدخول",
      value: loginMethodLabels[user.loginMethod],
    },
    {
      label: "تاريخ إنشاء الحساب",
      value: formatDate(user.createdAt),
    },
  ];

  return (
    <section className="rounded-lg border border-border-subtle bg-card p-5">
      <div className="mb-4 flex items-center gap-2 border-b border-users-panel-divider pb-4">
        <div className="rounded-md bg-background p-1.5">
          <UserRound size={17} className="text-users-text-secondary" />
        </div>

        <h2 className="font-semibold text-users-text-primary">بيانات الحساب</h2>
      </div>

      <div className="space-y-2.5">
        {accountFields.map((field) => (
          <div
            key={field.label}
            className="flex min-h-10 items-center justify-between gap-4 rounded-md border border-users-panel-divider bg-users-surface-input px-3 py-2"
          >
            <span className="text-xs text-users-text-subtle">
              {field.label}
            </span>

            <span
              dir="auto"
              className="text-sm font-medium text-users-text-detail"
            >
              {field.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-users-panel-divider pt-3 text-xs text-users-text-subtle">
        <ShieldCheck size={14} className="text-users-status-active-fg" />
        <span>حماية الخصوصية مفعّلة لبيانات الاتصال.</span>
      </div>
    </section>
  );
}
