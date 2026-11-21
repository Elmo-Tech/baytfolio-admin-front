import { useMemo } from "react";
import { useQueryStates } from "nuqs";

import { mockShowroomJoinRequests } from "../api/showroom-join-requests.mock";
import { showroomJoinRequestsSearchParams } from "../constants/showroom-join-requests-search-params";
import {
  exportJoinRequestsToCsv,
  filterAndSortJoinRequests,
} from "../utils/showroom-join-requests.utils";

export function useShowroomJoinRequestsPage() {
  const [params, setSearchParams] = useQueryStates(
    showroomJoinRequestsSearchParams,
  );

  const filteredRequests = useMemo(
    () =>
      filterAndSortJoinRequests({
        requests: mockShowroomJoinRequests,
        search: params.search,
        status: params.status,
        activityType: params.activityType,
        date: params.date,
        sortOrder: params.sortOrder,
      }),
    [
      params.search,
      params.status,
      params.activityType,
      params.date,
      params.sortOrder,
    ],
  );

  const totalPages = Math.ceil(filteredRequests.length / params.pageSize);
  const safePage = Math.min(params.page, Math.max(totalPages, 1));
  const paginatedRequests = filteredRequests.slice(
    (safePage - 1) * params.pageSize,
    safePage * params.pageSize,
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

  const handleRefresh = () => window.location.reload();
  const handleExportCsv = () => exportJoinRequestsToCsv(filteredRequests);

  return {
    ...params,
    setSearchParams,
    totalCount: mockShowroomJoinRequests.length,
    filteredCount: filteredRequests.length,
    totalPages,
    safePage,
    paginatedRequests,
    handleReset,
    handleRefresh,
    handleExportCsv,
  };
}
