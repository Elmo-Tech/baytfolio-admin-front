import { fireEvent, render, screen } from "@testing-library/react";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { getDashboardScaleFactor } from "../utils/apply-dashboard-filters";
import DashboardPage from "./dashboard-page";

function renderDashboard(search = "") {
  return render(
    <NuqsTestingAdapter searchParams={search}>
      <MemoryRouter initialEntries={[`/dashboard${search}`]}>
        <DashboardPage />
      </MemoryRouter>
    </NuqsTestingAdapter>,
  );
}

describe("DashboardPage interactions", () => {
  it("scales metrics according to selected period and refresh version", () => {
    const monthFactor = getDashboardScaleFactor("this-month", "", "", 0);
    const todayFactor = getDashboardScaleFactor("today", "", "", 0);
    const refreshedFactor = getDashboardScaleFactor("today", "", "", 1);

    expect(monthFactor).toBe(1);
    expect(todayFactor).toBeLessThan(monthFactor);
    expect(refreshedFactor).not.toBe(todayFactor);
  });

  it("updates displayed stats when switching period filters", () => {
    renderDashboard("?period=this-month");
    expect(screen.getByText("1,240")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "اليوم" }));
    expect(screen.queryByText("1,240")).not.toBeInTheDocument();
  });

  it("marks inline priority actions as completed when clicked", () => {
    renderDashboard();
    const inspectRoomBtn = screen.getAllByRole("button", {
      name: /فحص الغرفة/i,
    })[0];

    fireEvent.click(inspectRoomBtn);
    expect(inspectRoomBtn).toBeDisabled();
    expect(inspectRoomBtn).toHaveTextContent("تمت المراجعة");
  });
});
