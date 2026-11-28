import type { PromotionContent } from "../../types/promotions.types";

interface PromotionsContentCellProps {
  content: PromotionContent;
}

export const PromotionsContentCell = ({
  content,
}: PromotionsContentCellProps) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={content.image}
        alt={content.title}
        loading="lazy"
        className="h-11 w-14 shrink-0 rounded-md border border-border object-cover"
      />

      <div className="min-w-0">
        <p className="max-w-56 truncate text-sm font-semibold text-primary">
          {content.title}
        </p>

        <p className="mt-1 text-[11px] text-text-secondary">{content.code}</p>
      </div>
    </div>
  );
};
