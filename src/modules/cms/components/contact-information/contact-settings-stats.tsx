import { MessageSquare, Phone } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui";
import { CONTACT_INFORMATION_STATS } from "../../constants/contact-information-stats";

import ContactSettingsStatsHeader from "./contact-settings-stats-header";
import ContactSettingsStatCard from "./contact-settings-stat-card";

export default function ContactSettingsStats() {
  return (
    <Card dir="rtl" className="rounded-xl">
      <CardContent className="p-5">
        <ContactSettingsStatsHeader />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CONTACT_INFORMATION_STATS.map((stat) => (
            <ContactSettingsStatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              description={stat.description}
              icon={
                stat.id === "whatsapp" ? (
                  <MessageSquare size={18} />
                ) : (
                  <Phone size={18} />
                )
              }
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
