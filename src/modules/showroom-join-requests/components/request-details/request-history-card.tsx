import { Clock3 } from "lucide-react";

import { Badge } from "@/shared/components/ui";

import { REQUEST_DETAILS_STATUS_CONFIG } from "../../constants/showroom-join-request-details.constants";
import type { ShowroomJoinRequestHistoryEvent } from "../../types/showroom-join-requests.types";
import {
  formatRequestDate,
  formatRequestTime,
} from "../../utils/showroom-join-request-details.utils";
import { SectionHeading } from "./request-details-primitives";

export default function RequestHistoryCard({
  events,
}: {
  events: readonly ShowroomJoinRequestHistoryEvent[];
}) {
  return (
    <section className="rounded-xl border border-border-subtle bg-card p-4">
      <SectionHeading
        title="سجل حالة الطلب"
        description="تاريخ الطلب"
        icon={Clock3}
      />
      <div className="space-y-3">
        {events.map((event) => {
          const cfg = REQUEST_DETAILS_STATUS_CONFIG[event.status];
          const isRejection = event.status === "rejected";
          return (
            <article
              key={event.id}
              className={`rounded-lg border p-3 ${
                isRejection
                  ? "border-destructive/20 bg-destructive/5"
                  : "border-border-subtle bg-background"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge
                  variant="secondary"
                  className={`border-transparent text-[10px] ${cfg.className}`}
                >
                  {cfg.label}
                </Badge>
                <span className="text-[10px] text-text-muted" dir="ltr">
                  {formatRequestTime(event.timestamp)} —{" "}
                  {formatRequestDate(event.timestamp.slice(0, 10))}
                </span>
              </div>
              <p className="mt-3 text-xs leading-6 text-text-primary">
                {event.description}
              </p>
              {event.performedBy && (
                <p className="mt-2 text-[10px] text-text-muted">
                  بواسطة: {event.performedBy}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
