import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
interface DashboardCustomRangePickerProps {
  startDate: string;
  endDate: string;
  isInvalidRange: boolean;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onApply: () => void;
}

export default function DashboardCustomRangePicker({
  startDate,
  endDate,
  isInvalidRange,
  onStartDateChange,
  onEndDateChange,
  onApply,
}: DashboardCustomRangePickerProps) {
  return (
    <div className="rounded-md border border-border-subtle bg-card p-4 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-text-primary">
        تحديد الفترة الزمنية
      </h2>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-2">
          <Label
            unstyled
            htmlFor="dashboard-start-date"
            presentation="date-range"
          >
            من تاريخ
          </Label>
          <Input
            unstyled
            id="dashboard-start-date"
            type="date"
            value={startDate}
            max={endDate || undefined}
            onChange={(event) => onStartDateChange(event.target.value)}
            presentation="date-range"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <Label
            unstyled
            htmlFor="dashboard-end-date"
            presentation="date-range"
          >
            إلى تاريخ
          </Label>
          <Input
            unstyled
            id="dashboard-end-date"
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={(event) => onEndDateChange(event.target.value)}
            presentation="date-range"
          />
        </div>

        <Button
          unstyled
          type="button"
          onClick={onApply}
          disabled={!startDate || !endDate || isInvalidRange}
          className="h-10 cursor-pointer rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          تطبيق
        </Button>
      </div>

      {isInvalidRange && (
        <p className="mt-3 text-xs text-destructive">
          تاريخ البداية يجب أن يكون قبل تاريخ النهاية.
        </p>
      )}
    </div>
  );
}
