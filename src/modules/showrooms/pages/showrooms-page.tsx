import {
  ShowroomsFilters,
  ShowroomsHeader,
  ShowroomsPagination,
  ShowroomsStats,
  ShowroomsTable,
} from "../components";
import { useShowroomsPage } from "../hooks/use-showrooms-page";

export default function ShowroomsPage() {
  const {
    filters,
    displayPage,
    totalPages,
    totalItems,
    pageSize,
    paginatedShowrooms,
    handleFiltersChange,
    handleReset,
    handlePageSizeChange,
    handlePageChange,
  } = useShowroomsPage();

  return (
    <div dir="rtl" className="space-y-5">
      <ShowroomsHeader />
      <ShowroomsStats />
      <ShowroomsFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleReset}
      />
      <ShowroomsTable showrooms={paginatedShowrooms} />
      <ShowroomsPagination
        currentPage={displayPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
