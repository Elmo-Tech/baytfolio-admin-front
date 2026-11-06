import { Download, Plus } from "lucide-react";

import { Button } from "@/shared/components/ui";

type ShowroomsHeaderProps = {
  onAddClick?: () => void;
  onExportClick?: () => void;
};

export default function ShowroomsHeader({
  onAddClick,
  onExportClick,
}: ShowroomsHeaderProps) {
  return (
    <section
      dir="rtl"
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-text-primary">
          المعارض والمصانع
        </h1>

        <p className="text-sm text-text-secondary">
          إدارة المعارض والمصانع المسجلة على BaytFolio ومتابعة حالتها وعقودها
          ومحتواها.
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Button
          size="lg"
          className="bg-primary text-primary-foreground"
          onClick={onAddClick}
        >
          <Plus className="size-4" />
          تسجيل جهة جديدة
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="border-border-warm bg-card text-text-secondary hover:bg-muted"
          onClick={onExportClick}
        >
          <Download className="size-4" />
          تصدير البيانات
        </Button>
      </div>
    </section>
  );
}
