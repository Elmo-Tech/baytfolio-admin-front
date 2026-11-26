import type { ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Info, Mail } from "lucide-react";

import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";

type EmailFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  description?: ReactNode;
  onValueChange?: () => void;
};

export function EmailField<TFieldValues extends FieldValues>({
  control,
  name,
  description,
  onValueChange,
}: EmailFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel className="text-auth-text-label" htmlFor={field.name}>
            البريد الإلكتروني
          </FieldLabel>

          <InputGroup
            className={
              "rounded-md has-[[data-slot=input-group-control]:focus-visible]:border-auth-focus! has-[[data-slot=input-group-control]:focus-visible]:ring-auth-focus/20! h-11 border-auth-border-login bg-auth-input-bg-login"
            }
          >
            <InputGroupAddon align="inline-start" className="pr-3">
              <Mail aria-hidden="true" className="text-auth-text-muted" />
            </InputGroupAddon>

            <InputGroupInput
              {...field}
              id={field.name}
              type="email"
              autoComplete="email"
              placeholder="admin@baytfolio.com"
              onChange={(event) => {
                field.onChange(event);
                onValueChange?.();
              }}
              className={
                "h-full text-auth-text-label placeholder:text-auth-text-placeholder"
              }
              aria-invalid={fieldState.invalid}
            />
          </InputGroup>

          {description && (
            <p className="flex items-center gap-1.5 text-sm leading-5 text-text-secondary">
              <Info
                aria-hidden="true"
                className="size-4 shrink-0 text-auth-text-muted"
              />
              <span>{description}</span>
            </p>
          )}

          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
