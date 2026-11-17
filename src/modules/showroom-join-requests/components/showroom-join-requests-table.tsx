import { MoreVertical, Store, Factory, Palette, Building2 } from "lucide-react";
import { useNavigate } from "react-router";

import { Badge, Button } from "@/shared/components/ui";

import type {
  ShowroomActivityType,
  ShowroomJoinRequest,
  ShowroomJoinRequestStatus,
} from "../types/showroom-join-requests.types";

type Props = {
  requests: ShowroomJoinRequest[];
};

const statusConfig: Record<
  ShowroomJoinRequestStatus,
  { label: string; className: string }
> = {
  new: {
    label: "طلب جديد",
    className: "border-transparent bg-info/10 text-info",
  },
  under_review: {
    label: "قيد المراجعة",
    className: "border-transparent bg-info/10 text-info",
  },
  pending_agreement: {
    label: "بانتظار الاتفاق",
    className: "border-transparent bg-warning/10 text-warning",
  },
  approved: {
    label: "معتمد لبدء التجهيز",
    className: "border-transparent bg-success/10 text-success",
  },
  contacted: {
    label: "تم التواصل",
    className: "border-transparent bg-muted text-muted-foreground",
  },
  qualified: {
    label: "مؤهل",
    className: "border-transparent bg-success/10 text-success",
  },
  rejected: {
    label: "مرفوض",
    className: "border-transparent bg-destructive/10 text-destructive",
  },
  closed: {
    label: "مغلق",
    className: "border-transparent bg-muted text-muted-foreground",
  },
};

const activityConfig: Record<
  ShowroomActivityType,
  { label: string; icon: typeof Store }
> = {
  showroom: { label: "معرض ومصنع", icon: Store },
  commercial_display: {
    label: "صالة عرض تجارية",
    icon: Building2,
  },
  factory: {
    label: "مصنع أثاث وخزائن",
    icon: Factory,
  },
  design_studio: {
    label: "استوديو تصميم وتصنيع",
    icon: Palette,
  },
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function ShowroomJoinRequestsTable({ requests }: Props) {
  const navigate = useNavigate();

  if (requests.length === 0) {
    return (
      <div className="rounded-lg border border-border-subtle bg-card px-4 py-12 text-center">
        <Store className="mx-auto mb-3 text-text-muted" size={28} />

        <p className="text-sm font-medium text-text-primary">
          لا توجد طلبات مطابقة
        </p>

        <p className="mt-1 text-xs text-text-muted">
          جرّب تغيير كلمات البحث أو الفلاتر.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border-subtle bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] border-collapse text-right">
          <thead className="bg-muted/50">
            <tr className="text-xs text-text-secondary">
              {[
                "رقم الطلب",
                "المعرض / المصنع",
                "نوع النشاط",
                "مسؤول التواصل",
                "بيانات التواصل",
                "تاريخ التقديم",
                "الحالة",
                "الإجراء",
              ].map((heading) => (
                <th
                  key={heading}
                  className="whitespace-nowrap px-4 py-4 font-medium"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border-subtle">
            {requests.map((request) => {
              const status = statusConfig[request.status];
              const activity = activityConfig[request.activityType];
              const ActivityIcon = activity.icon;

              return (
                <tr
                  key={request.id}
                  className="transition-colors hover:bg-users-surface-row-hover"
                >
                  <td className="whitespace-nowrap px-4 py-4">
                    <span className="font-semibold text-text-primary" dir="ltr">
                      #{request.reference}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <p className="max-w-[230px] font-semibold text-text-primary">
                      {request.showroomName}
                    </p>

                    <p className="mt-1 text-xs text-text-muted">
                      {request.location}
                    </p>
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
                    <p
                      className="whitespace-nowrap text-sm text-text-primary"
                      dir="ltr"
                    >
                      {request.phone}
                    </p>

                    <p
                      className="mt-1 whitespace-nowrap text-xs text-text-muted"
                      dir="ltr"
                    >
                      {request.email}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-sm text-text-secondary">
                    {formatDate(request.submittedAt)}
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
                        onClick={() =>
                          navigate(`/showroom-join-requests/${request.id}`)
                        }
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
