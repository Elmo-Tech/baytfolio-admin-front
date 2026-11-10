import { baytfolioIcon } from "@/assets";

export default function AuthBrand() {
  return (
    <div className="flex items-center gap-2.5" dir="rtl">
      <img
        src={baytfolioIcon}
        alt=""
        aria-hidden="true"
        className="h-10 w-10 shrink-0 object-contain"
      />

      <div className="flex items-center gap-1.5" dir="ltr">
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-auth-gold"
        />
        <p className="text-lg font-bold text-auth-brand-navy">BaytFolio</p>
      </div>
    </div>
  );
}
