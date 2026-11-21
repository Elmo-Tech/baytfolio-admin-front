import { Check, Circle, CircleX, RefreshCw } from "lucide-react";

import { Badge } from "@/shared/components/ui";

export interface WorkflowStepItem {
  title: string;
  description: string;
}

interface Props {
  isRejected: boolean;
  isApproved: boolean;
  progressIndex: number;
  steps: readonly WorkflowStepItem[];
}

export default function RequestWorkflowSteps({
  isRejected,
  isApproved,
  progressIndex,
  steps,
}: Props) {
  return (
    <div className="space-y-5">
      {steps.map((step, index) => {
        const isRejectedStep = isRejected && index === 2;
        const isStepCompleted = isApproved || index < progressIndex;
        const isCurrent = !isRejected && !isApproved && index === progressIndex;

        return (
          <div key={step.title} className="relative flex gap-3">
            <div
              className={`relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full ${
                isRejectedStep
                  ? "border border-destructive/30 bg-destructive/10 text-destructive"
                  : isStepCompleted
                    ? "bg-success text-success-foreground"
                    : isCurrent
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-text-muted"
              }`}
            >
              {isRejectedStep ? (
                <CircleX size={15} />
              ) : isStepCompleted ? (
                <Check size={14} />
              ) : isCurrent ? (
                <RefreshCw size={14} />
              ) : (
                <Circle size={12} />
              )}
            </div>
            <div className="min-w-0 flex-1 pb-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p
                  className={`text-xs font-semibold ${
                    isRejectedStep
                      ? "text-destructive"
                      : isStepCompleted
                        ? "text-success"
                        : isCurrent
                          ? "text-primary"
                          : "text-text-muted"
                  }`}
                >
                  {index + 1}. {step.title}
                </p>
                {isApproved && (
                  <Badge className="border-transparent bg-success/10 text-[10px] text-success">
                    مكتمل
                  </Badge>
                )}
                {isCurrent && (
                  <Badge variant="secondary" className="text-[10px]">
                    الحالي
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-[11px] leading-5 text-text-muted">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
