import { useState } from "react";
import { getShowroomDetails } from "../api/showroom-details.mock";
import type { ShowroomDetailsTab } from "../components/details/showroom-details-tabs";

export function useShowroomDetails(showroomId?: string) {
  const [activeTab, setActiveTab] = useState<ShowroomDetailsTab>("overview");
  const showroom = showroomId ? getShowroomDetails(showroomId) : undefined;
  return { showroom, activeTab, setActiveTab };
}
