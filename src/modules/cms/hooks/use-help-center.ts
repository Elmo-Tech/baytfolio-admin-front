import { useMemo, useState } from "react";
import { useQueryStates } from "nuqs";

import { helpCenterQuestions } from "../api/help-center.mock";
import type {
  HelpCenterQuestion,
  HelpCenterQuestionInput,
} from "../types/help-center";
import { helpCenterSearchParams } from "../pages/help-center-search-params";

export function useHelpCenter() {
  const [questions, setQuestions] = useState(helpCenterQuestions);
  const [params, setSearchParams] = useQueryStates(helpCenterSearchParams);

  const { search, category, status, page: currentPage, pageSize } = params;

  const filteredQuestions = useMemo(() => {
    const value = search.trim().toLowerCase();

    return questions.filter((question) => {
      const matchesSearch =
        !value ||
        question.question.toLowerCase().includes(value) ||
        question.questionEn.toLowerCase().includes(value) ||
        question.answer.toLowerCase().includes(value) ||
        question.answerEn.toLowerCase().includes(value);

      return (
        matchesSearch &&
        (category === "all" || question.category === category) &&
        (status === "all" || question.status === status)
      );
    });
  }, [questions, search, category, status]);

  const totalPages = Math.ceil(filteredQuestions.length / pageSize);

  const displayPage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const paginatedQuestions = filteredQuestions.slice(
    (displayPage - 1) * pageSize,
    displayPage * pageSize,
  );

  const handleSaveQuestion = (
    data: HelpCenterQuestionInput,
    selected: HelpCenterQuestion | null,
  ) => {
    if (selected) {
      setQuestions((previous) =>
        previous.map((item) =>
          item.id === selected.id ? { ...item, ...data } : item,
        ),
      );
      return;
    }

    setQuestions((previous) => [
      {
        id: Math.max(0, ...previous.map((item) => item.id)) + 1,
        ...data,
      },
      ...previous,
    ]);

    void setSearchParams({ page: 1 });
  };

  const handleToggleQuestionStatus = (id: number) => {
    setQuestions((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "active" ? "draft" : "active",
            }
          : item,
      ),
    );
  };

  return {
    questions: paginatedQuestions,
    search,
    category,
    status,
    pageSize,
    displayPage,
    totalPages,
    totalItems: filteredQuestions.length,
    setSearchParams,
    handleSaveQuestion,
    handleToggleQuestionStatus,
  };
}
