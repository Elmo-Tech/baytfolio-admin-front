import { render } from "@testing-library/react";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { describe, expect, it } from "vitest";

import { mockUsers } from "../api/users.mock";
import UsersPage from "./users-page";

function LocationTracker({
  onLocationChange,
}: {
  onLocationChange: (search: string) => void;
}) {
  const location = useLocation();
  onLocationChange(location.search);
  return null;
}

function renderUsersAt(search: string) {
  let latestSearch = "";

  render(
    <NuqsTestingAdapter searchParams={search}>
      <MemoryRouter initialEntries={[`/users${search}`]}>
        <Routes>
          <Route
            path="/users"
            element={
              <>
                <UsersPage />
                <LocationTracker
                  onLocationChange={(nextSearch) => {
                    latestSearch = nextSearch;
                  }}
                />
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    </NuqsTestingAdapter>,
  );

  return latestSearch;
}

describe("UsersPage pagination canonicalization", () => {
  it("clamps an out-of-range positive page to the last available page", () => {
    const lastPage = Math.ceil(mockUsers.length / 10);
    const latestSearch = renderUsersAt("?pageSize=10&page=999");
    const expectedSearch =
      lastPage === 1 ? "?pageSize=10" : `?pageSize=10&page=${lastPage}`;

    expect(latestSearch).toBe(expectedSearch);
  });

  it("clears the page param when the clamped page is 1", () => {
    const latestSearch = renderUsersAt("?page=999");

    expect(latestSearch).toBe("");
  });

  it("resets out-of-range page URL to page 1 when filtered results are empty", () => {
    const latestSearch = renderUsersAt("?search=no-matching-user-xyz&page=5");

    expect(latestSearch).toBe("?search=no-matching-user-xyz");
  });
});
