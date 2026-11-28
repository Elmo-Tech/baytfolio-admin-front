import { PromotionsCurrent } from "./promotions-current/promotions-current";
import { PromotionsPricing } from "./promotions-pricing/promotions-pricing";
import { PromotionsRequests } from "./promotions-requests/promotions-requests";

import { useQueryStates } from "nuqs";
import { promotionsParams } from "../utils/promotions-params";

export const PromotionsContent = () => {
  const [{ tab }] = useQueryStates(promotionsParams);

  if (tab === "requests") return <PromotionsRequests />;

  if (tab === "pricing") return <PromotionsPricing />;

  return <PromotionsCurrent />;
};
