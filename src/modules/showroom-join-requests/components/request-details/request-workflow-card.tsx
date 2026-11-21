import { Workflow } from "lucide-react";

import type { ShowroomJoinRequestStatus } from "../../types/showroom-join-requests.types";
import { SectionHeading } from "./request-details-primitives";
import RequestQuickStatusForm from "./request-quick-status-form";
import RequestWorkflowSteps, {
  type WorkflowStepItem,
} from "./request-workflow-steps";

interface Props {
  selectedStatus: ShowroomJoinRequestStatus;
  onStatusChange: (status: ShowroomJoinRequestStatus) => void;
  internalNote: string;
  onInternalNoteChange: (note: string) => void;
  isRejected: boolean;
  isApproved: boolean;
  progressIndex: number;
  steps: readonly WorkflowStepItem[];
}

export default function RequestWorkflowCard({
  selectedStatus,
  onStatusChange,
  internalNote,
  onInternalNoteChange,
  isRejected,
  isApproved,
  progressIndex,
  steps,
}: Props) {
  const description = isRejected
    ? "تم إيقاف المعالجة"
    : isApproved
      ? "3 من 3 (مكتمل)"
      : `المرحلة ${progressIndex + 1} من 3`;

  return (
    <section className="rounded-xl border border-border-subtle bg-card p-4">
      <SectionHeading
        title="مسار معالجة الطلب"
        description={description}
        icon={Workflow}
      />
      <RequestWorkflowSteps
        isRejected={isRejected}
        isApproved={isApproved}
        progressIndex={progressIndex}
        steps={steps}
      />
      <div className="my-5 border-t border-border-subtle" />
      <RequestQuickStatusForm
        selectedStatus={selectedStatus}
        onStatusChange={onStatusChange}
        internalNote={internalNote}
        onInternalNoteChange={onInternalNoteChange}
      />
    </section>
  );
}
