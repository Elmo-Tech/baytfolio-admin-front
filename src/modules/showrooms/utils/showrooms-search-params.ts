import {
  createParser,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs";

import type {
  ContractStatus,
  ShowroomActivity,
  ShowroomStatus,
} from "../types/showroom";

const parseAsPositiveInteger = createParser<number>({
  parse: (value) => {
    const parsed = parseAsInteger.parse(value);

    return parsed !== null && parsed >= 1 ? parsed : null;
  },
  serialize: (value) => parseAsInteger.serialize(value),
});

export const pageSizes = [8, 10, 20, 50] as const;

const parseAsPageSize = createParser<number>({
  parse: (value) => {
    const parsed = parseAsInteger.parse(value);

    return parsed !== null && pageSizes.some((size) => size === parsed)
      ? parsed
      : null;
  },
  serialize: (value) => parseAsInteger.serialize(value),
});

export const showroomsSearchParams = {
  search: parseAsString.withDefault(""),

  activity: parseAsStringEnum([
    "all",
    "showroom",
    "factory",
    "showroom_factory",
    "studio_manufacturing",
  ] satisfies ["all", ...ShowroomActivity[]]).withDefault("all"),

  showroomStatus: parseAsStringEnum(["all", "active", "suspended"] satisfies [
    "all",
    ...ShowroomStatus[],
  ]).withDefault("all"),

  contractStatus: parseAsStringEnum([
    "all",
    "active",
    "expiring",
    "expired",
  ] satisfies ["all", ...ContractStatus[]]).withDefault("all"),

  sort: parseAsStringEnum(["latest", "oldest", "name"]).withDefault("latest"),

  page: parseAsPositiveInteger.withDefault(1),

  pageSize: parseAsPageSize.withDefault(8),
};
