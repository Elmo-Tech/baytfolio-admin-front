import { Download, RefreshCw } from "lucide-react";

import { Button } from "@/shared/components/ui";

import ShowroomJoinRequestsFilters from "../components/requests-list/showroom-join-requests-filters";
import ShowroomJoinRequestsPagination from "../components/requests-list/showroom-join-requests-pagination";
import ShowroomJoinRequestsStats from "../components/requests-list/showroom-join-requests-stats";
import ShowroomJoinRequestsTable from "../components/requests-list/showroom-join-requests-table";
import { useShowroomJoinRequestsPage } from "../hooks/use-showroom-join-requests-page";
import { mockShowroomJoinRequests } from "../api/showroom-join-requests.mock";
export const ShowroomJoinRequestsPage = () => {
  const state = useShowroomJoinRequestsPage();

  return (
    <main dir="rtl" className="space-y-5 pb-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-text-primary">
              طلبات انضمام المعارض
            </h1>
            <span className="rounded-sm bg-muted px-2 py-1 text-xs font-medium text-text-secondary">
              {state.totalCount} طلبات مسجلة
            </span>
          </div>
          <p className="mt-2 text-sm text-text-muted">
            مراجعة طلبات المعارض والمصانع الراغبة في الانضمام إلى BaytFolio
            ومتابعة حالة كل طلب.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={state.handleRefresh}
            presentation="request-toolbar-action"
          >
            <RefreshCw size={15} />
            تحديث البيانات
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={state.handleExportCsv}
            presentation="request-toolbar-action"
          >
            <Download size={15} />
            تصدير CSV
          </Button>
        </div>
      </header>

      <ShowroomJoinRequestsStats requests={mockShowroomJoinRequests} />
      <ShowroomJoinRequestsFilters
        search={state.search}
        onSearchChange={(value) =>
          state.setSearchParams({ search: value, page: 1 })
        }
        status={state.status}
        onStatusChange={(value) =>
          state.setSearchParams({ status: value, page: 1 })
        }
        activityType={state.activityType}
        onActivityTypeChange={(value) =>
          state.setSearchParams({ activityType: value, page: 1 })
        }
        date={state.date}
        onDateChange={(value) =>
          state.setSearchParams({ date: value, page: 1 })
        }
        sortOrder={state.sortOrder}
        onSortOrderChange={(value) =>
          state.setSearchParams({ sortOrder: value, page: 1 })
        }
        onReset={state.handleReset}
      />

      <ShowroomJoinRequestsTable requests={state.paginatedRequests} />

      <ShowroomJoinRequestsPagination
        currentPage={state.safePage}
        totalPages={state.totalPages}
        totalItems={state.filteredCount}
        pageSize={state.pageSize}
        onPageChange={(nextPage) => state.setSearchParams({ page: nextPage })}
        onPageSizeChange={(nextSize) =>
          state.setSearchParams({ pageSize: nextSize, page: 1 })
        }
      />
    </main>
  );
};
