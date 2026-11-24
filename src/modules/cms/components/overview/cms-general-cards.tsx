import { ArrowLeft, FilePenLine, FileText, Headset } from "lucide-react";
import { Link } from "react-router";

import type { CMSOverviewData } from "../../types/cms";
import CMSOverviewCard from "./cms-overview-card";

interface CMSGeneralCardsProps {
  helpCenter: CMSOverviewData["helpCenter"];
  contactInfo: CMSOverviewData["contactInfo"];
}

export default function CMSGeneralCards({
  helpCenter,
  contactInfo,
}: CMSGeneralCardsProps) {
  return (
    <>
      <CMSOverviewCard
        title="مركز المساعدة"
        description="إدارة الأسئلة الشائعة ومحتوى مركز المساعدة."
        icon={FileText}
        badge={`${helpCenter.publishedQuestions} سؤالًا منشورًا`}
        action={
          <Link
            to="/admin/cms/help-center"
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-brand-navy px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary"
          >
            إدارة المحتوى
            <ArrowLeft size={16} />
          </Link>
        }
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-text-muted">التصنيفات المعتمدة</span>
          <span className="font-semibold text-text-primary">
            {helpCenter.categories.length} Categories
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {helpCenter.categories.map((category) => (
            <span
              key={category}
              className="rounded-sm bg-card px-2 py-1 text-xs text-text-secondary"
            >
              {category}
            </span>
          ))}
        </div>
      </CMSOverviewCard>

      <CMSOverviewCard
        title="تواصل معنا"
        description="إدارة بيانات التواصل الظاهرة للعملاء."
        icon={Headset}
        badge="قنوات الاتصال المباشرة"
        action={
          <Link
            to="/admin/cms/contact-information"
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-brand-navy px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary"
          >
            <FilePenLine size={16} />
            تعديل البيانات
          </Link>
        }
      >
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-text-muted">الهاتف المعتمد</span>
            <span dir="ltr" className="font-medium text-text-primary">
              {contactInfo.phone}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-text-muted">WhatsApp</span>
            <span dir="ltr" className="font-medium text-success">
              {contactInfo.whatsapp}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-text-muted">البريد الإلكتروني</span>
            <span className="font-medium text-text-primary">
              {contactInfo.email}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-text-muted">أوقات العمل</span>
            <span className="text-xs text-text-primary">
              {contactInfo.workingHours}
            </span>
          </div>
        </div>
      </CMSOverviewCard>
    </>
  );
}
