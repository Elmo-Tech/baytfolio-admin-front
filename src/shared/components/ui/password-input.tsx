import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/utils/cn";

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "type"> & {
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
  visibilityButtonClassName?: string;
};

function PasswordInput({
  className,
  showPasswordLabel = "إظهار كلمة المرور",
  hidePasswordLabel = "إخفاء كلمة المرور",
  visibilityButtonClassName,
  ...props
}: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={isPasswordVisible ? "text" : "password"}
        className={cn("pr-3 pl-10", className)}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className={cn(
          "absolute top-1/2 left-1.5 -translate-y-1/2 rounded-md text-auth-password-icon hover:bg-background hover:text-auth-text-label focus-visible:ring-auth-focus/40",
          visibilityButtonClassName,
        )}
        onClick={() => setIsPasswordVisible((visible) => !visible)}
        aria-label={isPasswordVisible ? hidePasswordLabel : showPasswordLabel}
        aria-pressed={isPasswordVisible}
      >
        {isPasswordVisible ? (
          <EyeOff aria-hidden="true" className="size-4" />
        ) : (
          <Eye aria-hidden="true" className="size-4" />
        )}
      </Button>
    </div>
  );
}

export { PasswordInput };
