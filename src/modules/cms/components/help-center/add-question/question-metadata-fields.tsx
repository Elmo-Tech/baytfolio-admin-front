import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";

import { helpCenterCategories } from "../../../api/help-center.mock";

interface Props {
  category: string;
  setCategory: (value: string) => void;
  status: "active" | "draft";
  setStatus: (value: "active" | "draft") => void;
}

export default function QuestionMetadataFields({
  category,
  setCategory,
  status,
  setStatus,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_180px]">
      <div className="space-y-2">
        <Label>موضوع السؤال *</Label>

        <Select dir="rtl" value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder="اختر التصنيف" />
          </SelectTrigger>

          <SelectContent>
            {helpCenterCategories.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>الحالة *</Label>

        <Select
          dir="rtl"
          value={status}
          onValueChange={(value) => setStatus(value as "active" | "draft")}
        >
          <SelectTrigger className="h-11 w-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="active">نشط</SelectItem>
            <SelectItem value="draft">مسودة</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
