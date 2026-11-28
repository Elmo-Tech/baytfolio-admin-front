import { Megaphone, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui";
import { BtnV2 } from "@/shared/components/common";

import { promotionsPricingData } from "../../data/promotions-pricing.data";
import {
  promotionsPricingFieldNames,
  promotionsPricingSchema,
  type PromotionsPricingFormInput,
  type PromotionsPricingFormValues,
} from "../../schemas/promotions-pricing.schema";

import { PromotionsPricingRow } from "./promotions-pricing-row";

export const PromotionsPricingCard = () => {
  const form = useForm<
    PromotionsPricingFormInput,
    unknown,
    PromotionsPricingFormValues
  >({
    resolver: zodResolver(promotionsPricingSchema),
    defaultValues: {
      roomDailyPrice: 200,
      packageDailyPrice: 250,
      bannerDailyPrice: 300,
    },
  });

  const onSubmit = () => {};

  return (
    <Card className="gap-0 rounded-xl py-0 shadow-none">
      <CardHeader className="border-b border-border/60 p-5">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <Megaphone className="size-4" />
          </span>

          <CardTitle className="text-base font-bold text-primary">
            أسعار الترويج
          </CardTitle>
        </div>

        <CardDescription className="text-xs leading-5">
          تحديد التعرفة اليومية المعتمدة لكل نوع من أنواع الخدمات الترويجية في
          Baytfolio.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 p-5">
        <form
          id={"promotions-pricing-form"}
          className="space-y-3"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {promotionsPricingData.map((item) => (
            <PromotionsPricingRow
              key={item.type}
              item={item}
              fieldName={promotionsPricingFieldNames[item.type]}
              control={form.control}
            />
          ))}
        </form>
      </CardContent>

      <CardFooter className="flex-wrap items-center justify-between gap-3 border-t border-border/60 p-5">
        <p className="text-[10px] leading-5 text-text-secondary">
          آخر تحديث للأسعار: 01/10/2026 بواسطة عبد الرحمن الشهري
        </p>

        <BtnV2
          type="submit"
          form={"promotions-pricing-form"}
          size="lg"
          className="gap-1.5"
        >
          <Save className="size-4" />
          حفظ الأسعار
        </BtnV2>
      </CardFooter>
    </Card>
  );
};
