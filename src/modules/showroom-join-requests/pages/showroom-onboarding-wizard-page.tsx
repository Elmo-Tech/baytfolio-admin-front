import { useState } from "react";
import { useForm, useWatch, type UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Store,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { Badge, Button, Input, Label } from "@/shared/components/ui";

import { mockShowroomJoinRequests } from "../api/showroom-join-requests.mock";
import ShowroomContractStep from "../components/showroom-contract-step";
import ShowroomOnboardingReview, {
  type OnboardingContractData,
  type OnboardingOwnerData,
} from "../components/showroom-onboarding-review";

import type { ShowroomJoinRequest } from "../types/showroom-join-requests.types";

const steps = [
  { id: "1", title: "بيانات المعرض" },
  { id: "2", title: "حساب المالك" },
  { id: "3", title: "العقد والحدود" },
  { id: "4", title: "المراجعة والإنشاء" },
] as const;

const ownerSchema = z.object({
  name: z.string().min(1, "يرجى إدخال الاسم الكامل"),
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  phone: z.string().min(1, "يرجى إدخال رقم الهاتف"),
});

type OwnerFormValues = z.infer<typeof ownerSchema>;

const initialContractData: OnboardingContractData = {
  startDate: "2026-11-01",
  endDate: "2027-10-31",
  baseValue: "30000",
  roomsLimit: "100",
  packagesLimit: "20",
  verificationEnabled: false,
  verificationDuration: "full",
  verificationMonths: "3",
  specialTerms: "",
  internalNotes: "",
  legalName: "",
  authorizedPerson: "",
  legalRole: "",
  registrationNumber: "",
  legalAddress: "",
};

function getActivityLabel(activityType: ShowroomJoinRequest["activityType"]) {
  const labels: Record<ShowroomJoinRequest["activityType"], string> = {
    showroom: "معرض ومصنع",
    commercial_display: "صالة عرض تجارية",
    factory: "مصنع",
    design_studio: "استوديو تصميم",
  };

  return labels[activityType];
}

function Stepper({ currentStep }: { currentStep: string }) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <section className="rounded-xl border border-border-subtle bg-card p-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {steps.map((step, index) => {
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

type ReadOnlyFieldProps = {
  label: string;
  value: string;
  icon: typeof Building2;
  className?: string;
  dir?: "rtl" | "ltr";
};

function ReadOnlyField({
  label,
  value,
  icon: Icon,
  className = "",
  dir = "rtl",
}: ReadOnlyFieldProps) {
  return (
    <div
      className={`rounded-lg border border-border-subtle bg-background p-4 ${className}`}
    >
      <p className="text-xs text-text-muted">{label}</p>

      <div className="mt-2 flex items-center gap-2">
        <Icon size={17} className="shrink-0 text-text-secondary" />

        <p
          dir={dir}
          className="min-w-0 break-words text-sm font-semibold text-text-primary"
        >
          {value || "غير متوفر"}
        </p>
      </div>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  name: keyof OwnerFormValues;
  placeholder: string;
  icon: typeof UserRound;
  register: UseFormRegister<OwnerFormValues>;
  error?: string;
  dir?: "rtl" | "ltr";
};

function OwnerFormField({
  label,
  name,
  placeholder,
  icon: Icon,
  register,
  error,
  dir = "rtl",
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-xs font-medium text-text-secondary">
        {label}
      </Label>

      <div className="relative">
        <Icon
          size={17}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
        />

        <Input
          id={name}
          dir={dir}
          {...register(name)}
          placeholder={placeholder}
          className="h-11 border-border-subtle bg-background pr-10 text-sm shadow-none"
        />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function AuditFooter() {
  return (
    <footer
      dir="rtl"
      className="flex flex-col justify-between gap-4 px-2 py-5 text-xs text-text-muted sm:flex-row sm:items-center"
    >
      <div className="flex items-center gap-2">
        <ShieldCheck size={15} className="shrink-0" />
        <span>
          جميع الإجراءات في هذا المعالج تخضع لتدقيق سجل النشاطات الإدارية (Audit
          Trail).
        </span>
      </div>

      <div
        dir="ltr"
        className="flex flex-wrap items-center gap-3 sm:justify-end"
      >
        <span>
          Session ID:{" "}
          <strong className="font-semibold text-text-secondary">
            SES-88219-ADM
          </strong>
        </span>

        <span className="text-text-muted">•</span>

        <span>
          Operator:{" "}
          <strong className="font-semibold text-text-secondary">Admin</strong>
        </span>
      </div>
    </footer>
  );
}

export default function ShowroomOnboardingWizardPage() {
  const navigate = useNavigate();
  const { requestId } = useParams<{ requestId: string }>();

  const [currentStep, setCurrentStep] = useQueryState(
    "step",
    parseAsStringEnum(["1", "2", "3", "4"]).withDefault("1"),
  );

  const [contractData, setContractData] =
    useState<OnboardingContractData>(initialContractData);

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

  const ownerValues = useWatch({
    control: ownerForm.control,
  });
  const ownerData: OnboardingOwnerData = {
    name: ownerValues.name ?? "",
    email: ownerValues.email ?? "",
    phone: ownerValues.phone ?? "",
  };

  const handleSaveDraft = () => {
    toast.info("حفظ المسودة سيتم تفعيله عند ربط Backend.");
  };

  const handleNext = () => {
    if (currentStep === "1") {
      void setCurrentStep("2");
    }
  };

  const handlePrevious = () => {
    if (currentStep === "2") {
      void setCurrentStep("1");
      return;
    }

    if (currentStep === "3") {
      void setCurrentStep("2");
    }
  };

  const handleOwnerSubmit = ownerForm.handleSubmit(() => {
    void setCurrentStep("3");
  });

  const handleCreate = () => {
    toast.info("إنشاء المعرض الفعلي يحتاج إلى ربط Backend API.");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-sm text-text-muted">جاري تحميل بيانات الطلب...</p>
      </div>
    );
  }

  if (isError || !request) {
    return (
      <div className="rounded-xl border border-border-subtle bg-card p-10 text-center">
        <Building2 className="mx-auto mb-3 text-text-muted" size={32} />

        <h2 className="font-semibold text-text-primary">
          تعذر العثور على طلب الانضمام
        </h2>

        <p className="mt-2 text-sm text-text-muted">
          تأكد من رقم الطلب وحاول مرة أخرى.
        </p>

        <Button
          type="button"
          variant="outline"
          className="mt-5 gap-2"
          onClick={() => navigate("/showroom-join-requests")}
        >
          <ArrowRight size={16} />
          العودة إلى الطلبات
        </Button>
      </div>
    );
  }

  const reviewContractData: OnboardingContractData = {
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
      contractData.legalAddress || request.legalInformation?.legalAddress || "",
  };

  return (
    <main dir="rtl" className="space-y-6 pb-4">
      {/* Shared Page Header - يظهر في جميع الخطوات */}
      <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="border-transparent bg-info/10 text-info"
            >
              <ClipboardCheck size={13} className="ml-1" />
              معالج التجهيز والاعتماد
            </Badge>

            <span className="text-xs text-text-muted">
              الخطوة {currentStep} من 4
            </span>
          </div>

          <h1 className="text-2xl font-bold text-text-primary">
            إنشاء وتجهيز المعرض
          </h1>

          <p className="mt-2 text-sm text-text-muted">
            إعداد بيانات المعرض وحساب المالك والعقد قبل إطلاق الحساب التشغيلي
            على المنظومة.
          </p>
        </div>

        <div className="flex min-w-[300px] items-center gap-4 rounded-xl border border-border-subtle bg-card px-5 py-4 sm:min-w-[340px]">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-brand-gold">
            <ClipboardCheck size={24} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-text-muted">
              مرجع الطلب المعتمد
            </p>

            <p
              className="mt-1 text-sm font-bold text-text-primary sm:text-base"
              dir="ltr"
            >
              {request.reference}
            </p>

            <p className="mt-1 truncate text-sm font-medium text-text-secondary">
              {request.showroomName}
            </p>
          </div>
        </div>
      </header>

      {/* Shared Stepper - يظهر مرة واحدة فقط في جميع الخطوات */}
      <Stepper currentStep={currentStep} />

      {currentStep === "1" && (
        <section className="rounded-xl border border-border-subtle bg-card p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-3 border-b border-border-subtle pb-5 sm:flex-row sm:items-start">
            <div>
              <div className="flex items-center gap-2">
                <Building2 size={20} className="text-brand-navy" />
                <h2 className="text-lg font-bold text-text-primary">
                  بيانات المعرض
                </h2>
              </div>

              <p className="mt-2 text-sm text-text-muted">
                مراجعة البيانات المعتمدة من طلب الانضمام.
              </p>
            </div>

            <Badge
              variant="secondary"
              className="w-fit border-transparent bg-success/10 text-success"
            >
              <CheckCircle2 size={13} className="ml-1" />
              بيانات الطلب
            </Badge>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <ReadOnlyField
              label="اسم المعرض"
              value={request.showroomName}
              icon={Building2}
            />

            <ReadOnlyField
              label="نوع النشاط"
              value={getActivityLabel(request.activityType)}
              icon={Store}
            />

            <ReadOnlyField
              label="اسم المسؤول"
              value={request.contactPerson}
              icon={UserRound}
            />

            <ReadOnlyField
              label="رقم الهاتف / WhatsApp"
              value={request.phone}
              icon={Phone}
              dir="ltr"
            />

            <ReadOnlyField
              label="البريد الإلكتروني"
              value={request.email}
              icon={Mail}
              dir="ltr"
              className="md:col-span-2"
            />

            <ReadOnlyField
              label="موقع المعرض / المصنع"
              value={request.location}
              icon={MapPin}
              className="md:col-span-2"
            />

            <div className="rounded-lg border border-border-subtle bg-background p-5 md:col-span-2">
              <p className="text-xs font-medium text-text-muted">
                النبذة / الوصف
              </p>

              <p className="mt-3 text-sm leading-7 text-text-primary">
                {request.description ||
                  "لم تتم إضافة نبذة أو وصف للمعرض في طلب الانضمام."}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-info/20 bg-info/5 p-4">
            <p className="text-xs leading-6 text-text-secondary">
              البيانات المعروضة مأخوذة من طلب الانضمام، ويمكنك الانتقال لإعداد
              حساب المالك.
            </p>
          </div>

          <div className="mt-7 flex flex-col-reverse justify-between gap-3 border-t border-border-subtle pt-5 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/showroom-join-requests/${request.id}`)}
              className="gap-2"
            >
              <ArrowRight size={16} />
              إلغاء والعودة للطلب
            </Button>

            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                className="gap-2"
              >
                <Save size={16} />
                حفظ كمسودة
              </Button>

              <Button
                type="button"
                onClick={handleNext}
                className="gap-2 bg-brand-navy text-white hover:bg-brand-navy/90"
              >
                التالي — حساب المالك
                <ArrowLeft size={16} />
              </Button>
            </div>
          </div>
        </section>
      )}

      {currentStep === "2" && (
        <form
          onSubmit={handleOwnerSubmit}
          className="rounded-xl border border-border-subtle bg-card p-5 sm:p-7"
        >
          <div className="border-b border-border-subtle pb-5">
            <div className="flex items-center gap-2">
              <UserRound size={20} className="text-brand-navy" />
              <h2 className="text-lg font-bold text-text-primary">
                حساب مالك المعرض
              </h2>
            </div>

            <p className="mt-2 text-sm text-text-muted">
              بيانات مسؤول التواصل المعتمدة ستستخدم لإعداد حساب المالك.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <OwnerFormField
              label="الاسم الكامل"
              name="name"
              placeholder="أدخل الاسم الكامل"
              icon={UserRound}
              register={ownerForm.register}
              error={ownerForm.formState.errors.name?.message}
            />

            <OwnerFormField
              label="البريد الإلكتروني"
              name="email"
              placeholder="example@email.com"
              icon={Mail}
              register={ownerForm.register}
              error={ownerForm.formState.errors.email?.message}
              dir="ltr"
            />

            <OwnerFormField
              label="رقم الهاتف"
              name="phone"
              placeholder="أدخل رقم الهاتف"
              icon={Phone}
              register={ownerForm.register}
              error={ownerForm.formState.errors.phone?.message}
              dir="ltr"
            />

            <div className="space-y-2">
              <Label className="text-xs font-medium text-text-secondary">
                الدور والصلاحية
              </Label>

              <div className="flex h-11 items-center justify-between rounded-md border border-border-subtle bg-background px-3">
                <div className="flex items-center gap-2">
                  <LockKeyhole size={16} className="text-text-muted" />
                  <span className="text-sm font-semibold text-text-primary">
                    مالك المعرض (Owner)
                  </span>
                </div>

                <Badge
                  variant="secondary"
                  className="border-transparent bg-brand-navy text-white"
                >
                  صلاحية إدارية
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-info/20 bg-info/5 p-4">
            <p className="text-xs leading-6 text-text-secondary">
              سيتم إعداد حساب المالك بعد إتمام المراجعة وتنفيذ عملية الإنشاء من
              خلال النظام.
            </p>
          </div>

          <div className="mt-7 flex flex-col-reverse justify-between gap-3 border-t border-border-subtle pt-5 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              className="gap-2"
            >
              <ArrowRight size={16} />
              السابق — بيانات المعرض
            </Button>

            <Button
              type="submit"
              className="gap-2 bg-brand-navy text-white hover:bg-brand-navy/90"
            >
              التالي — العقد والحدود
              <ArrowLeft size={16} />
            </Button>
          </div>
        </form>
      )}

      {currentStep === "3" && (
        <ShowroomContractStep
          key={request.id}
          onPrevious={handlePrevious}
          onNext={() => void setCurrentStep("4")}
          legalInformation={request.legalInformation}
          onChange={setContractData}
        />
      )}

      {currentStep === "4" && (
        <ShowroomOnboardingReview
          request={request}
          owner={ownerData}
          contract={reviewContractData}
          onBack={() => void setCurrentStep("3")}
          onEditShowroom={() => void setCurrentStep("1")}
          onEditOwner={() => void setCurrentStep("2")}
          onEditContract={() => void setCurrentStep("3")}
          onCreate={handleCreate}
        />
      )}

      <AuditFooter />
    </main>
  );
}
