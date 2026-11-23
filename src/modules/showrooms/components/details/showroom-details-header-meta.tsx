import type { ShowroomDetails } from "../../types/showroom-details";
import ShowroomStatusBadge from "../showroom-status-badge";

interface ShowroomDetailsHeaderMetaProps {
  showroom: ShowroomDetails;
  initials: string;
  activityLabel: string;
}

export default function ShowroomDetailsHeaderMeta({
  showroom,
  initials,
  activityLabel,
}: ShowroomDetailsHeaderMetaProps) {
  return (
    <div className="flex w-full min-w-0 items-start justify-end gap-4 sm:gap-5 min-[1501px]:col-start-2 min-[1501px]:row-start-1">
      <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-users-text-primary text-xl font-bold text-surface-white sm:size-20 sm:text-2xl">
        {initials}
      </div>

      <div className="min-w-0 flex-1 space-y-4 text-right">
        <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4">
          <h1 className="text-xl font-bold text-users-text-primary sm:text-2xl lg:text-3xl">
            {showroom.name}
          </h1>
          <ShowroomStatusBadge status={showroom.status} />
          <span className="rounded-lg border border-border-warm bg-users-stat-neutral-bg px-3 py-1.5 text-xs font-medium text-users-text-secondary sm:text-sm">
            {activityLabel}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-3 text-sm text-users-text-muted">
          <span>
            المالك:{" "}
            <strong className="text-users-text-primary">
              {showroom.owner.name}
            </strong>
          </span>
          <span>
            مرجع العقد:{" "}
            <strong
              dir="ltr"
              className="inline-block rounded-md border border-border-warm bg-users-stat-neutral-bg px-2.5 py-1 text-users-text-primary"
            >
              {showroom.contract.number}
            </strong>
          </span>
        </div>

        <p className="text-sm text-users-text-muted">
          طلب الانضمام المعتمد:{" "}
          <span
            dir="ltr"
            className="inline-block font-semibold text-users-text-primary underline"
          >
            #APP-{showroom.reference}
          </span>
        </p>
      </div>
    </div>
  );
}
