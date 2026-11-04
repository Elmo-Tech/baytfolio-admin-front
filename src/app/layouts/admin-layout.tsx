import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { Outlet } from "react-router";

import AdminHeader from "@/app/components/admin-header";
import AdminSidebar from "@/app/components/admin-sidebar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <NuqsAdapter>
      <div dir="rtl" className="flex min-h-screen bg-[#f8f6f2]">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 z-50 lg:hidden ${
            isSidebarOpen ? "visible" : "invisible pointer-events-none"
          }`}
        >
          {/* Overlay */}
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={() => setIsSidebarOpen(false)}
            className={`absolute inset-0 bg-black/40 transition-opacity ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Sidebar Drawer */}
          <div
            className={`absolute right-0 top-0 h-full w-[280px] max-w-[85vw] bg-white transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-start border-b border-[#eee8e0] p-3">
              <button
                type="button"
                aria-label="إغلاق القائمة"
                onClick={() => setIsSidebarOpen(false)}
                className="rounded-md p-2 text-[#46515d] transition hover:bg-[#f7f3ed]"
              >
                <X size={21} />
              </button>
            </div>

            <AdminSidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile Header */}
          <div
            dir="ltr"
            className="flex min-w-0 items-center border-b border-[#e9e1d7] bg-white px-3 lg:hidden"
          >
            <div className="min-w-0 flex-1">
              <AdminHeader />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              aria-label={isSidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isSidebarOpen}
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#46515d] transition hover:bg-[#f7f3ed]"
            >
              {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block">
            <AdminHeader />
          </div>

          {/* Page Content */}
          <main className="min-w-0 flex-1 overflow-y-auto p-3 sm:p-5 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </NuqsAdapter>
  );
}
