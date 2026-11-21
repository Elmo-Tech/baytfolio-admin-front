import { TrendingUp } from "lucide-react";
import { CardHeader, CardTitle } from "@/shared/components/ui";
export default function ContactSettingsStatsHeader() {
  return (
    <CardHeader className="flex flex-row items-center gap-2 space-y-0 p-0 pb-5">
      <TrendingUp size={18} className="text-muted-foreground" />

      <CardTitle className="text-sm font-bold">
        معدل تفاعل الزوار مع الوسائل الحالية
      </CardTitle>
    </CardHeader>
  );
}
