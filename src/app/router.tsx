import { createBrowserRouter } from 'react-router-dom'
import { FoundationPage } from '@/app/pages/foundation-page'
import { NotFoundPage } from '@/app/pages/not-found-page'

export const router = createBrowserRouter([
  { path: '/', element: <FoundationPage /> },
  { path: '*', element: <NotFoundPage /> },
])
