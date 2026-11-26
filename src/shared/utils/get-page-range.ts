export type PageItem = number | "ellipsis-start" | "ellipsis-end";

export const getPageRange = (
  currentPage: number,
  totalPages: number,
  siblings = 1,
): PageItem[] => {
  const maxVisible = siblings * 2 + 5;

  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const left = Math.max(currentPage - siblings, 2);
  const right = Math.min(currentPage + siblings, totalPages - 1);

  const showStartDots = left > 2;
  const showEndDots = right < totalPages - 1;

  if (!showStartDots) {
    const count = siblings * 2 + 2;
    return [
      ...Array.from({ length: count }, (_, i) => i + 1),
      "ellipsis-end",
      totalPages,
    ];
  }

  if (!showEndDots) {
    const count = siblings * 2 + 2;
    return [
      1,
      "ellipsis-start",
      ...Array.from({ length: count }, (_, i) => totalPages - count + 1 + i),
    ];
  }

  return [
    1,
    "ellipsis-start",
    ...Array.from({ length: right - left + 1 }, (_, i) => left + i),
    "ellipsis-end",
    totalPages,
  ];
};
