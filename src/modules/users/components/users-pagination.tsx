import { ShieldCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";
import { PAGE_SIZE_OPTIONS } from "../constants/user-pagination";
import { getUsersPagination } from "../utils/users-pagination-view";
import UsersPageNumbers from "./users-page-numbers";

interface UsersPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function UsersPagination(props: UsersPaginationProps) {
  const { currentPage, pageSize, onPageChange, onPageSizeChange } = props;
  const pagination = getUsersPagination(props);

  return (
    <div dir="rtl" className="space-y-3">
      <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-border bg-muted/30 px-4 py-3 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          عرض{" "}
          <span className="font-semibold text-foreground">
            {pagination.startItem}–{pagination.endItem}
          </span>{" "}
          من إجمالي{" "}
          <span className="font-semibold text-foreground">
            {pagination.formattedTotalItems}
          </span>{" "}
          مستخدم مسجل
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>عرض:</span>
            <Select
              dir="rtl"
              value={String(pageSize)}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <SelectTrigger
                aria-label="عدد المستخدمين في الصفحة"
                className="h-8 w-[100px] cursor-pointer rounded-md border-border bg-background px-2 text-xs shadow-none"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size} في الصفحة
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <UsersPageNumbers
            currentPage={currentPage}
            pageNumbers={pagination.pageNumbers}
            isFirstPage={pagination.isFirstPage}
            isLastPage={pagination.isLastPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>

      <div className="flex items-start gap-2 px-2 py-1 text-xs leading-6 text-muted-foreground">
        <ShieldCheck size={16} className="mt-1 shrink-0 text-text-muted" />
        <p>
          تلتزم المنصة بمعايير خصوصية بيانات العملاء (GDPR/PDPL)، ويتم حجب
          البيانات الحساسة (PII) جزئيًا لأغراض الدعم الفني والعمليات التشغيلية
          فقط، دون إتاحة استعراض المحتوى الشخصي الخاص بالمستخدم.
        </p>
      </div>
    </div>
  );
}
