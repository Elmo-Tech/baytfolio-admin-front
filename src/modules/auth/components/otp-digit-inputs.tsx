import { Input } from "@/shared/components/ui/input";
import type { ClipboardEvent, KeyboardEvent, RefObject } from "react";

type OtpDigitInputsProps = {
  digits: string[];
  inputRefs: RefObject<Array<HTMLInputElement | null>>;
  onDigitChange: (index: number, value: string) => void;
  onKeyDown: (index: number, event: KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (index: number, event: ClipboardEvent<HTMLInputElement>) => void;
};

export default function OtpDigitInputs({
  digits,
  inputRefs,
  onDigitChange,
  onKeyDown,
  onPaste,
}: OtpDigitInputsProps) {
  return (
    <div dir="ltr" className="flex justify-center gap-1.5 sm:gap-2">
      {digits.map((digit, index) => (
        <Input
          unstyled
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          aria-label={`رقم رمز التحقق ${index + 1}`}
          className="size-10 rounded-md border border-auth-border-input bg-auth-surface text-center text-lg font-semibold text-auth-navy outline-none transition-colors placeholder:text-auth-otp-placeholder focus:border-auth-focus focus:ring-2 focus:ring-auth-focus/20 sm:size-11"
          inputMode="numeric"
          maxLength={1}
          pattern="[0-9]*"
          type="text"
          value={digit}
          onChange={(event) => onDigitChange(index, event.target.value)}
          onKeyDown={(event) => onKeyDown(index, event)}
          onPaste={(event) => onPaste(index, event)}
        />
      ))}
    </div>
  );
}
