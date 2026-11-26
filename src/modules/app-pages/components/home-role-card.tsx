import { Card } from "@/shared/components/ui";

import { HomeRoleCardContent } from "../atoms/home-role-card/home-role-card-content";
import { HomeRoleCardFooter } from "../atoms/home-role-card/home-role-card-footer";
import { HomeRoleCardHeader } from "../atoms/home-role-card/home-role-card-header";

import { cn } from "@/shared/utils/cn";

import type { RoleCardData } from "../types/home.types";

import { roleAccentStyles } from "../constants/home-role-content.constants";

export const HomeRoleCard = ({ card }: { card: RoleCardData }) => {
  const styles = roleAccentStyles[card.accent];

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-floating",
        styles.card,
      )}
    >
      <div
        aria-hidden="true"
        className={cn("absolute inset-x-0 top-0 h-1", styles.bar)}
      />

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-16 -right-16 size-40 rounded-full opacity-60 blur-3xl transition-opacity duration-300 group-hover:opacity-100",
          styles.glow,
        )}
      />

      <HomeRoleCardHeader card={card} />

      <HomeRoleCardContent card={card} />

      <HomeRoleCardFooter card={card} />
    </Card>
  );
};
