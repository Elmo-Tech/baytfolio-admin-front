import type { UseFormReturn } from "react-hook-form";
import { ArrowLeft, ArrowRight, UserRound } from "lucide-react";

import { Button } from "@/shared/components/ui";

import type { OwnerFormValues } from "../../schemas/showroom-owner-form.schema";
import WizardOwnerFields from "./wizard-owner-fields";

interface Props {
  form: UseFormReturn<OwnerFormValues>;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  onPrevious: () => void;
}

export default function WizardStepOwner({ form, onSubmit, onPrevious }: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-border-subtle bg-card p-5 sm:p-7"
    >
      <div className="border-b border-border-subtle pb-5">
        <div className="flex items-center gap-2">
          <UserRound size={20} className="text-brand-navy" />
          <h2 className="text-lg font-bold text-text-primary">
            حساب مالك المعرض
          </h2>
        </div>
        <p className="mt-2 text-sm text-text-muted">
          بيانات مسؤول التواصل المعتمدة ستستخدم لإعداد حساب المالك.
        </p>
      </div>

      <WizardOwnerFields register={register} errors={errors} />

      <div className="mt-7 flex flex-col-reverse justify-between gap-3 border-t border-border-subtle pt-5 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="gap-2"
        >
          <ArrowRight size={16} />
          السابق — بيانات المعرض
        </Button>
        <Button
          type="submit"
          className="gap-2 bg-brand-navy text-white hover:bg-brand-navy/90"
        >
          التالي — العقد والحدود
          <ArrowLeft size={16} />
        </Button>
      </div>
    </form>
  );
}
