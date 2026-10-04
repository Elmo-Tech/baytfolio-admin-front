import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AuthFrame } from '@/modules/auth/components/auth-frame'
import { InvitationForm } from '@/modules/auth/components/invitation-form'
import { useAuthService } from '@/modules/auth/providers/service-context'
import { authErrorMessage } from '@/modules/auth/utils/auth-error'
export function InvitationPage() {
  const { token = '' } = useParams()
  const service = useAuthService()
  const [accepted, setAccepted] = useState(false)
  const invitation = useQuery({
    queryKey: ['auth', 'invitation', token],
    queryFn: () => service.readInvitation(token),
    retry: false,
  })
  const accept = useMutation({
    mutationFn: ({ name, password }: { name: string; password: string }) =>
      service.acceptInvitation(token, name, password),
    gcTime: 0,
    retry: false,
  })
  return (
    <AuthFrame>
      <h1 className="mb-6 text-2xl font-semibold">دعوة فريق Vendor</h1>
      {accepted ? (
        <p role="status">تم قبول الدعوة. سجّل الدخول ببريد الدعوة وكلمة المرور التي اخترتها.</p>
      ) : invitation.isPending ? (
        <p role="status">جارٍ التحقق من الدعوة…</p>
      ) : invitation.isError ? (
        <p role="alert">{authErrorMessage(invitation.error)}</p>
      ) : (
        <>
          <p className="mb-4">
            دعوة للدور {invitation.data.role} على البريد{' '}
            <code dir="ltr">{invitation.data.email}</code>. مدة دعوة التجربة 30 دقيقة.
          </p>
          <InvitationForm
            onSubmit={async (name, password) => {
              try {
                await accept.mutateAsync({ name, password })
                setAccepted(true)
              } finally {
                accept.reset()
              }
            }}
          />
        </>
      )}
      <Link className="mt-5 inline-block underline" to="/login">
        العودة إلى تسجيل الدخول
      </Link>
    </AuthFrame>
  )
}
