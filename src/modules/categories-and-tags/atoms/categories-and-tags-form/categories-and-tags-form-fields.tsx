import { Field, FieldError, FieldLabel, Input } from "@/shared/components/ui";

import { ImagePlus } from "lucide-react";

import { Controller, type Control } from "react-hook-form";

import type { CategoriesAndTagsFormValues } from "../../schemas/categories-and-tags.schema";

import { CategoriesAndTagsMetadataFields } from "./categories-and-tags-metadata-fields";

interface CategoriesAndTagsFormFieldsProps {
  control: Control<CategoriesAndTagsFormValues>;
  formId: string;
  nameLabel: string;
  namePlaceholder: string;
  nameEnPlaceholder: string;
}

export const CategoriesAndTagsFormFields = ({
  control,
  formId,
  nameLabel,
  namePlaceholder,
  nameEnPlaceholder,
}: CategoriesAndTagsFormFieldsProps) => {
  return (
    <div className="grid gap-4">
      {/* Image */}
      <Controller
        control={control}
        name="image"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${formId}-image`}>صورة المحتوى</FieldLabel>

            <div className="flex items-center gap-3">
              <img
                src={field.value}
                alt="معاينة صورة المحتوى"
                className="h-14 w-20 rounded-lg border border-border object-cover"
              />

              <FieldLabel
                htmlFor={`${formId}-image`}
                className="flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-border bg-white px-4 text-xs font-medium text-text-secondary"
              >
                <ImagePlus className="size-4" />
                اختيار صورة
              </FieldLabel>

              <Input
                id={`${formId}-image`}
                type="file"
                accept="image/*"
                className="sr-only"
                aria-invalid={fieldState.invalid}
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (!file) return;

                  const reader = new FileReader();
                  reader.onload = () =>
                    field.onChange(String(reader.result ?? ""));
                  reader.readAsDataURL(file);
                }}
              />
            </div>

            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />

      {/* Names */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          control={control}
          name="nameAr"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${formId}-name-ar`}>
                {nameLabel} (باللغة العربية)
                <span className="text-destructive"> *</span>
              </FieldLabel>

              <Input
                {...field}
                id={`${formId}-name-ar`}
                dir="rtl"
                placeholder={namePlaceholder}
                aria-invalid={fieldState.invalid}
                className="bg-white"
              />

              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          control={control}
          name="nameEn"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${formId}-name-en`}>
                {nameLabel} بالإنجليزية
              </FieldLabel>

              <Input
                {...field}
                id={`${formId}-name-en`}
                placeholder={nameEnPlaceholder}
                aria-invalid={fieldState.invalid}
                className="bg-white"
              />

              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </div>

      <CategoriesAndTagsMetadataFields control={control} formId={formId} />
    </div>
  );
};
