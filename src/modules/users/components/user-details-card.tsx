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
    <section className="rounded-lg border border-[#e9e1d7] bg-white p-5">
      <div className="mb-4 flex items-center gap-2 border-b border-[#eee8e0] pb-4">
        <div className="rounded-md bg-[#f7f3ed] p-1.5">
          <UserRound size={17} className="text-[#46515d]" />
        </div>

        <h2 className="font-semibold text-[#1d2935]">بيانات الحساب</h2>
      </div>

      <div className="space-y-2.5">
        {accountFields.map((field) => (
          <div
            key={field.label}
            className="flex min-h-10 items-center justify-between gap-4 rounded-md border border-[#eee8e0] bg-[#fcfaf8] px-3 py-2"
          >
            <span className="text-xs text-[#a89987]">{field.label}</span>

            <span dir="auto" className="text-sm font-medium text-[#263442]">
              {field.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-[#eee8e0] pt-3 text-xs text-[#a89987]">
        <ShieldCheck size={14} className="text-[#278363]" />
        <span>حماية الخصوصية مفعّلة لبيانات الاتصال.</span>
      </div>
    </section>
  );
}
