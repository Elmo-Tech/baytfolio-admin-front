import { z } from "zod";

import { emailSchema, passwordSchema } from "./auth.schema";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberDevice: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
