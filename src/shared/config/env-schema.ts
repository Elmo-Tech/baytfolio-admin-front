import { z } from "zod";

export const envSchema = z.object({
  VITE_API_URL: z
    .url()
    .superRefine((value, context) => {
      if (!URL.canParse(value)) return;
      const url = new URL(value);
      if (
        !["http:", "https:"].includes(url.protocol) ||
        url.username ||
        url.password ||
        url.search ||
        url.hash ||
        !/^\/api\/v1\/?$/.test(url.pathname)
      ) {
        context.addIssue({
          code: "custom",
          message:
            "Use an HTTP(S) API origin ending in /api/v1, without credentials, query, or hash.",
        });
      }
    })
    .transform((value) => value.replace(/\/$/, "")),
});

export type AppEnv = z.infer<typeof envSchema>;

export function validateEnv(input: unknown): AppEnv {
  const result = envSchema.safeParse(input);
  if (!result.success) {
    // Report fields only; do not print potentially sensitive supplied values.
    const details = result.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`,
    );
    throw new Error(
      `Invalid environment configuration. ${details.join(" ")} Set .env.local or deployment variables.`,
    );
  }
  return result.data;
}
