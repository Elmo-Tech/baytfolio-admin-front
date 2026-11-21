import type { User, UserLoginMethod, UserStatus } from "../types/user";

const CSV_HEADERS = [
  "User ID",
  "Name",
  "Phone",
  "Email",
  "Login Method",
  "Status",
  "Registration Date",
  "Last Login",
];

const LOGIN_METHOD_LABELS: Record<UserLoginMethod, string> = {
  phone_password: "Phone + Password",
  google: "Google",
  apple: "Apple",
};

const STATUS_LABELS: Record<UserStatus, string> = {
  active: "Active",
  suspended: "Suspended",
  pending_deletion: "Pending Deletion",
  deleted: "Deleted",
};

function escapeCsvValue(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

export function exportUsersCsv(users: User[]) {
  const rows = users.map((user) => [
    user.id,
    user.name,
    user.phone,
    user.email,
    LOGIN_METHOD_LABELS[user.loginMethod],
    STATUS_LABELS[user.status],
    user.createdAt,
    user.lastLogin,
  ]);

  const csvContent = [
    CSV_HEADERS.map(escapeCsvValue).join(","),
    ...rows.map((row) => row.map(escapeCsvValue).join(",")),
  ].join("\r\n");

  const blob = new Blob(["\uFEFF", csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "baytfolio-users.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
