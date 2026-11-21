import { useMemo } from "react";
import { useQueryStates } from "nuqs";

import { mockShowrooms } from "../api/showrooms.mock";
import type { ShowroomsFiltersState } from "../components/showrooms-filters";
import { showroomsSearchParams } from "../utils/showrooms-search-params";

export function useShowroomsPage() {
  const [
    {
      search,
      activity,
      showroomStatus,
      contractStatus,
      sort,
      page: currentPage,
      pageSize,
    },
    setShowroomsSearchParams,
  ] = useQueryStates(showroomsSearchParams);

  const filteredShowrooms = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return mockShowrooms
      .filter((showroom) => {
        const matchesSearch =
          !searchValue ||
          showroom.name.toLowerCase().includes(searchValue) ||
          showroom.reference.toLowerCase().includes(searchValue) ||
          showroom.managerName.toLowerCase().includes(searchValue) ||
          showroom.managerPhone.toLowerCase().includes(searchValue);

        const matchesActivity =
          activity === "all" || showroom.activity === activity;
        const matchesShowroomStatus =
          showroomStatus === "all" || showroom.status === showroomStatus;
        const matchesContractStatus =
          contractStatus === "all" ||
          showroom.contractStatus === contractStatus;

        return (
          matchesSearch &&
          matchesActivity &&
          matchesShowroomStatus &&
          matchesContractStatus
        );
      })
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name, "ar");
        const comparison = a.reference.localeCompare(b.reference, "en", {
          numeric: true,
        });
        return sort === "latest" ? -comparison : comparison;
      });
  }, [search, activity, showroomStatus, contractStatus, sort]);

  const totalPages = Math.ceil(filteredShowrooms.length / pageSize);
  const displayPage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);
  const paginatedShowrooms = filteredShowrooms.slice(
    (displayPage - 1) * pageSize,
    displayPage * pageSize,
  );

  const handleFiltersChange = (filters: ShowroomsFiltersState) => {
    setShowroomsSearchParams({ ...filters, page: 1 });
  };

  const handleReset = () => {
    setShowroomsSearchParams({
      search: "",
      activity: "all",
      showroomStatus: "all",
      contractStatus: "all",
      sort: "latest",
      page: 1,
      pageSize: 8,
    });
  };

  const handlePageSizeChange = (size: number) => {
    setShowroomsSearchParams({ pageSize: size as typeof pageSize, page: 1 });
  };

  const handlePageChange = (nextPage: number) => {
    setShowroomsSearchParams({ page: nextPage });
  };

  return {
    filters: { search, activity, showroomStatus, contractStatus, sort },
    displayPage,
    totalPages,
    totalItems: filteredShowrooms.length,
    pageSize,
    paginatedShowrooms,
    handleFiltersChange,
    handleReset,
    handlePageSizeChange,
    handlePageChange,
  };
}
