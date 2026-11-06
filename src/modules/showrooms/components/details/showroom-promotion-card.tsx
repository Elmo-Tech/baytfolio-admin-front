import type { ShowroomDetails } from "../../types/showroom-details";

interface ShowroomPromotionCardProps {
  showroom: ShowroomDetails;
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB").format(new Date(date));

const statusLabels = {
  active: "نشط",
  scheduled: "مجدول",
  inactive: "غير نشط",
} as const;

export default function ShowroomPromotionCard({
  showroom,
}: ShowroomPromotionCardProps) {
  const { promotion } = showroom;

  return (
    <section
      dir="rtl"
      className="rounded-xl border border-users-panel-border bg-users-surface p-5"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-bold text-users-text-primary">
          خدمة التوثيق الرسمي
        </h2>
        <span className="rounded-md bg-surface-admin px-2 py-1 text-xs font-medium text-users-text-secondary">
          {statusLabels[promotion.status]}
          {promotion.durationMonths > 0
            ? ` — ${promotion.durationMonths} أشهر`
            : ""}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="text-users-text-muted">فترة الخدمة</span>
        <span className="font-medium text-users-text-primary">
          {formatDate(promotion.startDate)} → {formatDate(promotion.endDate)}
        </span>
      </div>

      <div className="mt-4 rounded-lg border border-border-warm bg-surface-admin p-4">
        <p className="mb-2 text-xs font-semibold text-users-text-primary">
          ملاحظة
        </p>
        <p className="text-xs leading-6 text-users-text-secondary">
          {promotion.notes}
        </p>
      </div>
    </section>
  );
}
