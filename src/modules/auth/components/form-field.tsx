import { useId, type ComponentProps } from 'react'
import type { FieldError } from 'react-hook-form'
import { Input } from '@/shared/components/ui/input'
export function FormField({
  label,
  error,
  ...props
}: ComponentProps<typeof Input> & { label: string; error?: FieldError | undefined }) {
  const id = useId()
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p role="alert" id={`${id}-error`} className="text-sm text-destructive">
          {error.message}
        </p>
      )}
    </div>
  )
}
export function SubmitButton({ busy, children }: { busy: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="min-h-11 w-full rounded-md bg-primary px-4 text-primary-foreground disabled:opacity-50"
    >
      {busy ? 'جارٍ الإرسال…' : children}
    </button>
  )
}
