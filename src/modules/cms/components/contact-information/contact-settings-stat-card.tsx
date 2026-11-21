import type { ReactNode } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
interface ContactSettingsStatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  description: string;
}

export default function ContactSettingsStatCard({
  icon,
  label,
  value,
  description,
}: ContactSettingsStatCardProps) {
  return (
    <Card className="border-0 bg-muted shadow-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">{label}</p>
          <span className="text-muted-foreground">{icon}</span>
        </div>

        <p className="mt-2 text-3xl font-bold tabular-nums text-card-foreground">
          {value}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
