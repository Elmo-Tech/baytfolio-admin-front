import { Building2, Mail, MapPin, Phone, Store, UserRound } from "lucide-react";

import { ONBOARDING_ACTIVITY_LABELS } from "../../constants/showroom-onboarding-wizard.constants";
import type { ShowroomJoinRequest } from "../../types/showroom-join-requests.types";
import WizardShowroomReadonlyItem from "./wizard-showroom-readonly-item";

interface Props {
  request: ShowroomJoinRequest;
}

export default function WizardShowroomFields({ request }: Props) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <WizardShowroomReadonlyItem
        label="اسم المعرض"
        value={request.showroomName}
        icon={Building2}
      />
      <WizardShowroomReadonlyItem
        label="نوع النشاط"
        value={ONBOARDING_ACTIVITY_LABELS[request.activityType]}
        icon={Store}
      />
      <WizardShowroomReadonlyItem
        label="اسم المسؤول"
        value={request.contactPerson}
        icon={UserRound}
      />
      <WizardShowroomReadonlyItem
        label="رقم الهاتف / WhatsApp"
        value={request.phone}
        icon={Phone}
        dir="ltr"
      />
      <WizardShowroomReadonlyItem
        label="البريد الإلكتروني"
        value={request.email}
        icon={Mail}
        dir="ltr"
        className="md:col-span-2"
      />
      <WizardShowroomReadonlyItem
        label="موقع المعرض / المصنع"
        value={request.location}
        icon={MapPin}
        className="md:col-span-2"
      />
      <div className="rounded-lg border border-border-subtle bg-background p-5 md:col-span-2">
        <p className="text-xs font-medium text-text-muted">النبذة / الوصف</p>
        <p className="mt-3 text-sm leading-7 text-text-primary">
          {request.description ||
            "لم تتم إضافة نبذة أو وصف للمعرض في طلب الانضمام."}
        </p>
      </div>
    </div>
  );
}
