import {
  Building2,
  FileText,
  Mail,
  Phone,
  type Store,
  UserRound,
} from "lucide-react";

import type { ShowroomJoinRequest } from "../../types/showroom-join-requests.types";
import RequestContactChannelsCard from "./request-contact-channels-card";
import { DetailItem, SectionHeading } from "./request-details-primitives";

interface Props {
  request: ShowroomJoinRequest;
  activityLabel: string;
  ActivityIcon: typeof Store;
}

export default function RequestInfoCard({
  request,
  activityLabel,
  ActivityIcon,
}: Props) {
  return (
    <>
      <section className="rounded-xl border border-border-subtle bg-card p-5">
        <SectionHeading
          title="بيانات طلب الانضمام"
          description="بيانات معتمدة من مقدم الطلب"
          icon={FileText}
        />
        <div className="grid grid-cols-1 gap-3 rounded-xl bg-background p-3 sm:grid-cols-2">
          <DetailItem
            label="اسم المعرض / المصنع"
            value={request.showroomName}
            icon={Building2}
          />
          <DetailItem
            label="نوع النشاط التجاري"
            value={activityLabel}
            icon={ActivityIcon}
          />
          <DetailItem
            label="اسم مسؤول التواصل المعتمد"
            value={request.contactPerson}
            icon={UserRound}
          />
          <DetailItem
            label="البريد الإلكتروني التجاري"
            value={request.email}
            icon={Mail}
            dir="ltr"
          />
          <div className="sm:col-span-2">
            <DetailItem
              label="رقم الهاتف ومحادثات WhatsApp"
              value={request.phone}
              icon={Phone}
              dir="ltr"
            />
          </div>
          <div className="sm:col-span-2">
            <DetailItem
              label="موقع المعرض / المصنع"
              value={request.location}
              icon={Building2}
            />
          </div>
        </div>
      </section>

      <RequestContactChannelsCard phone={request.phone} email={request.email} />
    </>
  );
}
