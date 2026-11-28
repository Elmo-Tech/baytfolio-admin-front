import { Badge } from "../ui";

interface PagesHeadingProps {
  title: string;
  description: string;
  badge?: string;
  children?: React.ReactNode;
}

export const PagesHeading = ({
  title,
  description,
  badge,
  children,
}: PagesHeadingProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-x-2 gap-y-4 pb-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-bold text-primary leading-7">
            {title}
          </h1>

          {badge && (
            <Badge className="bg-white py-1 px-3 text-text-secondary font-semibold border border-border">
              {badge}
            </Badge>
          )}
        </div>

        <p className="text-[13px] font-normal text-text-secondary leading-5">
          {description}
        </p>
      </div>

      {children && (
        <div className="max-sm:flex max-sm:justify-end">{children}</div>
      )}
    </div>
  );
};
