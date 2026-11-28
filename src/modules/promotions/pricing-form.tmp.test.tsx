import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PromotionsPricingCard } from "./components/promotions-pricing/promotions-pricing-card";

describe("promotions pricing form", () => {
  it("submits defaults without validation errors", async () => {
    render(<PromotionsPricingCard />);

    const input = screen.getByLabelText(
      "سعر ترويج الغرفة / اليوم",
    ) as HTMLInputElement;

    expect(input.value).toBe("200");

    fireEvent.click(screen.getByRole("button", { name: /حفظ الأسعار/ }));

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("shows an error when the price is empty", async () => {
    render(<PromotionsPricingCard />);

    const input = screen.getByLabelText("سعر ترويج الغرفة / اليوم");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: /حفظ الأسعار/ }));

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(screen.getAllByRole("alert")[0]?.textContent).toContain(
      "يرجى إدخال السعر",
    );
  });
});
