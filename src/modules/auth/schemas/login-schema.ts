// Compatibility entry point for legacy imports. Keep the schema implementation
// in login.schema.ts so there is a single validation source of truth.
export { loginSchema, type LoginFormValues } from "./login.schema";
