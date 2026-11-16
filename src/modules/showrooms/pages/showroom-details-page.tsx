import { useState } from "react";
import { useParams } from "react-router";

import { getShowroomDetails } from "../api/showroom-details.mock";
import {
  ShowroomDetailsHeader,
  ShowroomInfoCard,
  ShowroomContentCard,
  ShowroomContractCard,
  ShowroomPromotionCard,
  ShowroomOwnerCard,
} from "../components/details";
import type { ShowroomDetailsTab } from "../components/details/showroom-details-header";
import ShowroomDetailsNotFound from "../components/details/showroom-details-not-found";

export default function ShowroomDetailsPage() {
  const { showroomId } = useParams<{ showroomId: string }>();
  const [activeTab, setActiveTab] = useState<ShowroomDetailsTab>("overview");

  const showroom = showroomId ? getShowroomDetails(showroomId) : undefined;

  if (!showroom) {
    return <ShowroomDetailsNotFound />;
  }

  return (
    <div dir="rtl" className="space-y-4">
      <ShowroomDetailsHeader
        showroom={showroom}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1.8fr)_minmax(260px,0.9fr)]">
          <div className="min-w-0 space-y-4">
            <ShowroomInfoCard showroom={showroom} />
            <ShowroomOwnerCard showroom={showroom} />
          </div>

          <aside className="min-w-0 space-y-4">
            <ShowroomContentCard
              showroom={showroom}
              onNavigate={() => setActiveTab("content")}
            />

            <ShowroomContractCard
              showroom={showroom}
              onNavigate={() => setActiveTab("contract")}
            />

            <ShowroomPromotionCard showroom={showroom} />
          </aside>
        </div>
      )}

      {activeTab === "content" && (
        <div className="min-w-0">
          <ShowroomContentCard showroom={showroom} />
        </div>
      )}

      {activeTab === "contract" && (
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
          <ShowroomContractCard showroom={showroom} />
          <ShowroomPromotionCard showroom={showroom} />
        </div>
      )}
    </div>
  );
}
