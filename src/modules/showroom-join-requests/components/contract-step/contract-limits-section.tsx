import { DoorOpen, Package, ShieldCheck } from "lucide-react";

import { Badge } from "@/shared/components/ui";

import type { ContractStepValues } from "../../types/showroom-join-requests.types";
import {
  ContractInputField,
  ContractSectionHeading,
} from "./contract-form-fields";

interface Props {
  roomsLimit: string;
  packagesLimit: string;
  onUpdate: <K extends keyof ContractStepValues>(
    k: K,
    v: ContractStepValues[K],
  ) => void;
}

export default function ContractLimitsSection({
  roomsLimit,
  packagesLimit,
  onUpdate,
}: Props) {
  return (
    <section className="mt-7">
      <ContractSectionHeading
        title="الحدود التشغيلية"
        description="حدد الحصص المصرح بها للمعرض داخل المنصة."
        icon={ShieldCheck}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-lg border border-border-subtle bg-background p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DoorOpen size={18} className="text-brand-navy" />
              <span className="text-sm font-semibold text-text-primary">
                حد الغرف
              </span>
            </div>
            <Badge variant="outline">غرفة</Badge>
          </div>
          <ContractInputField
            label=" "
            value={roomsLimit}
            onChange={(v) => onUpdate("roomsLimit", v)}
            type="number"
            min={1}
            prefix="غرفة معتمدة"
            dir="ltr"
          />
        </div>

        <div className="rounded-lg border border-border-subtle bg-background p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package size={18} className="text-brand-navy" />
              <span className="text-sm font-semibold text-text-primary">
                حد الباقات
              </span>
            </div>
            <Badge variant="outline">باقة</Badge>
          </div>
          <ContractInputField
            label=" "
            value={packagesLimit}
            onChange={(v) => onUpdate("packagesLimit", v)}
            type="number"
            min={1}
            prefix="باقة منشورة"
            dir="ltr"
          />
        </div>
      </div>
    </section>
  );
}
