import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui";

import { ClipboardList, Info } from "lucide-react";

export const PromotionsRulesCard = () => {
  return (
    <Card className="gap-0 rounded-xl py-0 shadow-none">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-center gap-2">
          <ClipboardList className="size-4 text-accent" />

          <CardTitle className="text-sm font-bold text-primary">
            قواعد الترويج في النظام (V1)
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-5 pt-0">
        <div className="rounded-lg bg-background/60 p-3">
          <p className="flex items-center gap-2 text-xs font-semibold text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            المحتوى المروّج (Promoted Content)
          </p>

          <p className="mt-1 ps-3.5 text-[11px] leading-5 text-text-secondary">
            غرف وباقات تظهر في مقدمة القوائم مع علامة ترويج مميزة لجذب المشترين
            بدقة.
          </p>
        </div>

        <div className="rounded-lg bg-background/60 p-3">
          <p className="flex items-center gap-2 text-xs font-semibold text-primary">
            <span className="size-1.5 rounded-full bg-accent" />
            إعلانات البانر (Banner Advertising)
          </p>

          <p className="mt-1 ps-3.5 text-[11px] leading-5 text-text-secondary">
            مساحات إعلانية مخصصة مباشرة أعلى وأوسط الصفحات لتعزيز العلامة
            التجارية.
          </p>
        </div>

        <p className="flex items-start gap-1.5 text-[11px] leading-5 text-text-secondary">
          <Info className="mt-0.5 size-3.5 shrink-0 text-accent" />
          كلاهما يُحاسب يومياً ويُسعّر مستقل وشكل آلي دون تعقيدات مزدادة.
        </p>
      </CardContent>
    </Card>
  );
};
