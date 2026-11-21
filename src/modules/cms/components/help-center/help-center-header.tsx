import { ArrowRight, Plus } from "lucide-react";

import { Button } from "@/shared/components/ui";

interface HelpCenterHeaderProps {
  onBack: () => void;
  onAdd: () => void;
}

export default function HelpCenterHeader({
  onBack,
  onAdd,
}: HelpCenterHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-users-text-primary">
          مركز المساعدة
        </h1>

        <p className="mt-2 text-sm text-users-text-muted">
          إدارة الأسئلة الشائعة الظاهرة في موقع وتطبيق BaytFolio.
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-10 gap-2 border-users-panel-divider bg-users-surface text-users-text-secondary hover:bg-background"
        >
          <ArrowRight size={16} />
          العودة لإدارة المحتوى
        </Button>

        <Button type="button" onClick={onAdd} className="h-10 shrink-0 gap-2">
          <Plus size={17} />
          إضافة سؤال
        </Button>
      </div>
    </header>
  );
}
