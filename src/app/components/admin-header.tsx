import { useCallback, useState } from "react";
import { Bell, ChevronLeft } from "lucide-react";
import { Link, useLocation, useParams } from "react-router";
import { mockUsers } from "@/modules/users/api/users.mock";

const pageTitles: Record<string, string> = {
  "/dashboard": "نظرة عامة",
  "/users": "المستخدمون",
  "/analytics": "التحليلات والتقارير",
};

export default function AdminHeader() {
  const location = useLocation();
  const { userId } = useParams();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Close notifications when clicking outside
  const notificationsRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !isNotificationsOpen) return;

      const handleOutsideClick = (event: PointerEvent) => {
        if (!node.contains(event.target as Node)) {
          setIsNotificationsOpen(false);
        }
      };

      document.addEventListener("pointerdown", handleOutsideClick);

      return () => {
        document.removeEventListener("pointerdown", handleOutsideClick);
      };
    },
    [isNotificationsOpen],
  );

  // Close profile menu when clicking outside
  const profileMenuRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !isProfileMenuOpen) return;

      const handleOutsideClick = (event: PointerEvent) => {
        if (!node.contains(event.target as Node)) {
          setIsProfileMenuOpen(false);
        }
      };

      document.addEventListener("pointerdown", handleOutsideClick);

      return () => {
        document.removeEventListener("pointerdown", handleOutsideClick);
      };
    },
    [isProfileMenuOpen],
  );

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
      className="flex h-[88px] min-w-0 shrink-0 items-center justify-between gap-3 border-b border-border-subtle bg-card px-3 sm:px-6 lg:px-8 max-[459px]:justify-end"
    >
      {/* Breadcrumbs */}
      <div className="hidden min-w-0 flex-1 items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs min-[460px]:flex sm:gap-2 sm:text-sm">
        <Link
          to="/dashboard"
          className="shrink-0 text-text-muted transition-colors hover:text-brand-navy"
        >
          لوحة التحكم
        </Link>

        <ChevronLeft
          size={14}
          className="shrink-0 text-text-muted-icon sm:size-4"
        />

        {isUserDetails && (
          <>
            <Link
              to="/users"
              className="shrink-0 text-text-muted transition-colors hover:text-brand-navy"
            >
              المستخدمون
            </Link>

            <ChevronLeft
              size={14}
              className="shrink-0 text-text-muted-icon sm:size-4"
            />
          </>
        )}

        <span className="shrink-0 font-semibold text-text-primary">
          {currentPageTitle}
        </span>
      </div>

      {/* Admin Actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-6">
        {/* Notifications */}
        <div ref={notificationsRef} className="relative">
          <button
            type="button"
            aria-label="الإشعارات"
            aria-expanded={isNotificationsOpen}
            aria-haspopup="true"
            onClick={() => {
              setIsNotificationsOpen((prev) => !prev);
              setIsProfileMenuOpen(false);
            }}
            className="relative flex size-9 cursor-pointer items-center justify-center rounded-full border border-border-divider text-text-secondary-strong transition-colors hover:bg-background sm:size-10"
          >
            <Bell size={18} strokeWidth={1.8} />

            <span className="absolute right-2 top-2 size-2 rounded-full bg-notification-unread ring-2 ring-card" />
          </button>

          {isNotificationsOpen && (
            <div
              dir="rtl"
              className="absolute left-0 top-12 z-50 w-64 rounded-lg border border-border-divider bg-card p-4 shadow-lg sm:w-72"
            >
              <h3 className="mb-2 font-semibold text-text-primary">
                الإشعارات
              </h3>

              <p className="text-sm text-text-muted">
                سيتم عرض إشعارات النظام هنا عند ربطها.
              </p>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div
          ref={profileMenuRef}
          className="relative border-r border-border-divider pr-2 sm:pr-4 lg:pr-5"
        >
          <button
            type="button"
            aria-label="قائمة حساب المدير"
            aria-expanded={isProfileMenuOpen}
            aria-haspopup="true"
            onClick={() => {
              setIsProfileMenuOpen((prev) => !prev);
              setIsNotificationsOpen(false);
            }}
            className="flex cursor-pointer items-center gap-2 sm:gap-3"
          >
            <div className="hidden flex-col items-start gap-1 sm:flex">
              <p className="whitespace-nowrap text-xs font-semibold leading-5 text-text-primary sm:text-sm">
                أشرف قبية
              </p>

              <p className="whitespace-nowrap text-[10px] leading-5 text-text-muted sm:text-xs">
                المسؤول الأعلى
              </p>
            </div>

            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-brand-gold sm:size-11">
              م
            </div>
          </button>

          {isProfileMenuOpen && (
            <div
              dir="ltr"
              className="absolute left-0 top-14 z-50 w-40 rounded-lg border border-border-divider bg-card p-2 shadow-lg"
            >
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen(false)}
                className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-logout transition-colors hover:bg-logout-hover"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
