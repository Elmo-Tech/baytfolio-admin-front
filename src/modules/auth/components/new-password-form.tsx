import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema } from "@/modules/auth/schemas/recovery-schema";
import { FormField, SubmitButton } from "@/modules/auth/components/form-field";
import { authErrorMessage } from "@/modules/auth/utils/auth-error";
export function NewPasswordForm({
  onSubmit,
}: {
  onSubmit: (password: string) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: "", confirmation: "" },
  });
  const submit = handleSubmit(async ({ password }) => {
    try {
      await onSubmit(password);
      reset();
    } catch (error) {
      reset();
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
          label="كلمة المرور الجديدة"
          type="password"
          dir="ltr"
          autoComplete="new-password"
          error={errors.password}
          {...register("password")}
        />
        <FormField
          label="تأكيد كلمة المرور"
          type="password"
          dir="ltr"
          autoComplete="new-password"
          error={errors.confirmation}
          {...register("confirmation")}
        />
        {errors.root && (
          <p role="alert" className="text-sm text-destructive">
            {errors.root.message}
          </p>
        )}
        <SubmitButton busy={isSubmitting}>حفظ كلمة المرور</SubmitButton>
      </fieldset>
    </form>
  );
}
