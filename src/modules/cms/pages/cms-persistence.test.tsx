import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";

import { initialContactInformation } from "../api/contact-information.mock";
import ContactInformationPage from "./contact-information-page";

describe("CMS localStorage persistence", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("persists saved contact information across page remounts", () => {
    const { unmount } = render(
      <MemoryRouter>
        <ContactInformationPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByDisplayValue(
      initialContactInformation.email,
    );
    fireEvent.change(emailInput, { target: { value: "admin@baytfolio.sa" } });
    fireEvent.click(screen.getByRole("button", { name: /حفظ/i }));

    unmount();
    cleanup();

    render(
      <MemoryRouter>
        <ContactInformationPage />
      </MemoryRouter>,
    );

    expect(screen.getByDisplayValue("admin@baytfolio.sa")).toBeInTheDocument();
  });
});
