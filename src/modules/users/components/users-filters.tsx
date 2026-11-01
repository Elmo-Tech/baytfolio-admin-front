import { RotateCcw, Search } from "lucide-react";

interface UsersFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  loginMethod: string;
  onLoginMethodChange: (value: string) => void;
  sortOrder: string;
  onSortOrderChange: (value: string) => void;
  onReset: () => void;
}

export default function UsersFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  loginMethod,
  onLoginMethodChange,
  sortOrder,
  onSortOrderChange,
  onReset,
}: UsersFiltersProps) {
  return (
    <section
      dir="rtl"
      className="flex flex-col gap-3 rounded-md border border-[#f0ebe5] bg-white p-4 lg:flex-row lg:items-center"
    >
      <div className="relative min-w-0 flex-1">
        <Search
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aa9985]"
        />

        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="ابحث بالاسم أو البريد الإلكتروني أو رقم الهاتف..."
          className="h-11 w-full rounded-md border border-[#eee8e0] bg-[#fcfbf9] pr-10 pl-4 text-sm text-[#1d2935] outline-none transition focus:border-[#102233]"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="h-11 min-w-[145px] cursor-pointer rounded-md border border-[#eee8e0] bg-white px-3 text-sm text-[#46515d] outline-none focus:border-[#102233]"
        >
          <option value="all">كل الحالات</option>
          <option value="active">نشط</option>
          <option value="suspended">محظور</option>
          <option value="pending_deletion">طلب حذف</option>
          <option value="deleted">محذوف</option>
        </select>

        <select
          value={loginMethod}
          onChange={(event) => onLoginMethodChange(event.target.value)}
          className="h-11 min-w-[165px] cursor-pointer rounded-md border border-[#eee8e0] bg-white px-3 text-sm text-[#46515d] outline-none focus:border-[#102233]"
        >
          <option value="all">كل طرق الدخول</option>
          <option value="phone_password">الهاتف وكلمة المرور</option>
          <option value="google">Google</option>
          <option value="apple">Apple</option>
        </select>

        <select
          value={sortOrder}
          onChange={(event) => onSortOrderChange(event.target.value)}
          className="h-11 min-w-[165px] cursor-pointer rounded-md border border-[#eee8e0] bg-white px-3 text-sm text-[#46515d] outline-none focus:border-[#102233]"
        >
          <option value="newest">الأحدث تسجيلًا</option>
          <option value="oldest">الأقدم تسجيلًا</option>
        </select>

        {/* <button
          type="button"
          className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#eee8e0] px-4 text-sm text-[#46515d] transition hover:bg-[#f7f3ed]"
        >
          <SlidersHorizontal size={17} />
          خيارات الفلترة
        </button> */}

        <button
          type="button"
          onClick={onReset}
          className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#eee8e0] px-4 text-sm text-[#46515d] transition hover:bg-[#f7f3ed]"
        >
          <RotateCcw size={17} />
          إعادة ضبط
        </button>
      </div>
    </section>
  );
}
