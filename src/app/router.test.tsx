import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RouterProvider } from "react-router";
import { router } from "./router";

describe("Application routing", () => {
  it("renders the home page at /", async () => {
    await router.navigate("/");
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByText("BaytFolio Admin Dashboard"),
    ).toBeInTheDocument();
  });
});
