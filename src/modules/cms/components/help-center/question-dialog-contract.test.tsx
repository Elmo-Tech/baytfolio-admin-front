import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { helpCenterCategories } from "../../api/help-center.mock";
import StandaloneQuestionModal from "./add-question-modal";
import RoutedQuestionModal from "./add-question/add-question-modal";

describe.each([
  {
    name: "routed question dialog",
    Component: RoutedQuestionModal,
    category: "",
  },
  {
    name: "standalone question dialog",
    Component: StandaloneQuestionModal,
    category: helpCenterCategories[0],
  },
])("$name", ({ Component, category }) => {
  it("keeps Arabic validation, trims submitted content and retains category defaults", () => {
    const onSubmit = vi.fn();
    render(<Component onSubmit={onSubmit} onClose={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "English" }));
    fireEvent.click(screen.getByRole("button", { name: "إضافة السؤال" }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "السؤال والإجابة باللغة العربية حقول إلزامية.",
    );
    const question =
      document.querySelector<HTMLInputElement>("#help-question")!;
    const answer = document.querySelector<HTMLTextAreaElement>("#help-answer")!;
    expect(question.dir).toBe("rtl");
    fireEvent.change(question, { target: { value: "  سؤال عربي  " } });
    fireEvent.change(answer, { target: { value: "  إجابة عربية  " } });
    fireEvent.click(screen.getByRole("button", { name: "إضافة السؤال" }));
    expect(onSubmit).toHaveBeenCalledWith({
      category,
      status: "active",
      question: "سؤال عربي",
      answer: "إجابة عربية",
      questionEn: "",
      answerEn: "",
    });
  });

  it("dismisses through the backdrop while retaining clicks inside the dialog", () => {
    const onClose = vi.fn();
    render(<Component onSubmit={vi.fn()} onClose={onClose} />);
    const dialog = screen.getByRole("dialog");
    fireEvent.mouseDown(dialog);
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.mouseDown(dialog.parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
