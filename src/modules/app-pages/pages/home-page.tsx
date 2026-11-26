import { Link } from "react-router";
import { Badge } from "@/shared/components/ui";
import { HomeRoleSelection } from "../components/home-role-selection";

import { ShieldCheck } from "lucide-react";

import { baytfolioIcon } from "@/assets";

export const HomePage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 size-136 -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="absolute -right-40 -bottom-48 size-120 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 border-b border-border/70 py-5">
          <Link
            to="/"
            aria-label="الصفحة الرئيسية لمنصة بيت فوليو"
            className="flex items-center gap-2.5"
          >
            <img
              src={baytfolioIcon}
              alt=""
              aria-hidden="true"
              className="h-9 w-9 shrink-0 object-contain"
            />

            <span className="text-lg font-bold tracking-tight text-primary">
              BaytFolio
            </span>
          </Link>

          <Badge
            variant="outline"
            className="gap-1.5 border-border bg-card/70 px-3 py-1.5 text-xs text-text-secondary backdrop-blur"
          >
            <ShieldCheck
              size={14}
              aria-hidden="true"
              className="text-brand-gold-strong"
            />
            دخول آمن إلى المنصة
          </Badge>
        </header>

        <section className="flex flex-1 flex-col justify-center py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="rounded-full border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
            >
              منصة Baytfolio
            </Badge>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-balance text-primary leading-18">
              مرحبًا بك في لوحة تحكم Baytfolio
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-pretty text-text-secondary sm:text-lg">
              منصة موحّدة لإدارة السوق من البداية إلى النهاية. اختر مساحة العمل
              المناسبة لتنظيم المنصة بصفتك مسؤولًا، أو لتنمية متجرك بصفتك
              بائعًا.
            </p>
          </div>

          <HomeRoleSelection />

          <p className="mt-10 text-center text-xs texttext-secondary">
            هل تحتاج إلى مساعدة في تسجيل الدخول؟ تواصل مع مدير حسابك في
            Baytfolio.
          </p>
        </section>

        <footer className="border-t border-border/70 py-5">
          <p className="text-center text-xs text-text-secondary">
            © {currentYear} Baytfolio. جميع الحقوق محفوظة.
          </p>
        </footer>
      </div>
    </main>
  );
};
