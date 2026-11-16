import AnalyticsHeader from "../components/analytics-header";
import AnalyticsOverview from "../components/analytics-overview";
import PlatformActivityChart from "../components/platform-activity-chart";
import CommercialOverview from "../components/commercial-overview";
import AnalyticsTables from "../components/analytics-tables";

export default function AnalyticsPage() {
  return (
    <main dir="rtl" className="space-y-6 pb-8">
      <AnalyticsHeader />
      <AnalyticsOverview />
      <PlatformActivityChart />
      <CommercialOverview />
      <AnalyticsTables />
    </main>
  );
}
