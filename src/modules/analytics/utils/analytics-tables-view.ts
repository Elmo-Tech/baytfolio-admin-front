import { activeShowrooms, expiringContracts } from "../api/analytics.mock";

export function getAnalyticsTables() {
  const formattedContracts = expiringContracts.map((contract) => {
    const isExpired = contract.status === "بانتظار التجديد";

    return {
      ...contract,
      statusColor: isExpired
        ? "border-badge-error-fg/30 bg-badge-error-bg text-badge-error-fg"
        : "border-badge-warning-fg/30 bg-badge-warning-bg text-badge-warning-fg",
      dateDescriptionColor: isExpired
        ? "text-badge-error-fg"
        : "text-badge-warning-fg",
    };
  });

  return {
    activeShowrooms,
    expiringContracts: formattedContracts,
  };
}
