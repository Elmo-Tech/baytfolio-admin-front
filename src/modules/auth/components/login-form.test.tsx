import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { LoginForm } from './login-form'
import { DemoAuthError } from '@/modules/auth/api/demo-auth-service'
it('validates before submitting and preserves the exact password', async () => {
  const user = userEvent.setup()
  const submit = vi.fn().mockResolvedValue(undefined)
  render(<LoginForm onSubmit={submit} />)
  await user.click(screen.getByRole('button', { name: 'تسجيل الدخول' }))
  expect(await screen.findByText('أدخل كلمة المرور.')).toBeInTheDocument()
  expect(submit).not.toHaveBeenCalled()
  await user.type(screen.getByLabelText('البريد الإلكتروني'), 'owner@vendor.example')
  await user.type(screen.getByLabelText('كلمة المرور', { exact: true }), ' password with spaces ')
  await user.click(screen.getByRole('button', { name: 'إظهار كلمة المرور' }))
  expect(screen.getByLabelText('كلمة المرور', { exact: true })).toHaveAttribute('type', 'text')
  await user.click(screen.getByRole('button', { name: 'تسجيل الدخول' }))
  await waitFor(() =>
    expect(submit).toHaveBeenCalledWith({
      email: 'owner@vendor.example',
      password: ' password with spaces ',
    }),
  )
  await waitFor(() => expect(screen.getByLabelText('كلمة المرور', { exact: true })).toHaveValue(''))
})
it('disables duplicate submission while pending and clears password after failure', async () => {
  const user = userEvent.setup()
  let reject: (reason: Error) => void = () => {
    throw new Error('Not started')
  }
  const promise = new Promise<void>((_resolve, fail) => {
    reject = fail
  })
  const submit = vi.fn(() => promise)
  render(<LoginForm onSubmit={submit} />)
  await user.type(screen.getByLabelText('البريد الإلكتروني'), 'owner@vendor.example')
  await user.type(screen.getByLabelText('كلمة المرور', { exact: true }), 'wrong')
  await user.click(screen.getByRole('button', { name: 'تسجيل الدخول' }))
  expect(await screen.findByRole('button', { name: 'جارٍ تسجيل الدخول…' })).toBeDisabled()
  await act(async () => {
    reject(new DemoAuthError('البريد الإلكتروني أو كلمة المرور غير صحيحة.'))
    await promise.catch(() => undefined)
  })
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
  )
  expect(screen.getByLabelText('كلمة المرور', { exact: true })).toHaveValue('')
  expect(submit).toHaveBeenCalledTimes(1)
})
