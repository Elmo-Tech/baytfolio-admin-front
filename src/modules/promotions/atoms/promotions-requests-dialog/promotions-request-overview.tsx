import { ExternalLink, Eye } from "lucide-react";

import { Badge } from "@/shared/components/ui";
import { BtnV2 } from "@/shared/components/common";

import type { PromotionRequest } from "../../types/promotions.types";

interface PromotionsRequestOverviewProps {
  request: PromotionRequest;
}

export const PromotionsRequestOverview = ({
  request,
}: PromotionsRequestOverviewProps) => {
  return (
    <div className="rounded-xl border border-border bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <Eye className="size-3.5 min-w-3.5 text-primary" />

          <p className="text-xs font-semibold text-primary">
            نظرة عامة على المحتوى المستهدف
          </p>
        </div>

        <Badge
          variant="outline"
          className="border-transparent bg-badge-info-bg px-2.5 py-1 text-[11px] font-medium text-badge-info-fg"
        >
          ترويج غرفة (Promoted Room)
        </Badge>
      </div>

      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <img
            src={request.content.image}
            alt={request.targetTitle}
            className="h-16 w-24 shrink-0 rounded-lg border border-border object-cover"
          />

          <div>
            <p className="text-sm font-bold text-primary">
              {request.targetTitle}
            </p>

            <p className="mt-1 text-xs text-text-secondary">
              المعرض: {request.showroom}{" "}
              <span dir="ltr">({request.showroomCode})</span>
            </p>

            <p className="mt-1 text-[11px] text-text-secondary">
              المسح: {request.categoryPath}
            </p>
          </div>
        </div>

        <BtnV2 variant="white" size="sm" className="shrink-0 px-3">
          <ExternalLink className="size-3" />
          معاينة الموقع
        </BtnV2>
      </div>
    </div>
  );
};
