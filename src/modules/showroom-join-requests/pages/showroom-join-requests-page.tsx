import { useMemo } from "react";
import { Download, RefreshCw } from "lucide-react";
import { useQueryStates } from "nuqs";

import { Button } from "@/shared/components/ui";

import { mockShowroomJoinRequests } from "../api/showroom-join-requests.mock";
import ShowroomJoinRequestsStats from "../components/showroom-join-requests-stats";
import ShowroomJoinRequestsFilters from "../components/showroom-join-requests-filters";
import ShowroomJoinRequestsTable from "../components/showroom-join-requests-table";
import ShowroomJoinRequestsPagination from "../components/showroom-join-requests-pagination";
import { showroomJoinRequestsSearchParams } from "./showroom-join-requests-search-params";

export default function ShowroomJoinRequestsPage() {
  const [
    {
      search,
      status,
      activityType,
      date,
      sortOrder,
      page: currentPage,
      pageSize,
    },
    setSearchParams,
  ] = useQueryStates(showroomJoinRequestsSearchParams);

  const filteredRequests = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return mockShowroomJoinRequests
      .filter((request) => {
        const matchesSearch =
          !searchValue ||
          request.reference.toLowerCase().includes(searchValue) ||
          request.showroomName.toLowerCase().includes(searchValue) ||
          request.contactPerson.toLowerCase().includes(searchValue) ||
          request.email.toLowerCase().includes(searchValue) ||
          request.phone.toLowerCase().includes(searchValue);

        const matchesStatus = status === "all" || request.status === status;

        const matchesActivity =
          activityType === "all" || request.activityType === activityType;

        const submittedDate = new Date(`${request.submittedAt}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const daysAgo = Math.floor(
          (today.getTime() - submittedDate.getTime()) / 86_400_000,
        );

        const matchesDate =
          date === "all" ||
          (date === "last7" && daysAgo >= 0 && daysAgo <= 7) ||
          (date === "last30" && daysAgo >= 0 && daysAgo <= 30);

        return matchesSearch && matchesStatus && matchesActivity && matchesDate;
      })
      .sort((a, b) => {
        const comparison = a.submittedAt.localeCompare(b.submittedAt);
        return sortOrder === "newest" ? -comparison : comparison;
      });
  }, [search, status, activityType, date, sortOrder]);

  const totalPages = Math.ceil(filteredRequests.length / pageSize);

  const safePage = Math.min(currentPage, Math.max(totalPages, 1));

  const paginatedRequests = filteredRequests.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const handleReset = () => {
    setSearchParams({
      search: "",
      status: "all",
      activityType: "all",
      date: "all",
      sortOrder: "newest",
      page: 1,
      pageSize: 20,
    });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleExportCsv = () => {
    const headers = [
      "Request ID",
      "Showroom",
      "Location",
      "Activity Type",
      "Contact Person",
      "Phone",
      "Email",
      "Submitted At",
      "Status",
    ];

    const rows = filteredRequests.map((request) => [
      request.reference,
      request.showroomName,
      request.location,
      request.activityType,
      request.contactPerson,
      request.phone,
      request.email,
      request.submittedAt,
      request.status,
    ]);

    const escapeCsvValue = (value: string) => `"${value.replace(/"/g, '""')}"`;

    const csvContent = [
      headers.map(escapeCsvValue).join(","),
      ...rows.map((row) => row.map(escapeCsvValue).join(",")),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF", csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "baytfolio-showroom-join-requests.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <main dir="rtl" className="space-y-5 pb-8">
      {/* Page Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-text-primary">
              طلبات انضمام المعارض
            </h1>

            <span className="rounded-sm bg-muted px-2 py-1 text-xs font-medium text-text-secondary">
              {mockShowroomJoinRequests.length} طلبات مسجلة
            </span>
          </div>

          <p className="mt-2 text-sm text-text-muted">
            مراجعة طلبات المعارض والمصانع الراغبة في الانضمام إلى BaytFolio
            ومتابعة حالة كل طلب.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleRefresh}
            className="h-10 gap-2 rounded-lg border-border-subtle bg-background px-4 text-xs font-normal shadow-none"
          >
            <RefreshCw size={15} />
            تحديث البيانات
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleExportCsv}
            className="h-10 gap-2 rounded-lg border-border-subtle bg-background px-4 text-xs font-normal shadow-none"
          >
            <Download size={15} />
            تصدير CSV
          </Button>
        </div>
      </header>

      {/* Statistics */}
      <ShowroomJoinRequestsStats requests={mockShowroomJoinRequests} />

      {/* Filters */}
      <ShowroomJoinRequestsFilters
        search={search}
        onSearchChange={(value) => setSearchParams({ search: value, page: 1 })}
        status={status}
        onStatusChange={(value) => setSearchParams({ status: value, page: 1 })}
        activityType={activityType}
        onActivityTypeChange={(value) =>
          setSearchParams({ activityType: value, page: 1 })
        }
        date={date}
        onDateChange={(value) => setSearchParams({ date: value, page: 1 })}
        sortOrder={sortOrder}
        onSortOrderChange={(value) =>
          setSearchParams({ sortOrder: value, page: 1 })
        }
        onReset={handleReset}
      />

      {/* Requests Table */}
      <ShowroomJoinRequestsTable requests={paginatedRequests} />

      {/* Pagination */}
      <ShowroomJoinRequestsPagination
        currentPage={safePage}
        totalPages={totalPages}
        totalItems={filteredRequests.length}
        pageSize={pageSize}
        onPageChange={(nextPage) => setSearchParams({ page: nextPage })}
        onPageSizeChange={(nextSize) =>
          setSearchParams({ pageSize: nextSize, page: 1 })
        }
      />
    </main>
  );
}
