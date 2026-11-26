import { parseAsInteger, parseAsStringEnum } from "nuqs";

import { cateAndTagsValues } from "../constants/categories-and-tags-tabs.constants";

const urlOprions = { clearOnDefault: false };

export const cateAndTagsParams = {
  type: parseAsStringEnum([...cateAndTagsValues])
    .withDefault("categories")
    .withOptions(urlOprions),
  page: parseAsInteger.withDefault(1).withOptions(urlOprions),
};
