import { Clock3 } from "lucide-react";

interface PromotionsDurationBadgeProps {
  label: string;
}

export const PromotionsDurationBadge = ({
  label,
}: PromotionsDurationBadgeProps) => {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-text-secondary">
      <Clock3 className="size-3 text-text-secondary" />
      {label}
    </span>
  );
};
