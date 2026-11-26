import { useState, type ReactNode } from "react";

import {
  Field,
  FieldError,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/components/ui";

import { Eye, EyeOff, Info, Lock } from "lucide-react";

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

interface PasswordFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  autoComplete?: string;
  placeholder?: string;
  description?: ReactNode;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
  onValueChange?: () => void;
}

export function PasswordField<TFieldValues extends FieldValues>({
  control,
  name,
  label = "كلمة المرور",
  autoComplete = "current-password",
  placeholder = "أدخل كلمة المرور",
  description,
  showPasswordLabel = "إظهار كلمة المرور",
  hidePasswordLabel = "إخفاء كلمة المرور",
  onValueChange,
}: PasswordFieldProps<TFieldValues>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel className="text-auth-text-label" htmlFor={field.name}>
            {label}
          </FieldLabel>

          <InputGroup
            className={
              "rounded-md pr-3 pl-1 has-[[data-slot=input-group-control]:focus-visible]:border-auth-focus! has-[[data-slot=input-group-control]:focus-visible]:ring-auth-focus/20! h-11 border-auth-border-login bg-auth-input-bg-login"
            }
          >
            <InputGroupAddon>
              <Lock size={18} className="text-text-secondary/60" />
            </InputGroupAddon>

            <InputGroupInput
              {...field}
              id={field.name}
              type={isPasswordVisible ? "text" : "password"}
              autoComplete={autoComplete}
              placeholder={placeholder}
              onChange={(event) => {
                field.onChange(event);
                onValueChange?.();
              }}
              className={
                "h-full text-auth-text-label placeholder:text-auth-text-muted"
              }
              aria-invalid={fieldState.invalid}
            />

            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-sm"
                className="rounded-md px-0 text-auth-password-icon hover:bg-background hover:text-auth-text-label focus-visible:ring-auth-focus/40"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                aria-label={
                  isPasswordVisible ? hidePasswordLabel : showPasswordLabel
                }
                aria-pressed={isPasswordVisible}
              >
                {isPasswordVisible ? (
                  <EyeOff aria-hidden="true" className="size-4" />
                ) : (
                  <Eye aria-hidden="true" className="size-4" />
                )}
              </InputGroupButton>
            </InputGroupAddon>
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
