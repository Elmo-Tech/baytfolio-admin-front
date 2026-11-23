import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
} from "@/shared/components/ui/table";
import { Store } from "lucide-react";
import { useNavigate } from "react-router";

import { JOIN_REQUEST_TABLE_HEADINGS } from "../../constants/showroom-join-requests-options.constants";
import type { ShowroomJoinRequest } from "../../types/showroom-join-requests.types";
import ShowroomJoinRequestRow from "./showroom-join-request-row";

type Props = {
  requests: ShowroomJoinRequest[];
};

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
        <Table className="w-full min-w-[1050px] border-collapse text-right">
          <TableHeader className="bg-muted/50">
            <TableRow className="text-xs text-text-secondary">
              {JOIN_REQUEST_TABLE_HEADINGS.map((heading) => (
                <TableHead
                  key={heading}
                  className="whitespace-nowrap px-4 py-4 font-medium"
                >
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-border-subtle">
            {requests.map((request) => (
              <ShowroomJoinRequestRow
                key={request.id}
                request={request}
                onOpen={(id) => navigate(`/showroom-join-requests/${id}`)}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
