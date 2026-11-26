import { parseAsStringEnum } from "nuqs";

import { loginRoles } from "../constants/login.constants";

export const loginSearchParams = {
  role: parseAsStringEnum([...loginRoles])
    .withDefault("admin")
    .withOptions({ clearOnDefault: false }),
};
