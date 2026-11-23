import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

describe("native-compatible form controls", () => {
  it("retains implicit submit, explicit non-submit and disabled behavior", () => {
    const submit = vi.fn();
    const action = vi.fn();
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <Button unstyled>Save</Button>
        <Button unstyled type="button" onClick={action}>
          Preview
        </Button>
        <Button unstyled disabled onClick={action}>
          Unavailable
        </Button>
      </form>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Preview" }));
    expect(action).toHaveBeenCalledTimes(1);
    expect(submit).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Unavailable" }));
    expect(action).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(submit).toHaveBeenCalledTimes(1);
  });

  it("preserves label activation, checkbox form data and DOM refs", () => {
    const inputRef = createRef<HTMLInputElement>();
    const buttonRef = createRef<HTMLButtonElement>();
    render(
      <form data-testid="preferences">
        <Label unstyled htmlFor="remember">
          Remember this device
        </Label>
        <Input
          unstyled
          id="remember"
          name="remember"
          type="checkbox"
          ref={inputRef}
        />
        <Button
          unstyled
          presentation="showroom-header-action"
          ref={buttonRef}
          type="button"
        >
          Focus
        </Button>
      </form>,
    );
    fireEvent.click(screen.getByText("Remember this device"));
    expect(inputRef.current).toBeChecked();
    const form = screen.getByTestId("preferences") as HTMLFormElement;
    expect(new FormData(form).get("remember")).toBe("on");
    buttonRef.current?.focus();
    expect(buttonRef.current).toHaveFocus();
  });
});
