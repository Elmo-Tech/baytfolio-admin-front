import { useMemo } from "react";
import { Download } from "lucide-react";
import { useQueryStates } from "nuqs";
import { mockUsers } from "../api/users.mock";
import UsersFilters from "../components/users-filters";
import UsersPagination from "../components/users-pagination";
import UsersStats from "../components/users-stats";
import UsersTable from "../components/users-table";
import { usersSearchParams } from "./users-search-params";

export default function UsersPage() {
  const [
    { search, status, loginMethod, sortOrder, page: currentPage, pageSize },
    setUsersSearchParams,
  ] = useQueryStates(usersSearchParams);

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return mockUsers
      .filter((user) => {
        const matchesSearch =
          !searchValue ||
          user.name.toLowerCase().includes(searchValue) ||
          user.email.toLowerCase().includes(searchValue) ||
          user.phone.toLowerCase().includes(searchValue);

        const matchesStatus = status === "all" || user.status === status;

        const matchesLoginMethod =
          loginMethod === "all" || user.loginMethod === loginMethod;

        return matchesSearch && matchesStatus && matchesLoginMethod;
      })
      .sort((a, b) => {
        const comparison = a.createdAt.localeCompare(b.createdAt);

        return sortOrder === "newest" ? -comparison : comparison;
      });
  }, [search, status, loginMethod, sortOrder]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleReset = () => {
    setUsersSearchParams({
      search: "",
      status: "all",
      loginMethod: "all",
      sortOrder: "newest",
      page: 1,
      pageSize: 20,
    });
  };

  const handleSearchChange = (value: string) => {
    setUsersSearchParams({ search: value, page: 1 });
  };

  const handleStatusChange = (value: string) => {
    setUsersSearchParams({
      status: value as typeof status,
      page: 1,
    });
  };

  const handleLoginMethodChange = (value: string) => {
    setUsersSearchParams({
      loginMethod: value as typeof loginMethod,
      page: 1,
    });
  };

  const handleSortOrderChange = (value: string) => {
    setUsersSearchParams({
      sortOrder: value as typeof sortOrder,
      page: 1,
    });
  };

  const handlePageSizeChange = (size: number) => {
    setUsersSearchParams({ pageSize: size, page: 1 });
  };

  const handleExportCsv = () => {
    const headers = [
      "User ID",
      "Name",
      "Phone",
      "Email",
      "Login Method",
      "Status",
      "Registration Date",
      "Last Login",
    ];

    const loginMethods = {
      phone_password: "Phone + Password",
      google: "Google",
      apple: "Apple",
    };

    const statuses = {
      active: "Active",
      suspended: "Suspended",
      pending_deletion: "Pending Deletion",
      deleted: "Deleted",
    };

    const escapeCsvValue = (value: string) => `"${value.replace(/"/g, '""')}"`;

    const rows = filteredUsers.map((user) => [
      user.id,
      user.name,
      user.phone,
      user.email,
      loginMethods[user.loginMethod],
      statuses[user.status],
      user.createdAt,
      user.lastLogin,
    ]);

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
    link.download = "baytfolio-users.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-[#1d2935]">
              إدارة المستخدمين
            </h1>

            {/* <span className="rounded-sm bg-[#102233] px-2 py-1 text-xs font-medium text-white">
              {filteredUsers.length.toLocaleString("en-US")} Users
            </span> */}
          </div>

          <p className="mt-2 text-sm text-[#8b8176]">
            إدارة ومتابعة حسابات المستخدمين وحالاتهم على المنصة
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCsv}
          disabled={filteredUsers.length === 0}
          className="flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#eee8e0] bg-white px-4 text-sm font-medium text-[#46515d] transition hover:bg-[#f7f3ed] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={17} />
          تصدير القائمة (CSV)
        </button>
      </div>

      <UsersStats />

      <UsersFilters
        search={search}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
        loginMethod={loginMethod}
        onLoginMethodChange={handleLoginMethodChange}
        sortOrder={sortOrder}
        onSortOrderChange={handleSortOrderChange}
        onReset={handleReset}
      />

      <UsersTable users={paginatedUsers} />

      <UsersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredUsers.length}
        pageSize={pageSize}
        onPageChange={(page) => setUsersSearchParams({ page })}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
