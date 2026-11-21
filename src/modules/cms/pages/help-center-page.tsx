import { useState } from "react";
import { useNavigate } from "react-router";

import type { HelpCenterQuestion } from "../types/help-center";
import { useHelpCenter } from "../hooks/use-help-center";

import HelpCenterHeader from "../components/help-center/help-center-header";
import HelpCenterFilters from "../components/help-center/help-center-filters";
import HelpCenterTable from "../components/help-center/help-center-table";
import HelpCenterPagination from "../components/help-center/help-center-pagination";
import AddQuestionModal from "../components/help-center/add-question/add-question-modal";

export default function HelpCenterPage() {
  const navigate = useNavigate();
  const data = useHelpCenter();

  const [selectedQuestion, setSelectedQuestion] =
    useState<HelpCenterQuestion | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  return (
    <div dir="rtl" className="space-y-6">
      <HelpCenterHeader
        onBack={() => navigate("/cms")}
        onAdd={() => setIsModalOpen(true)}
      />

      <HelpCenterFilters
        search={data.search}
        onSearchChange={(value) =>
          void data.setSearchParams({ search: value, page: 1 })
        }
        category={data.category}
        onCategoryChange={(value) =>
          void data.setSearchParams({ category: value, page: 1 })
        }
        status={data.status}
        onStatusChange={(value) =>
          void data.setSearchParams({ status: value, page: 1 })
        }
        onReset={() =>
          void data.setSearchParams({
            search: "",
            category: "all",
            status: "all",
            page: 1,
            pageSize: 7,
          })
        }
      />

      <HelpCenterTable
        questions={data.questions}
        currentPage={data.displayPage}
        pageSize={data.pageSize}
        onEdit={(question) => {
          setSelectedQuestion(question);
          setIsModalOpen(true);
        }}
        onToggleStatus={data.handleToggleQuestionStatus}
      />

      <HelpCenterPagination
        currentPage={data.displayPage}
        totalPages={data.totalPages}
        totalItems={data.totalItems}
        pageSize={data.pageSize}
        onPageChange={(page) => void data.setSearchParams({ page })}
        onPageSizeChange={(pageSize) =>
          void data.setSearchParams({ pageSize, page: 1 })
        }
      />

      {isModalOpen && (
        <AddQuestionModal
          key={selectedQuestion?.id ?? "new-question"}
          question={selectedQuestion ?? undefined}
          onClose={closeModal}
          onSubmit={(formData) => {
            data.handleSaveQuestion(formData, selectedQuestion);
            closeModal();
          }}
        />
      )}
    </div>
  );
}
