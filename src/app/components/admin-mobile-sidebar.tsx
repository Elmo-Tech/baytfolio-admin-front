import { SheetSurface } from "@/shared/components/ui/sheet-surface";
import { Button } from "@/shared/components/ui/button";
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
    <SheetSurface open={isOpen} onClose={onClose}>
      <div className="flex justify-start border-b border-border-divider p-3">
        <Button
          unstyled
          type="button"
          aria-label="إغلاق القائمة"
          onClick={onClose}
          className="rounded-md p-2 text-text-secondary-strong transition hover:bg-background"
        >
          <X size={21} />
        </Button>
      </div>

      <AdminSidebar />
    </SheetSurface>
  );
}
