import {
  SharedPagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/common";
import { PromotionsCurrentTableRow } from "./promotions-current-table-row";
import { PromotionsFilters } from "../promotions-filters";

import { useQueryStates } from "nuqs";

import { promotionsParams } from "../../utils/promotions-params";

import { promotionsCurrentData } from "../../data/promotions-current.data";

const pageSize = 8;

export const PromotionsCurrent = () => {
  const [{ page }, setParams] = useQueryStates(promotionsParams);

  return (
    <div className="promotions-current">
      <PromotionsFilters />

      <Table className="min-w-300">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="ps-4">نوع الترويج</TableHead>

            <TableHead>المحتوى / الإعلان</TableHead>

            <TableHead>المعرض</TableHead>

            <TableHead>تاريخ البدء</TableHead>

            <TableHead>تاريخ النهاية</TableHead>

            <TableHead>الوقت المتبقي</TableHead>

            <TableHead>سعر اليوم</TableHead>

            <TableHead>إجمالي القيمة</TableHead>

            <TableHead className="text-center">الحالة</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {promotionsCurrentData.length > 0 ? (
            promotionsCurrentData.map((promotion) => (
              <PromotionsCurrentTableRow
                key={promotion.id}
                promotion={promotion}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="py-10 text-center text-sm">
                لا توجد ترويجات مطابقة
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <SharedPagination
        paginationLabel="ترويجات نشطة"
        currentPage={page}
        totalItems={promotionsCurrentData.length}
        pageSize={pageSize}
        onPageChange={(newPage) => setParams({ page: newPage })}
        className="pt-3 pb-0"
      />
    </div>
  );
};
