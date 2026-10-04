// Frontend navigation only; never treat a caller-supplied absolute URL as a redirect target.
export function safeReturnPath(value: string | null, fallback: string): string {
  if (
    !value?.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('\\') ||
    [...value].some((character) => character.charCodeAt(0) <= 32)
  )
    return fallback
  try {
    const url = new URL(value, 'https://dashboard.example')
    const decoded = decodeURIComponent(url.pathname)
    if (
      url.origin !== 'https://dashboard.example' ||
      decoded.startsWith('//') ||
      decoded.includes('\\') ||
      /^\/(login|forgot-password|reset-password|invite)(\/|$)/.test(decoded)
    )
      return fallback
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return fallback
  }
}
