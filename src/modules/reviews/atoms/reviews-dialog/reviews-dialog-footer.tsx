import { BtnV2 } from "@/shared/components/common";
import { DialogClose, DialogFooter } from "@/shared/components/ui";

import { CheckCircle2, EyeOff, XCircle } from "lucide-react";

export const ReviewsDialogFooter = () => {
  return (
    <DialogFooter className="flex-row flex-wrap items-center justify-between gap-3 border-t border-border bg-white px-6 py-4">
      <DialogClose asChild>
        <BtnV2 size={"lg"} variant={"white"} className="max-[490px]:w-full">
          إغلاق
        </BtnV2>
      </DialogClose>

      <div className="flex flex-wrap items-center gap-2">
        <BtnV2 variant={"destructive"} className="max-[490px]:w-full">
          <XCircle className="size-4" />
          رفض التقييم
        </BtnV2>

        <BtnV2 variant={"background"} className="max-[490px]:w-full">
          <EyeOff className="size-4" />
          إخفاء التقييم
        </BtnV2>

        <BtnV2 variant={"default"} className="max-[490px]:w-full">
          <CheckCircle2 className="size-4" />
          نشر التقييم واعتماده
        </BtnV2>
      </div>
    </DialogFooter>
  );
};
