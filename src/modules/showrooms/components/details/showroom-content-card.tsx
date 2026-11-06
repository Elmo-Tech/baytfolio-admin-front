import type { ShowroomDetails } from "../../types/showroom-details";

interface ShowroomContentCardProps {
  showroom: ShowroomDetails;
  onNavigate?: () => void;
}

export default function ShowroomContentCard({
  showroom,
  onNavigate,
}: ShowroomContentCardProps) {
  return (
    <section
      dir="rtl"
      className="rounded-2xl border border-users-panel-border bg-users-surface p-6 sm:p-7"
    >
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-users-table-divider pb-4">
        <h2 className="text-lg font-bold text-users-text-primary">المحتوى</h2>

        <button
          type="button"
          onClick={onNavigate}
          className="cursor-pointer text-sm font-semibold text-users-text-primary underline decoration-1 underline-offset-4 transition-colors hover:text-users-text-secondary"
        >
          عرض المحتوى
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="rounded-xl border border-border-warm bg-surface-admin p-4 sm:p-5">
          <p className="text-sm text-users-text-muted">الغرف</p>

          <p className="mt-3 text-2xl font-bold text-users-text-primary">
            {showroom.rooms.used}
            <span className="text-base font-normal text-users-text-muted">
              {" "}
              / {showroom.rooms.total}
            </span>
          </p>

          <p className="mt-2 text-sm text-users-text-secondary">غرفة مستخدمة</p>
        </div>

        <div className="rounded-xl border border-border-warm bg-surface-admin p-4 sm:p-5">
          <p className="text-sm text-users-text-muted">الباقات</p>

          <p className="mt-3 text-2xl font-bold text-users-text-primary">
            {showroom.packages.used}
            <span className="text-base font-normal text-users-text-muted">
              {" "}
              / {showroom.packages.total}
            </span>
          </p>

          <p className="mt-2 text-sm text-users-text-secondary">باقة مستخدمة</p>
        </div>
      </div>
    </section>
  );
}
