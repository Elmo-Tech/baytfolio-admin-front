import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/shared/components/ui";

import type { HelpCenterQuestion } from "../../../types/help-center";
import { useAddQuestionForm } from "../../../hooks/use-add-question-form";
import QuestionFormFields from "./question-form-fields";
import QuestionModalFooter from "./question-modal-footer";

interface Props {
  question?: HelpCenterQuestion;
  onClose: () => void;
  onSubmit: (data: ReturnType<typeof useAddQuestionForm>["formData"]) => void;
}

export default function AddQuestionModal({
  question,
  onClose,
  onSubmit,
}: Props) {
  const form = useAddQuestionForm(question, onSubmit);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] grid place-items-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="question-modal-title"
        className="flex max-h-[90dvh] w-full max-w-[690px] flex-col overflow-hidden rounded-xl border bg-users-surface shadow-2xl"
      >
        <header className="flex items-center justify-between border-b px-5 py-5">
          <h2 id="question-modal-title" className="text-lg font-semibold">
            {question ? "تعديل السؤال" : "إضافة سؤال جديد"}
          </h2>

          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={19} />
          </Button>
        </header>

        <form
          onSubmit={form.handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <QuestionFormFields {...form} />

          <QuestionModalFooter
            isEditing={Boolean(question)}
            onClose={onClose}
          />
        </form>
      </section>
    </div>,
    document.body,
  );
}
