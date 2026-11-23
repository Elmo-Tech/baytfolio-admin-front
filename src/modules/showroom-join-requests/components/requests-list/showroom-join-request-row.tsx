import { TableRow, TableCell } from "@/shared/components/ui/table";
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
    <TableRow className="transition-colors hover:bg-users-surface-row-hover">
      <TableCell presentation="request">
        <span className="font-semibold text-text-primary" dir="ltr">
          #{request.reference}
        </span>
      </TableCell>
      <TableCell presentation="request-details">
        <p className="max-w-[230px] font-semibold text-text-primary">
          {request.showroomName}
        </p>
        <p className="mt-1 text-xs text-text-muted">{request.location}</p>
      </TableCell>
      <TableCell presentation="request">
        <Badge
          variant="secondary"
          className="gap-1.5 border-transparent bg-muted text-xs font-normal text-text-secondary"
        >
          <ActivityIcon size={13} />
          {activity.label}
        </Badge>
      </TableCell>
      <TableCell className="whitespace-nowrap px-4 py-4 text-sm text-text-primary">
        {request.contactPerson}
      </TableCell>
      <TableCell presentation="request-details">
        <p className="whitespace-nowrap text-sm text-text-primary" dir="ltr">
          {request.phone}
        </p>
        <p className="mt-1 whitespace-nowrap text-xs text-text-muted" dir="ltr">
          {request.email}
        </p>
      </TableCell>
      <TableCell className="whitespace-nowrap px-4 py-4 text-sm text-text-secondary">
        {formatJoinRequestDate(request.submittedAt)}
      </TableCell>
      <TableCell presentation="request">
        <Badge
          variant="outline"
          className={`gap-1.5 text-xs font-medium ${status.className}`}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {status.label}
        </Badge>
      </TableCell>
      <TableCell presentation="request">
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
      </TableCell>
    </TableRow>
  );
}
