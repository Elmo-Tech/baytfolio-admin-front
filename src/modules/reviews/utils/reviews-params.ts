import { parseAsInteger, parseAsString } from "nuqs";

const urlOprions = { clearOnDefault: false };

export const reviewsParams = {
  page: parseAsInteger.withDefault(1).withOptions(urlOprions),
  search: parseAsString.withDefault(""),
  status: parseAsString.withDefault(""),
  rating: parseAsString.withDefault(""),
};
