import { Button } from "@/shared/components/ui";
import { LucideMenu } from "lucide-react";

import { useSidebarStore } from "@/shared/store/sidebar-store";

export const MenuIcon = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggle = useSidebarStore((state) => state.toggle);

  return (
    <Button
      type="button"
      size={"icon-lg"}
      onClick={toggle}
      aria-label={isOpen ? "إغلاق القائمة الجانبية" : "فتح القائمة الجانبية"}
      aria-expanded={isOpen}
    >
      <LucideMenu />
    </Button>
  );
};
