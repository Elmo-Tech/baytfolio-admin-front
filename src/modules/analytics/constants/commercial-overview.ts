import {
  Clock3,
  FileText,
  Megaphone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export const COMMERCIAL_STAT_CONFIG: Record<
  string,
  {
    icon: LucideIcon;
    description: string;
    iconColor: string;
  }
> = {
  contracts: {
    icon: FileText,
    description: "العقود النشطة بالمنظومة",
    iconColor: "text-brand-navy",
  },
  services: {
    icon: ShieldCheck,
    description: "طلبات التصوير والفحص",
    iconColor: "text-info",
  },
  promotions: {
    icon: Megaphone,
    description: "الحملات المدفوعة خلال مايو",
    iconColor: "text-brand-gold-strong",
  },
  expiring: {
    icon: Clock3,
    description: "تتطلب متابعة تشغيلية للتجديد",
    iconColor: "text-warning",
  },
};
