import { Button } from "@/shared/components/ui/button";
import { Menu, X } from "lucide-react";
import { Outlet } from "react-router";

import AdminHeader from "@/app/components/admin-header";
import AdminMobileSidebar from "@/app/components/admin-mobile-sidebar";
import AdminSidebar from "@/app/components/admin-sidebar";
import { useAdminLayout } from "@/app/hooks/use-admin-layout";

export default function AdminLayout() {
  const { isSidebarOpen, onCloseSidebar, onToggleSidebar } = useAdminLayout();

  return (
    <div dir="rtl" className="flex min-h-screen bg-surface-admin">
      <div className="hidden min-[1226px]:block">
        <AdminSidebar />
      </div>

      <AdminMobileSidebar isOpen={isSidebarOpen} onClose={onCloseSidebar} />

      <div className="flex min-w-0 flex-1 flex-col">
        <div
          dir="ltr"
          className="flex min-w-0 items-center border-b border-border-subtle bg-card px-3 min-[1226px]:hidden"
        >
          <div className="min-w-0 flex-1">
            <AdminHeader />
          </div>

          <Button
            unstyled
            type="button"
            aria-label={isSidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={isSidebarOpen}
            onClick={onToggleSidebar}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md text-text-secondary-strong transition hover:bg-background"
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>

        <div className="hidden min-[1226px]:block">
          <AdminHeader />
        </div>

        <main className="min-w-0 flex-1 overflow-y-auto p-3 sm:p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
