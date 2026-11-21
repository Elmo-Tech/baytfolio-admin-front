import { commercialStats } from "../api/analytics.mock";
import { COMMERCIAL_STAT_CONFIG } from "../constants/commercial-overview";

export function useCommercialOverview() {
  return commercialStats.map((stat) => {
    const config = COMMERCIAL_STAT_CONFIG[stat.id];
    const isExpiring = stat.id === "expiring";

    return {
      ...stat,
      iconComponent: config.icon,
      description: config.description,
      iconBoxClass: isExpiring
        ? `bg-badge-warning-bg ${config.iconColor}`
        : `bg-background ${config.iconColor}`,
      valueClass: isExpiring ? "text-warning" : "text-text-primary",
      detailClass: isExpiring ? "text-destructive" : "text-text-primary",
    };
  });
}
