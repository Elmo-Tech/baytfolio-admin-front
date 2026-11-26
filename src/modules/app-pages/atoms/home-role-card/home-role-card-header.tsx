import {
  Badge,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui";

import { cn } from "@/shared/utils/cn";

import { roleAccentStyles } from "../../constants/home-role-content.constants";

import type { RoleCardData } from "../../types/home.types";

export const HomeRoleCardHeader = ({ card }: { card: RoleCardData }) => {
  const Icon = card.icon;
  const styles = roleAccentStyles[card.accent];

  return (
    <CardHeader className="relative gap-4">
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-xl",
            styles.icon,
          )}
        >
          <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
        </div>

        <Badge
          variant="outline"
          className={cn("px-2.5 py-1 text-[11px]", styles.badge)}
        >
          {card.role}
        </Badge>
      </div>

      <div className="space-y-2">
        <CardTitle className="text-2xl font-bold">{card.title}</CardTitle>

        <CardDescription className="text-sm leading-6">
          {card.description}
        </CardDescription>
      </div>
    </CardHeader>
  );
};
