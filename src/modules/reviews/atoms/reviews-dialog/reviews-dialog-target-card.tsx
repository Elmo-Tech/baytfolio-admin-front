import { Badge } from "@/shared/components/ui";

import { ExternalLink, FileText } from "lucide-react";

import roomImage from "../../assets/room.jpg";
import type { ReviewDialogMeta } from "../../utils/reviews-dialog.utils";

interface ReviewsDialogTargetCardProps {
  meta: ReviewDialogMeta;
}

export const ReviewsDialogTargetCard = ({
  meta,
}: ReviewsDialogTargetCardProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="flex items-center justify-between gap-2 border-b border-border/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText className="size-3.5 min-w-3.5 text-text-secondary" />

          <p className="text-xs font-semibold text-text-secondary">
            الهدف المُقدَّم (TARGET ENTITY)
          </p>
        </div>

        <Badge
          variant="outline"
          className="border-transparent bg-badge-info-bg px-2.5 py-1 text-[11px] font-medium text-badge-info-fg"
        >
          غرفة (Room)
        </Badge>
      </div>

      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img
            src={roomImage}
            alt={meta.targetTitle}
            className="h-14 w-20 shrink-0 rounded-lg border border-border object-cover"
          />

          <div>
            <p className="text-sm font-bold text-primary">{meta.targetTitle}</p>

            <p className="mt-1 text-xs text-text-secondary">
              الرمز المرجعي:{" "}
              <span dir="ltr" className="font-medium text-text-secondary">
                {meta.sku}
              </span>
            </p>
          </div>
        </div>

        <div className="sm:text-end">
          <p className="mb-1.5 text-[11px] text-text-secondary">
            المعرض التابع له
          </p>

          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-accent">
              {meta.showroomInitials}
            </span>

            <span className="text-xs font-semibold text-primary">
              {meta.showroom}
            </span>

            <ExternalLink className="size-3.5 text-text-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};
