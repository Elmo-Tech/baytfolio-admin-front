import { Copy, Printer, type Store } from "lucide-react";

import { Badge, Button } from "@/shared/components/ui";

interface Props {
  showroomName: string;
  reference: string;
  activityLabel: string;
  ActivityIcon: typeof Store;
  onCopyReference: () => void;
  onPrint: () => void;
}

export default function RequestDetailsHeader({
  showroomName,
  reference,
  activityLabel,
  ActivityIcon,
  onCopyReference,
  onPrint,
}: Props) {
  return (
    <section className="flex flex-col justify-between gap-5 rounded-xl border border-border-subtle bg-card px-6 py-7 sm:flex-row sm:items-center">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <ActivityIcon size={34} />
        </div>
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
              {showroomName}
            </h1>
            <Badge
              variant="secondary"
              className="border-transparent bg-muted px-3 py-1 text-xs font-medium text-text-secondary"
            >
              {activityLabel}
            </Badge>
            <Badge
              variant="outline"
              className="border-transparent bg-warning/10 px-3 py-1 text-xs font-semibold text-warning"
            >
              ID: {reference.split("-").at(-1)}
            </Badge>
          </div>
          <p className="text-sm text-text-muted">
            طلب انضمام شريك لتصنيع منتجات جديدة مسجل عبر بوابة الشركاء الرسمية
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCopyReference}
          presentation="request-header-action"
        >
          <Copy size={18} />
          نسخ المعرف
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onPrint}
          presentation="request-header-action"
        >
          <Printer size={18} />
          طباعة الملخص
        </Button>
      </div>
    </section>
  );
}
