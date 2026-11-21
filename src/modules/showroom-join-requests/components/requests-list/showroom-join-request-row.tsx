import { MoreVertical } from "lucide-react";

import { Badge, Button } from "@/shared/components/ui";

import {
  JOIN_REQUEST_ACTIVITY_CONFIG,
  JOIN_REQUEST_STATUS_CONFIG,
} from "../../constants/showroom-join-requests.constants";
import type { ShowroomJoinRequest } from "../../types/showroom-join-requests.types";
import { formatJoinRequestDate } from "../../utils/showroom-join-requests-format.utils";

interface ShowroomJoinRequestRowProps {
  request: ShowroomJoinRequest;
  onOpen: (id: string) => void;
}

export default function ShowroomJoinRequestRow({
  request,
  onOpen,
}: ShowroomJoinRequestRowProps) {
  const status = JOIN_REQUEST_STATUS_CONFIG[request.status];
  const activity = JOIN_REQUEST_ACTIVITY_CONFIG[request.activityType];
  const ActivityIcon = activity.icon;

  return (
    <tr className="transition-colors hover:bg-users-surface-row-hover">
      <td className="whitespace-nowrap px-4 py-4">
        <span className="font-semibold text-text-primary" dir="ltr">
          #{request.reference}
        </span>
      </td>
      <td className="px-4 py-4">
        <p className="max-w-[230px] font-semibold text-text-primary">
          {request.showroomName}
        </p>
        <p className="mt-1 text-xs text-text-muted">{request.location}</p>
      </td>
      <td className="whitespace-nowrap px-4 py-4">
        <Badge
          variant="secondary"
          className="gap-1.5 border-transparent bg-muted text-xs font-normal text-text-secondary"
        >
          <ActivityIcon size={13} />
          {activity.label}
        </Badge>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-text-primary">
        {request.contactPerson}
      </td>
      <td className="px-4 py-4">
        <p className="whitespace-nowrap text-sm text-text-primary" dir="ltr">
          {request.phone}
        </p>
        <p className="mt-1 whitespace-nowrap text-xs text-text-muted" dir="ltr">
          {request.email}
        </p>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-text-secondary">
        {formatJoinRequestDate(request.submittedAt)}
      </td>
      <td className="whitespace-nowrap px-4 py-4">
        <Badge
          variant="outline"
          className={`gap-1.5 text-xs font-medium ${status.className}`}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {status.label}
        </Badge>
      </td>
      <td className="whitespace-nowrap px-4 py-4">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="lg"
            className="h-9 text-xs"
            onClick={() => onOpen(request.id)}
          >
            فتح الطلب
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`المزيد من الإجراءات للطلب ${request.reference}`}
            className="text-text-muted"
          >
            <MoreVertical size={17} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
