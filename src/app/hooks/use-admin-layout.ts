import { useState } from "react";

export function useAdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return {
    isSidebarOpen,
    onOpenSidebar: () => setIsSidebarOpen(true),
    onCloseSidebar: () => setIsSidebarOpen(false),
    onToggleSidebar: () => setIsSidebarOpen((prev) => !prev),
  };
}
