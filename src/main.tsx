import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppProviders } from '@/app/providers/app-providers'
import { router } from '@/app/router'
import '@/shared/config/env'
import '@/app/styles.css'

const root = document.getElementById('root')
if (!root) throw new Error('Application root element is missing.')

createRoot(root).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
)
