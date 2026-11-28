import { Languages, MessageSquareQuote } from "lucide-react";

interface ReviewsDialogCommentCardProps {
  comment: string;
}

export const ReviewsDialogCommentCard = ({
  comment,
}: ReviewsDialogCommentCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MessageSquareQuote className="size-3.5 text-text-secondary" />

          <p className="text-xs font-semibold text-text-secondary">
            نص تعليق العميل
          </p>
        </div>

        <span className="inline-flex items-center gap-1 text-[11px] text-text-secondary">
          <Languages className="size-3.5" />
          العربية (المصرية)
        </span>
      </div>

      <p className="border-b border-border/60 pb-4 text-sm leading-7 text-text-secondary">
        «{comment || "لا يوجد تعليق"}»
      </p>
    </div>
  );
};
