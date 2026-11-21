import { SIDEBAR_NAVIGATION_GROUPS } from "../constants/sidebar-navigation";
import AdminSidebarLink from "./admin-sidebar-link";

export default function AdminSidebar() {
  return (
    <aside
      dir="rtl"
      className="sticky top-0 flex h-screen w-[280px] shrink-0 self-start flex-col overflow-hidden border-l border-border-subtle bg-card"
    >
      <div className="flex h-[88px] shrink-0 items-center justify-between border-b border-border-divider px-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-brand-navy text-2xl font-bold text-brand-gold">
            B
          </div>
          <div>
            <h2 className="text-xl font-bold leading-6 text-text-primary">
              BaytFolio
            </h2>
            <p className="mt-1 text-xs text-text-muted">
              بوابة الإدارة المركزية
            </p>
          </div>
        </div>

        <span className="rounded-sm border border-border-warm bg-background px-2 py-1 text-[10px] font-bold tracking-wider text-brand-gold-strong">
          ADMIN
        </span>
      </div>

      <nav className="min-h-0 flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {SIDEBAR_NAVIGATION_GROUPS.map((group) => (
          <section key={group.title} className="space-y-3">
            <h3 className="px-3 text-xs font-medium leading-5 text-text-muted">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <AdminSidebarLink key={item.to} item={item} />
              ))}
            </div>
          </section>
        ))}
      </nav>
    </aside>
  );
}
