import { useMemo } from "react";

import type { FilterSelectOption } from "../components/requests-list/join-request-filter-select";
import {
  JOIN_REQUEST_ACTIVITY_CONFIG,
  JOIN_REQUEST_STATUS_CONFIG,
} from "../constants/showroom-join-requests.constants";
import {
  JOIN_REQUEST_DATE_OPTIONS,
  JOIN_REQUEST_SORT_OPTIONS,
} from "../constants/showroom-join-requests-options.constants";

export function useJoinRequestFilterOptions() {
  return useMemo(() => {
    const statusOptions: FilterSelectOption[] = [
      { value: "all", label: "حالة الطلب: الكل" },
      ...Object.entries(JOIN_REQUEST_STATUS_CONFIG).map(([value, cfg]) => ({
        value,
        label: cfg.filterLabel,
      })),
    ];

    const activityOptions: FilterSelectOption[] = [
      { value: "all", label: "نوع النشاط: الكل" },
      ...Object.entries(JOIN_REQUEST_ACTIVITY_CONFIG).map(([value, cfg]) => ({
        value,
        label: cfg.filterLabel,
      })),
    ];

    return {
      statusOptions,
      activityOptions,
      dateOptions: JOIN_REQUEST_DATE_OPTIONS,
      sortOptions: JOIN_REQUEST_SORT_OPTIONS,
    };
  }, []);
}
