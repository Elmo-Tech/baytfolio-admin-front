import {
  Building2,
  Clock3,
  FileText,
  Flag,
  Grid2X2,
  Megaphone,
  Settings,
  ShieldUser,
  Shapes,
  Store,
  Users,
  Wallet,
} from "lucide-react";
import { NavLink } from "react-router";

const navigationGroups = [
  {
    title: "لوحة التحكم",
    items: [
      {
        label: "نظرة عامة",
        to: "/dashboard",
        icon: Grid2X2,
      },
    ],
  },
  {
    title: "العمليات",
    items: [
      {
        label: "طلبات انضمام المعارض",
        to: "/showroom-applications",
        icon: Store,
        badge: 14,
        badgeVariant: "orange",
      },
      {
        label: "المعارض والمصانع",
        to: "/showrooms",
        icon: Building2,
      },
      {
        label: "المستخدمون",
        to: "/users",
        icon: Users,
      },
    ],
  },
  {
    title: "إدارة المحتوى",
    items: [
      {
        label: "التصنيفات والخصائص",
        to: "/categories",
        icon: Shapes,
      },
      // {
      //   label: "مراجعة الغرف",
      //   to: "/rooms/review",
      //   icon: Building2,
      //   badge: 19,
      //   badgeVariant: "blue",
      // },
      // {
      //   label: "مراجعة الباقات",
      //   to: "/packages/review",
      //   icon: Package,
      //   badge: 9,
      //   badgeVariant: "blue",
      // },
      {
        label: "التقييمات والبلاغات",
        to: "/reviews-reports",
        icon: Flag,
        badge: 7,
        badgeVariant: "red",
      },
    ],
  },
  {
    title: "التجاري والترويج",
    items: [
      {
        label: "الترويجات",
        to: "/promotions",
        icon: Megaphone,
        badge: 6,
        badgeVariant: "orange",
      },
      {
        label: "الحسابات التجارية والحدود",
        to: "/commercial-accounts",
        icon: Wallet,
      },
    ],
  },
  {
    title: "المحتوى والتقارير",
    items: [
      {
        label: "إدارة المحتوى CMS",
        to: "/cms",
        icon: FileText,
      },
    ],
  },
  {
    title: "الإدارة",
    items: [
      {
        label: "المستخدمون والصلاحيات",
        to: "/admin-users",
        icon: ShieldUser,
      },
      {
        label: "الإعدادات العامة",
        to: "/settings",
        icon: Settings,
      },
      {
        label: "سجل العمليات",
        to: "/activity-log",
        icon: Clock3,
      },
    ],
  },
];

const badgeStyles = {
  orange: "bg-badge-warning-bg text-badge-warning-fg",
  blue: "bg-badge-info-bg text-badge-info-fg",
  red: "bg-badge-error-bg text-badge-error-fg",
};

export default function AdminSidebar() {
  return (
    <aside
      dir="rtl"
      className="sticky top-0 flex h-screen w-[280px] shrink-0 self-start flex-col overflow-hidden border-l border-border-subtle bg-card"
    >
      {/* Brand Header */}
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

      {/* Navigation */}
      <nav className="min-h-0 flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {navigationGroups.map((group) => (
          <section key={group.title} className="space-y-3">
            <h3 className="px-3 text-xs font-medium leading-5 text-text-muted">
              {group.title}
            </h3>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to !== "/users"}
                    className={({ isActive }) =>
                      [
                        "flex min-h-[42px] items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-200",
                        isActive
                          ? "bg-brand-navy font-semibold text-primary-foreground"
                          : "text-text-secondary-strong hover:bg-background",
                      ].join(" ")
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="flex min-w-0 items-center gap-3">
                          <Icon
                            size={19}
                            strokeWidth={1.8}
                            className={
                              isActive
                                ? "text-primary-foreground"
                                : "text-text-muted"
                            }
                          />

                          <span className="truncate">{item.label}</span>
                        </span>

                        {"badge" in item && item.badge !== undefined && (
                          <span
                            className={[
                              "flex h-[22px] min-w-[23px] shrink-0 items-center justify-center rounded px-1 text-xs font-semibold",
                              badgeStyles[
                                item.badgeVariant as keyof typeof badgeStyles
                              ],
                            ].join(" ")}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </section>
        ))}
      </nav>
    </aside>
  );
}
