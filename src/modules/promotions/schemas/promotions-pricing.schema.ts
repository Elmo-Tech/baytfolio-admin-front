import { z } from "zod";

import type { PromotionType } from "../types/promotions.types";

const priceSchema = z
  .union([
    z
      .number({ error: "يرجى إدخال السعر." })
      .min(1, "السعر يجب أن يكون 1 على الأقل."),
    z.literal(""),
  ])
  .refine((price) => price !== "", "يرجى إدخال السعر.");

export const promotionsPricingSchema = z.object({
  roomDailyPrice: priceSchema,
  packageDailyPrice: priceSchema,
  bannerDailyPrice: priceSchema,
});

export type PromotionsPricingFormValues = z.infer<
  typeof promotionsPricingSchema
>;
export type PromotionsPricingFormInput = z.input<
  typeof promotionsPricingSchema
>;
export type PromotionsPricingFieldName = keyof PromotionsPricingFormInput;

export const promotionsPricingFieldNames = {
  غرفة: "roomDailyPrice",
  باقة: "packageDailyPrice",
  Banner: "bannerDailyPrice",
} satisfies Record<PromotionType, PromotionsPricingFieldName>;
