import { ArrowRight, Clock3, FileText } from "lucide-react";
import { useNavigate } from "react-router";

import type { ShowroomDetails } from "../../types/showroom-details";
import ShowroomStatusBadge from "../showroom-status-badge";

export type ShowroomDetailsTab = "overview" | "content" | "contract";

interface ShowroomDetailsHeaderProps {
  showroom: ShowroomDetails;
  activeTab: ShowroomDetailsTab;
  onTabChange: (tab: ShowroomDetailsTab) => void;
}

const tabs: { id: ShowroomDetailsTab; label: string }[] = [
  { id: "overview", label: "نظرة عامة" },
  { id: "content", label: "المحتوى" },
  { id: "contract", label: "العقد التجاري" },
];

const activityLabels: Record<ShowroomDetails["activity"], string> = {
  showroom: "معرض",
  factory: "مصنع",
  showroom_factory: "معرض ومصنع",
  studio_manufacturing: "استوديو وتصنيع",
};

export default function ShowroomDetailsHeader({
  showroom,
  activeTab,
  onTabChange,
}: ShowroomDetailsHeaderProps) {
  const navigate = useNavigate();

  const initials = showroom.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("");

  return (
    <section
      dir="rtl"
      className="rounded-2xl border border-users-panel-border bg-users-surface px-5 py-6 shadow-sm sm:px-7 sm:py-7 xl:px-9"
    >
      <div className="flex flex-col items-start gap-6 min-[1501px]:grid min-[1501px]:grid-cols-[auto_minmax(0,1fr)_auto] min-[1501px]:items-start min-[1501px]:gap-6">
        <button
          type="button"
          onClick={() => navigate("/showrooms")}
          className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-users-panel-border px-4 py-3 text-sm font-medium text-users-text-primary transition-colors hover:bg-users-stat-neutral-bg min-[1501px]:col-start-1 min-[1501px]:row-start-1"
        >
          <ArrowRight size={18} />
          العودة للمعارض
        </button>

        <div className="flex w-full min-w-0 items-start justify-end gap-4 sm:gap-5 min-[1501px]:col-start-2 min-[1501px]:row-start-1">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-users-text-primary text-xl font-bold text-white sm:size-20 sm:text-2xl">
            {initials}
          </div>

          <div className="min-w-0 flex-1 space-y-4 text-right">
            <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4">
              <h1 className="text-xl font-bold text-users-text-primary sm:text-2xl lg:text-3xl">
                {showroom.name}
              </h1>

              <ShowroomStatusBadge status={showroom.status} />

              <span className="rounded-lg border border-border-warm bg-users-stat-neutral-bg px-3 py-1.5 text-xs font-medium text-users-text-secondary sm:text-sm">
                {activityLabels[showroom.activity]}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-3 text-sm text-users-text-muted">
              <span>
                المالك:{" "}
                <strong className="text-users-text-primary">
                  {showroom.managerName}
                </strong>
              </span>

              <span>
                مرجع العقد:{" "}
                <strong
                  dir="ltr"
                  className="inline-block rounded-md border border-border-warm bg-users-stat-neutral-bg px-2.5 py-1 text-users-text-primary"
                >
                  {showroom.contract.number}
                </strong>
              </span>
            </div>

            <p className="text-sm text-users-text-muted">
              طلب الانضمام المعتمد:{" "}
              <span
                dir="ltr"
                className="inline-block font-semibold text-users-text-primary underline"
              >
                #APP-{showroom.reference}
              </span>
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap justify-start gap-2.5 min-[1501px]:col-start-3 min-[1501px]:row-start-1 min-[1501px]:justify-self-start">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-users-panel-border px-4 py-3 text-sm font-medium text-users-text-primary transition-colors hover:bg-users-stat-neutral-bg"
          >
            <Clock3 size={18} />
            عرض سجل النشاط
          </button>

          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-users-panel-border px-4 py-3 text-sm font-medium text-users-text-primary transition-colors hover:bg-users-stat-neutral-bg"
          >
            <FileText size={18} />
            فتح طلب الانضمام
          </button>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-users-table-divider px-1 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-2 min-[636px]:max-[736px]:!flex-col min-[636px]:max-[736px]:!items-start">
        <nav
          aria-label="أقسام تفاصيل المعرض"
          className="flex max-w-full items-center justify-start gap-3 overflow-x-auto whitespace-nowrap sm:gap-5"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => onTabChange(tab.id)}
                className={`shrink-0 cursor-pointer rounded-xl border px-5 py-3 text-sm transition-colors ${
                  isActive
                    ? "border-border-warm bg-users-stat-neutral-bg font-bold text-users-text-primary"
                    : "border-transparent bg-transparent font-medium text-users-text-secondary hover:bg-users-stat-neutral-bg"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <p className="shrink-0 text-sm text-users-text-muted">
          معرف المعرض الداخلي:{" "}
          <strong dir="ltr" className="text-users-text-primary">
            {showroom.reference}
          </strong>
        </p>
      </div>
    </section>
  );
}
