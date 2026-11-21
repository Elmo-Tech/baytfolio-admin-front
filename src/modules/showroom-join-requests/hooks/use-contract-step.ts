import { useMemo, useState } from "react";

import {
  CONTRACT_MAX_MONTHS,
  INITIAL_CONTRACT_STEP_VALUES,
} from "../constants/contract-step.constants";
import type {
  ContractStepLegalInfo,
  ContractStepValues,
} from "../types/showroom-join-requests.types";
import {
  calculateContractSummary,
  getContractEndDate,
} from "../utils/contract-step.utils";

export function useContractStep(
  legalInformation: ContractStepLegalInfo | undefined,
  onChange: (values: ContractStepValues) => void,
) {
  const [values, setValues] = useState<ContractStepValues>(() => ({
    ...INITIAL_CONTRACT_STEP_VALUES,
    legalName: legalInformation?.legalName ?? "",
    authorizedPerson: legalInformation?.authorizedPerson ?? "",
    legalRole: legalInformation?.legalRole ?? "",
    registrationNumber: legalInformation?.registrationNumber ?? "",
    legalAddress: legalInformation?.legalAddress ?? "",
  }));

  const summary = useMemo(() => calculateContractSummary(values), [values]);

  const commit = (next: ContractStepValues) => {
    setValues(next);
    onChange(next);
  };

  const update = <K extends keyof ContractStepValues>(
    key: K,
    value: ContractStepValues[K],
  ) => commit({ ...values, [key]: value });

  const handleStartDateChange = (startDate: string) =>
    commit({ ...values, startDate, endDate: getContractEndDate(startDate) });

  const handleEndDateChange = (endDate: string) => {
    if (endDate <= summary.maxEndDate) update("endDate", endDate);
  };

  const handleVerificationMonthsChange = (value: string) => {
    if (value === "") return update("verificationMonths", value);
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return;
    update(
      "verificationMonths",
      String(
        Math.min(Math.max(1, parsed), summary.duration || CONTRACT_MAX_MONTHS),
      ),
    );
  };

  return {
    values,
    summary,
    update,
    handleStartDateChange,
    handleEndDateChange,
    handleVerificationMonthsChange,
  };
}
