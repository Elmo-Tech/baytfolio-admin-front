import { expect, it } from 'vitest'
import { validateEnv } from '@/shared/config/env-schema'

it('accepts a versioned HTTP(S) base URL and normalizes the trailing slash', () => {
  expect(validateEnv({ VITE_API_URL: 'https://api.example.test/api/v1/' })).toEqual({
    VITE_API_URL: 'https://api.example.test/api/v1',
  })
})

it.each([
  undefined,
  '',
  'not-a-url',
  'ftp://api.example.test/api/v1',
  'https://api.example.test/api/v2',
  'https://user:password@api.example.test/api/v1',
  'https://api.example.test/api/v1?token=secret',
  'https://api.example.test/api/v1#fragment',
])('rejects an absent or invalid API configuration (%s)', (value) => {
  expect(() => validateEnv({ VITE_API_URL: value })).toThrow('Invalid environment configuration')
})
