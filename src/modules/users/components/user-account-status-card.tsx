import { Ban, ShieldCheck } from "lucide-react";
import type { UserStatus } from "../types/user";

interface UserAccountStatusCardProps {
  status: UserStatus;
  onBlock: () => void;
}

const statusConfig = {
  active: {
    label: "نشط ومتاح للوصول",
    description:
      "الحساب يعمل بشكل طبيعي ويمتلك صلاحية الوصول إلى بقية موقع BaytFolio.",
    color: "text-[#278363]",
    dot: "bg-[#278363]",
  },
  suspended: {
    label: "الحساب موقوف",
    description: "هذا الحساب موقوف حاليًا ولا يمكنه الوصول إلى المنصة.",
    color: "text-red-600",
    dot: "bg-red-500",
  },
  pending_deletion: {
    label: "في انتظار الحذف",
    description: "هذا الحساب في انتظار استكمال إجراءات الحذف.",
    color: "text-amber-600",
    dot: "bg-amber-500",
  },
  deleted: {
    label: "حساب محذوف",
    description: "تم حذف هذا الحساب ولا يمكنه الوصول إلى المنصة.",
    color: "text-[#8b8176]",
    dot: "bg-[#8b8176]",
  },
};

export default function UserAccountStatusCard({
  status,
  onBlock,
}: UserAccountStatusCardProps) {
  const config = statusConfig[status];
  const canBlock = status === "active";

  return (
    <section className="flex min-h-[376px] flex-col rounded-lg border border-[#e9e1d7] bg-white p-5">
      <div className="mb-4 flex items-center gap-2 border-b border-[#eee8e0] pb-4">
        <div className="rounded-md bg-[#f7f3ed] p-1.5">
          <ShieldCheck size={17} className="text-[#46515d]" />
        </div>

        <h2 className="font-semibold text-[#1d2935]">حالة الحساب</h2>
      </div>

      <div className="rounded-md border border-[#eee8e0] bg-[#fcfaf8] p-4">
        <p className="mb-3 text-xs text-[#a89987]">الحالة التشغيلية</p>

        <div
          className={`mb-3 flex items-center gap-2 font-semibold ${config.color}`}
        >
          <span className={`size-2 rounded-full ${config.dot}`} />
          {config.label}
        </div>

        <p className="text-xs leading-6 text-[#46515d]">{config.description}</p>
      </div>

      <div className="mt-auto border-t border-[#eee8e0] pt-5">
        {canBlock && (
          <button
            type="button"
            onClick={onBlock}
            className="flex h-9 cursor-pointer items-center gap-2 rounded-md border border-red-200 px-3 text-xs font-medium text-red-500 transition hover:bg-red-50"
          >
            <Ban size={14} />
            حظر المستخدم
          </button>
        )}
      </div>
    </section>
  );
}
