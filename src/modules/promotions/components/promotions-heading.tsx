import { BtnV2 } from "@/shared/components/common";

import { Download } from "lucide-react";

import { useQueryStates } from "nuqs";
import { promotionsParams } from "../utils/promotions-params";

export const PromotionsHeading = () => {
  const [{ tab }] = useQueryStates(promotionsParams);

  if (tab !== "pricing")
    return (
      <BtnV2 type="button" variant="white">
        <Download />
        تصدير السجل
      </BtnV2>
    );
};
