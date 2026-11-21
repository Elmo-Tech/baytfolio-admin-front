import { useMemo } from "react";
import { useQueryStates } from "nuqs";

import { mockShowrooms } from "../api/showrooms.mock";
import type { ShowroomsFiltersState } from "../components/showrooms-filters";
import { showroomsSearchParams } from "../utils/showrooms-search-params";

export function useShowroomsPage() {
  const [params, setParams] = useQueryStates(showroomsSearchParams);
  const {
    search,
    activity,
    showroomStatus,
    contractStatus,
    sort,
    page: currentPage,
    pageSize,
  } = params;

  const filteredShowrooms = useMemo(() => {
    const query = search.trim().toLowerCase();

    return mockShowrooms
      .filter((showroom) => {
        const matchesSearch =
          !query ||
          [
            showroom.name,
            showroom.reference,
            showroom.managerName,
            showroom.managerPhone,
          ].some((field) => field.toLowerCase().includes(query));

        return (
          matchesSearch &&
          (activity === "all" || showroom.activity === activity) &&
          (showroomStatus === "all" || showroom.status === showroomStatus) &&
          (contractStatus === "all" ||
            showroom.contractStatus === contractStatus)
        );
      })
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name, "ar");
        const cmp = a.reference.localeCompare(b.reference, "en", {
          numeric: true,
        });
        return sort === "latest" ? -cmp : cmp;
      });
  }, [search, activity, showroomStatus, contractStatus, sort]);

  const totalPages = Math.ceil(filteredShowrooms.length / pageSize);
  const displayPage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);
  const paginatedShowrooms = filteredShowrooms.slice(
    (displayPage - 1) * pageSize,
    displayPage * pageSize,
  );

  return {
    filters: { search, activity, showroomStatus, contractStatus, sort },
    displayPage,
    totalPages,
    totalItems: filteredShowrooms.length,
    pageSize,
    paginatedShowrooms,
    handleFiltersChange: (filters: ShowroomsFiltersState) =>
      setParams({ ...filters, page: 1 }),
    handleReset: () =>
      setParams({
        search: "",
        activity: "all",
        showroomStatus: "all",
        contractStatus: "all",
        sort: "latest",
        page: 1,
        pageSize: 8,
      }),
    handlePageSizeChange: (size: number) =>
      setParams({ pageSize: size as typeof pageSize, page: 1 }),
    handlePageChange: (nextPage: number) => setParams({ page: nextPage }),
  };
}
