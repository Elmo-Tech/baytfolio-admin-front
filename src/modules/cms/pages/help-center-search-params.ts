import { createParser, parseAsInteger, parseAsString } from "nuqs";

export const helpCenterSearchParams = {
  search: parseAsString.withDefault(""),
  category: parseAsString.withDefault("all"),
  status: parseAsString.withDefault("all"),
  page: parseAsInteger.withDefault(1),
  pageSize: createParser({
    parse: (value) => {
      const parsed = Number(value);
      return [7, 10, 20].includes(parsed) ? parsed : null;
    },
    serialize: (value) => String(value),
  }).withDefault(7),
};
