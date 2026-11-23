import type { StandaloneQuestionForm } from "../../hooks/use-standalone-question-form";
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";
import { helpCenterCategories } from "../../api/help-center.mock";

export default function StandaloneQuestionMetadata({
  category,
  setCategory,
  status,
  setStatus,
}: StandaloneQuestionForm) {
  return (
    <>
      {/* Category & Status */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_180px]">
        {/* Category */}
        <div className="space-y-2">
          <Label presentation="question-label">
            موضوع السؤال <span className="text-destructive">*</span>
          </Label>

          <Select dir="rtl" value={category} onValueChange={setCategory}>
            <SelectTrigger presentation="filled-form">
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

        {/* Status */}
        <div className="space-y-2">
          <Label presentation="question-label">
            الحالة <span className="text-destructive">*</span>
          </Label>

          <Select
            dir="rtl"
            value={status}
            onValueChange={(value) => setStatus(value as "active" | "draft")}
          >
            <SelectTrigger presentation="filled-form">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="draft">مسودة</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
