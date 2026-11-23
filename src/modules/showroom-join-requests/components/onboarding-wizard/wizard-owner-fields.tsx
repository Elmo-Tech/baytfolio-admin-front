import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Mail, Phone, UserRound } from "lucide-react";

import { Input, Label } from "@/shared/components/ui";

import type { OwnerFormValues } from "../../schemas/showroom-owner-form.schema";
import WizardOwnerRoleField from "./wizard-owner-role-field";

interface Props {
  register: UseFormRegister<OwnerFormValues>;
  errors: FieldErrors<OwnerFormValues>;
}

export default function WizardOwnerFields({ register, errors }: Props) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="name" presentation="owner-label">
          الاسم الكامل
        </Label>
        <div className="relative">
          <UserRound
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <Input
            id="name"
            {...register("name")}
            placeholder="أدخل الاسم الكامل"
            presentation="owner-field"
          />
        </div>
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" presentation="owner-label">
          البريد الإلكتروني
        </Label>
        <div className="relative">
          <Mail
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <Input
            id="email"
            dir="ltr"
            {...register("email")}
            placeholder="example@email.com"
            presentation="owner-field"
          />
        </div>
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" presentation="owner-label">
          رقم الهاتف
        </Label>
        <div className="relative">
          <Phone
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <Input
            id="phone"
            dir="ltr"
            {...register("phone")}
            placeholder="أدخل رقم الهاتف"
            presentation="owner-field"
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <WizardOwnerRoleField />
    </div>
  );
}
