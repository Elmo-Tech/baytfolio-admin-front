import type { ShowroomDetails } from "../../types/showroom-details";

export type ShowroomDetailsTab = "overview" | "content" | "contract";

interface ShowroomDetailsTabsProps {
  activeTab: ShowroomDetailsTab;
  reference: ShowroomDetails["reference"];
  onTabChange: (tab: ShowroomDetailsTab) => void;
}

const tabs: { id: ShowroomDetailsTab; label: string }[] = [
  { id: "overview", label: "نظرة عامة" },
  { id: "content", label: "المحتوى" },
  { id: "contract", label: "العقد التجاري" },
];

export default function ShowroomDetailsTabs({
  activeTab,
  reference,
  onTabChange,
}: ShowroomDetailsTabsProps) {
  return (
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
          {reference}
        </strong>
      </p>
    </div>
  );
}
