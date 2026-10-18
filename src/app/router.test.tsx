import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { createMemoryRouter } from "react-router";
import App from "./app";
import HomePage from "./pages/home-page";
import NotFoundPage from "./pages/not-found-page";

afterEach(cleanup);

function renderApp(initialEntry: string) {
  const testRouter = createMemoryRouter(
    [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
    {
      initialEntries: [initialEntry],
    },
  );

  return render(<App routerInstance={testRouter} />);
}

describe("Application", () => {
  it("renders the home page at /", async () => {
    renderApp("/");

    expect(
      await screen.findByText("BaytFolio Admin Dashboard"),
    ).toBeInTheDocument();
  });

  it("renders the not-found page for an unknown route", async () => {
    renderApp("/unknown-route");

    expect(
      await screen.findByRole("heading", { name: "404" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Page not found.")).toBeInTheDocument();
  });
});
