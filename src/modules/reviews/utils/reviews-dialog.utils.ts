import type { Review } from "../types/reviews.types";

const arabicMonths = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

export interface ReviewDialogMeta {
  reviewCode: string;
  userCode: string;
  sku: string;
  targetTitle: string;
  showroom: string;
  showroomInitials: string;
  comment: string;
  positivePercent: number;
  formattedDate: string;
}

const formatArabicDate = (date: string) => {
  const [day, month, year] = date.split("/");
  const monthName = arabicMonths[Number(month) - 1];

  if (!day || !monthName || !year) return date;

  return `${Number(day)} ${monthName} ${year}`;
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);

  if (parts.length > 1) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
};

export const getReviewDialogMeta = (review: Review): ReviewDialogMeta => {
  const hasSeparateComment = review.comment.trim().length > 0;
  const showroom = hasSeparateComment ? review.supplier : review.item;

  return {
    reviewCode: `#REV-2026-${9280 + review.id}`,
    userCode: `#USR-${9280 + review.id}-E6`,
    sku: `SKU-RM-${8200 + review.id}`,
    targetTitle: hasSeparateComment
      ? `${review.category} ${review.item}`
      : review.category,
    showroom,
    showroomInitials: getInitials(showroom),
    comment: hasSeparateComment ? review.comment : review.supplier,
    positivePercent: Math.round((review.rating / 5) * 100),
    formattedDate: formatArabicDate(review.date),
  };
};
