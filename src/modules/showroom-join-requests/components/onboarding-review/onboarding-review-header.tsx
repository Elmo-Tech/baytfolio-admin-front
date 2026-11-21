import { BadgeCheck, ClipboardCheck } from "lucide-react";

export default function OnboardingReviewHeader() {
  return (
    <div className="mb-6 flex flex-col justify-between gap-3 border-b border-border-subtle pb-5 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <ClipboardCheck size={21} className="text-text-primary" />
        <div>
          <h2 className="font-bold text-text-primary">مراجعة جميع البيانات</h2>
          <p className="mt-1 text-xs text-text-muted">
            البيانات التالية سيتم استخدامها في تجهيز المعرض.
          </p>
        </div>
      </div>

      <div className="flex w-fit items-center gap-2 rounded-md bg-success/10 px-3 py-2 text-xs font-medium text-success">
        <BadgeCheck size={15} />
        الطلب معتمد وجاهز للإنشاء
      </div>
    </div>
  );
}
