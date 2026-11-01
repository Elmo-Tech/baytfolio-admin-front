import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import { mockUsers } from "../api/users.mock";
import UserDetailsCard from "../components/user-details-card";
import UserAccountStatusCard from "../components/user-account-status-card";

const loginMethodLabels = {
  phone_password: "Phone + Password",
  google: "Google",
  apple: "Apple",
};

export default function UserDetailsPage() {
  const { userId } = useParams();
  const [isBlocked, setIsBlocked] = useState(false);

  const user = mockUsers.find((item) => item.id === userId);

  if (!user) {
    return (
      <div
        dir="rtl"
        className="rounded-lg border border-[#e9e1d7] bg-white p-8 text-center"
      >
        <h2 className="font-semibold text-[#1d2935]">المستخدم غير موجود</h2>

        <Link
          to="/users"
          className="mt-4 inline-flex items-center gap-2 text-sm text-[#46515d] hover:underline"
        >
          <ArrowLeft size={16} />
          العودة إلى المستخدمين
        </Link>
      </div>
    );
  }

  const isActive = user.status === "active" && !isBlocked;
  const currentStatus = isBlocked ? "suspended" : user.status;

  const handleBlockUser = () => {
    setIsBlocked(true);
  };

  return (
    <div dir="rtl" className="space-y-7">
      <header className="flex flex-col gap-5 border-b border-[#e9e1d7] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/users"
          className="inline-flex h-9 items-center gap-2 self-start rounded-md border border-[#e9e1d7] bg-white px-3 text-sm text-[#263442] transition hover:bg-[#f7f3ed]"
        >
          <ArrowLeft size={16} />
          العودة إلى المستخدمين
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#102233] text-lg font-semibold text-white">
            {user.avatarInitial}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-[#1d2935]">{user.name}</h1>

              <span
                className={`rounded-md px-2 py-1 text-xs font-medium ${
                  isActive
                    ? "bg-[#e8f2ec] text-[#278363]"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {isActive
                  ? "نشط"
                  : currentStatus === "suspended"
                    ? "موقوف"
                    : currentStatus === "deleted"
                      ? "محذوف"
                      : "في انتظار الحذف"}
              </span>

              <span className="rounded-md border border-[#e9e1d7] bg-[#f7f3ed] px-2 py-1 text-xs text-[#46515d]">
                {loginMethodLabels[user.loginMethod]}
              </span>
            </div>

            <p className="text-xs text-[#a89987]">
              مرجع الحساب التشغيلي:
              <span
                dir="ltr"
                className="mr-2 inline-block rounded bg-[#f7f3ed] px-2 py-1 text-[#46515d]"
              >
                #{user.id}-EG
              </span>
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <UserDetailsCard user={user} />

        <UserAccountStatusCard
          status={currentStatus}
          onBlock={handleBlockUser}
        />
      </div>
    </div>
  );
}
