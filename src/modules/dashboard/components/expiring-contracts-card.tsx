import { AlertTriangle } from "lucide-react";

import type { ExpiringContract } from "../types/dashboard-insights.types";
import DashboardInsightCard from "./dashboard-insight-card";

interface ExpiringContractsCardProps {
  contracts: ExpiringContract[];
  onShowAll: () => void;
}

export default function ExpiringContractsCard({
  contracts,
  onShowAll,
}: ExpiringContractsCardProps) {
  return (
    <DashboardInsightCard
      title="العقود القريبة من الانتهاء"
      icon={<AlertTriangle size={22} />}
      action={`${contracts.length} معارض`}
      onAction={onShowAll}
      footerLabel="إشعارات التجديد التلقائية مفعلة"
      footerAction="عرض الحسابات التجارية والعقود"
      onFooterAction={onShowAll}
    >
      <div className="flex-1 divide-y divide-border-divider">
        {contracts.map((contract) => {
          const needsAttention = contract.remainingDays <= 13;

          return (
            <div key={contract.id} className="flex items-center gap-3 py-5">
              <span
                className={`shrink-0 rounded-lg border px-2 py-1.5 text-sm font-bold ${
                  needsAttention
                    ? "border-users-stat-warning-fg/40 bg-users-stat-warning-bg text-users-stat-warning-fg"
                    : "border-badge-info-fg/30 bg-badge-info-bg text-badge-info-fg"
                }`}
              >
                {contract.remainingDays}d
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-text-primary">
                  {contract.organization}
                </p>
                <p className="mt-1 text-xs leading-5 text-text-muted">
                  ينتهي في: {contract.expiryDate}
                </p>
                <p className="text-xs text-text-muted">
                  متبقي {contract.remainingDays} أيام
                </p>
              </div>

              <button
                type="button"
                onClick={onShowAll}
                className={`max-w-24 shrink-0 cursor-pointer rounded-md border px-2 py-2 text-xs font-semibold transition-colors ${
                  needsAttention
                    ? "border-users-stat-warning-fg/40 bg-users-stat-warning-bg text-users-stat-warning-fg hover:bg-users-stat-warning-bg/80"
                    : "border-badge-info-fg/30 bg-badge-info-bg text-badge-info-fg hover:bg-badge-info-bg/80"
                }`}
              >
                {needsAttention ? "قارب على الانتهاء" : "متابعة التجديد"}
              </button>
            </div>
          );
        })}
      </div>
    </DashboardInsightCard>
  );
}
