import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { authErrorMessage } from '@/modules/auth/utils/auth-error'
import { Input } from '@/shared/components/ui/input'
import { loginSchema, type LoginValues } from '@/modules/auth/schemas/login-schema'

interface LoginFormProps {
  /** Supplied by an approved integration; the form never sends HTTP requests itself. */
  onSubmit: (values: LoginValues) => Promise<void>
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const id = useId()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    reset,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  async function submit(values: LoginValues): Promise<void> {
    try {
      await onSubmit(values)
      reset()
    } catch (error) {
      resetField('password')
      setError('root.submit', { message: authErrorMessage(error) })
    } finally {
      setShowPassword(false)
    }
  }

  return (
    <form noValidate dir="rtl" lang="ar" onSubmit={(event) => void handleSubmit(submit)(event)}>
      <fieldset disabled={isSubmitting} className="space-y-5" aria-busy={isSubmitting}>
        <legend className="mb-6 text-xl font-semibold">تسجيل الدخول</legend>
        <div className="space-y-2">
          <label htmlFor={`${id}-email`} className="block text-sm font-medium">
            البريد الإلكتروني
          </label>
          <Input
            id={`${id}-email`}
            type="email"
            dir="ltr"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p id={`${id}-email-error`} role="alert" className="text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor={`${id}-password`} className="block text-sm font-medium">
            كلمة المرور
          </label>
          <div className="relative">
            <Input
              id={`${id}-password`}
              type={showPassword ? 'text' : 'password'}
              dir="ltr"
              autoComplete="current-password"
              className="pe-12"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? `${id}-password-error` : undefined}
              {...register('password')}
            />
            <button
              type="button"
              aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-0 top-0 flex size-11 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-ring"
            >
              {showPassword ? <EyeOff aria-hidden size={18} /> : <Eye aria-hidden size={18} />}
            </button>
          </div>
          {errors.password && (
            <p id={`${id}-password-error`} role="alert" className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>
        {errors.root?.submit && (
          <p role="alert" className="text-sm text-destructive">
            {errors.root.submit.message}
          </p>
        )}
        <button
          type="submit"
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting && (
            <LoaderCircle
              aria-hidden
              size={18}
              className="animate-spin motion-reduce:animate-none"
            />
          )}
          {isSubmitting ? 'جارٍ تسجيل الدخول…' : 'تسجيل الدخول'}
        </button>
      </fieldset>
    </form>
  )
}
