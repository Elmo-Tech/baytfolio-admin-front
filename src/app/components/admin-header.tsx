import { Bell, ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState } from "react";

const pageTitles: Record<string, string> = {
  "/dashboard": "نظرة عامة",
  "/users": "المستخدمون",
};

export default function AdminHeader() {
  const location = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const currentPath = location.pathname;
  const isUserDetails = /^\/users\/[^/]+$/.test(currentPath);

  const currentPageTitle = isUserDetails
    ? "تفاصيل المستخدم"
    : (pageTitles[currentPath] ?? "لوحة الإدارة");

  return (
    <header
      dir="rtl"
      className="flex h-[88px] shrink-0 items-center justify-between border-b border-[#e9e1d7] bg-white px-8"
    >
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <Link
          to="/dashboard"
          className="text-[#aa9985] transition-colors hover:text-[#102233]"
        >
          لوحة التحكم
        </Link>

        <ChevronLeft size={16} className="text-[#b09e89]" />

        <span className="font-semibold text-[#1d2935]">{currentPageTitle}</span>
      </div>

      {/* Admin Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            aria-label="الإشعارات"
            aria-expanded={isNotificationsOpen}
            onClick={() => setIsNotificationsOpen((prev) => !prev)}
            className="relative flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#eee8e0] text-[#46515d] transition-colors hover:bg-[#f7f3ed]"
          >
            <Bell size={19} strokeWidth={1.8} />

            <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {isNotificationsOpen && (
            <div
              dir="rtl"
              className="absolute left-0 top-12 z-50 w-72 rounded-lg border border-[#eee8e0] bg-white p-4 shadow-lg"
            >
              <h3 className="mb-2 font-semibold text-[#1d2935]">الإشعارات</h3>

              <p className="text-sm text-[#aa9985]">
                سيتم عرض إشعارات النظام هنا عند ربطها.
              </p>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 border-r border-[#eee8e0] pr-5">
          <div className="flex flex-col items-start gap-1">
            <p className="text-sm font-semibold leading-5 text-[#1d2935]">
              مدير النظام
            </p>

            <p className="text-xs leading-5 text-[#aa9985]">المسؤول الأعلى</p>
          </div>

          <div className="flex size-11 items-center justify-center rounded-full bg-[#102233] text-sm font-bold text-[#eab66e]">
            م
          </div>
        </div>
      </div>
    </header>
  );
}
