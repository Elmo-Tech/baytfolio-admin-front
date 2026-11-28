import { Star } from "lucide-react";

const ratingStars = [1, 2, 3, 4, 5];

interface ReviewsRatingProps {
  rating: number;
}

export const ReviewsRating = ({ rating }: ReviewsRatingProps) => {
  return (
    <div className="flex items-center gap-2">
      <div
        role="img"
        className="flex items-center gap-0.5"
        aria-label={`تقييم ${rating} من 5`}
      >
        {ratingStars.map((star) => (
          <Star
            key={star}
            className={`size-3.5 ${
              star <= Math.round(rating)
                ? "fill-accent text-accent"
                : "fill-transparent text-border"
            }`}
          />
        ))}
      </div>

      <span dir="ltr" className="text-xs font-semibold text-text-secondary">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};
