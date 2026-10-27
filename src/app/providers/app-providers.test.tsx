import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppProviders } from "./app-providers";

describe("AppProviders", () => {
  it("renders its children", () => {
    render(
      <AppProviders>
        <div>Provider test</div>
      </AppProviders>,
    );

    expect(screen.getByText("Provider test")).toBeInTheDocument();
  });
});
