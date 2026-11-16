import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

import { activeShowrooms, expiringContracts } from "../api/analytics.mock";

export default function AnalyticsTables() {
  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 items-stretch gap-4 2xl:grid-cols-2"
    >
      {/* Most Active Showrooms - Right */}
      <article className="h-full min-w-0 overflow-hidden rounded-lg border border-border-subtle bg-card shadow-sm">
        <div className="flex min-h-[84px] items-center justify-between gap-3 border-b border-border-divider px-5 py-4">
          <div>
            <h2 className="text-xl font-bold text-text-primary">
              المعارض الأكثر نشاطًا بالمحتوى
            </h2>

            <p className="mt-1.5 text-sm text-text-muted">
              أعلى المعارض والمصانع مساهمة في الغرف والباقات المنشورة
            </p>
          </div>

          <span className="shrink-0 rounded-md bg-background px-3 py-1.5 text-sm font-semibold text-text-secondary">
            أعلى 5
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-right">
            <thead className="bg-background text-text-secondary">
              <tr>
                <th className="px-5 py-4 text-base font-semibold">
                  المعرض / المصنع
                </th>
                <th className="px-3 py-4 text-center text-base font-semibold">
                  غرف منشورة
                </th>
                <th className="px-3 py-4 text-center text-base font-semibold">
                  باقات
                </th>
                <th className="px-3 py-4 text-center text-base font-semibold">
                  إجمالي المحتوى
                </th>
                <th className="px-3 py-4 text-center text-base font-semibold">
                  الإجراء
                </th>
              </tr>
            </thead>

            <tbody>
              {activeShowrooms.map((showroom, index) => (
                <tr
                  key={showroom.id}
                  className="border-t border-border-divider transition-colors hover:bg-background/50"
                >
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <span
                        className={[
                          "flex size-10 shrink-0 items-center justify-center rounded-md text-sm font-bold",
                          index === 0
                            ? "bg-brand-navy text-brand-gold"
                            : "bg-background text-text-secondary",
                        ].join(" ")}
                      >
                        {showroom.id}
                      </span>

                      <p className="truncate text-base font-semibold text-text-primary">
                        {showroom.name}
                      </p>
                    </div>
                  </td>

                  <td className="px-3 py-5 text-center text-base tabular-nums text-text-secondary">
                    {showroom.rooms}
                  </td>

                  <td className="px-3 py-5 text-center text-base tabular-nums text-text-secondary">
                    {showroom.packages}
                  </td>

                  <td className="px-3 py-5 text-center text-base font-bold tabular-nums text-text-primary">
                    {showroom.total}
                  </td>

                  <td className="px-3 py-5 text-center">
                    <Link
                      to={`/showrooms/${showroom.id}`}
                      aria-label={`فتح معرض ${showroom.name}`}
                      className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-border-subtle bg-card px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-brand-navy hover:bg-background"
                    >
                      <span>فتح المعرض</span>
                      <ArrowLeft
                        size={16}
                        className="shrink-0 text-text-muted"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      {/* Contracts Needing Attention - Left */}
      <article className="h-full min-w-0 overflow-hidden rounded-lg border border-border-subtle bg-card shadow-sm">
        <div className="flex min-h-[84px] items-center justify-between gap-3 border-b border-border-divider px-5 py-4">
          <div>
            <h2 className="text-xl font-bold text-text-primary">
              عقود تحتاج متابعة
            </h2>

            <p className="mt-1.5 text-sm text-text-muted">
              عقود تنتهي قريبًا وتتطلب تجديدًا تشغيليًا
            </p>
          </div>

          <button
            type="button"
            className="shrink-0 cursor-pointer text-sm font-medium text-text-primary transition-colors hover:text-text-secondary"
          >
            عرض الكل
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-right">
            <thead className="bg-background text-text-secondary">
              <tr>
                <th className="px-5 py-4 text-base font-semibold">
                  المعرض ورقم العقد
                </th>
                <th className="px-3 py-4 text-center text-base font-semibold">
                  الاستحقاق
                </th>
                <th className="px-4 py-4 text-center text-base font-semibold">
                  الحالة
                </th>
              </tr>
            </thead>

            <tbody>
              {expiringContracts.map((contract) => {
                const isExpired = contract.status === "بانتظار التجديد";

                const statusColor = isExpired
                  ? "border-badge-error-fg/30 bg-badge-error-bg text-badge-error-fg"
                  : "border-badge-warning-fg/30 bg-badge-warning-bg text-badge-warning-fg";

                const dateDescriptionColor = isExpired
                  ? "text-badge-error-fg"
                  : "text-badge-warning-fg";

                return (
                  <tr
                    key={contract.id}
                    className="border-t border-border-divider transition-colors hover:bg-background/50"
                  >
                    <td className="px-5 py-5">
                      <p className="text-base font-semibold text-text-primary">
                        {contract.name}
                      </p>

                      <p className="mt-1.5 text-sm text-text-muted">
                        {contract.id}
                      </p>
                    </td>

                    {/* Due Date */}
                    <td className="px-3 py-5 text-center">
                      <p className="text-base font-medium tabular-nums text-text-primary">
                        {contract.expiry}
                      </p>

                      <p
                        className={[
                          "mt-1.5 text-sm font-semibold",
                          dateDescriptionColor,
                        ].join(" ")}
                      >
                        {contract.remaining}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-5 text-center">
                      <span
                        className={[
                          "inline-flex items-center whitespace-nowrap rounded-md border px-3 py-1.5 text-sm font-semibold",
                          statusColor,
                        ].join(" ")}
                      >
                        {contract.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
