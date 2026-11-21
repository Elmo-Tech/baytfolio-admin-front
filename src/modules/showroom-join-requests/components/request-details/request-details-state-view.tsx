import { ArrowRight, RefreshCw, Store } from "lucide-react";

import { Button } from "@/shared/components/ui";

interface Props {
  mode: "loading" | "not-found";
  onBack: () => void;
}

export default function RequestDetailsStateView({ mode, onBack }: Props) {
  return (
    <main dir="rtl" className="pb-8">
      <div className="rounded-xl border border-border-subtle bg-card px-5 py-16 text-center">
        {mode === "loading" ? (
          <>
            <RefreshCw
              size={25}
              className="mx-auto mb-3 animate-spin text-primary"
            />
            <p className="text-sm text-text-secondary">
              جاري تحميل بيانات الطلب...
            </p>
          </>
        ) : (
          <>
            <Store size={32} className="mx-auto mb-3 text-text-muted" />
            <h1 className="text-lg font-bold text-text-primary">
              الطلب غير موجود
            </h1>
            <Button
              type="button"
              variant="outline"
              className="mt-5 gap-2"
              onClick={onBack}
            >
              <ArrowRight size={15} />
              العودة إلى قائمة الطلبات
            </Button>
          </>
        )}
      </div>
    </main>
  );
}
