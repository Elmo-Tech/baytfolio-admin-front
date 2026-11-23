import { Button } from "@/shared/components/ui/button";
import { FileText } from "lucide-react";
import type { ShowroomDetails } from "../../types/showroom-details";

interface ShowroomContractCardProps {
  showroom: ShowroomDetails;
  onNavigate?: () => void;
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB").format(new Date(date));

export default function ShowroomContractCard({
  showroom,
  onNavigate,
}: ShowroomContractCardProps) {
  const { contract } = showroom;

  return (
    <section
      dir="rtl"
      className="rounded-2xl border border-users-panel-border bg-users-surface p-6"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-users-table-divider pb-4">
        <h2 className="text-lg font-bold text-users-text-primary">
          العقد التجاري
        </h2>

        <span
          dir="ltr"
          className="rounded-lg border border-border-warm bg-users-stat-neutral-bg px-3 py-1.5 text-sm font-bold text-users-text-primary"
        >
          {contract.number}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="text-users-text-muted">فترة السريان</span>

          <span dir="ltr" className="font-medium text-users-text-primary">
            {formatDate(contract.startDate)} → {formatDate(contract.endDate)}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-users-table-divider pt-4 text-sm">
          <span className="text-users-text-muted">قيمة العقد الأساسية</span>

          <span className="font-bold text-users-text-primary">
            {contract.basePrice.toLocaleString("en-US")} {contract.currency}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-users-table-divider pt-4 text-sm">
          <span className="text-users-text-muted">حدود الاستخدام</span>

          <span className="font-medium text-users-text-primary">
            {showroom.rooms.total} غرفة | {showroom.packages.total} باقة
          </span>
        </div>

        <Button
          unstyled
          type="button"
          onClick={onNavigate}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-users-panel-border bg-users-stat-neutral-bg px-4 py-3.5 text-sm font-semibold text-users-text-primary transition-colors hover:bg-users-surface-row-hover"
        >
          <FileText size={18} />
          عرض تفاصيل العقد
        </Button>
      </div>
    </section>
  );
}
