import { FilePenLine, Gavel, Shield } from "lucide-react";
import { Link } from "react-router";

import type { CMSLegalContent } from "../../types/cms";
import CMSLegalDetails from "./cms-legal-details";
import CMSOverviewCard from "./cms-overview-card";

interface CMSLegalCardsProps {
  privacyPolicy: CMSLegalContent;
  termsConditions: CMSLegalContent;
}

export default function CMSLegalCards({
  privacyPolicy,
  termsConditions,
}: CMSLegalCardsProps) {
  return (
    <>
      <CMSOverviewCard
        title="سياسة الخصوصية"
        description="تعديل محتوى سياسة الخصوصية وتاريخ آخر تحديث."
        icon={Shield}
        badge="الحالة: منشور"
        action={
          <Link
            to="/admin/cms/privacy-policy"
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-brand-navy px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary"
          >
            <FilePenLine size={16} />
            تعديل المحتوى
          </Link>
        }
      >
        <CMSLegalDetails content={privacyPolicy} />
      </CMSOverviewCard>

      <CMSOverviewCard
        title="الشروط والأحكام"
        description="تعديل محتوى الشروط والأحكام وتاريخ آخر تحديث."
        icon={Gavel}
        badge="الحالة: منشور"
        action={
          <Link
            to="/admin/cms/terms-and-conditions"
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-brand-navy px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary"
          >
            <FilePenLine size={16} />
            تعديل المحتوى
          </Link>
        }
      >
        <CMSLegalDetails content={termsConditions} />
      </CMSOverviewCard>
    </>
  );
}
