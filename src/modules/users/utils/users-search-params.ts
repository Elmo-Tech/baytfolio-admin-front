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
