import { useState } from "react";
import {
  Ban,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Eye,
  FileText,
  Filter,
  Gavel,
  Megaphone,
  Search,
  ScanSearch,
  Sofa,
  Store,
  type LucideIcon,
} from "lucide-react";

import { priorityItemsMock } from "../api/priority-items.mock";
import type {
  PriorityItem,
  PriorityItemAction,
  PriorityItemStatus,
  PriorityItemType,
} from "../types/priority-items.types";

import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";

const PAGE_SIZE = 6;

const typeLabels: Record<PriorityItemType, string> = {
  "join-request": "طلب انضمام",
  "room-review": "مراجعة غرفة",
  "ownership-dispute": "نزاع حقوق ملكية",
  "promotion-request": "طلب ترويج تجاري",
  "contract-renewal": "تنبيه تجديد عقد",
  "suspended-showroom": "معرض موقوف",
};

const typeIcons: Record<PriorityItemType, LucideIcon> = {
  "join-request": Store,
  "room-review": Sofa,
  "ownership-dispute": Gavel,
  "promotion-request": Megaphone,
  "contract-renewal": FileText,
  "suspended-showroom": Ban,
};

const typeClasses: Record<PriorityItemType, string> = {
  "join-request":
    "border-badge-warning-fg bg-badge-warning-bg text-badge-warning-fg",
  "room-review": "border-badge-info-fg bg-badge-info-bg text-badge-info-fg",
  "ownership-dispute":
    "border-badge-error-fg bg-badge-error-bg text-badge-error-fg",
  "promotion-request":
    "border-users-stat-warning-fg bg-users-stat-warning-bg text-users-stat-warning-fg",
  "contract-renewal":
    "border-badge-warning-fg bg-badge-warning-bg text-badge-warning-fg",
  "suspended-showroom":
    "border-users-stat-neutral-fg bg-users-stat-neutral-bg text-users-stat-neutral-fg",
};

const statusConfig: Record<
  PriorityItemStatus,
  { label: string; className: string; dotClass: string }
> = {
  "documents-complete": {
    label: "مكتمل المستندات",
    className:
      "border-users-stat-success-fg bg-users-stat-success-bg text-users-stat-success-fg",
    dotClass: "bg-users-stat-success-fg",
  },
  "dimensions-review": {
    label: "فحص الأبعاد والصور",
    className:
      "border-users-stat-warning-fg bg-users-stat-warning-bg text-users-stat-warning-fg",
    dotClass: "bg-users-stat-warning-fg",
  },
  "urgent-dispute-closed": {
    label: "نزاع عاجل • مغلق",
    className: "border-badge-error-fg bg-badge-error-bg text-badge-error-fg",
    dotClass: "bg-badge-error-fg",
  },
  "eligibility-verified": {
    label: "تم التحقق من الأهلية",
    className:
      "border-users-stat-success-fg bg-users-stat-success-bg text-users-stat-success-fg",
    dotClass: "bg-users-stat-success-fg",
  },
  "notification-sent": {
    label: "إشعار مرسل",
    className:
      "border-users-stat-warning-fg bg-users-stat-warning-bg text-users-stat-warning-fg",
    dotClass: "bg-users-stat-warning-fg",
  },
  "awaiting-update": {
    label: "بانتظار التحديث",
    className:
      "border-users-stat-neutral-fg bg-users-stat-neutral-bg text-users-stat-neutral-fg",
    dotClass: "bg-users-stat-neutral-fg",
  },
};

const actionConfig: Record<
  PriorityItemAction,
  { label: string; icon: LucideIcon; className: string }
