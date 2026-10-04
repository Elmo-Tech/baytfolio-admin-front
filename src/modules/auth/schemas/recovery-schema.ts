import { z } from 'zod'
// Demonstration policy only; actual Laravel password/verification rules must replace it.
export const recoveryEmailSchema = z.object({
  email: z.string().trim().pipe(z.email('أدخل بريدًا إلكترونيًا صحيحًا.')),
})
export const recoveryCodeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'أدخل رمزًا من 6 أرقام.'),
})
export const newPasswordSchema = z
  .object({
    password: z.string().min(8, 'في التجربة، كلمة المرور لا تقل عن 8 أحرف.'),
    confirmation: z.string(),
  })
  .refine((values) => values.password === values.confirmation, {
    path: ['confirmation'],
    message: 'كلمتا المرور غير متطابقتين.',
  })
export const invitationSchema = z
  .object({
    name: z.string().trim().min(1, 'أدخل الاسم.'),
    password: z.string().min(8, 'في التجربة، كلمة المرور لا تقل عن 8 أحرف.'),
    confirmation: z.string(),
  })
  .refine((values) => values.password === values.confirmation, {
    path: ['confirmation'],
    message: 'كلمتا المرور غير متطابقتين.',
  })
