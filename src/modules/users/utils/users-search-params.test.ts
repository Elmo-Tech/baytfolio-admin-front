import { describe, expect, it } from "vitest";

import { clampUsersPage, usersSearchParams } from "./users-search-params";

describe("usersSearchParams & clampUsersPage", () => {
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

  it("uses safe defaults for invalid values and clamps out-of-range pages", () => {
    expect(usersSearchParams.page.parseServerSide("0")).toBe(1);
    expect(usersSearchParams.page.parseServerSide("-1")).toBe(1);
    expect(usersSearchParams.pageSize.parseServerSide("15")).toBe(20);
    expect(clampUsersPage(999, 3)).toBe(3);
    expect(clampUsersPage(999, 0)).toBe(1);
  });
});
