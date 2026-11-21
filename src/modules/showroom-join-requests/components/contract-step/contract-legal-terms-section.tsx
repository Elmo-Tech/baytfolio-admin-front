import { FileText, Gavel } from "lucide-react";

import { Badge } from "@/shared/components/ui";

import type { ContractStepValues } from "../../types/showroom-join-requests.types";
import {
  ContractInputField,
  ContractSectionHeading,
} from "./contract-form-fields";

interface Props {
  values: ContractStepValues;
  onUpdate: <K extends keyof ContractStepValues>(
    k: K,
    v: ContractStepValues[K],
  ) => void;
}

export default function ContractLegalTermsSection({ values, onUpdate }: Props) {
  return (
    <section className="mt-8 rounded-lg border border-border-subtle bg-background p-5">
      <ContractSectionHeading
        title="الشروط والبيانات القانونية"
        description="البنود التعاقدية وبيانات الطرف المتعاقد."
        icon={Gavel}
      />

      <div className="mb-4 flex items-center justify-between rounded-md border border-border-subtle bg-card p-3 text-xs">
        <span className="flex items-center gap-2 font-semibold">
          <FileText size={15} className="text-brand-navy" />
          قالب العقد: BaytFolio القياسي V1
        </span>
        <Badge variant="outline">نشط</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ContractInputField
          label="الاسم القانوني للمنشأة"
          value={values.legalName}
          onChange={(v) => onUpdate("legalName", v)}
        />
        <ContractInputField
          label="اسم المفوض بالتوقيع"
          value={values.authorizedPerson}
          onChange={(v) => onUpdate("authorizedPerson", v)}
        />
        <ContractInputField
          label="صفة المفوض"
          value={values.legalRole}
          onChange={(v) => onUpdate("legalRole", v)}
        />
        <ContractInputField
          label="السجل التجاري / البطاقة الضريبية"
          value={values.registrationNumber}
          onChange={(v) => onUpdate("registrationNumber", v)}
        />
        <ContractInputField
          label="بنود خاصة (تظهر في العقد)"
          value={values.specialTerms}
          onChange={(v) => onUpdate("specialTerms", v)}
        />
        <ContractInputField
          label="ملاحظات داخلية للإدارة"
          value={values.internalNotes}
          onChange={(v) => onUpdate("internalNotes", v)}
        />
      </div>
    </section>
  );
}
