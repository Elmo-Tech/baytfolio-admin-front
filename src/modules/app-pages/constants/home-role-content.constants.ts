import {
  Activity,
  BarChart3,
  Package,
  ShieldCheck,
  ShoppingCart,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";

import type { RoleCardData, RoleAccentStyles } from "../types/home.types";

export const roleCards: RoleCardData[] = [
  {
    role: "مسؤول النظام",
    title: "لوحة تحكم المسؤول",
    description:
      "أدر منصة بيت فوليو بالكامل. نظّم البائعين والمستخدمين، وحافظ على سير العمليات بسلاسة، واتخذ قرارات مدعومة بمؤشرات على مستوى المنصة.",
    icon: ShieldCheck,
    href: "/login",
    ctaLabel: "تسجيل الدخول كمسؤول",
    accent: "admin",
    features: [
      { label: "إدارة البائعين والمستخدمين", icon: Users },
      { label: "متابعة نشاط المنصة", icon: Activity },
      { label: "إدارة المنتجات والتصنيفات", icon: Package },
      { label: "مراجعة التقارير والتحليلات", icon: BarChart3 },
    ],
  },
  {
    role: "بائع",
    title: "لوحة تحكم البائع",
    description:
      "أدر متجرك من مكان واحد. حافظ على تحديث كتالوج منتجاتك، وتابع كل طلب، وراقب أداء أعمالك مع نموها.",
    icon: Store,
    href: "/login",
    ctaLabel: "تسجيل الدخول كبائع",
    accent: "vendor",
    features: [
      { label: "إدارة المنتجات والمخزون", icon: Package },
      { label: "متابعة الطلبات", icon: ShoppingCart },
      { label: "مراقبة المبيعات والأداء", icon: TrendingUp },
      { label: "إدارة معلومات المتجر", icon: Store },
    ],
  },
];

export const roleAccentStyles: RoleAccentStyles = {
  admin: {
    card: "hover:border-primary/40",
    bar: "bg-gradient-to-r from-primary/0 via-primary to-primary/0",
    icon: "bg-primary text-primary-foreground",
    badge: "border-primary/15 bg-primary/5 text-primary",
    featureIcon: "bg-primary/10 text-primary",
    cta: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/80",
    glow: "bg-primary/10",
  },
  vendor: {
    card: "hover:border-accent/60",
    bar: "bg-gradient-to-r from-accent/0 via-accent to-accent/0",
    icon: "bg-accent text-primary",
    badge: "border-accent/30 bg-accent/10 text-primary",
    featureIcon: "bg-accent/10 text-accent",
    cta: "bg-accent text-primary shadow-sm hover:accent/80",
    glow: "bg-accent/15",
  },
};
