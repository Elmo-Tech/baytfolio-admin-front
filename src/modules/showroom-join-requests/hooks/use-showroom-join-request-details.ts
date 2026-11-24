import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { useNavigate } from "react-router";

import { mockShowroomJoinRequests } from "../api/showroom-join-requests.mock";
import {
  REQUEST_DETAILS_ACTIVITY_CONFIG,
  REQUEST_DETAILS_STATUS_CONFIG,
  REQUEST_STATUSES,
} from "../constants/showroom-join-request-details.constants";
import type { ShowroomJoinRequestStatus } from "../types/showroom-join-requests.types";
import {
  buildSortedHistoryEvents,
  getProgressIndex,
  getStatusDescription,
} from "../utils/showroom-join-request-details.utils";

export function useShowroomJoinRequestDetails(requestId?: string) {
  const navigate = useNavigate();
  const [statusOverride, setStatusOverride] = useQueryState(
    "status",
    parseAsStringEnum([...REQUEST_STATUSES]),
  );
  const [internalNote, setInternalNote] = useState("");

  const {
    data: request,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["showroom-join-request", requestId],
    queryFn: () => {
      const found = mockShowroomJoinRequests.find(
        (item) => item.id === requestId || item.reference === requestId,
      );
      if (!found) throw new Error("Showroom join request not found");
      return found;
    },
    enabled: Boolean(requestId),
    retry: false,
    staleTime: Infinity,
  });

  const selectedStatus: ShowroomJoinRequestStatus =
    statusOverride ?? request?.status ?? "new";
  const isRejected = selectedStatus === "rejected";
  const isApproved = selectedStatus === "approved";

  const historyEvents = request ? buildSortedHistoryEvents(request) : [];
  const progressSteps = [
    { title: "طلب جديد", description: "تم استلامه عبر بوابة الانضمام" },
    { title: "قيد المراجعة", description: "قيد تدقيق الأهلية والمستندات" },
    {
      title: isRejected ? "مسار متوقف (مرفوض)" : "القرار النهائي",
      description: isRejected
        ? "لم يستوفِ الطلب الشروط المعتمدة"
        : isApproved
          ? "تم اعتماد الطلب بنجاح والانتقال لبدء التجهيز"
          : getStatusDescription(selectedStatus),
    },
  ];

  return {
    request,
    isPending,
    isError,
    selectedStatus,
    setStatusOverride,
    internalNote,
    setInternalNote,
    isRejected,
    isApproved,
    statusConfig: REQUEST_DETAILS_STATUS_CONFIG[selectedStatus],
    activityConfig: request
      ? REQUEST_DETAILS_ACTIVITY_CONFIG[request.activityType]
      : undefined,
    progressIndex: getProgressIndex(selectedStatus),
    progressSteps,
    historyEvents,
    rejectionEvent: historyEvents.find((e) => e.status === "rejected"),
    selectedStatusEvent: historyEvents.find((e) => e.status === selectedStatus),
    copyReference: () => {
      if (request)
        return navigator.clipboard
          ?.writeText(request.reference)
          .catch(() => {});
    },
    printRequest: () => window.print(),
    goBack: () => navigate("/admin/showroom-join-requests"),
    goToSetup: () =>
      request && navigate(`/admin/showroom-join-requests/${request.id}/setup`),
  };
}
