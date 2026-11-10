import type { ShowroomDetails } from "../../types/showroom-details";
import ShowroomDetailField from "./showroom-detail-field";

interface ShowroomInfoCardProps {
  showroom: ShowroomDetails;
}

const activityLabels: Record<ShowroomDetails["activity"], string> = {
  showroom: "معرض",
  factory: "مصنع",
  showroom_factory: "معرض ومصنع",
  studio_manufacturing: "استوديو وتصنيع",
};

export default function ShowroomInfoCard({ showroom }: ShowroomInfoCardProps) {
  return (
    <section
      dir="rtl"
      className="rounded-2xl border border-users-panel-border bg-users-surface p-6 sm:p-7"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-users-table-divider pb-5">
        <div>
          <h2 className="text-xl font-bold text-users-text-primary">
            بيانات المعرض
          </h2>
          <p className="mt-2 text-sm text-users-text-muted">
            المعلومات الأساسية وبيانات التواصل الخاصة بالمنشأة
          </p>
        </div>

        <button
          type="button"
          className="cursor-pointer rounded-lg border border-border-warm bg-users-stat-neutral-bg px-4 py-2.5 text-sm font-semibold text-users-text-primary transition-colors hover:bg-users-surface"
        >
          تعديل بيانات المعرض
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ShowroomDetailField label="اسم المعرض" value={showroom.name} />
        <ShowroomDetailField
          label="نوع النشاط"
          value={activityLabels[showroom.activity]}
        />
        <ShowroomDetailField label="اسم المسؤول" value={showroom.managerName} />
        <ShowroomDetailField
          label="رقم الهاتف"
          value={showroom.managerPhone}
          dir="ltr"
        />
        <ShowroomDetailField
          label="البريد الإلكتروني"
          value={showroom.email}
          dir="ltr"
          className="sm:col-span-2"
        />
        <ShowroomDetailField
          label="النبذة والوصف"
          value={showroom.description}
          className="sm:col-span-2"
        />
      </div>
    </section>
  );
}
