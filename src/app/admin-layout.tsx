import { Outlet } from "react-router";

import { AdminHeader, AdminSidebar } from "@/shared/components/layouts";

export const AdminLayout = () => {
  return (
    <div className="flex xl:fixed xl:inset-0 xl:overflow-hidden">
      <AdminSidebar />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <AdminHeader />

        <main className="min-h-0 flex-1 overflow-y-auto p-6 scrollbar-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
