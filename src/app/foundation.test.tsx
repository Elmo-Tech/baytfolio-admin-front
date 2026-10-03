import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { expect, it } from 'vitest'
import { AppProviders } from '@/app/providers/app-providers'
import { FoundationPage } from '@/app/pages/foundation-page'
import { NotFoundPage } from '@/app/pages/not-found-page'

it('renders the foundation through providers and recovers from an unknown route', async () => {
  const user = userEvent.setup()
  const router = createMemoryRouter(
    [
      { path: '/', element: <FoundationPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
    { initialEntries: ['/unknown'] },
  )
  render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>,
  )
  expect(screen.getByRole('heading', { name: '404 — Page not found' })).toBeInTheDocument()
  await user.click(screen.getByRole('link', { name: 'Return to start' }))
  expect(screen.getByRole('heading', { name: 'BaytFolio Dashboard' })).toBeInTheDocument()
  expect(screen.getByText('Frontend foundation ready.')).toBeInTheDocument()
})
