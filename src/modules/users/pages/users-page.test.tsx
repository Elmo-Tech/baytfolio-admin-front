import { render, screen } from "@testing-library/react";
import { withNuqsTestingAdapter } from "nuqs/adapters/testing";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { describe, expect, it } from "vitest";
import UsersPage from "./users-page";
import { clampUsersPage, usersSearchParams } from "./users-search-params";

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location-search">{location.search}</div>;
}

describe("UsersPage URL state", () => {
  it("restores search, filters, sorting, pagination, and page size", () => {
    expect(usersSearchParams.search.parseServerSide("عمر")).toBe("عمر");
    expect(usersSearchParams.status.parseServerSide("suspended")).toBe(
      "suspended",
    );
    expect(usersSearchParams.loginMethod.parseServerSide("google")).toBe(
      "google",
    );
    expect(usersSearchParams.sortOrder.parseServerSide("oldest")).toBe(
      "oldest",
    );
    expect(usersSearchParams.page.parseServerSide("2")).toBe(2);
    expect(usersSearchParams.pageSize.parseServerSide("10")).toBe(10);
  });

  it("accepts only supported page sizes", () => {
    expect(
      [10, 20, 50].map((pageSize) =>
        usersSearchParams.pageSize.parseServerSide(String(pageSize)),
      ),
    ).toEqual([10, 20, 50]);
  });

  it("uses safe defaults for invalid page and page size values", () => {
    expect(usersSearchParams.page.parseServerSide("0")).toBe(1);
    expect(usersSearchParams.page.parseServerSide("-1")).toBe(1);
    expect(usersSearchParams.pageSize.parseServerSide("15")).toBe(20);
  });

  it("clamps a positive page number exceeding total available pages", () => {
    expect(clampUsersPage(999, 3)).toBe(3);
    expect(clampUsersPage(5, 0)).toBe(1);
  });

  it("redirects and renders clamped page records when URL page exceeds filtered results", () => {
    const NuqsWrapper = withNuqsTestingAdapter({
      searchParams: "?page=999",
    });

    render(
      <MemoryRouter initialEntries={["/users?page=999"]}>
        <LocationDisplay />
        <Routes>
          <Route
            path="/users"
            element={
              <NuqsWrapper>
                <UsersPage />
              </NuqsWrapper>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("location-search").textContent).not.toContain(
      "page=999",
    );
  });
});
