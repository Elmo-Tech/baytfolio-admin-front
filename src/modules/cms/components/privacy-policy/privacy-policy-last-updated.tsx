import { CalendarDays } from "lucide-react";

interface Props {
  lastUpdated: string;
}

export default function PrivacyPolicyLastUpdated({ lastUpdated }: Props) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-users-panel-border bg-users-surface p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <CalendarDays size={19} className="shrink-0 text-users-text-muted" />

        <div>
          <h2 className="text-sm font-semibold text-users-text-primary">
            تاريخ آخر تحديث
          </h2>

          <p className="mt-1 text-xs text-users-text-muted">
            يظهر هذا التاريخ في صفحة سياسة الخصوصية العامة للعملاء.
          </p>
        </div>
      </div>

      <span
        dir="ltr"
        className="rounded-md bg-users-table-header px-4 py-3 text-sm text-users-text-detail"
      >
        {lastUpdated}
      </span>
    </section>
  );
}
