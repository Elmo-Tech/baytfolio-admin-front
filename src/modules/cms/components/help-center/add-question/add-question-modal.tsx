import { DialogSurface } from "@/shared/components/ui/dialog-surface";
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

  return (
    <DialogSurface
      presentation="question"
      overlayProps={{
        onMouseDown: (event) => {
          if (event.target === event.currentTarget) onClose();
        },
      }}
      surfaceProps={{
        dir: "rtl",
        role: "dialog",
        "aria-modal": true,
        "aria-labelledby": "question-modal-title",
      }}
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

        <QuestionModalFooter isEditing={Boolean(question)} onClose={onClose} />
      </form>
    </DialogSurface>
  );
}
