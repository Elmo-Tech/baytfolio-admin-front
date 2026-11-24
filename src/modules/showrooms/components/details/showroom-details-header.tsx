import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Clock3, FileText } from "lucide-react";
import { useNavigate } from "react-router";

import type { ShowroomDetails } from "../../types/showroom-details";
import ShowroomDetailsHeaderMeta from "./showroom-details-header-meta";
import ShowroomDetailsTabs, {
  type ShowroomDetailsTab,
} from "./showroom-details-tabs";

export type { ShowroomDetailsTab };

interface ShowroomDetailsHeaderProps {
  showroom: ShowroomDetails;
  activeTab: ShowroomDetailsTab;
  onTabChange: (tab: ShowroomDetailsTab) => void;
}

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
        <Button
          unstyled
          type="button"
          onClick={() => navigate("/admin/showrooms")}
          className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-users-panel-border px-4 py-3 text-sm font-medium text-users-text-primary transition-colors hover:bg-users-stat-neutral-bg min-[1501px]:col-start-1 min-[1501px]:row-start-1"
        >
          <ArrowRight size={18} />
          العودة للمعارض
        </Button>

        <ShowroomDetailsHeaderMeta
          showroom={showroom}
          initials={initials}
          activityLabel={activityLabels[showroom.activity]}
        />

        <div className="flex shrink-0 flex-wrap justify-start gap-2.5 min-[1501px]:col-start-3 min-[1501px]:row-start-1 min-[1501px]:justify-self-start">
          <Button unstyled type="button" presentation="showroom-header-action">
            <Clock3 size={18} />
            عرض سجل النشاط
          </Button>
          <Button unstyled type="button" presentation="showroom-header-action">
            <FileText size={18} />
            فتح طلب الانضمام
          </Button>
        </div>
      </div>

      <ShowroomDetailsTabs
        activeTab={activeTab}
        reference={showroom.reference}
        onTabChange={onTabChange}
      />
    </section>
  );
}
