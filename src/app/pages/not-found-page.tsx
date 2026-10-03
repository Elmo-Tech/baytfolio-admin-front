import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl font-semibold">404 — Page not found</h1>
      <Link className="mt-4 inline-block underline focus-visible:outline-ring" to="/">
        Return to start
      </Link>
    </main>
  )
}
