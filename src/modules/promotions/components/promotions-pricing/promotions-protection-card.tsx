import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui";

import { ShieldCheck } from "lucide-react";

export const PromotionsProtectionCard = () => {
  return (
    <Card className="gap-0 rounded-xl py-0 shadow-none">
      <CardHeader className="p-5 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-accent" />

            <CardTitle className="text-sm font-bold text-primary">
              قاعدة ثبات الأسعار التشغيلية (Pricing Protection Rule)
            </CardTitle>
          </div>

          <Badge
            variant="outline"
            className="border-transparent bg-status-active-bg px-2 py-0.5 text-[10px] font-medium text-status-active-fg"
          >
            ضمان الاستقرار الحالي
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-5 pt-0">
        <p className="text-[11px] leading-6 text-text-secondary">
          تُطبَّق الأسعار المحددة هنا على الترويجات الجديدة لحظة إنشائها أو
          اعتمادها فقط. وعند بدء أي ترويج يتم تثبيت سعر اليوم المعتمد في سجل
          الطلب، ولا يؤثر أي تعديل مستقبلي للأسعار على أي ترويجات نشطة أو
          ترويجات سابقة إطلاقاً.
        </p>

        <div className="rounded-lg border border-border bg-background/60 p-3">
          <p className="text-xs font-semibold text-primary">
            مثال توضيحي مبسط:
          </p>

          <p className="mt-1 text-[11px] leading-6 text-text-secondary">
            ترويج بدأ بسعر 200 ج.م لليوم لمدة 10 أيام بإجمالي 2,000 ج.م — إذا
            رُفع السعر العام لاحقاً إلى 250 ج.م، تظل قيمة الترويج القائم 2,000
            ج.م دون أي زيادة.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
