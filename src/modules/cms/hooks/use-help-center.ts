import { useMemo, useState } from "react";
import { useQueryStates } from "nuqs";
import { toast } from "sonner";

import { helpCenterQuestions } from "../api/help-center.mock";
import { helpCenterSearchParams } from "../pages/help-center-search-params";
import type {
  HelpCenterQuestion,
  HelpCenterQuestionInput,
} from "../types/help-center";
import { loadCmsStorage, saveCmsStorage } from "../utils/cms-storage";

const STORAGE_KEY = "baytfolio:cms:help-center";

export function useHelpCenter() {
  const [questions, setQuestions] = useState<HelpCenterQuestion[]>(() =>
    loadCmsStorage(STORAGE_KEY, helpCenterQuestions),
  );
  const [params, setSearchParams] = useQueryStates(helpCenterSearchParams);
  const { search, category, status, page: currentPage, pageSize } = params;

  const filteredQuestions = useMemo(() => {
    const value = search.trim().toLowerCase();
    return questions.filter((q) => {
      const matchesSearch =
        !value ||
        [q.question, q.questionEn, q.answer, q.answerEn].some((f) =>
          f.toLowerCase().includes(value),
        );
      return (
        matchesSearch &&
        (category === "all" || q.category === category) &&
        (status === "all" || q.status === status)
      );
    });
  }, [questions, search, category, status]);

  const totalPages = Math.ceil(filteredQuestions.length / pageSize);
  const displayPage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);
  const paginatedQuestions = filteredQuestions.slice(
    (displayPage - 1) * pageSize,
    displayPage * pageSize,
  );

  const persistQuestions = (next: HelpCenterQuestion[], message: string) => {
    if (!saveCmsStorage(STORAGE_KEY, next)) {
      toast.error("تعذر حفظ تغييرات مركز المساعدة");
      return;
    }
    setQuestions(next);
    toast.success(message);
  };

  const handleSaveQuestion = (
    data: HelpCenterQuestionInput,
    selected: HelpCenterQuestion | null,
  ) => {
    if (selected) {
      persistQuestions(
        questions.map((item) =>
          item.id === selected.id ? { ...item, ...data } : item,
        ),
        "تم تحديث السؤال وحفظه بنجاح",
      );
      return;
    }
    const next = [
      { id: Math.max(0, ...questions.map((item) => item.id)) + 1, ...data },
      ...questions,
    ];
    persistQuestions(next, "تمت إضافة السؤال وحفظه بنجاح");
    void setSearchParams({ page: 1 });
  };

  const handleToggleQuestionStatus = (id: number) => {
    persistQuestions(
      questions.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "active" ? "draft" : "active" }
          : item,
      ),
      "تم تحديث حالة السؤال بنجاح",
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
