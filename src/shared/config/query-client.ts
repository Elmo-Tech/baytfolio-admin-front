import { QueryClient } from '@tanstack/react-query'

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      // Avoid replaying requests until individual backend operations define retry safety.
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}
