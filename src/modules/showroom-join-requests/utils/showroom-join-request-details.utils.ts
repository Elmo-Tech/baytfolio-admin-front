import type {
  ShowroomJoinRequest,
  ShowroomJoinRequestHistoryEvent,
  ShowroomJoinRequestStatus,
} from "../types/showroom-join-requests.types";

export function formatRequestDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatRequestTime(timestamp: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(timestamp));
}

export function getWhatsAppUrl(phone: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

export function getStatusDescription(status: ShowroomJoinRequestStatus) {
  const descriptions: Record<ShowroomJoinRequestStatus, string> = {
    new: "تم استلامه عبر بوابة الانضمام",
    under_review: "قيد تدقيق الأهلية والمستندات",
    pending_agreement: "بانتظار استكمال الاتفاق التجاري",
    approved: "تم اعتماد الطلب وأصبح جاهزًا لبدء التجهيز",
    contacted: "تم التواصل مع مسؤول المعرض",
    qualified: "اجتاز الطلب مرحلة التأهيل الأولي",
    rejected: "لم يستوفِ الطلب الشروط المعتمدة",
    closed: "تم إغلاق الطلب",
  };
  return descriptions[status];
}

export function getProgressIndex(status: ShowroomJoinRequestStatus) {
  if (status === "new") return 0;
  if (
    status === "under_review" ||
    status === "contacted" ||
    status === "qualified"
  ) {
    return 1;
  }
  return 2;
}

export function buildSortedHistoryEvents(
  request: ShowroomJoinRequest,
): ShowroomJoinRequestHistoryEvent[] {
  const submissionEvent: ShowroomJoinRequestHistoryEvent = {
    id: `submission-${request.id}`,
    status: "new",
    description: "تم استلام الطلب رسميًا من بوابة الشركاء",
    timestamp: `${request.submittedAt}T09:12:00`,
    performedBy: "النظام المركزي (System Automated)",
    source: "system",
  };

  return (request.history?.length ? request.history : [submissionEvent])
    .slice()
    .sort(
      (first, second) =>
        new Date(second.timestamp).getTime() -
        new Date(first.timestamp).getTime(),
    );
}
