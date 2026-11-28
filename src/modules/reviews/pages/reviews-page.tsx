import { PagesHeading } from "@/shared/components/common";
import { Badge } from "@/shared/components/ui";
import { ReviewsFilters } from "../components/reviews-filters";
import { ReviewsContent } from "../components/reviews-content";

export const ReviewsPage = () => {
  return (
    <div className="reviews-page">
      <PagesHeading
        title="التقييمات"
        description="مراجعة وإدارة تقييمات مستخدمي BaytFolio وضمان جودة المحتوى المعتمد."
        badge="42 تقييم"
      >
        <Badge className="bg-white py-1.5 text-primary gap-2 border border-border">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          بانتظار المراجعة الفورية:
          <span className="text-accent">12</span>
        </Badge>
      </PagesHeading>

      <ReviewsFilters />

      <ReviewsContent />
    </div>
  );
};
