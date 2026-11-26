import { Input, Label } from "@/shared/components/ui";

import { Controller, type Control } from "react-hook-form";
import type { LoginFormValues } from "../../schemas/login.schema";

interface LoginRememberDeviceFieldProps {
  control: Control<LoginFormValues>;
}

export const LoginRememberDeviceField = ({
  control,
}: LoginRememberDeviceFieldProps) => {
  return (
    <Controller
      control={control}
      name="rememberDevice"
      render={({ field }) => (
        <Label
          unstyled
          className="flex cursor-pointer items-center gap-2 text-auth-text-secondary"
        >
          <Input
            unstyled
            ref={field.ref}
            name={field.name}
            onBlur={field.onBlur}
            checked={field.value}
            onChange={(event) => field.onChange(event.target.checked)}
            type="checkbox"
            className="size-4 rounded border-auth-checkbox-border accent-auth-checkbox-accent"
          />
          <span>تذكرني على هذا الجهاز</span>
        </Label>
      )}
    />
  );
};
