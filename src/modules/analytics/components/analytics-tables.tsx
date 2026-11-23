import { getAnalyticsTables } from "../utils/analytics-tables-view";
import ActiveShowroomsTable from "./active-showrooms-table";
import ExpiringContractsTable from "./expiring-contracts-table";

export default function AnalyticsTables() {
  const { activeShowrooms, expiringContracts } = getAnalyticsTables();

  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 items-stretch gap-4 2xl:grid-cols-2"
    >
      <ActiveShowroomsTable showrooms={activeShowrooms} />
      <ExpiringContractsTable contracts={expiringContracts} />
    </section>
  );
}
