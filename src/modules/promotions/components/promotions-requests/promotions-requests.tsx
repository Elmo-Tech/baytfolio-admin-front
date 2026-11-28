import {
  SharedPagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/common";
import { PromotionsFilters } from "../promotions-filters";
import { PromotionsRequestsTableRow } from "./promotions-requests-table-row";

import { useQueryStates } from "nuqs";
import { promotionsParams } from "../../utils/promotions-params";

import { promotionRequestsData } from "../../data/promotions-requests.data";

const pageSize = 6;

export const PromotionsRequests = () => {
  const [{ page }, setParams] = useQueryStates(promotionsParams);

  return (
    <div className="promotions-requests">
      <PromotionsFilters />

      <Table className="min-w-300">
        <TableHeader className="bg-background/60">
          <TableRow className="hover:bg-transparent">
            <TableHead className="ps-4">نوع الترويج</TableHead>

            <TableHead>المحتوى / الإعلان</TableHead>

            <TableHead>المعرض</TableHead>

            <TableHead>المدة</TableHead>

            <TableHead>سعر اليوم</TableHead>

            <TableHead>إجمالي الطلب</TableHead>

            <TableHead>تاريخ الطلب</TableHead>

            <TableHead className="text-center">الحالة</TableHead>

            <TableHead className="text-center">الإجراء</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {promotionRequestsData.length > 0 ? (
            promotionRequestsData.map((request) => (
              <PromotionsRequestsTableRow key={request.id} request={request} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="py-10 text-center text-sm">
                لا توجد طلبات مطابقة
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <SharedPagination
        paginationLabel="طلبات ترويج"
        currentPage={page}
        totalItems={promotionRequestsData.length}
        pageSize={pageSize}
        onPageChange={(newPage) => setParams({ page: newPage })}
        className="pt-3 pb-0"
      />
    </div>
  );
};
