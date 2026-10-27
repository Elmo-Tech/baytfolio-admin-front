import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recoveryCodeSchema } from "@/modules/auth/schemas/recovery-schema";
import { FormField, SubmitButton } from "@/modules/auth/components/form-field";
import { authErrorMessage } from "@/modules/auth/utils/auth-error";
export function RecoveryCodeForm({
  onSubmit,
}: {
  onSubmit: (code: string) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(recoveryCodeSchema),
    defaultValues: { code: "" },
  });
  const submit = handleSubmit(async ({ code }) => {
    try {
      await onSubmit(code);
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
          label="رمز الاسترجاع"
          dir="ltr"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          error={errors.code}
          {...register("code")}
        />
        {errors.root && (
          <p role="alert" className="text-sm text-destructive">
            {errors.root.message}
          </p>
        )}
        <SubmitButton busy={isSubmitting}>التحقق من الرمز</SubmitButton>
      </fieldset>
    </form>
  );
}
