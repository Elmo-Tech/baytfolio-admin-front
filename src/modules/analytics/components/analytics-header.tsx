import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { CalendarDays, RefreshCw } from "lucide-react";

import { ANALYTICS_PERIODS } from "../constants/analytics-overview";
import { useAnalyticsHeader } from "../hooks/use-analytics-header";

export default function AnalyticsHeader() {
  const header = useAnalyticsHeader();

  return (
    <header className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-text-primary">
          التحليلات والتقارير
        </h1>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-status-active-fg" />
          <span className="text-xs text-text-muted">بيانات محدثة آليًا</span>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center gap-2 rounded-lg border border-border-subtle bg-card p-2 xl:w-fit xl:flex-nowrap">
        <div className="flex flex-wrap items-center gap-1">
          {ANALYTICS_PERIODS.map((item) => (
            <Button
              unstyled
              key={item.value}
              type="button"
              onClick={() => header.onPeriodChange(item.value)}
              aria-pressed={header.period === item.value}
              className={[
                "whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-colors",
                header.period === item.value
                  ? "bg-brand-navy text-primary-foreground"
                  : "text-text-secondary hover:bg-background",
              ].join(" ")}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {header.period === "custom" && (
          <div dir="ltr" className="flex min-w-0 items-center gap-2">
            <Input
              unstyled
              aria-label="تاريخ البداية"
              type="date"
              value={header.startDate}
              onChange={(event) => header.onStartDateChange(event.target.value)}
              presentation="analytics-date"
            />
            <span className="text-text-muted">—</span>
            <Input
              unstyled
              aria-label="تاريخ النهاية"
              type="date"
              value={header.endDate}
              min={header.startDate}
              onChange={(event) => header.onEndDateChange(event.target.value)}
              presentation="analytics-date"
            />
          </div>
        )}

        <CalendarDays size={16} className="shrink-0 text-text-muted" />

        <Button
          unstyled
          type="button"
          aria-label="تحديث البيانات"
          onClick={header.onRefresh}
          className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:bg-background"
        >
          <RefreshCw
            size={16}
            className={
              header.refreshed ? "rotate-180 transition-transform" : ""
            }
          />
        </Button>
      </div>
    </header>
  );
}
