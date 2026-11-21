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
    return parsed !== null &&
      pageSizes.includes(parsed as (typeof pageSizes)[number])
      ? parsed
      : null;
  },
  serialize: (value) => parseAsInteger.serialize(value),
});

export const showroomJoinRequestsSearchParams = {
  search: parseAsString.withDefault(""),
  status: parseAsStringEnum([
    "all",
    "new",
    "under_review",
    "pending_agreement",
    "approved",
    "contacted",
    "qualified",
    "rejected",
    "closed",
  ]).withDefault("all"),
  activityType: parseAsStringEnum([
    "all",
    "showroom",
    "commercial_display",
    "factory",
    "design_studio",
  ]).withDefault("all"),
  date: parseAsString.withDefault("all"),
  sortOrder: parseAsStringEnum(["newest", "oldest"]).withDefault("newest"),
  page: parseAsPositiveInteger.withDefault(1),
  pageSize: parseAsPageSize.withDefault(20),
};
