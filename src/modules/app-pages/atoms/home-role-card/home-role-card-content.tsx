import { CardContent } from "@/shared/components/ui";
import { roleAccentStyles } from "../../constants/home-role-content.constants";

import { cn } from "@/shared/utils/cn";

import type { RoleCardData } from "../../types/home.types";

export const HomeRoleCardContent = ({ card }: { card: RoleCardData }) => {
  const styles = roleAccentStyles[card.accent];

  return (
    <CardContent className="relative">
      <div className="mb-3 flex items-center gap-3">
        <span className="text-[11px] font-semibold text-text-secondary">
          ما يمكنك إنجازه
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>

      <ul className="space-y-3">
        {card.features.map(({ label, icon: FeatureIcon }) => (
          <li
            key={label}
            className="flex items-center gap-3 text-sm text-foreground/80"
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-md",
                styles.featureIcon,
              )}
            >
              <FeatureIcon size={14} strokeWidth={2} aria-hidden="true" />
            </span>
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  );
};
