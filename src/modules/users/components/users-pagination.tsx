import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

interface UsersPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function UsersPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: UsersPaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div dir="rtl" className="space-y-3">
      <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-[#eee8e0] bg-[#f8f6f2] px-4 py-3 sm:flex-row">
        <p className="text-sm text-[#8b8176]">
          عرض{" "}
          <span className="font-semibold text-[#1d2935]">
            {startItem}–{endItem}
          </span>{" "}
          من إجمالي{" "}
          <span className="font-semibold text-[#1d2935]">
            {totalItems.toLocaleString("en-US")}
          </span>{" "}
          مستخدم مسجل
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-2 text-xs text-[#8b8176]">
            <span>عرض:</span>

            <select
              value={pageSize}
              onChange={(event) => onPageSizeChange(Number(event.target.value))}
              className="h-8 cursor-pointer rounded border border-[#e9e2d9] bg-white px-2 text-xs text-[#46515d] outline-none focus:border-[#102233]"
              aria-label="عدد المستخدمين في الصفحة"
            >
              <option value={10}>10 في الصفحة</option>
              <option value={20}>20 في الصفحة</option>
              <option value={50}>50 في الصفحة</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="flex h-8 min-w-8 cursor-pointer items-center justify-center rounded border border-[#e9e2d9] bg-white text-[#647080] transition hover:bg-[#eee9e1] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="الصفحة السابقة"
            >
              <ChevronRight size={16} />
            </button>

            {pageNumbers.map((page, index) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-1 text-sm text-[#a69b8e]"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => {
                    if (typeof page === "number") {
                      onPageChange(page);
                    }
                  }}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`flex h-8 min-w-8 cursor-pointer items-center justify-center rounded px-2 text-xs transition ${
                    currentPage === page
                      ? "bg-[#102233] font-semibold text-white"
                      : "border border-[#e9e2d9] bg-white text-[#46515d] hover:bg-[#eee9e1]"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => onPageChange(currentPage + 1)}
              className="flex h-8 min-w-8 cursor-pointer items-center justify-center rounded border border-[#e9e2d9] bg-white text-[#647080] transition hover:bg-[#eee9e1] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="الصفحة التالية"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 px-2 py-1 text-xs leading-6 text-[#a69b8e]">
        <ShieldCheck size={16} className="mt-1 shrink-0 text-[#aa9985]" />

        <p>
          تلتزم المنصة بمعايير خصوصية بيانات العملاء (GDPR/PDPL)، ويتم حجب
          البيانات الحساسة (PII) جزئيًا لأغراض الدعم الفني والعمليات التشغيلية
          فقط، دون إتاحة استعراض المحتوى الشخصي الخاص بالمستخدم.
        </p>
      </div>
    </div>
  );
}
