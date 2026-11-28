import { Info } from "lucide-react";
import { useQueryStates } from "nuqs";

import {
  SharedPagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/common";

import { pageSize, reviewsData, totalItems } from "../data/reviews.data";
import { reviewsParams } from "../utils/reviews-params";
import { ReviewsTableRow } from "./reviews-table-row";

export const ReviewsContent = () => {
  const [{ page }, setParams] = useQueryStates(reviewsParams);

  return (
    <section>
      {/* Table */}
      <Table className="min-w-250">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="ps-4">المستخدم</TableHead>

            <TableHead>التقييم</TableHead>

            <TableHead>على</TableHead>

            <TableHead>المعرض</TableHead>

            <TableHead>التعليق</TableHead>

            <TableHead className="text-center">الحالة</TableHead>

            <TableHead className="text-center">التاريخ</TableHead>

            <TableHead className="text-center">الإجراء</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reviewsData.length > 0 ? (
            reviewsData.map((review) => (
              <ReviewsTableRow key={review.id} review={review} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="py-10 text-center text-sm">
                لا توجد بيانات لعرضها
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <SharedPagination
        paginationLabel={"تقييماً مسجلاً"}
        currentPage={page}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={(newPage) => setParams({ page: newPage })}
        className="pt-3 pb-0"
      />

      {/* Note */}
      <p className="flex items-center gap-1 pt-3 text-xs font-normal text-text-secondary leading-5">
        <Info className="size-3.5 shrink-0 text-accent" />
        التقييمات المنشورة فقط هي التي تحتسب في متوسط التقييم العام (Average
        Rating) وإجمالي عدد التقييمات، بينما لا تؤثر التقييمات المعلقة أو
        المرفوضة أو المخفية في المعدل الحسابي العام لأي غرفة أو معرض.
      </p>
    </section>
  );
};
