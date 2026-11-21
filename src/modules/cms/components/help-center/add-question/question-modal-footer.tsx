import { Info, PlusCircle } from "lucide-react";

import { Button } from "@/shared/components/ui";

interface Props {
  isEditing: boolean;
  onClose: () => void;
}

export default function QuestionModalFooter({ isEditing, onClose }: Props) {
  return (
    <footer className="flex shrink-0 flex-col gap-3 border-t border-users-panel-divider px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-center gap-1.5 text-xs text-users-text-muted">
        <Info size={14} />
        الحقول المشار إليها بـ (*) إلزامية
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="submit"
          className="h-10 gap-2 rounded-md bg-brand-navy px-5 text-primary-foreground hover:bg-brand-navy/90"
        >
          {isEditing ? "حفظ التعديلات" : "إضافة السؤال"}
          <PlusCircle size={17} />
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="h-10 rounded-md border-users-panel-divider px-4 text-users-text-secondary"
        >
          إلغاء
        </Button>
      </div>
    </footer>
  );
}
