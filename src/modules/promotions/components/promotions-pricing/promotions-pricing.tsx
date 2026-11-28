import { PromotionsPricingCard } from "./promotions-pricing-card";
import { PromotionsProtectionCard } from "./promotions-protection-card";
import { PromotionsRulesCard } from "./promotions-rules-card";

export const PromotionsPricing = () => {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <PromotionsPricingCard />

      <div className="space-y-4">
        <PromotionsProtectionCard />

        <PromotionsRulesCard />
      </div>
    </div>
  );
};
