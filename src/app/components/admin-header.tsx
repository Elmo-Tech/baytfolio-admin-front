import { useState } from "react";
import { Bell, ChevronLeft } from "lucide-react";
import { Link, useLocation, useParams } from "react-router";
import { mockUsers } from "@/modules/users/api/users.mock";

const pageTitles: Record<string, string> = {
  "/dashboard": "نظرة عامة",
  "/users": "المستخدمون",
};

export default function AdminHeader() {
  const location = useLocation();
  const { userId } = useParams();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const currentPath = location.pathname;
  const isUserDetails = /^\/users\/[^/]+$/.test(currentPath);

  const currentUser = isUserDetails
    ? mockUsers.find((user) => user.id === userId)
    : undefined;

  const currentPageTitle = isUserDetails
    ? (currentUser?.name ?? "تفاصيل المستخدم")
    : (pageTitles[currentPath] ?? "لوحة الإدارة");

  return (
    <header
      dir="rtl"
      className="flex h-[88px] min-w-0 shrink-0 items-center justify-between gap-3 border-b border-[#e9e1d7] bg-white px-3 sm:px-6 lg:px-8 max-[459px]:justify-end"
    >
      {/* Breadcrumbs */}
      <div className="hidden min-w-0 flex-1 items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs min-[460px]:flex sm:gap-2 sm:text-sm">
        <Link
          to="/dashboard"
          className="shrink-0 text-[#aa9985] transition-colors hover:text-[#102233]"
        >
          لوحة التحكم
        </Link>
        <ChevronLeft size={14} className="shrink-0 text-[#b09e89] sm:size-4" />
        {isUserDetails && (
          <>
            <Link
              to="/users"
              className="shrink-0 text-[#aa9985] transition-colors hover:text-[#102233]"
            >
              المستخدمون
            </Link>

            <ChevronLeft
              size={14}
              className="shrink-0 text-[#b09e89] sm:size-4"
            />
          </>
        )}
        <span className="shrink-0 font-semibold text-[#1d2935]">
          {currentPageTitle}
        </span>
      </div>

      {/* Admin Actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-6">
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            aria-label="الإشعارات"
            aria-expanded={isNotificationsOpen}
            onClick={() => setIsNotificationsOpen((prev) => !prev)}
            className="relative flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#eee8e0] text-[#46515d] transition-colors hover:bg-[#f7f3ed] sm:size-10"
          >
            <Bell size={18} strokeWidth={1.8} />

            <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {isNotificationsOpen && (
            <div
              dir="rtl"
              className="absolute left-0 top-12 z-50 w-64 rounded-lg border border-[#eee8e0] bg-white p-4 shadow-lg sm:w-72"
            >
              <h3 className="mb-2 font-semibold text-[#1d2935]">الإشعارات</h3>

              <p className="text-sm text-[#aa9985]">
                سيتم عرض إشعارات النظام هنا عند ربطها.
              </p>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-2 border-r border-[#eee8e0] pr-2 sm:gap-3 sm:pr-4 lg:pr-5">
          <div className="hidden flex-col items-start gap-1 sm:flex">
            <p className="whitespace-nowrap text-xs font-semibold leading-5 text-[#1d2935] sm:text-sm">
              مدير النظام
            </p>

            <p className="whitespace-nowrap text-[10px] leading-5 text-[#aa9985] sm:text-xs">
              المسؤول الأعلى
            </p>
          </div>

          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#102233] text-sm font-bold text-[#eab66e] sm:size-11">
            م
          </div>
        </div>
      </div>
    </header>
  );
}
