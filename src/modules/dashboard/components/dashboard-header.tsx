import { Button } from "@/shared/components/ui/button";
import { RefreshCw } from "lucide-react";

import { DASHBOARD_PERIODS } from "../constants/dashboard-periods";
import { useDashboardHeader } from "../hooks/use-dashboard-header";
import DashboardCustomRangePicker from "./dashboard-custom-range-picker";

export default function DashboardHeader() {
  const header = useDashboardHeader();

  return (
    <section dir="rtl" className="space-y-4">
      <div className="flex flex-col gap-4 border-b border-border-subtle pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">نظرة عامة</h1>
          <p className="mt-1 text-sm text-text-muted">
            متابعة أداء المنصة، حالة التشغيل، والعناصر التي تحتاج إلى تدخل من
            فريق الإدارة.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-12 items-center rounded-md border border-border-subtle bg-card p-1 shadow-sm">
            {DASHBOARD_PERIODS.map((period) => {
              const isActive = header.period === period.value;
              return (
                <Button
                  unstyled
                  key={period.value}
                  type="button"
                  onClick={() => header.onPeriodChange(period.value)}
                  aria-pressed={isActive}
                  className={`h-full cursor-pointer whitespace-nowrap rounded-sm px-3 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-text-muted hover:bg-muted hover:text-text-primary"
                  }`}
                >
                  {period.label}
                </Button>
              );
            })}
          </div>

          <Button
            unstyled
            type="button"
            onClick={header.onRefresh}
            disabled={header.isRefreshing}
            aria-label="تحديث المؤشرات"
            className="flex h-12 shrink-0 cursor-pointer items-center gap-2 rounded-md border border-border-subtle bg-card px-4 shadow-sm transition-colors hover:bg-muted disabled:cursor-wait disabled:opacity-70"
          >
            <span className="text-xs font-medium text-text-primary">
              {header.isRefreshing ? "جاري التحديث..." : "تحديث المؤشرات"}
            </span>
            <RefreshCw
              size={15}
              strokeWidth={1.8}
              className={`shrink-0 text-text-muted ${header.isRefreshing ? "animate-spin" : ""}`}
            />
            <span
              dir="ltr"
              className="whitespace-nowrap text-xs text-text-muted"
            >
              {header.lastUpdated}
            </span>
          </Button>
        </div>
      </div>

      {header.showCustomPicker && header.period === "custom" && (
        <DashboardCustomRangePicker
          startDate={header.startDate}
          endDate={header.endDate}
          isInvalidRange={header.isInvalidRange}
          onStartDateChange={header.onStartDateChange}
          onEndDateChange={header.onEndDateChange}
          onApply={header.onApplyRange}
        />
      )}

      {!header.showCustomPicker &&
        header.period === "custom" &&
        header.startDate &&
        header.endDate && (
          <p className="text-xs text-text-muted">
            الفترة المحددة: {header.startDate} — {header.endDate}
          </p>
        )}
    </section>
  );
}
