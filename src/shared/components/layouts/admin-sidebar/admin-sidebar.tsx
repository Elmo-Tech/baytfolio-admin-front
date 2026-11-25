import { SidebarLink } from "./sidebar-link";
import { Button } from "../../ui";

import { ChevronRight } from "lucide-react";

import { useSidebarStore } from "@/shared/store/sidebar-store";

import { sidebarLinks } from "../../../constants/sidebar.constants";

export const AdminSidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const close = useSidebarStore((state) => state.close);

  return (
    <aside
      className={`fixed z-90 xl:sticky top-0 ${isOpen ? "translate-x-0" : "translate-x-74 xl:translate-x-0"} shrink-0 flex h-screen w-70 flex-col overflow-hidden border-l border-border-subtle bg-card transition-all transition-300`}
    >
      <div className="h-22 flex items-center justify-between border-b border-border-divider px-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-brand-navy text-2xl font-bold text-brand-gold">
            B
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold leading-6 text-text-primary">
                BaytFolio
              </h2>

              <span className="rounded-sm border border-border-warm bg-background px-2 py-1 text-[10px] font-bold tracking-wider text-brand-gold-strong">
                ADMIN
              </span>
            </div>

            <p className="mt-1 text-xs text-text-muted">
              بوابة الإدارة المركزية
            </p>
          </div>
        </div>

        {/* Close Icon */}
        <Button
          type="button"
          size={"icon"}
          aria-label="إغلاق القائمة الجانبية"
          className="xl:hidden rounded-tl-none rounded-bl-none p-2 absolute top-6 left-0"
          onClick={close}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <nav className="min-h-0 flex-1 space-y-6 overflow-y-auto px-3 py-5 scrollbar-none">
        {sidebarLinks.map((group) => (
          <section key={group.title} className="space-y-3">
            <h3 className="px-3 text-xs font-medium leading-5 text-text-muted">
              {group.title}
            </h3>

            <div className="space-y-1">
              {group.items.map((item) => (
                <SidebarLink key={item.to} item={item} />
              ))}
            </div>
          </section>
        ))}
      </nav>
    </aside>
  );
};
