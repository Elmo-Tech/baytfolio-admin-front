import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";

import OtpVerificationForm from "./otp-verification-form";

function renderForm() {
  return render(
    <MemoryRouter>
      <OtpVerificationForm />
    </MemoryRouter>,
  );
}

describe("OtpVerificationForm", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("moves focus between fields and supports pasting a complete OTP", () => {
    renderForm();

    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "8" } });
    expect(inputs[1]).toHaveFocus();

    fireEvent.keyDown(inputs[1], { key: "Backspace" });
    expect(inputs[0]).toHaveFocus();
    expect(inputs[0]).toHaveValue("");

    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => "849123" },
    });
    expect(inputs.map((input) => input.getAttribute("value"))).toEqual([
      "8",
      "4",
      "9",
      "1",
      "2",
      "3",
    ]);
  });

  it("shows validation feedback for an incomplete OTP", async () => {
    renderForm();

    fireEvent.click(screen.getByRole("button", { name: "تأكيد" }));

    expect(
      await screen.findByText("أدخل رمز التحقق المكون من 6 أرقام"),
    ).toBeInTheDocument();
  });

  it("enables the resend action after the countdown reaches zero", () => {
    vi.useFakeTimers();
    renderForm();

    const resendButton = screen.getByRole("button", { name: "طلب رمز جديد" });
    expect(resendButton).toBeDisabled();
    expect(screen.getByText("00:47")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1_000);
    });

    expect(screen.getByText("00:46")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(46_000);
    });

    expect(resendButton).toBeEnabled();
    fireEvent.click(resendButton);
    expect(
      screen.getByText(
        "خدمة إعادة إرسال الرمز غير متاحة حاليًا. لم يتم إرسال رمز جديد.",
      ),
    ).toBeInTheDocument();
  });
});
