import type { LucideIcon } from "lucide-react";

type RoleFeature = {
  label: string;
  icon: LucideIcon;
};

export interface RoleCardData {
  role: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  ctaLabel: string;
  features: RoleFeature[];
  accent: RoleAccent;
}

interface AccentStyles {
  card: string;
  bar: string;
  icon: string;
  badge: string;
  featureIcon: string;
  cta: string;
  glow: string;
}
type RoleAccent = "admin" | "vendor";

export type RoleAccentStyles = Record<RoleAccent, AccentStyles>;
