import { baytfolioIcon } from "@/assets";

export default function AuthBrand() {
  return (
    <div className="flex items-center gap-2.5" dir="rtl">
      <img
        src={baytfolioIcon}
        alt=""
        aria-hidden="true"
        className="h-8 w-8 shrink-0 object-contain"
      />

      <div className="flex items-center gap-1.5" dir="ltr">
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-[#C89B3C]"
        />
        <p className="font-bold text-[#102131]">BaytFolio</p>
      </div>
    </div>
  );
}
