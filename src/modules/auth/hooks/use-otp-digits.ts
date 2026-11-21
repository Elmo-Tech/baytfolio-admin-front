import { useRef, useState } from "react";

export const OTP_LENGTH = 6;

type UseOtpDigitsOptions = {
  onCodeChange: (code: string) => void;
};

export function useOtpDigits({ onCodeChange }: UseOtpDigitsOptions) {
  const [digits, setDigits] = useState<string[]>(() =>
    Array<string>(OTP_LENGTH).fill(""),
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  function updateDigits(nextDigits: string[]) {
    setDigits(nextDigits);
    onCodeChange(nextDigits.join(""));
  }

  function focusInput(index: number) {
    inputRefs.current[index]?.focus();
  }

  function handleDigitChange(index: number, value: string) {
    const enteredDigits = value.replace(/\D/g, "");
    const nextDigits = [...digits];

    if (!enteredDigits) {
      nextDigits[index] = "";
      updateDigits(nextDigits);
      return;
    }

    enteredDigits
      .slice(0, OTP_LENGTH - index)
      .split("")
      .forEach((digit, offset) => {
        nextDigits[index + offset] = digit;
      });
    updateDigits(nextDigits);
    focusInput(Math.min(index + enteredDigits.length, OTP_LENGTH - 1));
  }

  function handleKeyDown(
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      event.preventDefault();
      const nextDigits = [...digits];
      nextDigits[index - 1] = "";
      updateDigits(nextDigits);
      focusInput(index - 1);
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
    } else if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  }

  function handlePaste(
    index: number,
    event: React.ClipboardEvent<HTMLInputElement>,
  ) {
    const pastedDigits = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pastedDigits) return;
    event.preventDefault();
    handleDigitChange(index, pastedDigits);
  }

  return {
    digits,
    inputRefs,
    handleDigitChange,
    handleKeyDown,
    handlePaste,
  };
}
