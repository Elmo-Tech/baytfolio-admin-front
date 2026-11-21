import { useAdminHeader } from "../hooks/use-admin-header";
import AdminBreadcrumbs from "./admin-breadcrumbs";
import AdminHeaderActions from "./admin-header-actions";

export default function AdminHeader() {
  const { breadcrumbs, ...actionsProps } = useAdminHeader();

  return (
    <header
      dir="rtl"
      className="flex h-[88px] min-w-0 shrink-0 items-center justify-between gap-3 border-b border-border-subtle bg-card px-3 sm:px-6 lg:px-8 max-[721px]:justify-end"
    >
      <AdminBreadcrumbs items={breadcrumbs} />
      <AdminHeaderActions {...actionsProps} />
    </header>
  );
}
