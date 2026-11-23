import { Button } from "@/shared/components/ui/button";
import { Clock3 } from "lucide-react";

type OtpResendBarProps = {
  canResend: boolean;
  formattedCountdown: string;
  onResend: () => void;
};

export default function OtpResendBar({
  canResend,
  formattedCountdown,
  onResend,
}: OtpResendBarProps) {
  return (
    <div className="flex items-center justify-between text-sm leading-5">
      <Button
        unstyled
        type="button"
        disabled={!canResend}
        onClick={onResend}
        className="cursor-pointer font-medium text-auth-text-muted transition-colors enabled:text-auth-link-hover enabled:hover:underline disabled:cursor-not-allowed disabled:opacity-70"
      >
        طلب رمز جديد
      </Button>
      <span className="flex items-center gap-1.5 text-text-secondary">
        <Clock3 aria-hidden="true" className="size-3.5 text-auth-text-muted" />
        {canResend ? (
          "يمكنك طلب رمز جديد الآن"
        ) : (
          <>
            إعادة الإرسال خلال:
            <b dir="ltr" className="font-semibold text-auth-navy">
              {formattedCountdown}
            </b>
          </>
        )}
      </span>
    </div>
  );
}
