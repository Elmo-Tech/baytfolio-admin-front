import { useState } from "react";
import type {
  HelpCenterQuestion,
  HelpCenterQuestionInput,
} from "../types/help-center";

export function useHelpQuestionDialog(
  saveQuestion: (
    data: HelpCenterQuestionInput,
    selected: HelpCenterQuestion | null,
  ) => void,
) {
  const [selectedQuestion, setSelectedQuestion] =
    useState<HelpCenterQuestion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };
  return {
    selectedQuestion,
    isModalOpen,
    closeModal,
    openModal: () => setIsModalOpen(true),
    editQuestion: (question: HelpCenterQuestion) => {
      setSelectedQuestion(question);
      setIsModalOpen(true);
    },
    saveQuestion: (data: HelpCenterQuestionInput) => {
      saveQuestion(data, selectedQuestion);
      closeModal();
    },
  };
}
