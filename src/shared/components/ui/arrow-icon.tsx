import { ArrowRight } from "lucide-react";

type ArrowIconProps = {
  className?: string;
};

export default function ArrowIcon({ className = "" }: ArrowIconProps) {
  return (
    <ArrowRight
      aria-hidden="true"
      className={className}
      size={20}
      strokeWidth={2}
    />
  );
}
