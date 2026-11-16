import { MessageSquare, Phone, TrendingUp } from "lucide-react";

export default function ContactSettingsStats() {
  return (
    <section
      dir="rtl"
      className="rounded-xl border border-users-panel-border bg-users-surface p-5"
    >
      <div className="mb-5 flex items-center gap-2">
        <TrendingUp size={18} className="text-users-text-secondary" />

        <h2 className="text-sm font-bold text-users-text-primary">
          معدل تفاعل الزوار مع الوسائل الحالية
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-users-table-header p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-users-text-muted">
              نقرات WhatsApp اليومية
            </p>

            <MessageSquare size={18} className="text-users-text-muted" />
          </div>

          <p className="mt-2 text-3xl font-bold tabular-nums text-users-text-primary">
            142
          </p>

          <p className="mt-2 text-xs text-status-active-fg">بيانات توضيحية</p>
        </div>

        <div className="rounded-lg bg-users-table-header p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-users-text-muted">الاتصالات الهاتفية</p>

            <Phone size={18} className="text-users-text-muted" />
          </div>

          <p className="mt-2 text-3xl font-bold tabular-nums text-users-text-primary">
            48
          </p>

          <p className="mt-2 text-xs text-users-text-secondary">
            بيانات توضيحية
          </p>
        </div>
      </div>
    </section>
  );
}
