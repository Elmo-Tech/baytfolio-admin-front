import { useState } from "react";
import { CalendarDays, RefreshCw } from "lucide-react";

type Period = "month" | "3months" | "year" | "custom";

export default function AnalyticsHeader() {
  const [period, setPeriod] = useState<Period>("month");
  const [startDate, setStartDate] = useState("2025-05-01");
  const [endDate, setEndDate] = useState("2025-05-31");
  const [refreshed, setRefreshed] = useState(false);

  const periods: { label: string; value: Period }[] = [
    { label: "هذا الشهر", value: "month" },
    { label: "آخر 3 أشهر", value: "3months" },
    { label: "هذا العام", value: "year" },
    { label: "فترة مخصصة", value: "custom" },
  ];

  return (
    <header className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-text-primary">
          التحليلات والتقارير
        </h1>

        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-status-active-fg" />
          <span className="text-xs text-text-muted">بيانات محدثة آليًا</span>
        </div>
      </div>

      {/* Period Filters */}
      <div className="flex w-full flex-wrap items-center gap-2 rounded-lg border border-border-subtle bg-card p-2 xl:w-fit xl:flex-nowrap">
        {/* Period Options */}
        <div className="flex flex-wrap items-center gap-1">
          {periods.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setPeriod(item.value)}
              aria-pressed={period === item.value}
              className={[
                "whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-colors",
                period === item.value
                  ? "bg-brand-navy text-primary-foreground"
                  : "text-text-secondary hover:bg-background",
              ].join(" ")}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Custom Date Range */}
        {period === "custom" && (
          <div dir="ltr" className="flex min-w-0 items-center gap-2">
            <input
              aria-label="تاريخ البداية"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="h-9 w-[128px] rounded-md border border-border-subtle bg-background px-2 text-xs text-text-primary"
            />

            <span className="text-text-muted">—</span>

            <input
              aria-label="تاريخ النهاية"
              type="date"
              value={endDate}
              min={startDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="h-9 w-[128px] rounded-md border border-border-subtle bg-background px-2 text-xs text-text-primary"
            />
          </div>
        )}

        {/* Calendar */}
        <CalendarDays size={16} className="shrink-0 text-text-muted" />

        {/* Refresh - Far Left */}
        <button
          type="button"
          aria-label="تحديث البيانات"
          onClick={() => setRefreshed((previous) => !previous)}
          className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:bg-background"
        >
          <RefreshCw
            size={16}
            className={refreshed ? "rotate-180 transition-transform" : ""}
          />
        </button>
      </div>
    </header>
  );
}
