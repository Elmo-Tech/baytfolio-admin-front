import { useContractStep } from "../../hooks/use-contract-step";
import type {
  ContractStepLegalInfo,
  ContractStepValues,
} from "../../types/showroom-join-requests.types";
import ContractDatesSection from "./contract-dates-section";
import ContractFinancialSummaryCard from "./contract-financial-summary-card";
import ContractLegalTermsSection from "./contract-legal-terms-section";
import ContractLimitsSection from "./contract-limits-section";
import ContractStepFooter from "./contract-step-footer";
import ContractVerificationCostCard from "./contract-verification-cost-card";
import ContractVerificationToggle from "./contract-verification-toggle";

interface Props {
  onPrevious: () => void;
  onNext: () => void;
  legalInformation?: ContractStepLegalInfo;
  onChange: (values: ContractStepValues) => void;
}

export default function ShowroomContractStep({
  onPrevious,
  onNext,
  legalInformation,
  onChange,
}: Props) {
  const {
    values,
    summary,
    update,
    handleStartDateChange,
    handleEndDateChange,
    handleVerificationMonthsChange,
  } = useContractStep(legalInformation, onChange);

  return (
    <section dir="rtl" className="space-y-6">
      <div className="rounded-xl border border-border-subtle bg-card p-5 sm:p-7">
        <ContractDatesSection
          startDate={values.startDate}
          endDate={values.endDate}
          baseValue={values.baseValue}
          duration={summary.duration}
          validDates={summary.validDates}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          onUpdate={update}
        />

        <ContractLimitsSection
          roomsLimit={values.roomsLimit}
          packagesLimit={values.packagesLimit}
          onUpdate={update}
        />

        <ContractVerificationToggle
          values={values}
          duration={summary.duration}
          onUpdate={update}
          onVerificationMonthsChange={handleVerificationMonthsChange}
        />

        <ContractVerificationCostCard
          enabled={values.verificationEnabled}
          effectiveMonths={summary.effectiveMonths}
          verificationValid={summary.verificationValid}
          verificationCost={summary.verificationCost}
        />

        <ContractLegalTermsSection values={values} onUpdate={update} />

        <ContractFinancialSummaryCard
          duration={summary.duration}
          baseValue={summary.baseValue}
          verificationCost={summary.verificationCost}
          total={summary.total}
        />

        <ContractStepFooter
          canContinue={summary.canContinue}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </div>
    </section>
  );
}
