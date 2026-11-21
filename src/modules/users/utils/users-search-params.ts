import {
  createParser,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs";

const parseAsPositiveInteger = createParser<number>({
  parse: (value) => {
    const parsed = parseAsInteger.parse(value);

    return parsed !== null && parsed >= 1 ? parsed : null;
  },
  serialize: (value) => parseAsInteger.serialize(value),
});

const pageSizes = [10, 20, 50] as const;

const parseAsPageSize = createParser<number>({
  parse: (value) => {
    const parsed = parseAsInteger.parse(value);

    return parsed !== null && pageSizes.some((pageSize) => pageSize === parsed)
      ? parsed
      : null;
  },
  serialize: (value) => parseAsInteger.serialize(value),
});

export const usersSearchParams = {
  search: parseAsString.withDefault(""),
  status: parseAsStringEnum([
    "all",
    "active",
    "suspended",
    "pending_deletion",
    "deleted",
  ]).withDefault("all"),
  loginMethod: parseAsStringEnum([
    "all",
    "phone_password",
    "google",
    "apple",
  ]).withDefault("all"),
  sortOrder: parseAsStringEnum(["newest", "oldest"]).withDefault("newest"),
  page: parseAsPositiveInteger.withDefault(1),
  pageSize: parseAsPageSize.withDefault(20),
};

export function clampUsersPage(page: number, totalPages: number): number {
  if (totalPages <= 0 || page < 1) {
    return 1;
  }

  return Math.min(page, totalPages);
}

export function getCanonicalUsersSearch(
  currentSearch: string,
  safePage: number,
): string {
  const nextSearchParams = new URLSearchParams(currentSearch);

  if (safePage === 1) {
    nextSearchParams.delete("page");
  } else {
    nextSearchParams.set("page", String(safePage));
  }

  const serialized = nextSearchParams.toString();
  return serialized ? `?${serialized}` : "";
}
