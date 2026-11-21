import { mockShowrooms } from "./showrooms.mock";
import type { ShowroomDetails } from "../types/showroom-details";

type ExtraShowroomDetails = Omit<
  Partial<Omit<ShowroomDetails, keyof import("../types/showroom").Showroom>>,
  "contract"
> & {
  contract?: Omit<ShowroomDetails["contract"], "endDate">;
};

const showroomDetails: Record<string, ExtraShowroomDetails> = {
  "1": {
    email: "a.mahmoud@example.com",
    description:
      "منشأة وطنية متخصصة في تصميم وتصنيع وتوريد الأثاث المكتبي والمنزلي الراقي بجودة مستدامة.",
    contract: {
      number: "CNT-2026-0142",
      startDate: "2026-11-01",
      basePrice: 30000,
      currency: "ر.س",
    },
    promotion: {
      status: "active",
      startDate: "2026-11-01",
      endDate: "2027-01-31",
      durationMonths: 3,
      notes:
        "التوثيق خدمة إضافية مستقلة ولا يؤثر تجديدها أو عدم اكتفائها على حالة المعرض.",
    },
    owner: {
      name: "أحمد محمود",
      email: "a.mahmoud@example.com",
      accountEmail: "a.mahmoud@example.com",
    },
  },
};

export const getShowroomDetails = (
  showroomId: string,
): ShowroomDetails | undefined => {
  const showroom = mockShowrooms.find((item) => item.id === showroomId);

  if (!showroom) {
    return undefined;
  }

  const details = showroomDetails[showroomId];

  return {
    ...showroom,
    email: details?.email ?? `manager${showroom.id}@example.com`,
    description:
      details?.description ?? "بيانات تجريبية خاصة بالمعرض أو المصنع.",
    contract: {
      number: details?.contract?.number ?? `CNT-${showroom.reference}`,
      startDate: details?.contract?.startDate ?? "2026-11-01",
      endDate: showroom.contractEndDate,
      basePrice: details?.contract?.basePrice ?? 30000,
      currency: details?.contract?.currency ?? "ر.س",
    },
    promotion: details?.promotion ?? {
      status: "inactive",
      startDate: "2026-11-01",
      endDate: showroom.contractEndDate,
      durationMonths: 3,
      notes: "لا توجد بيانات ترويج إضافية مسجلة.",
    },
    owner: details?.owner ?? {
      name: showroom.managerName,
      email: `owner${showroom.id}@example.com`,
      accountEmail: `manager${showroom.id}@example.com`,
    },
  };
};
