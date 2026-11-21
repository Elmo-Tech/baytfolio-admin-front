import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it } from "vitest";

import { getShowroomDetails } from "../api/showroom-details.mock";
import { mockShowrooms } from "../api/showrooms.mock";
import ShowroomDetailsPage from "./showroom-details-page";

describe("ShowroomDetailsPage consistency", () => {
  it("keeps contract end date consistent with showrooms list", () => {
    const listed = mockShowrooms[0];
    const details = getShowroomDetails(listed.id);

    expect(details?.contract.endDate).toBe(listed.contractEndDate);
  });

  it("renders the owner name rather than managerName in the header", () => {
    render(
      <MemoryRouter initialEntries={["/showrooms/1"]}>
        <Routes>
          <Route
            path="/showrooms/:showroomId"
            element={<ShowroomDetailsPage />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const ownerBadge = screen.getByText(/المالك:/).closest("span");
    expect(ownerBadge).not.toBeNull();
    expect(within(ownerBadge!).getByText("أحمد محمود")).toBeInTheDocument();
    expect(
      within(ownerBadge!).queryByText("أحمد محمد"),
    ).not.toBeInTheDocument();
  });
});
