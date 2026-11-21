import type { CMSLegalContent } from "../../types/cms";

interface CMSLegalDetailsProps {
  content: CMSLegalContent;
}

export default function CMSLegalDetails({ content }: CMSLegalDetailsProps) {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="text-text-muted">آخر اعتماد وتحديث</span>
        <span className="font-medium text-text-primary">
          {content.lastUpdated}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-text-muted">اللغات المنشورة</span>
        <div className="flex gap-2">
          {content.languages.map((language) => (
            <span
              key={language}
              className="rounded-sm bg-card px-2 py-1 text-xs text-text-secondary"
            >
              {language}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-text-muted">الامتثال القانوني</span>
        <span className="text-xs text-text-primary">{content.scope}</span>
      </div>
    </div>
  );
}
