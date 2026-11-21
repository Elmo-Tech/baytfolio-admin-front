import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import UserAccountStatusCard from "../components/user-account-status-card";
import UserDetailsCard from "../components/user-details-card";
import { useUserDetails } from "../hooks/use-user-details";

export default function UserDetailsPage() {
  const {
    user,
    isActive,
    currentStatus,
    statusLabel,
    loginMethodLabel,
    handleBlockUser,
  } = useUserDetails();

  if (!user) {
    return (
      <div
        dir="rtl"
        className="rounded-lg border border-border-subtle bg-card p-8 text-center"
      >
        <h2 className="font-semibold text-users-text-primary">
          المستخدم غير موجود
        </h2>
        <Link
          to="/users"
          className="mt-4 inline-flex items-center gap-2 text-sm text-users-text-secondary hover:underline"
        >
          <ArrowRight size={16} />
          العودة إلى المستخدمين
        </Link>
      </div>
    );
  }

  return (
    <div dir="rtl" className="space-y-7">
      <header className="flex flex-col gap-5 border-b border-border-subtle pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-users-brand-navy text-lg font-semibold text-primary-foreground">
            {user.avatarInitial}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-users-text-primary">
                {user.name}
              </h1>
              <span
                className={`rounded-md px-2 py-1 text-xs font-medium ${
                  isActive
                    ? "bg-users-status-active-bg text-users-status-active-fg"
                    : "bg-users-status-error-bg text-users-status-error-fg"
                }`}
              >
                {statusLabel}
              </span>
              <span className="rounded-md border border-border-subtle bg-background px-2 py-1 text-xs text-users-text-secondary">
                {loginMethodLabel}
              </span>
            </div>

            <p className="text-xs text-users-text-subtle">
              مرجع الحساب التشغيلي:
              <span
                dir="ltr"
                className="mr-2 inline-block rounded bg-background px-2 py-1 text-users-text-secondary"
              >
                #{user.id}-EG
              </span>
            </p>
          </div>
        </div>

        <Link
          to="/users"
          className="inline-flex h-9 flex-row-reverse items-center gap-2 self-start rounded-md border border-border-subtle bg-card px-3 text-sm text-users-text-detail transition hover:bg-background"
        >
          العودة إلى المستخدمين
          <ArrowRight size={16} />
        </Link>
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
