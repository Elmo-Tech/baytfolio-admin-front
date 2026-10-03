import axios from 'axios'
import { env } from '@/shared/config/env'
import { normalizeApiError } from '@/shared/api/api-error'

export const apiClient = axios.create({
  baseURL: env.VITE_API_URL,
  timeout: 15_000,
  headers: { Accept: 'application/json' },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(axios.isCancel(error) ? error : normalizeApiError(error)),
)

// Add auth/session interceptors only after Laravel defines the integration contract.
// Feature APIs belong in their modules. Pass AbortSignal for request cancellation.
