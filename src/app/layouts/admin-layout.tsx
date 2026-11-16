import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Outlet } from "react-router";

import AdminHeader from "@/app/components/admin-header";
import AdminSidebar from "@/app/components/admin-sidebar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div dir="rtl" className="flex min-h-screen bg-surface-admin">
      <div className="hidden min-[1226px]:block">
        <AdminSidebar />
      </div>

      <div
        className={`fixed inset-0 z-50 min-[1226px]:hidden ${
          isSidebarOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="إغلاق القائمة"
          onClick={() => setIsSidebarOpen(false)}
          className={`absolute inset-0 bg-overlay/40 transition-opacity ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute right-0 top-0 h-full w-[280px] max-w-[85vw] bg-card transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-start border-b border-border-divider p-3">
            <button
              type="button"
              aria-label="إغلاق القائمة"
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-md p-2 text-text-secondary-strong transition hover:bg-background"
            >
              <X size={21} />
            </button>
          </div>

          <AdminSidebar />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div
          dir="ltr"
          className="flex min-w-0 items-center border-b border-border-subtle bg-card px-3 min-[1226px]:hidden"
        >
          <div className="min-w-0 flex-1">
            <AdminHeader />
          </div>

          <button
            type="button"
            aria-label={isSidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={isSidebarOpen}
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md text-text-secondary-strong transition hover:bg-background"
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
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
