import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { LoginForm } from '@/modules/auth/components/login-form'
import { AuthFrame } from '@/modules/auth/components/auth-frame'
import { useLogin } from '@/modules/auth/hooks/use-auth'
import {
  demoAccounts,
  DEMO_PASSWORD,
  DEMO_INVITATION_TOKEN,
} from '@/modules/auth/constants/demo-accounts'
import { safeReturnPath } from '@/modules/auth/utils/return-path'
import type { LoginValues } from '@/modules/auth/schemas/login-schema'

export function LoginPage() {
  const login = useLogin()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  async function submit(values: LoginValues) {
    try {
      const session = await login.mutateAsync(values)
      await navigate(safeReturnPath(params.get('returnTo'), `/${session.user.scope}`), {
        replace: true,
      })
    } finally {
      login.reset()
    }
  }
  return (
    <AuthFrame>
      <LoginForm onSubmit={submit} />
      <Link to="/forgot-password" className="mt-5 inline-block underline">
        نسيت كلمة المرور؟
      </Link>
      <details className="mt-8 rounded-md border p-4">
        <summary className="cursor-pointer font-medium">حسابات التجربة</summary>
        <p className="my-3 text-sm">
          كلمة المرور لجميع الحسابات: <code dir="ltr">{DEMO_PASSWORD}</code>
        </p>
        <ul className="space-y-3 text-sm">
          {demoAccounts.map((account) => (
            <li key={account.id}>
              <span>
                {account.scope === 'vendor' ? 'Vendor' : 'Admin'} — {account.role}
                {!account.active || !account.organizationActive ? ' (غير مفعّل)' : ''}
              </span>
              <code dir="ltr" className="block break-all">
                {account.email}
              </code>
            </li>
          ))}
        </ul>
        <Link className="mt-4 inline-block underline" to={`/invite/${DEMO_INVITATION_TOKEN}`}>
          تجربة دعوة عضو Vendor
        </Link>
      </details>
    </AuthFrame>
  )
}
