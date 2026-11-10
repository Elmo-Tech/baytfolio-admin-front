interface ShowroomDetailFieldProps {
  label: string;
  value: string;
  dir?: "rtl" | "ltr";
  className?: string;
}

export default function ShowroomDetailField({
  label,
  value,
  dir = "rtl",
  className = "",
}: ShowroomDetailFieldProps) {
  return (
    <div
      className={`flex min-h-24 flex-col justify-center rounded-xl border border-border-warm bg-surface-admin p-5 sm:p-6 ${className}`}
    >
      <p className="mb-2 text-sm font-medium text-users-text-muted">{label}</p>

      <p
        dir={dir}
        className="break-words text-base font-semibold leading-relaxed text-users-text-primary"
      >
        {value}
      </p>
    </div>
  );
}
