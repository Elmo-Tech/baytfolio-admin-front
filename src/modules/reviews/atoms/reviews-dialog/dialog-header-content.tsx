import { DialogDescription, DialogTitle } from "@/shared/components/ui";

import { Star } from "lucide-react";

interface DialogHeaderContentProps {
  reviewsStatusBadge: React.ReactNode;
}

export const DialogHeaderContent = ({
  reviewsStatusBadge,
}: DialogHeaderContentProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-accent/15">
        <Star className="size-5 fill-accent text-accent" />
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <DialogTitle className="text-lg font-bold text-primary">
            تفاصيل التقييم
          </DialogTitle>

          {reviewsStatusBadge}
        </div>

        <DialogDescription className="mt-1 text-xs text-text-secondary">
          مراجعة نص ومصداقية التقييم قبل ضمه لمتوسط الحساب
        </DialogDescription>
      </div>
    </div>
  );
};
