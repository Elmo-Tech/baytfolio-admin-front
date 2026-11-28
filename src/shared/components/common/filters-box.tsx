import { cn } from "@/lib/utils";

interface FiltersBoxProps {
  children: React.ReactNode;
  className?: string;
}

export const FiltersBox = ({ children, className }: FiltersBoxProps) => {
  return (
    <div
      className={cn(
        "mb-4 rounded-lg border border-border bg-white p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};