> = {
  "review-approve": {
    label: "مراجعة واعتماد",
    icon: ClipboardCheck,
    className:
      "border-brand-navy bg-brand-navy !text-white hover:bg-brand-navy/90 hover:!text-white",
  },
  "inspect-room": {
    label: "فحص الغرفة",
    icon: ScanSearch,
    className:
      "border-brand-navy bg-transparent text-brand-navy hover:bg-users-stat-neutral-bg hover:!text-brand-navy",
  },
  "handle-report": {
    label: "معالجة البلاغ",
    icon: Gavel,
    className:
      "border-badge-error-fg bg-badge-error-fg !text-white hover:bg-badge-error-fg/90 hover:!text-white",
  },
  "schedule-publish": {
    label: "جدولة النشر",
    icon: CalendarCheck,
    className:
      "border-brand-navy bg-transparent text-brand-navy hover:bg-users-stat-neutral-bg hover:!text-brand-navy",
  },
  "review-contract": {
    label: "مراجعة العقد",
    icon: FileText,
    className:
      "border-brand-navy bg-transparent text-brand-navy hover:bg-users-stat-neutral-bg hover:!text-brand-navy",
  },
  "inspect-showroom": {
    label: "فحص المعرض",
    icon: Eye,
    className:
      "border-brand-navy bg-transparent text-brand-navy hover:bg-users-stat-neutral-bg hover:!text-brand-navy",
  },
};

