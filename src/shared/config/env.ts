import { validateEnv } from '@/shared/config/env-schema'

export const env = validateEnv(import.meta.env)
