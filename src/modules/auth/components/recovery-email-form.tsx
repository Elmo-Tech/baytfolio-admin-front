import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recoveryEmailSchema } from "@/modules/auth/schemas/recovery-schema";
import { FormField, SubmitButton } from "@/modules/auth/components/form-field";
import { authErrorMessage } from "@/modules/auth/utils/auth-error";
export function RecoveryEmailForm({
  onSubmit,
}: {
  onSubmit: (email: string) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(recoveryEmailSchema),
    defaultValues: { email: "" },
  });
  const submit = handleSubmit(async ({ email }) => {
    try {
      await onSubmit(email);
    } catch (error) {
      setError("root", { message: authErrorMessage(error) });
    }
  });
  return (
    <form noValidate onSubmit={(event) => void submit(event)}>
      <fieldset
        disabled={isSubmitting}
        className="space-y-5"
        aria-busy={isSubmitting}
      >
        <FormField
          label="البريد الإلكتروني"
          type="email"
          dir="ltr"
          autoComplete="email"
          error={errors.email}
          {...register("email")}
        />
        {errors.root && (
          <p role="alert" className="text-sm text-destructive">
            {errors.root.message}
          </p>
        )}
        <SubmitButton busy={isSubmitting}>إرسال رمز الاسترجاع</SubmitButton>
      </fieldset>
    </form>
  );
}
