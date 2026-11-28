import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs";

import type { PromotionsTab } from "../types/promotions.types";

const urlOptions = { clearOnDefault: false };

export const promotionsTabValues: PromotionsTab[] = [
  "current",
  "requests",
  "pricing",
];

export const promotionsParams = {
  tab: parseAsStringEnum([...promotionsTabValues])
    .withDefault("current")
    .withOptions(urlOptions),
  search: parseAsString.withDefault("").withOptions(urlOptions),
  type: parseAsString.withDefault("all").withOptions(urlOptions),
  status: parseAsString.withDefault("نشط").withOptions(urlOptions),
  page: parseAsInteger.withDefault(1).withOptions(urlOptions),
};
