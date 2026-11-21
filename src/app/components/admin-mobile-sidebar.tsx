import { X } from "lucide-react";

import AdminSidebar from "./admin-sidebar";

interface AdminMobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminMobileSidebar({
  isOpen,
  onClose,
}: AdminMobileSidebarProps) {
  return (
    <div
      className={`fixed inset-0 z-50 min-[1226px]:hidden ${
        isOpen ? "visible" : "invisible pointer-events-none"
      }`}
    >
      <button
        type="button"
        aria-label="إغلاق القائمة"
        onClick={onClose}
        className={`absolute inset-0 bg-overlay/40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute right-0 top-0 h-full w-[280px] max-w-[85vw] bg-card transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-start border-b border-border-divider p-3">
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={onClose}
            className="rounded-md p-2 text-text-secondary-strong transition hover:bg-background"
          >
            <X size={21} />
          </button>
        </div>

        <AdminSidebar />
      </div>
    </div>
  );
}
