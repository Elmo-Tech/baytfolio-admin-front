import { ArrowRight, Building2 } from "lucide-react";
import { useParams } from "react-router";

import { Button } from "@/shared/components/ui";

import ShowroomContractStep from "../components/contract-step/showroom-contract-step";
import ShowroomOnboardingReview from "../components/onboarding-review/showroom-onboarding-review";
import WizardAuditFooter from "../components/onboarding-wizard/wizard-audit-footer";
import WizardHeader from "../components/onboarding-wizard/wizard-header";
import WizardStepOwner from "../components/onboarding-wizard/wizard-step-owner";
import WizardStepShowroom from "../components/onboarding-wizard/wizard-step-showroom";
import WizardStepper from "../components/onboarding-wizard/wizard-stepper";
import { useShowroomOnboardingWizard } from "../hooks/use-showroom-onboarding-wizard";

export default function ShowroomOnboardingWizardPage() {
  const { requestId } = useParams<{ requestId: string }>();
  const w = useShowroomOnboardingWizard(requestId);

  if (w.isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-sm text-text-muted">جاري تحميل بيانات الطلب...</p>
      </div>
    );
  }

  if (w.isError || !w.request) {
    return (
      <div className="rounded-xl border border-border-subtle bg-card p-10 text-center">
        <Building2 className="mx-auto mb-3 text-text-muted" size={32} />
        <h2 className="font-semibold text-text-primary">
          تعذر العثور على طلب الانضمام
        </h2>
        <Button
          type="button"
          variant="outline"
          className="mt-5 gap-2"
          onClick={w.goToRequests}
        >
          <ArrowRight size={16} />
          العودة إلى الطلبات
        </Button>
      </div>
    );
  }

  return (
    <main dir="rtl" className="space-y-6 pb-4">
      <WizardHeader
        currentStep={w.currentStep}
        reference={w.request.reference}
        showroomName={w.request.showroomName}
      />
      <WizardStepper currentStep={w.currentStep} />
      {w.currentStep === "1" && (
        <WizardStepShowroom
          request={w.request}
          onCancel={() => w.goToRequestDetails(w.request!.id)}
          onSaveDraft={w.handleSaveDraft}
          onNext={() => void w.setCurrentStep("2")}
        />
      )}
      {w.currentStep === "2" && (
        <WizardStepOwner
          form={w.ownerForm}
          onSubmit={w.handleOwnerSubmit}
          onPrevious={() => void w.setCurrentStep("1")}
        />
      )}
      {w.currentStep === "3" && (
        <ShowroomContractStep
          key={w.request.id}
          onPrevious={() => void w.setCurrentStep("2")}
          onNext={() => void w.setCurrentStep("4")}
          legalInformation={w.request.legalInformation}
          onChange={w.setContractData}
        />
      )}
      {w.currentStep === "4" && (
        <ShowroomOnboardingReview
          request={w.request}
          owner={w.ownerData}
          contract={w.reviewContractData}
          onBack={() => void w.setCurrentStep("3")}
          onEditShowroom={() => void w.setCurrentStep("1")}
          onEditOwner={() => void w.setCurrentStep("2")}
          onEditContract={() => void w.setCurrentStep("3")}
          onCreate={w.handleCreate}
        />
      )}
      <WizardAuditFooter />
    </main>
  );
}
