import type { PropsWithChildren } from "react";
export function AuthFrame({ children }: PropsWithChildren) {
  return (
    <main dir="rtl" lang="ar" className="mx-auto max-w-lg px-6 py-12">
      <p className="mb-2 text-lg font-semibold">BaytFolio</p>
      <p className="mb-8 rounded-md border border-border bg-muted p-3 text-sm">
        نسخة تجريبية — بيانات داخل المتصفح، بدون اتصال بالباك إند. تحديث الصفحة
        يعيد بيانات التجربة.
      </p>
      {children}
    </main>
  );
}
