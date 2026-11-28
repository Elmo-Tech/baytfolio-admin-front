import { PagesHeading } from "@/shared/components/common";
import { PromotionsHeading } from "../components/promotions-heading";
import { PromotionsContent } from "../components/promotions-content";
import { PromotionsTabs } from "../components/promotions-tabs";

export const PromotionsPage = () => {
  return (
    <div className="promotions-page">
      <PagesHeading
        title="الترويجات"
        description="إدارة الترويجات النشطة وطلبات الترويج وأسعار الخدمات الإعلانية."
        badge="PROMO-OPS"
      >
        <PromotionsHeading />
      </PagesHeading>

      <PromotionsTabs />

      <PromotionsContent />
    </div>
  );
};
