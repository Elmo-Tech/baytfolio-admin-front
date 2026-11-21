import { mockShowroomJoinRequests } from "@/modules/showroom-join-requests/api/showroom-join-requests.mock";
import { mockShowrooms } from "@/modules/showrooms/api/showrooms.mock";
import { mockUsers } from "@/modules/users/api/users.mock";
import { PAGE_TITLES } from "../constants/navigation-titles";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const normalizedPath = `/${segments.join("/")}`;
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "لوحة التحكم", to: "/dashboard" },
  ];

  if (normalizedPath === "/dashboard") {
    return [...breadcrumbs, { label: "نظرة عامة" }];
  }

  if (segments[0] === "users") {
    breadcrumbs.push({ label: PAGE_TITLES["/users"], to: "/users" });
    if (segments[1]) {
      const user = mockUsers.find((item) => item.id === segments[1]);
      breadcrumbs.push({ label: user?.name ?? "تفاصيل المستخدم" });
    }
    return breadcrumbs;
  }

  if (segments[0] === "showrooms") {
    breadcrumbs.push({ label: PAGE_TITLES["/showrooms"], to: "/showrooms" });
    if (segments[1]) {
      const showroom = mockShowrooms.find((item) => item.id === segments[1]);
      breadcrumbs.push({ label: showroom?.name ?? "تفاصيل المعرض" });
      if (segments.length >= 3) {
        breadcrumbs.push({ label: "تعديل بيانات المعرض" });
      }
    }
    return breadcrumbs;
  }

  if (segments[0] === "showroom-join-requests") {
    breadcrumbs.push({
      label: PAGE_TITLES["/showroom-join-requests"],
      to: "/showroom-join-requests",
    });
    if (segments[1]) {
      const request = mockShowroomJoinRequests.find(
        (item) => item.id === segments[1] || item.reference === segments[1],
      );
      breadcrumbs.push({
        label: request?.showroomName ?? "تفاصيل طلب الانضمام",
        to: `/showroom-join-requests/${segments[1]}`,
      });
      if (segments[2] === "onboarding") {
        breadcrumbs.push({ label: "إنشاء وتجهيز المعرض" });
      } else if (segments.length >= 3) {
        breadcrumbs.push({ label: "تفاصيل الطلب" });
      }
    }
    return breadcrumbs;
  }

  if (segments[0] === "cms") {
    breadcrumbs.push({ label: PAGE_TITLES["/cms"], to: "/cms" });
    if (segments[1]) {
      breadcrumbs.push({
        label: PAGE_TITLES[normalizedPath] ?? "تفاصيل المحتوى",
      });
    }
    return breadcrumbs;
  }

  return [
    ...breadcrumbs,
    { label: PAGE_TITLES[normalizedPath] ?? "لوحة الإدارة" },
  ];
}
