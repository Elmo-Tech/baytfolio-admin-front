import type { Showroom } from "../types/showroom";

export const activityLabels: Record<Showroom["activity"], string> = {
  showroom: "معرض",
  factory: "مصنع",
  showroom_factory: "معرض ومصنع",
  studio_manufacturing: "استوديو وتصنيع",
};

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB").format(new Date(date));

export const getShowroomInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
