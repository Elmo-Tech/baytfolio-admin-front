import { Headset } from "lucide-react";

import { CONTACT_INFORMATION_PREVIEW as CONTENT } from "../../constants/contact-information-preview.constants";

export default function ContactInformationPreviewHero() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-brand-navy p-4 text-surface-white sm:p-5">
      <div className="absolute -right-8 -top-10 size-36 rounded-full bg-surface-white/5" />

      <div className="relative flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-white/10">
          <Headset size={23} />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-surface-white/60">
            {CONTENT.hero.eyebrow}
          </p>

          <h3 className="mt-1 text-sm font-semibold sm:text-base">
            {CONTENT.hero.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
