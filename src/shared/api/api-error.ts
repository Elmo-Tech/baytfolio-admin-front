import axios from 'axios'

/** Transport metadata only; backend validation/response schemas remain undefined. */
export class ApiError extends Error {
  readonly status: number | undefined
  readonly code: string | undefined

  constructor(message: string, status?: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error
  if (axios.isAxiosError(error)) {
    return new ApiError(
      error.response ? 'The API request failed.' : 'Unable to reach the API.',
      error.response?.status,
      error.code,
    )
  }
  return new ApiError('An unexpected request error occurred.')
}
