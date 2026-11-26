import {
  SharedPagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/common";
import { CategoriesAndTagsTableRow } from "./categories-and-tags-table-row";

import { Info } from "lucide-react";

import { useQueryStates } from "nuqs";
import { cateAndTagsParams } from "../utils/categories-and-tags-params";

import {
  totalItems,
  pageSize,
  categoriesData,
  tagsData,
} from "../data/categories-and-tags.data";

import {
  cateAndTagsPaginationLabels,
  cateAndTagsTableNameHeaders,
} from "../constants/categories-and-tags-table.constants";

export const CategoriesAndTagsContent = () => {
  const [{ type, page }, setParams] = useQueryStates(cateAndTagsParams);

  const items = type === "categories" ? categoriesData : tagsData;

  return (
    <div>
      {/* Table */}
      <div className="rounded-xl border border-border bg-white overflow-hidden">
        <Table className="min-w-200">
          <TableHeader className="bg-background/60">
            <TableRow className="hover:bg-transparent">
              <TableHead className="ps-4">الصورة</TableHead>

              <TableHead>{cateAndTagsTableNameHeaders[type]}</TableHead>

              <TableHead className="text-center">الحالة</TableHead>

              <TableHead className="text-center">الترتيب</TableHead>

              <TableHead className="text-center">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.length > 0 ? (
              items.map((item) => (
                <CategoriesAndTagsTableRow key={item.id} item={item} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-sm">
                  لا توجد بيانات لعرضها
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <SharedPagination
        paginationLabel={cateAndTagsPaginationLabels[type]}
        currentPage={page}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={(newPage) => setParams({ page: newPage })}
        className="pt-3 pb-0"
      />

      {/* Note */}
      <p className="flex items-center gap-1 pt-3 text-xs font-normal text-text-secondary leading-5">
        <Info className="size-3.5 text-accent" />

        {type === "categories"
          ? "ملاحظة تشغيلية: عند تعطيل تصنيف، لا يتم حذف الغرف المرتبطة به ولكن يصبح التصنيف غير متاح للاختيار الجديد في المعارض."
          : " التاجات عامة ومشتركة لجميع التصنيفات، وعند تعطيل تاج يظل معروضاً في الغرف المسجلة مسبقاً ويُمنع من الإضافة الجديدة."}
      </p>
    </div>
  );
};
