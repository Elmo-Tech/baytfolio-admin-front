import { useCallback, useState } from "react";
import { Bell, ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router";

import { mockShowrooms } from "@/modules/showrooms/api/showrooms.mock";
import { mockUsers } from "@/modules/users/api/users.mock";
import { mockShowroomJoinRequests } from "@/modules/showroom-join-requests/api/showroom-join-requests.mock";

type BreadcrumbItem = {
  label: string;
  to?: string;
};

const pageTitles: Record<string, string> = {
  "/dashboard": "نظرة عامة",
  "/users": "المستخدمون",
  "/showrooms": "المعارض والمصانع",
  "/cms": "إدارة المحتوى CMS",
  "/cms/help-center": "مركز المساعدة",
  "/cms/contact-information": "تواصل معنا",
  "/cms/privacy-policy": "سياسة الخصوصية",
  "/cms/terms-and-conditions": "الشروط والأحكام",
  "/analytics": "التحليلات والتقارير",
  "/showroom-join-requests": "طلبات انضمام المعارض",
};

function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const normalizedPath = `/${segments.join("/")}`;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: "لوحة التحكم",
      to: "/dashboard",
    },
  ];

  if (normalizedPath === "/dashboard") {
    breadcrumbs.push({ label: "نظرة عامة" });
    return breadcrumbs;
  }

  // Users
  if (segments[0] === "users") {
    breadcrumbs.push({
      label: pageTitles["/users"],
      to: "/users",
    });

    if (segments.length >= 2) {
      const userId = segments[1];

      const user = mockUsers.find((item) => item.id === userId);

      breadcrumbs.push({
        label: user?.name ?? "تفاصيل المستخدم",
      });
    }

    return breadcrumbs;
  }

  // Showrooms
  if (segments[0] === "showrooms") {
    breadcrumbs.push({
      label: pageTitles["/showrooms"],
      to: "/showrooms",
    });

    if (segments.length >= 2) {
      const showroomId = segments[1];

      const showroom = mockShowrooms.find((item) => item.id === showroomId);

      breadcrumbs.push({
        label: showroom?.name ?? "تفاصيل المعرض",
      });

      if (segments.length >= 3) {
        breadcrumbs.push({
          label: "تعديل بيانات المعرض",
        });
      }
    }

    return breadcrumbs;
  }

  // Showroom Join Requests
  if (segments[0] === "showroom-join-requests") {
    breadcrumbs.push({
      label: pageTitles["/showroom-join-requests"],
      to: "/showroom-join-requests",
    });

    if (segments.length >= 2) {
      const requestId = segments[1];

      const request = mockShowroomJoinRequests.find(
        (item) => item.id === requestId || item.reference === requestId,
      );

      breadcrumbs.push({
        label: request?.showroomName ?? "تفاصيل طلب الانضمام",
        to: `/showroom-join-requests/${requestId}`,
      });

      if (segments[2] === "onboarding") {
        breadcrumbs.push({
          label: "إنشاء وتجهيز المعرض",
        });
      } else if (segments.length >= 3) {
        breadcrumbs.push({
          label: "تفاصيل الطلب",
        });
      }
    }

    return breadcrumbs;
  }

  // CMS
  if (segments[0] === "cms") {
    breadcrumbs.push({
      label: pageTitles["/cms"],
      to: "/cms",
    });

    if (segments.length >= 2) {
      breadcrumbs.push({
        label: pageTitles[normalizedPath] ?? "تفاصيل المحتوى",
      });
    }

    return breadcrumbs;
  }

  // Other pages
  breadcrumbs.push({
    label: pageTitles[normalizedPath] ?? "لوحة الإدارة",
  });

  return breadcrumbs;
}

export default function AdminHeader() {
  const location = useLocation();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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

  const breadcrumbs = getBreadcrumbs(location.pathname);

  return (
    <header
      dir="rtl"
      className="flex h-[88px] min-w-0 shrink-0 items-center justify-between gap-3 border-b border-border-subtle bg-card px-3 sm:px-6 lg:px-8 max-[721px]:justify-end"
    >
      {/* Breadcrumbs */}
      <nav
        aria-label="مسار التنقل"
        className="hidden min-w-0 flex-1 items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs min-[721px]:flex sm:gap-2 sm:text-sm"
      >
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <div
              key={`${item.label}-${index}`}
              className="flex shrink-0 items-center gap-1.5 sm:gap-2"
            >
              {index > 0 && (
                <ChevronLeft
                  size={14}
                  className="shrink-0 text-text-muted-icon sm:size-4"
                />
              )}

              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="shrink-0 text-text-muted transition-colors hover:text-brand-navy"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={
                    isLast
                      ? "shrink-0 font-semibold text-text-primary"
                      : "shrink-0 text-text-muted"
                  }
                >
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </nav>

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
                إبراهيم المهدي
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
