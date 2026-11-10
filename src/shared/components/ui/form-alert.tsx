import * as React from "react";

import { cn } from "@/shared/utils/cn";

type FormAlertProps = React.ComponentProps<"p"> & {
  variant?: "error" | "success" | "info";
};

function FormAlert({
  className,
  variant = "info",
  role,
  ...props
}: FormAlertProps) {
  return (
    <p
      role={role ?? (variant === "error" ? "alert" : "status")}
      dir="rtl"
      className={cn(
        "rounded-md border px-3 py-2 text-sm leading-5",
        {
          error: "border-auth-error-border bg-auth-error-bg text-auth-error-fg",
          success: "border-success/30 bg-success/10 text-success",
          info: "border-info/30 bg-info/10 text-info",
        }[variant],
        className,
      )}
      {...props}
    />
  );
}

export { FormAlert };
