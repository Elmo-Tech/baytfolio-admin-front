import { useMemo } from "react";
import { useQueryStates } from "nuqs";

import { mockUsers } from "../api/users.mock";
import {
  clampUsersPage,
  usersSearchParams,
} from "../utils/users-search-params";
import { exportUsersCsv } from "../utils/export-users-csv";

export function useUsersList() {
  const [
    { search, status, loginMethod, sortOrder, page, pageSize },
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
  const safePage = clampUsersPage(page, totalPages);
  const paginatedUsers = filteredUsers.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  return {
    search,
    status,
    loginMethod,
    sortOrder,
    rawPage: page,
    currentPage: safePage,
    pageSize,
    totalPages,
    totalItems: filteredUsers.length,
    paginatedUsers,
    onSearchChange: (value: string) =>
      setUsersSearchParams({ search: value, page: 1 }),
    onStatusChange: (value: string) =>
      setUsersSearchParams({ status: value as typeof status, page: 1 }),
    onLoginMethodChange: (value: string) =>
      setUsersSearchParams({
        loginMethod: value as typeof loginMethod,
        page: 1,
      }),
    onSortOrderChange: (value: string) =>
      setUsersSearchParams({ sortOrder: value as typeof sortOrder, page: 1 }),
    onPageChange: (nextPage: number) =>
      setUsersSearchParams({ page: nextPage }),
    onPageSizeChange: (size: number) =>
      setUsersSearchParams({ pageSize: size, page: 1 }),
    onReset: () =>
      setUsersSearchParams({
        search: "",
        status: "all",
        loginMethod: "all",
        sortOrder: "newest",
        page: 1,
        pageSize: 20,
      }),
    onExportCsv: () => exportUsersCsv(filteredUsers),
  };
}
