import type { CMSOverviewData } from "../../types/cms";
import CMSGeneralCards from "./cms-general-cards";
import CMSLegalCards from "./cms-legal-cards";

interface CMSOverviewGridProps {
  data: CMSOverviewData;
}

export default function CMSOverviewGrid({ data }: CMSOverviewGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <CMSGeneralCards
        helpCenter={data.helpCenter}
        contactInfo={data.contactInfo}
      />
      <CMSLegalCards
        privacyPolicy={data.privacyPolicy}
        termsConditions={data.termsConditions}
      />
    </div>
  );
}
