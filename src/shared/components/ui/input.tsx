import type { ComponentProps } from 'react'
import { cn } from '@/shared/utils/cn'

export function Input({ className, type, ...props }: ComponentProps<'input'>) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        'h-11 w-full rounded-md border border-input bg-background px-3 text-base shadow-sm',
        'placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring',
        'disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}
