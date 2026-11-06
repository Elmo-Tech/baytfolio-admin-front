import { BadgeCheck, Eye } from "lucide-react";
import { useNavigate } from "react-router";

import ShowroomStatusBadge from "./showroom-status-badge";
import ContractStatusBadge from "./contract-status-badge";
import type { Showroom } from "../types/showroom";

interface ShowroomsTableProps {
  showrooms: Showroom[];
}

const activityLabels: Record<Showroom["activity"], string> = {
  showroom: "معرض",
  factory: "مصنع",
  showroom_factory: "معرض ومصنع",
  studio_manufacturing: "استوديو وتصنيع",
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB").format(new Date(date));

const getShowroomInitials = (name: string) => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

export default function ShowroomsTable({ showrooms }: ShowroomsTableProps) {
  const navigate = useNavigate();

  const handleShowroomClick = (showroomId: string) => {
    navigate(`/showrooms/${showroomId}`);
  };

  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-lg border border-users-panel-border bg-users-surface"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1250px] text-right">
          <thead className="bg-users-table-header text-xs text-users-text-muted">
            <tr>
              <th className="px-5 py-4 font-medium">المعرض / المصنع</th>
              <th className="px-5 py-4 font-medium">نوع النشاط</th>
              <th className="px-5 py-4 font-medium">المسؤول</th>
              <th className="px-5 py-4 font-medium">حالة المعرض</th>
              <th className="px-5 py-4 font-medium">حالة العقد</th>
              <th className="px-5 py-4 font-medium">الغرف</th>
              <th className="px-5 py-4 font-medium">الباقات</th>
              <th className="px-5 py-4 font-medium">نهاية العقد</th>
              <th className="px-5 py-4 text-center font-medium">الإجراءات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-users-table-divider">
            {showrooms.length > 0 ? (
              showrooms.map((showroom) => {
                const isVerified = showroom.isVerified === true;

                return (
                  <tr
                    key={showroom.id}
                    onClick={() => handleShowroomClick(showroom.id)}
                    className="transition-colors hover:bg-users-surface-row-hover"
                  >
                    {/* Showroom / Factory Name */}
                    <td className="px-5 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-warm bg-users-stat-neutral-bg text-sm font-semibold text-users-stat-neutral-fg">
                          {getShowroomInitials(showroom.name)}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="whitespace-nowrap text-sm font-semibold text-users-text-primary">
                              {showroom.name}
                            </p>

                            {isVerified && (
                              <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-users-stat-warning-bg bg-users-stat-warning-bg px-2 py-1 text-xs font-medium text-users-stat-warning-fg">
                                <BadgeCheck size={13} />
                                موثق
                              </span>
                            )}
                          </div>

                          <p
                            dir="ltr"
                            className="mt-1 text-right text-xs text-users-text-subtle"
                          >
                            {showroom.reference}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Activity Type */}
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-users-text-secondary">
                      {activityLabels[showroom.activity]}
                    </td>

                    {/* Manager */}
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <p className="whitespace-nowrap text-sm font-medium text-users-text-primary">
                          {showroom.managerName}
                        </p>

                        <p
                          dir="ltr"
                          className="text-right text-xs text-users-text-muted"
                        >
                          {showroom.managerPhone}
                        </p>
                      </div>
                    </td>

                    {/* Showroom Status */}
                    <td className="px-5 py-4">
                      <ShowroomStatusBadge status={showroom.status} />
                    </td>

                    {/* Contract Status */}
                    <td className="px-5 py-4">
                      <ContractStatusBadge status={showroom.contractStatus} />
                    </td>

                    {/* Rooms */}
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-users-text-secondary">
                      <span className="font-semibold text-users-text-primary">
                        {showroom.rooms.used}
                      </span>

                      <span className="text-users-text-muted">
                        {" "}
                        / {showroom.rooms.total}
                      </span>
                    </td>

                    {/* Packages */}
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-users-text-secondary">
                      <span className="font-semibold text-users-text-primary">
                        {showroom.packages.used}
                      </span>

                      <span className="text-users-text-muted">
                        {" "}
                        / {showroom.packages.total}
                      </span>
                    </td>

                    {/* Contract End Date */}
                    <td
                      dir="ltr"
                      className="whitespace-nowrap px-5 py-4 text-right text-sm text-users-text-secondary"
                    >
                      {formatDate(showroom.contractEndDate)}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-center">
                      <button
                        type="button"
                        title="عرض التفاصيل"
                        aria-label={`عرض تفاصيل ${showroom.name}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleShowroomClick(showroom.id);
                        }}
                        className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-users-text-muted transition-colors hover:bg-users-stat-neutral-bg hover:text-users-text-primary"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="px-5 py-12 text-center text-sm text-users-text-subtle"
                >
                  لا توجد نتائج مطابقة لبحثك
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
