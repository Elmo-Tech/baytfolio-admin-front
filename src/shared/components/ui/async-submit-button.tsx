import * as React from "react";

import { Button } from "@/shared/components/ui/button";

type AsyncSubmitButtonProps = Omit<
  Extract<React.ComponentProps<typeof Button>, { unstyled?: false }>,
  "children" | "disabled" | "type"
> & {
  label: string;
  loadingLabel: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
};

function AsyncSubmitButton({
  label,
  loadingLabel,
  loading = false,
  disabled = false,
  icon,
  ...props
}: AsyncSubmitButtonProps) {
  return (
    <Button {...props} type="submit" dir="rtl" disabled={disabled || loading}>
      <span>{loading ? loadingLabel : label}</span>
      {icon}
    </Button>
  );
}

export { AsyncSubmitButton };
