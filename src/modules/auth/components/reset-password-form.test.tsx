import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";

import ResetPasswordForm from "./reset-password-form";

function renderForm() {
  return render(
    <MemoryRouter>
      <ResetPasswordForm />
    </MemoryRouter>,
  );
}

describe("ResetPasswordForm", () => {
  it("toggles each password field independently", () => {
    renderForm();

    const password = screen.getByLabelText("كلمة المرور الجديدة");
    const confirmation = screen.getByLabelText("تأكيد كلمة المرور");
    expect(password).toHaveAttribute("type", "password");
    expect(confirmation).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByRole("button", { name: "إظهار كلمة المرور" }));
    expect(password).toHaveAttribute("type", "text");
    expect(confirmation).toHaveAttribute("type", "password");
  });

  it("validates password requirements and matching confirmation", async () => {
    renderForm();

    fireEvent.change(screen.getByLabelText("كلمة المرور الجديدة"), {
      target: { value: "short" },
    });
    fireEvent.change(screen.getByLabelText("تأكيد كلمة المرور"), {
      target: { value: "different" },
    });
    fireEvent.click(screen.getByRole("button", { name: "تحديث كلمة المرور" }));

    expect(
      await screen.findByText("يجب أن تتكون كلمة المرور من 8 أحرف على الأقل"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("كلمتا المرور غير متطابقتين"),
    ).toBeInTheDocument();
  });
});
