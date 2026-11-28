import { Field, FieldError, Input } from "@/shared/components/ui";

import { Controller, type Control } from "react-hook-form";
import type {
  PromotionsPricingFormInput,
  PromotionsPricingFieldName,
  PromotionsPricingFormValues,
} from "../../schemas/promotions-pricing.schema";

import { promotionTypeIcons } from "../../constants/promotions.constants";

import type { PromotionPricing } from "../../types/promotions.types";

interface PromotionsPricingRowProps {
  item: PromotionPricing;
  fieldName: PromotionsPricingFieldName;
  control: Control<
    PromotionsPricingFormInput,
    unknown,
    PromotionsPricingFormValues
  >;
}

export const PromotionsPricingRow = ({
  item,
  fieldName,
  control,
}: PromotionsPricingRowProps) => {
  const Icon = promotionTypeIcons[item.type];

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-background/40 p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-text-secondary">
          <Icon className="size-4" />
        </span>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-primary">{item.title}</p>

            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-text-secondary">
              {item.type} / اليوم
            </span>
          </div>

          <p className="mt-1 text-[11px] leading-5 text-text-secondary">
            {item.description}
          </p>
        </div>
      </div>

      <Controller
        control={control}
        name={fieldName}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className="w-auto shrink-0 gap-1 self-start sm:self-center"
          >
            <div
              data-invalid={fieldState.invalid}
              className="flex items-center gap-1 rounded-md border border-border bg-white px-2.5 py-1.5 data-[invalid=true]:border-destructive"
            >
              <Input
                {...field}
                value={field.value ?? ""}
                onChange={(event) =>
                  field.onChange(
                    event.target.value === "" ? "" : event.target.valueAsNumber,
                  )
                }
                type="number"
                min={1}
                step="any"
                aria-label={item.title}
                aria-invalid={fieldState.invalid}
                className="h-8 w-18 border-0 bg-transparent px-1 text-end text-sm font-bold text-primary shadow-none focus-visible:ring-0"
              />

              <span className="text-[10px] text-text-secondary">ج.م / يوم</span>
            </div>

            <FieldError
              errors={[fieldState.error]}
              className="text-[11px] max-w-40"
            />
          </Field>
        )}
      />
    </div>
  );
};
