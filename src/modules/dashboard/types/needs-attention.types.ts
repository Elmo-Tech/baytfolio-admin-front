export type NeedsAttentionTone =
  "warning" | "info" | "navy" | "danger" | "muted";

export type NeedsAttentionIcon =
  "store" | "sofa" | "package" | "flag" | "file-text" | "ban";

export interface NeedsAttentionItem {
  id: string;
  title: string;
  value: number;
  description: string;
  detail: string;
  detailTone?: "danger" | "warning";
  secondaryTone?: "success";
  tone: NeedsAttentionTone;
  icon: NeedsAttentionIcon;
  action: string;
  secondary: string;
}
