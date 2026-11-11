import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Plus, ArrowRight } from "lucide-react";
import { useQueryStates } from "nuqs";

import { Button } from "@/shared/components/ui";

import { helpCenterQuestions } from "../api/help-center.mock";

import HelpCenterFilters from "../components/help-center/help-center-filters";
import HelpCenterTable from "../components/help-center/help-center-table";
import HelpCenterPagination from "../components/help-center/help-center-pagination";
import AddQuestionModal from "../components/help-center/add-question-modal";

import type {
  HelpCenterQuestion,
  HelpCenterQuestionInput,
} from "../types/help-center";

import { helpCenterSearchParams } from "./help-center-search-params";

export default function HelpCenterPage() {
  const navigate = useNavigate();

  // Questions state
  const [questions, setQuestions] = useState(helpCenterQuestions);

  // URL search params
  const [
    { search, category, status, page: currentPage, pageSize },
    setSearchParams,
  ] = useQueryStates(helpCenterSearchParams);

  // Modal state
  const [selectedQuestion, setSelectedQuestion] =
    useState<HelpCenterQuestion | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtering
  const filteredQuestions = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return questions.filter((question) => {
      const matchesSearch =
        !searchValue ||
        question.question.toLowerCase().includes(searchValue) ||
        question.questionEn.toLowerCase().includes(searchValue) ||
        question.answer.toLowerCase().includes(searchValue) ||
        question.answerEn.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "all" || question.category === category;

      const matchesStatus = status === "all" || question.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [questions, search, category, status]);

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / pageSize);

  const displayPage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const paginatedQuestions = filteredQuestions.slice(
    (displayPage - 1) * pageSize,
    displayPage * pageSize,
  );

  // Filters handlers
  const handleSearchChange = (value: string) => {
    setSearchParams({
      search: value,
      page: 1,
    });
  };

  const handleCategoryChange = (value: string) => {
    setSearchParams({
      category: value,
      page: 1,
    });
  };

  const handleStatusChange = (value: string) => {
    setSearchParams({
      status: value,
      page: 1,
    });
  };

  const handleReset = () => {
    setSearchParams({
      search: "",
      category: "all",
      status: "all",
      page: 1,
      pageSize: 7,
    });
  };

  const handlePageSizeChange = (size: number) => {
    setSearchParams({
      pageSize: size,
      page: 1,
    });
  };

  // Add / Edit question
  const handleSaveQuestion = (data: HelpCenterQuestionInput) => {
    if (selectedQuestion) {
      setQuestions((previous) =>
        previous.map((question) =>
          question.id === selectedQuestion.id
            ? { ...question, ...data }
            : question,
        ),
      );
    } else {
      const newQuestion: HelpCenterQuestion = {
        id: Math.max(0, ...questions.map((question) => question.id)) + 1,
        ...data,
      };

      setQuestions((previous) => [newQuestion, ...previous]);

      setSearchParams({
        page: 1,
      });
    }

    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  // Toggle question status (Active <-> Draft)
  const handleToggleQuestionStatus = (id: number) => {
    setQuestions((previous) =>
      previous.map((question) =>
        question.id === id
          ? {
              ...question,
              status: question.status === "active" ? "draft" : "active",
            }
          : question,
      ),
    );
  };

  // Open add modal
  const handleAddQuestion = () => {
    setSelectedQuestion(null);
    setIsModalOpen(true);
  };

  // Open edit modal
  const handleEditQuestion = (question: HelpCenterQuestion) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  return (
    <div dir="rtl" className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-users-text-primary">
            مركز المساعدة
          </h1>

          <p className="mt-2 text-sm text-users-text-muted">
            إدارة الأسئلة الشائعة الظاهرة في موقع وتطبيق BaytFolio.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/cms")}
            className="h-10 gap-2 border-users-panel-divider bg-users-surface text-users-text-secondary hover:bg-background"
          >
            <ArrowRight size={16} />
            العودة لإدارة المحتوى
          </Button>

          <Button
            type="button"
            onClick={handleAddQuestion}
            className="h-10 shrink-0 gap-2"
          >
            <Plus size={17} />
            إضافة سؤال
          </Button>
        </div>
      </div>

      {/* Filters */}
      <HelpCenterFilters
        search={search}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        status={status}
        onStatusChange={handleStatusChange}
        onReset={handleReset}
      />

      {/* Questions Table */}
      <HelpCenterTable
        questions={paginatedQuestions}
        currentPage={displayPage}
        pageSize={pageSize}
        onEdit={handleEditQuestion}
        onToggleStatus={handleToggleQuestionStatus}
      />

      {/* Pagination */}
      <HelpCenterPagination
        currentPage={displayPage}
        totalPages={totalPages}
        totalItems={filteredQuestions.length}
        pageSize={pageSize}
        onPageChange={(page) => setSearchParams({ page })}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <AddQuestionModal
          key={selectedQuestion?.id ?? "new-question"}
          question={selectedQuestion ?? undefined}
          onClose={handleCloseModal}
          onSubmit={handleSaveQuestion}
        />
      )}
    </div>
  );
}
