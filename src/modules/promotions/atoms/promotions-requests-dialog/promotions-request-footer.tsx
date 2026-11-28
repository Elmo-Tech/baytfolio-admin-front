import { CheckCircle2, ShieldCheck, XCircle } from "lucide-react";

import { BtnV2 } from "@/shared/components/common";
import { DialogClose } from "@/shared/components/ui";

export const PromotionsRequestFooter = () => {
  return (
    <div className="bg-white border-t border-border px-6 py-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-text-secondary">
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="size-3.5" />
          المدقق: عبد الرحمن الشهري (Super Admin)
        </span>

        <span dir="ltr">IP: 192.168.1.108</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <DialogClose asChild>
          <BtnV2 variant={"white"} className="max-[490px]:w-full">
            إغلاق
          </BtnV2>
        </DialogClose>

        <div className="flex flex-wrap items-center gap-2">
          <BtnV2 variant={"destructive"} className="max-[490px]:w-full">
            <XCircle className="size-4" />
            رفض الطلب
          </BtnV2>

          <BtnV2 className="max-[490px]:w-full">
            <CheckCircle2 className="size-4" />
            اعتماد وبدء الترويج فوراً
          </BtnV2>
        </div>
      </div>
    </div>
  );
};
