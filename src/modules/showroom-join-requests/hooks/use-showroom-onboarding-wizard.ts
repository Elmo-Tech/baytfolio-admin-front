import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { useNavigate } from "react-router";
import { toast } from "@/shared/lib/toast";

import { mockShowroomJoinRequests } from "../api/showroom-join-requests.mock";
import { INITIAL_ONBOARDING_CONTRACT_DATA } from "../constants/showroom-onboarding-wizard.constants";
import {
  ownerSchema,
  type OwnerFormValues,
} from "../schemas/showroom-owner-form.schema";
import type {
  OnboardingContractData,
  OnboardingOwnerData,
} from "../types/showroom-join-requests.types";

export function useShowroomOnboardingWizard(requestId?: string) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useQueryState(
    "step",
    parseAsStringEnum(["1", "2", "3", "4"]).withDefault("1"),
  );
  const [contractData, setContractData] = useState<OnboardingContractData>(
    INITIAL_ONBOARDING_CONTRACT_DATA,
  );

  const {
    data: request,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["showroom-join-request", requestId],
    queryFn: async () =>
      mockShowroomJoinRequests.find((item) => item.id === requestId) ?? null,
    enabled: Boolean(requestId),
  });

  const ownerForm = useForm<OwnerFormValues>({
    resolver: zodResolver(ownerSchema),
    values: {
      name: request?.contactPerson ?? "",
      email: request?.email ?? "",
      phone: request?.phone ?? "",
    },
  });

  const ownerValues = useWatch({ control: ownerForm.control });
  const ownerData: OnboardingOwnerData = {
    name: ownerValues.name ?? "",
    email: ownerValues.email ?? "",
    phone: ownerValues.phone ?? "",
  };

  const reviewContractData: OnboardingContractData = request
    ? {
        ...contractData,
        legalName:
          contractData.legalName || request.legalInformation?.legalName || "",
        authorizedPerson:
          contractData.authorizedPerson ||
          request.legalInformation?.authorizedPerson ||
          "",
        legalRole:
          contractData.legalRole || request.legalInformation?.legalRole || "",
        registrationNumber:
          contractData.registrationNumber ||
          request.legalInformation?.registrationNumber ||
          "",
        legalAddress:
          contractData.legalAddress ||
          request.legalInformation?.legalAddress ||
          "",
      }
    : contractData;

  return {
    request,
    isLoading,
    isError,
    currentStep,
    setCurrentStep,
    contractData,
    setContractData,
    reviewContractData,
    ownerForm,
    ownerData,
    handleOwnerSubmit: ownerForm.handleSubmit(() => void setCurrentStep("3")),
    handleSaveDraft: () =>
      toast.info("حفظ المسودة سيتم تفعيله عند ربط Backend."),
    handleCreate: () =>
      toast.info("إنشاء المعرض الفعلي يحتاج إلى ربط Backend API."),
    goToRequests: () => navigate("/admin/showroom-join-requests"),
    goToRequestDetails: (id: string) =>
      navigate(`/admin/showroom-join-requests/${id}`),
  };
}
