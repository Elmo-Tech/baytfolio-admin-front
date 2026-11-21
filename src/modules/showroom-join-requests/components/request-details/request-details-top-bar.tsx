import { ArrowRight } from "lucide-react";

import { Badge, Button } from "@/shared/components/ui";

import {
  formatRequestDate,
  formatRequestTime,
} from "../../utils/showroom-join-request-details.utils";

interface Props {
  reference: string;
  submittedAt: string;
  statusLabel: string;
  statusClassName: string;
  isRejected: boolean;
  eventTimestamp?: string;
  onBack: () => void;
}

export default function RequestDetailsTopBar({
  reference,
  submittedAt,
  statusLabel,
  statusClassName,
  isRejected,
  eventTimestamp,
  onBack,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-subtle bg-card px-4 py-3">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onBack}
          className="gap-2 text-xs"
        >
          <ArrowRight size={14} />
          العودة إلى قائمة الطلبات
        </Button>
        <span className="h-4 w-px bg-border-subtle" />
        <span className="text-xs font-medium text-text-secondary" dir="ltr">
          #{reference}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Badge
          variant="outline"
          className={`border-transparent text-xs ${statusClassName}`}
        >
          <span className="me-1.5 size-1.5 rounded-full bg-current" />
          {isRejected ? "تم رفض الانضمام" : statusLabel}
        </Badge>
        <span className="text-xs text-text-muted" dir="ltr">
          {eventTimestamp
            ? `${formatRequestTime(eventTimestamp)} — ${formatRequestDate(eventTimestamp.slice(0, 10))}`
            : formatRequestDate(submittedAt)}
        </span>
      </div>
    </div>
  );
}
