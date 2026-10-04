import { createBrowserRouter } from 'react-router-dom'
import { NotFoundPage } from '@/app/pages/not-found-page'
import { GuestOnly, RequireSession, AuthLoading } from '@/modules/auth'

const sessionPage = () =>
  import('@/modules/auth/pages/session-page').then(({ SessionPage }) => ({
    Component: SessionPage,
  }))
export const router = createBrowserRouter([
  {
    element: <GuestOnly />,
    HydrateFallback: AuthLoading,
    children: [
      {
        path: '/login',
        lazy: () =>
          import('@/modules/auth/pages/login-page').then(({ LoginPage }) => ({
            Component: LoginPage,
          })),
      },
      {
        path: '/forgot-password',
        lazy: () =>
          import('@/modules/auth/pages/recovery-page').then(({ RecoveryPage }) => ({
            Component: RecoveryPage,
          })),
      },
      {
        path: '/invite/:token',
        lazy: () =>
          import('@/modules/auth/pages/invitation-page').then(({ InvitationPage }) => ({
            Component: InvitationPage,
          })),
      },
    ],
  },
  {
    element: <RequireSession />,
    HydrateFallback: AuthLoading,
    children: [{ path: '/', lazy: sessionPage }],
  },
  {
    element: <RequireSession scope="vendor" />,
    HydrateFallback: AuthLoading,
    children: [{ path: '/vendor', lazy: sessionPage }],
  },
  {
    element: <RequireSession scope="admin" />,
    HydrateFallback: AuthLoading,
    children: [{ path: '/admin', lazy: sessionPage }],
  },
  { path: '*', element: <NotFoundPage /> },
])
