import { Megaphone } from "lucide-react";

import { BtnV2 } from "@/shared/components/common";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui";
import { PromotionsRequestFinance } from "../../atoms/promotions-requests-dialog/promotions-request-finance";
import { PromotionsRequestFooter } from "../../atoms/promotions-requests-dialog/promotions-request-footer";
import { PromotionsRequestOverview } from "../../atoms/promotions-requests-dialog/promotions-request-overview";
import { PromotionsRequestRule } from "../../atoms/promotions-requests-dialog/promotions-request-rule";
import { PromotionsStatusBadge } from "../../atoms/promotions-table/promotions-status-badge";

import type { PromotionRequest } from "../../types/promotions.types";

interface PromotionsRequestDialogProps {
  request: PromotionRequest;
}

export const PromotionsRequestDialog = ({
  request,
}: PromotionsRequestDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <BtnV2
          size={"lg"}
          aria-label={`فتح طلب ترويج ${request.showroom}`}
          className="py-2 px-3.5"
        >
          فتح الطلب
        </BtnV2>
      </DialogTrigger>

      <DialogContent className="max-h-[90dvh] overflow-y-auto border-border p-0 sm:max-w-180">
        <DialogHeader className="flex-row items-start justify-between gap-4 border-b border-border/60 p-6 pb-5 text-start">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-primary text-accent">
              <Megaphone className="size-5" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <DialogTitle className="text-base font-bold text-primary">
                  تفاصيل طلب الترويج — {request.showroom}
                </DialogTitle>

                <PromotionsStatusBadge status={request.status} />
              </div>

              <DialogDescription className="mt-1 text-xs text-text-secondary">
                معرف الطلب: <span dir="ltr">{request.requestCode}</span> • ورد
                بتاريخ {request.requestedAt}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 px-6 py-4">
          <PromotionsRequestOverview request={request} />

          <PromotionsRequestFinance request={request} />

          <PromotionsRequestRule request={request} />
        </div>

        <PromotionsRequestFooter />
      </DialogContent>
    </Dialog>
  );
};
