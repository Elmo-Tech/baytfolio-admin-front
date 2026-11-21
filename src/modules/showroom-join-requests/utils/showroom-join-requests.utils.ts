import type { ShowroomJoinRequest } from "../types/showroom-join-requests.types";

interface FilterJoinRequestsParams {
  requests: ShowroomJoinRequest[];
  search: string;
  status: string;
  activityType: string;
  date: string;
  sortOrder: string;
}

export function filterAndSortJoinRequests({
  requests,
  search,
  status,
  activityType,
  date,
  sortOrder,
}: FilterJoinRequestsParams): ShowroomJoinRequest[] {
  const searchValue = search.trim().toLowerCase();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return requests
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
}

export function exportJoinRequestsToCsv(requests: ShowroomJoinRequest[]): void {
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
  const rows = requests.map((r) => [
    r.reference,
    r.showroomName,
    r.location,
    r.activityType,
    r.contactPerson,
    r.phone,
    r.email,
    r.submittedAt,
    r.status,
  ]);
  const escapeCsv = (val: string) => `"${val.replace(/"/g, '""')}"`;
  const csvContent = [
    headers.map(escapeCsv).join(","),
    ...rows.map((row) => row.map(escapeCsv).join(",")),
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
}
