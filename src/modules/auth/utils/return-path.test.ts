import { expect, it } from 'vitest'
import { safeReturnPath } from './return-path'
it.each([
  null,
  'https://evil.example',
  '//evil.example',
  '/\\evil.example',
  '/%2f%2fevil.example',
  '/%5cevil.example',
  '/login',
  '/login?returnTo=/admin',
  '/invite/token',
  '/forgot-password',
  '/%ZZ',
  '/ admin',
])('rejects unsafe or circular navigation (%s)', (value) => {
  expect(safeReturnPath(value, '/vendor')).toBe('/vendor')
})
it('keeps a local path and its query/hash', () => {
  expect(safeReturnPath('/vendor?tab=example#top', '/')).toBe('/vendor?tab=example#top')
})
