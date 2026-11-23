import { Textarea } from "@/shared/components/ui/textarea";
import { RefreshCw } from "lucide-react";

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";

import {
  REQUEST_DETAILS_STATUS_CONFIG,
  REQUEST_STATUSES,
} from "../../constants/showroom-join-request-details.constants";
import type { ShowroomJoinRequestStatus } from "../../types/showroom-join-requests.types";

interface Props {
  selectedStatus: ShowroomJoinRequestStatus;
  onStatusChange: (status: ShowroomJoinRequestStatus) => void;
  internalNote: string;
  onInternalNoteChange: (note: string) => void;
}

export default function RequestQuickStatusForm({
  selectedStatus,
  onStatusChange,
  internalNote,
  onInternalNoteChange,
}: Props) {
  return (
    <div className="rounded-lg border border-border-subtle bg-background p-3">
      <h3 className="mb-3 text-xs font-bold text-text-primary">
        تحديث حالة الطلب السريع
      </h3>
      <Select
        value={selectedStatus}
        onValueChange={(value) =>
          onStatusChange(value as ShowroomJoinRequestStatus)
        }
      >
        <SelectTrigger className="h-10 w-full border-border-subtle bg-card text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {REQUEST_STATUSES.map((status) => (
            <SelectItem key={status} value={status}>
              {REQUEST_DETAILS_STATUS_CONFIG[status].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea
        value={internalNote}
        onChange={(e) => onInternalNoteChange(e.target.value)}
        rows={3}
        placeholder="أدخل ملخص القرار أو أسباب التحويل..."
        className="mt-3 w-full resize-y rounded-md border border-border-subtle bg-card px-3 py-2 text-xs text-text-primary"
      />
      <Button
        type="button"
        disabled
        className="mt-3 h-10 w-full gap-2 bg-primary text-primary-foreground"
      >
        <RefreshCw size={15} />
        حفظ تحديث الحالة
      </Button>
    </div>
  );
}
