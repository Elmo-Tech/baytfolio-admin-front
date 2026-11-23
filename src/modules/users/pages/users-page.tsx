import { Button } from "@/shared/components/ui/button";
import { Download } from "lucide-react";
import { Navigate, useLocation } from "react-router";

import UsersFilters from "../components/users-filters";
import UsersPagination from "../components/users-pagination";
import UsersStats from "../components/users-stats";
import UsersTable from "../components/users-table";
import { useUsersList } from "../hooks/use-users-list";
import { getCanonicalUsersSearch } from "../utils/users-search-params";

export default function UsersPage() {
  const location = useLocation();
  const {
    search,
    status,
    loginMethod,
    sortOrder,
    rawPage,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    paginatedUsers,
    onSearchChange,
    onStatusChange,
    onLoginMethodChange,
    onSortOrderChange,
    onPageChange,
    onPageSizeChange,
    onReset,
    onExportCsv,
  } = useUsersList();

  if (rawPage !== currentPage) {
    return (
      <Navigate
        to={{
          pathname: location.pathname,
          search: getCanonicalUsersSearch(location.search, currentPage),
        }}
        replace
      />
    );
  }

  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-users-text-primary">
            إدارة المستخدمين
          </h1>
          <p className="mt-2 text-sm text-users-text-muted">
            إدارة ومتابعة حسابات المستخدمين وحالاتهم على المنصة
          </p>
        </div>

        <Button
          unstyled
          type="button"
          onClick={onExportCsv}
          disabled={totalItems === 0}
          className="flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border border-users-panel-divider bg-users-surface px-4 text-sm font-medium text-users-text-secondary transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={17} />
          تصدير القائمة (CSV)
        </Button>
      </div>

      <UsersStats />

      <UsersFilters
        search={search}
        onSearchChange={onSearchChange}
        status={status}
        onStatusChange={onStatusChange}
        loginMethod={loginMethod}
        onLoginMethodChange={onLoginMethodChange}
        sortOrder={sortOrder}
        onSortOrderChange={onSortOrderChange}
        onReset={onReset}
      />

      <UsersTable users={paginatedUsers} />

      <UsersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
