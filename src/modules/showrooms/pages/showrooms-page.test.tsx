import { fireEvent, render, screen } from "@testing-library/react";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { describe, expect, it } from "vitest";

import { mockShowrooms } from "../api/showrooms.mock";
import ShowroomDetailsPage from "./showroom-details-page";
import ShowroomsPage from "./showrooms-page";

function PathTracker({ onPath }: { onPath: (path: string) => void }) {
  const location = useLocation();
  onPath(location.pathname);
  return null;
}

function renderShowroomsRoutes(initialEntry = "/showrooms") {
  let currentPath = initialEntry;

  render(
    <NuqsTestingAdapter>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/showrooms" element={<ShowroomsPage />} />
          <Route
            path="/showrooms/:showroomId"
            element={<ShowroomDetailsPage />}
          />
          <Route path="*" element={<div>Route Not Found</div>} />
        </Routes>
        <PathTracker
          onPath={(path) => {
            currentPath = path;
          }}
        />
      </MemoryRouter>
    </NuqsTestingAdapter>,
  );

  return () => currentPath;
}

describe("Showrooms listing navigation", () => {
  it("navigates to showroom details when clicking a table row", () => {
    const firstShowroom = mockShowrooms[0];
    const getPath = renderShowroomsRoutes();

    fireEvent.click(screen.getByText(firstShowroom.name));

    expect(getPath()).toBe(`/showrooms/${firstShowroom.id}`);
    expect(screen.queryByText("Route Not Found")).not.toBeInTheDocument();
  });

  it("navigates to showroom details when clicking the view details action button", () => {
    const secondShowroom = mockShowrooms[1];
    const getPath = renderShowroomsRoutes();

    fireEvent.click(
      screen.getByRole("button", {
        name: `عرض تفاصيل ${secondShowroom.name}`,
      }),
    );

    expect(getPath()).toBe(`/showrooms/${secondShowroom.id}`);
    expect(screen.queryByText("Route Not Found")).not.toBeInTheDocument();
  });
});
