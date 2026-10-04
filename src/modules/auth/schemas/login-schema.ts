import { z } from 'zod'

/** Form values only; this is not a Laravel request contract. */
export const loginSchema = z.object({
  email: z.string().trim().pipe(z.email('أدخل بريدًا إلكترونيًا صحيحًا.')),
  // Existing passwords must not be subjected to an invented signup policy or trimmed.
  password: z.string().min(1, 'أدخل كلمة المرور.'),
})

export type LoginValues = z.infer<typeof loginSchema>