export default function PriorityItems() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PriorityItemStatus | "all">(
    "all",
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = priorityItemsMock.filter((item) => {
    const searchText = `${item.item} ${item.detail} ${
      item.organization
    } ${item.organizationDetail} ${typeLabels[item.type]} ${
      statusConfig[item.status].label
    }`.toLocaleLowerCase("ar");

    const matchesSearch = searchText.includes(
      search.trim().toLocaleLowerCase("ar"),
    );

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));

  const visibleItems = filteredItems.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  function handleSearchChange(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleStatusChange(value: string) {
    setStatusFilter(value as PriorityItemStatus | "all");
    setCurrentPage(1);
  }

  return (
    <section aria-labelledby="priority-items-heading" className="space-y-4">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="priority-items-heading"
            className="flex items-center gap-2 text-xl font-bold text-text-primary"
          >
            <span className="size-2.5 rounded-full bg-users-stat-success-fg" />
            العناصر ذات الأولوية
          </h2>

          <p className="mt-1 text-sm text-text-muted">
            عناصر تحتاج إلى متابعة لضمان سير العمليات بسلاسة
          </p>
        </div>
      </header>

      <div className="rounded-md border border-users-panel-border bg-users-surface shadow-sm">
        <div className="flex flex-col gap-3 border-b border-users-panel-divider p-4 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1">
            <Search
              size={17}
              aria-hidden="true"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            />

            <Input
              type="search"
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="ابحث في العناصر ذات الأولوية..."
              aria-label="البحث في العناصر ذات الأولوية"
              className="h-10 w-full border-users-panel-divider bg-users-surface-input pr-10 text-sm text-users-text-primary focus-visible:border-brand-navy focus-visible:ring-0"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => setIsFilterOpen((isOpen) => !isOpen)}
            aria-expanded={isFilterOpen}
            className="h-10 gap-2 border-users-panel-divider px-4 text-sm text-users-text-secondary shadow-none hover:bg-background"
          >
            <Filter size={16} aria-hidden="true" />
            تصفية
          </Button>
        </div>

        {isFilterOpen && (
          <div className="flex flex-col gap-2 border-b border-users-panel-divider bg-users-table-header p-4 sm:flex-row sm:items-center">
            <label
              htmlFor="priority-status-filter"
              className="text-sm text-users-text-secondary"
            >
              الحالة
            </label>

            <Select
              dir="rtl"
              value={statusFilter}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger
                id="priority-status-filter"
                className="h-9 w-full border-users-panel-divider bg-users-surface text-sm sm:w-48"
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">كل الحالات</SelectItem>
                <SelectItem value="documents-complete">
                  مكتمل المستندات
                </SelectItem>
                <SelectItem value="dimensions-review">
                  فحص الأبعاد والصور
                </SelectItem>
                <SelectItem value="urgent-dispute-closed">
                  نزاع عاجل • مغلق
                </SelectItem>
                <SelectItem value="eligibility-verified">
                  تم التحقق من الأهلية
                </SelectItem>
                <SelectItem value="notification-sent">إشعار مرسل</SelectItem>
                <SelectItem value="awaiting-update">بانتظار التحديث</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-right">
            <thead className="bg-users-table-header text-xs text-users-text-muted">
              <tr>
                <th className="px-5 py-4 font-medium">النوع</th>
                <th className="px-5 py-4 font-medium">العنصر / التفاصيل</th>
                <th className="px-5 py-4 font-medium">الجهة / المعرض</th>
                <th className="px-5 py-4 font-medium">الحالة</th>
                <th className="px-5 py-4 font-medium">آخر تحديث</th>
                <th className="px-5 py-4 text-center font-medium">الإجراء</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-users-table-divider">
              {visibleItems.length > 0 ? (
                visibleItems.map((item) => (
                  <PriorityItemRow key={item.id} item={item} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-users-text-subtle"
                  >
                    لا توجد نتائج مطابقة للبحث أو التصفية
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-users-panel-divider px-5 py-3 text-sm sm:flex-row">
          <p className="text-users-text-muted">
            عرض{" "}
            <span className="font-semibold text-users-text-primary">
              {visibleItems.length > 0 ? (safePage - 1) * PAGE_SIZE + 1 : 0}-
              {Math.min(safePage * PAGE_SIZE, filteredItems.length)}
            </span>{" "}
            من {filteredItems.length} عنصر
          </p>

          <div
            className="flex items-center gap-1"
            aria-label="صفحات العناصر ذات الأولوية"
          >
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={safePage === 1}
              aria-label="الصفحة السابقة"
              className="size-8 border-border text-text-muted shadow-none"
            >
              <ChevronRight size={16} />
            </Button>

            <span className="min-w-16 text-center text-xs text-users-text-secondary">
              {safePage} / {Math.max(totalPages, 1)}
            </span>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(page + 1, Math.max(totalPages, 1)),
                )
              }
              disabled={safePage >= totalPages || totalPages === 0}
              aria-label="الصفحة التالية"
              className="size-8 border-border text-text-muted shadow-none"
            >
              <ChevronLeft size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PriorityItemRow({ item }: { item: PriorityItem }) {
  const TypeIcon = typeIcons[item.type];
  const status = statusConfig[item.status];
  const action = actionConfig[item.action];
  const ActionIcon = action.icon;

  const isUrgent = item.status === "urgent-dispute-closed";

  return (
    <tr
      className={`transition-colors hover:bg-users-surface-row-hover ${
        isUrgent ? "bg-badge-error-bg/20" : ""
      }`}
    >
      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${typeClasses[item.type]}`}
        >
          <TypeIcon size={14} strokeWidth={1.8} aria-hidden="true" />
          {typeLabels[item.type]}
        </span>
      </td>

      <td className="px-5 py-4">
        <p
          className={`text-sm font-semibold ${
            isUrgent ? "text-badge-error-fg" : "text-brand-navy"
          }`}
        >
          {item.item}
        </p>

        <p className="mt-1 text-xs text-text-muted">{item.detail}</p>
      </td>

      <td className="px-5 py-4">
        <div className="flex flex-col gap-1 text-right">
          <span className="text-sm text-users-text-detail">
            {item.organization}
          </span>

          <span
            className={`text-xs ${
              isUrgent ? "text-badge-error-fg" : "text-text-muted"
            }`}
          >
            {item.organizationDetail}
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${status.className}`}
        >
          <span className={`size-1.5 rounded-full ${status.dotClass}`} />
          {status.label}
        </span>
      </td>

      <td
        className={`whitespace-nowrap px-5 py-4 text-sm ${
          isUrgent ? "text-badge-error-fg" : "text-users-text-muted"
        }`}
      >
        {item.updatedAt}
      </td>

      <td className="px-5 py-4 text-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={`h-8 gap-1.5 whitespace-nowrap rounded-md px-3 text-xs shadow-none ${action.className}`}
        >
          <ActionIcon size={14} strokeWidth={1.8} aria-hidden="true" />
          {action.label}
        </Button>
      </td>
    </tr>
  );
}
