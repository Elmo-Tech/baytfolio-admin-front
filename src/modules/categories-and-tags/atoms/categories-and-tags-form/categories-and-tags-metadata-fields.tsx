import {
  Field,
  FieldError,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";

import { Controller, type Control } from "react-hook-form";

import type { CategoriesAndTagsFormValues } from "../../schemas/categories-and-tags.schema";

interface CategoriesAndTagsMetadataFieldsProps {
  control: Control<CategoriesAndTagsFormValues>;
  formId: string;
}

export const CategoriesAndTagsMetadataFields = ({
  control,
  formId,
}: CategoriesAndTagsMetadataFieldsProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Controller
        control={control}
        name="order"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${formId}-order`}>الترتيب</FieldLabel>

            <Input
              {...field}
              id={`${formId}-order`}
              type="number"
              min={1}
              aria-invalid={fieldState.invalid}
              className="bg-white"
            />

            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="status"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${formId}-status`}>الحالة</FieldLabel>

            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id={`${formId}-status`}
                aria-invalid={fieldState.invalid}
                className="bg-white w-full"
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="نشط">نشط</SelectItem>
                <SelectItem value="معطل">معطل</SelectItem>
              </SelectContent>
            </Select>

            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
    </div>
  );
};
