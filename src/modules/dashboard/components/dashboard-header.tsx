import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

const periods = [
  { label: "اليوم", value: "today" },
  { label: "آخر 7 أيام", value: "last-7-days" },
  { label: "هذا الشهر", value: "this-month" },
  { label: "مخصص", value: "custom" },
] as const;

type DashboardPeriod = (typeof periods)[number]["value"];

function getCurrentTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DashboardHeader() {
  const [filters, setFilters] = useQueryStates({
    period: parseAsStringEnum<DashboardPeriod>(
      periods.map((period) => period.value),
    ).withDefault("this-month"),
    startDate: parseAsString,
    endDate: parseAsString,
  });

  const [showCustomPicker, setShowCustomPicker] = useState(
    filters.period === "custom",
  );

  const [lastUpdated, setLastUpdated] = useState(getCurrentTime);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const startDate = filters.startDate ?? "";
  const endDate = filters.endDate ?? "";

  const isInvalidRange = Boolean(startDate && endDate && startDate > endDate);

  function handlePeriodChange(period: DashboardPeriod) {
    setShowCustomPicker(period === "custom");

    if (period === "custom") {
      void setFilters({ period });
      return;
    }

    void setFilters({
      period,
      startDate: null,
      endDate: null,
    });
  }

  function handleApplyRange() {
    if (!startDate || !endDate || isInvalidRange) return;

    setShowCustomPicker(false);
  }

  function handleRefresh() {
    if (isRefreshing) return;

    setIsRefreshing(true);

    setTimeout(() => {
      setLastUpdated(getCurrentTime());
      setIsRefreshing(false);
    }, 800);
  }

  return (
    <section dir="rtl" className="space-y-4">
      <div className="flex flex-col gap-4 border-b border-border-subtle pb-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Dashboard title */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary">نظرة عامة</h1>

          <p className="mt-1 text-sm text-text-muted">
            متابعة أداء المنصة، حالة التشغيل، والعناصر التي تحتاج إلى تدخل من
            فريق الإدارة.
          </p>
        </div>

        {/* Dashboard controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Period filters */}
          <div className="flex h-12 items-center rounded-md border border-border-subtle bg-card p-1 shadow-sm">
            {periods.map((period) => {
              const isActive = filters.period === period.value;

              return (
                <button
                  key={period.value}
                  type="button"
                  onClick={() => handlePeriodChange(period.value)}
                  aria-pressed={isActive}
                  className={`h-full cursor-pointer whitespace-nowrap rounded-sm px-3 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-text-muted hover:bg-muted hover:text-text-primary"
                  }`}
                >
                  {period.label}
                </button>
              );
            })}
          </div>

          {/* Refresh button */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            aria-label="تحديث المؤشرات"
            className="flex h-12 shrink-0 cursor-pointer items-center gap-2 rounded-md border border-border-subtle bg-card px-4 shadow-sm transition-colors hover:bg-muted disabled:cursor-wait disabled:opacity-70"
          >
            <span className="text-xs font-medium text-text-primary">
              {isRefreshing ? "جاري التحديث..." : "تحديث المؤشرات"}
            </span>

            <RefreshCw
              size={15}
              strokeWidth={1.8}
              className={`shrink-0 text-text-muted ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />

            <span
              dir="ltr"
              className="whitespace-nowrap text-xs text-text-muted"
            >
              {lastUpdated}
            </span>
          </button>
        </div>
      </div>

      {/* Custom date range */}
      {showCustomPicker && filters.period === "custom" && (
        <div className="rounded-md border border-border-subtle bg-card p-4 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-text-primary">
            تحديد الفترة الزمنية
          </h2>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="dashboard-start-date"
                className="text-xs font-medium text-text-muted"
              >
                من تاريخ
              </label>

              <input
                id="dashboard-start-date"
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(event) =>
                  void setFilters({
                    startDate: event.target.value || null,
                  })
                }
                className="h-10 rounded-md border border-border-subtle bg-background px-3 text-sm text-text-primary outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="dashboard-end-date"
                className="text-xs font-medium text-text-muted"
              >
                إلى تاريخ
              </label>

              <input
                id="dashboard-end-date"
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(event) =>
                  void setFilters({
                    endDate: event.target.value || null,
                  })
                }
                className="h-10 rounded-md border border-border-subtle bg-background px-3 text-sm text-text-primary outline-none focus:border-primary"
              />
            </div>

            <button
              type="button"
              onClick={handleApplyRange}
              disabled={!startDate || !endDate || isInvalidRange}
              className="h-10 cursor-pointer rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            >
              تطبيق
            </button>
          </div>

          {isInvalidRange && (
            <p className="mt-3 text-xs text-destructive">
              تاريخ البداية يجب أن يكون قبل تاريخ النهاية.
            </p>
          )}
        </div>
      )}

      {/* Applied date range */}
      {!showCustomPicker &&
        filters.period === "custom" &&
        startDate &&
        endDate && (
          <p className="text-xs text-text-muted">
            الفترة المحددة: {startDate} — {endDate}
          </p>
        )}
    </section>
  );
}
