import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import { useNavigate } from "react-router";

export default function ShowroomDetailsNotFound() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-users-panel-border bg-users-surface p-8 text-center"
    >
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-users-stat-neutral-bg">
        <Building2 size={26} className="text-users-text-muted" />
      </div>

      <h2 className="text-lg font-bold text-users-text-primary">
        المعرض غير موجود
      </h2>

      <p className="mt-2 text-sm text-users-text-muted">
        لم نتمكن من العثور على بيانات المعرض المطلوب.
      </p>

      <Button
        unstyled
        type="button"
        onClick={() => navigate("/showrooms")}
        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-users-panel-border px-4 py-2 text-sm font-medium text-users-text-primary hover:bg-users-stat-neutral-bg"
      >
        <ArrowRight size={16} />
        العودة إلى المعارض
      </Button>
    </div>
  );
}
