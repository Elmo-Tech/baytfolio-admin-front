import { Outlet } from "react-router";

import AdminHeader from "@/app/components/admin-header";
import AdminSidebar from "@/app/components/admin-sidebar";

export default function AdminLayout() {
  return (
    <div dir="rtl" className="flex min-h-screen bg-[#f8f6f2]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
