import { Check } from "lucide-react";

import { ONBOARDING_WIZARD_STEPS } from "../../constants/showroom-onboarding-wizard.constants";

interface Props {
  currentStep: string;
}

export default function WizardStepper({ currentStep }: Props) {
  const currentIndex = ONBOARDING_WIZARD_STEPS.findIndex(
    (step) => step.id === currentStep,
  );

  return (
    <section className="rounded-xl border border-border-subtle bg-card p-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {ONBOARDING_WIZARD_STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = step.id === currentStep;

          return (
            <div key={step.id} className="min-w-0">
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${
                    isCompleted
                      ? "bg-success/10 text-success"
                      : isActive
                        ? "bg-brand-navy text-brand-gold"
                        : "bg-muted text-text-muted"
                  }`}
                >
                  {isCompleted ? <Check size={18} /> : step.id}
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-[10px] ${
                      isActive ? "text-brand-navy" : "text-text-muted"
                    }`}
                  >
                    الخطوة {index + 1}
                    {isCompleted ? " • مكتملة" : ""}
                  </p>
                  <p
                    className={`mt-1 truncate text-xs font-semibold sm:text-sm ${
                      isActive ? "text-text-primary" : "text-text-muted"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </div>

              <div
                className={`mt-4 h-1 rounded-full ${
                  isCompleted
                    ? "bg-success"
                    : isActive
                      ? "bg-brand-navy"
                      : "bg-muted"
                }`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
