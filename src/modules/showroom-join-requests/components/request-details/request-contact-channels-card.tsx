import { Mail, MessageCircle, Phone } from "lucide-react";

import { getWhatsAppUrl } from "../../utils/showroom-join-request-details.utils";
import { ContactAction, SectionHeading } from "./request-details-primitives";

interface Props {
  phone: string;
  email: string;
}

export default function RequestContactChannelsCard({ phone, email }: Props) {
  return (
    <section className="rounded-xl border border-border-subtle bg-card p-5">
      <SectionHeading
        title="قنوات التواصل والتحقق المباشر"
        description="إجراءات تواصل سريعة"
        icon={Phone}
      />
      <div className="flex flex-col gap-2 sm:flex-row">
        <ContactAction
          label="محادثة WhatsApp"
          href={getWhatsAppUrl(phone)}
          icon={MessageCircle}
          variant="whatsapp"
        />
        <ContactAction
          label="اتصال مباشر"
          href={`tel:${phone.replace(/\s/g, "")}`}
          icon={Phone}
        />
        <ContactAction
          label="إرسال بريد إلكتروني"
          href={`mailto:${email}`}
          icon={Mail}
        />
      </div>
    </section>
  );
}
