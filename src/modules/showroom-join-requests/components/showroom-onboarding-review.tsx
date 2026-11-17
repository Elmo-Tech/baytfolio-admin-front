import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Gavel,
  LockKeyhole,
  Package,
  Pencil,
  Rocket,
  ShieldCheck,
  SlidersHorizontal,
  Store,
  UserRound,
} from "lucide-react";

import type { ShowroomJoinRequest } from "../types/showroom-join-requests.types";

export type OnboardingOwnerData = {
  name: string;
  email: string;
  phone: string;
};

export type OnboardingContractData = {
  startDate: string;
  endDate: string;
  baseValue: string;
  roomsLimit: string;
  packagesLimit: string;
  verificationEnabled: boolean;
  verificationDuration: "full" | "fixed";
  verificationMonths: string;
  specialTerms: string;
  internalNotes: string;
  legalName: string;
  authorizedPerson: string;
  legalRole: string;
  registrationNumber: string;
  legalAddress: string;
};

type Props = {
  request: ShowroomJoinRequest;
  owner: OnboardingOwnerData;
  contract: OnboardingContractData;
  onBack: () => void;
  onEditShowroom: () => void;
  onEditOwner: () => void;
  onEditContract: () => void;
  onCreate: () => void;
  isCreating?: boolean;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatDate(value: string) {
  if (!value) return "غير محدد";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function getActivityLabel(activityType: ShowroomJoinRequest["activityType"]) {
  const labels: Record<ShowroomJoinRequest["activityType"], string> = {
    showroom: "معرض ومصنع",
    commercial_display: "صالة عرض تجارية",
    factory: "مصنع",
    design_studio: "استوديو تصميم",
  };

  return labels[activityType];
}

function getContractDuration(startDate: string, endDate: string) {
  if (!startDate || !endDate) return 0;

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end < start
  ) {
    return 0;
  }

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    end.getMonth() -
    start.getMonth();

  return Math.max(1, months + (end.getDate() >= start.getDate() ? 1 : 0));
}

function SectionCard({
  title,
  subtitle,
  icon: Icon,
  onEdit,
  children,
  className = "",
}: {
  title: string;
  subtitle: string;
  icon: typeof Building2;
  onEdit?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-border-subtle bg-card p-5 ${className}`}
    >
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-border-subtle pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-text-primary">
            <Icon size={19} />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] text-text-muted">{subtitle}</p>

            <h3 className="mt-1 truncate text-sm font-bold text-text-primary">
              {title}
            </h3>
          </div>
        </div>

        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-brand-navy transition-colors hover:bg-muted"
          >
            <Pencil size={13} />
            تعديل
          </button>
        )}
      </div>

      {children}
    </section>
  );
}

function DataItem({
  label,
  value,
  dir = "rtl",
  className = "",
}: {
  label: string;
  value?: string | number | null;
  dir?: "rtl" | "ltr";
  className?: string;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 text-right ${className}`}>
      <p className="text-[11px] text-text-muted">{label}</p>

      <p
        dir={dir}
        className="break-words text-right text-sm font-semibold leading-6 text-text-primary"
      >
        {value || "غير متوفر"}
      </p>
    </div>
  );
}

function MetricBox({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Building2;
}) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-lg border border-border-subtle bg-background p-4">
      <div className="flex min-w-0 items-center gap-2">
        <Icon size={17} className="shrink-0 text-text-secondary" />
        <span className="text-xs text-text-secondary">{label}</span>
      </div>

      <strong className="text-base font-bold text-text-primary" dir="ltr">
        {value}
      </strong>
    </div>
  );
}

function ReviewCheck({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 text-xs leading-6 text-text-secondary">
      <CheckCircle2 size={15} className="mt-1 shrink-0 text-success" />
      <span>{children}</span>
    </div>
  );
}

export default function ShowroomOnboardingReview({
  request,
  owner,
  contract,
  onBack,
  onEditShowroom,
  onEditOwner,
  onEditContract,
  onCreate,
  isCreating = false,
}: Props) {
  const contractDuration = getContractDuration(
    contract.startDate,
    contract.endDate,
  );

  const verificationMonths = contract.verificationEnabled
    ? contract.verificationDuration === "full"
      ? contractDuration
      : Number(contract.verificationMonths) || 0
    : 0;

  const verificationMonthlyPrice = 1000;
  const verificationTotal = verificationMonths * verificationMonthlyPrice;

  const baseValue = Math.max(0, Number(contract.baseValue) || 0);
  const totalValue = baseValue + verificationTotal;

  const hasSpecialTerms = Boolean(contract.specialTerms.trim());

  const legalFields = [
    contract.legalName,
    contract.authorizedPerson,
    contract.legalRole,
    contract.registrationNumber,
    contract.legalAddress,
  ];

  const hasLegalInformation = legalFields.some((value) =>
    Boolean(value?.trim()),
  );

  return (
    <section className="rounded-xl border border-border-subtle bg-card p-5 sm:p-7">
      {/* Review Content Header */}
      <div className="mb-6 flex flex-col justify-between gap-3 border-b border-border-subtle pb-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <ClipboardCheck size={21} className="text-text-primary" />

          <div>
            <h2 className="font-bold text-text-primary">
              مراجعة جميع البيانات
            </h2>

            <p className="mt-1 text-xs text-text-muted">
              البيانات التالية سيتم استخدامها في تجهيز المعرض.
            </p>
          </div>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-md bg-success/10 px-3 py-2 text-xs font-medium text-success">
          <BadgeCheck size={15} />
          الطلب معتمد وجاهز للإنشاء
        </div>
      </div>

      {/* Showroom + Owner */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Showroom Information */}
        <SectionCard
          title="بيانات المعرض"
          subtitle="البيانات الأساسية"
          icon={Store}
          onEdit={onEditShowroom}
        >
          <div className="flex flex-col gap-6">
            <DataItem
              label="اسم المعرض"
              value={request.showroomName}
              dir="rtl"
            />

            <DataItem
              label="نوع النشاط"
              value={getActivityLabel(request.activityType)}
            />

            <DataItem label="الموقع" value={request.location} />

            <DataItem label="النبذة / الوصف" value={request.description} />
          </div>
        </SectionCard>

        {/* Owner Information */}
        <SectionCard
          title="حساب المالك"
          subtitle="الإدارة التشغيلية"
          icon={UserRound}
          onEdit={onEditOwner}
        >
          <div className="flex flex-col gap-6">
            <DataItem label="الاسم الكامل" value={owner.name} />

            <DataItem label="الدور الإداري" value="Owner — مالك المعرض" />

            <DataItem label="البريد الإلكتروني" value={owner.email} dir="ltr" />

            <DataItem label="رقم الهاتف" value={owner.phone} dir="ltr" />
          </div>

          <div className="mt-5 rounded-md border border-border-subtle bg-background p-3">
            <p className="text-[11px] leading-6 text-text-secondary">
              سيتم إنشاء حساب المالك وإرسال رابط آمن لتعيين كلمة المرور عند
              تنفيذ عملية الإنشاء من خلال النظام.
            </p>
          </div>
        </SectionCard>
      </div>

      {/* Contract + Limits */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Commercial Contract */}
        <SectionCard
          title="العقد التجاري"
          subtitle="الاتفاقية المالية"
          icon={FileText}
          onEdit={onEditContract}
        >
          <div className="flex flex-col gap-6">
            <DataItem
              label="تاريخ البداية"
              value={formatDate(contract.startDate)}
              dir="ltr"
            />

            <DataItem
              label="تاريخ النهاية"
              value={formatDate(contract.endDate)}
              dir="ltr"
            />

            <DataItem label="مدة العقد" value={`${contractDuration} شهر`} />

            <DataItem
              label="قيمة العقد الأساسية"
              value={`${formatCurrency(baseValue)} ج.م`}
            />
          </div>
        </SectionCard>

        {/* Operational Limits */}
        <SectionCard
          title="الحدود التشغيلية"
          subtitle="الطاقة الاستيعابية"
          icon={SlidersHorizontal}
          onEdit={onEditContract}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <MetricBox
              label="حد الغرف"
              value={contract.roomsLimit || "0"}
              icon={Building2}
            />

            <MetricBox
              label="حد الباقات"
              value={contract.packagesLimit || "0"}
              icon={Package}
            />
          </div>
        </SectionCard>
      </div>

      {/* Verification */}
      <div className="mt-5">
        <SectionCard
          title="إضافة التوثيق المعتمد (Verification Add-on)"
          subtitle="ترقية الشارة الرسمية"
          icon={BadgeCheck}
          onEdit={onEditContract}
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                contract.verificationEnabled
                  ? "bg-success/10 text-success"
                  : "bg-muted text-text-muted"
              }`}
            >
              {contract.verificationEnabled ? "مشمول في الاتفاق" : "غير مفعل"}
            </span>
          </div>

          {contract.verificationEnabled ? (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <DataItem
                  label="المدة المقررة"
                  value={`${verificationMonths} أشهر`}
                />

                <DataItem
                  label="فترة السريان"
                  value={`${formatDate(contract.startDate)} → ${formatDate(
                    contract.endDate,
                  )}`}
                  dir="ltr"
                />

                <DataItem
                  label="السعر الشهري"
                  value={`${formatCurrency(verificationMonthlyPrice)} ج.م`}
                />

                <DataItem
                  label="إجمالي التوثيق"
                  value={`${formatCurrency(verificationTotal)} ج.م`}
                />
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-md bg-background p-3 text-xs leading-6 text-text-secondary">
                <LockKeyhole
                  size={14}
                  className="mt-1 shrink-0 text-text-muted"
                />

                <p>
                  التوثيق يظل غير مفعل أثناء فترة التجهيز Onboarding حتى استيفاء
                  متطلبات التفعيل والنشر.
                </p>
              </div>
            </>
          ) : (
            <p className="text-sm text-text-muted">
              لم يتم تفعيل خدمة التوثيق الإضافية لهذا العقد.
            </p>
          )}
        </SectionCard>
      </div>

      {/* Legal Information */}
      <div className="mt-5">
        <SectionCard
          title="بيانات الطرف المتعاقد والبنود"
          subtitle="التوثيق القانوني"
          icon={Gavel}
          onEdit={onEditContract}
        >
          {hasLegalInformation ? (
            <div className="flex flex-col gap-5">
              <DataItem
                label="الاسم القانوني للمنشأة"
                value={contract.legalName}
              />

              <DataItem
                label="المفوض بالتوقيع"
                value={contract.authorizedPerson}
              />

              <DataItem label="صفة المفوض" value={contract.legalRole} />

              <DataItem
                label="السجل التجاري / البطاقة الضريبية"
                value={contract.registrationNumber}
              />

              <DataItem
                label="العنوان القانوني"
                value={contract.legalAddress}
              />
            </div>
          ) : (
            <div className="rounded-lg border border-warning/20 bg-warning/5 p-4">
              <p className="text-xs leading-6 text-text-secondary">
                لم يتم إدخال البيانات القانونية للطرف المتعاقد بعد. يرجى
                مراجعتها وإكمالها قبل إصدار العقد النهائي.
              </p>
            </div>
          )}

          <div className="mt-6 border-t border-border-subtle pt-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-text-muted">قالب العقد</p>

              <p className="text-xs font-bold text-text-primary">
                عقد BaytFolio القياسي
              </p>
            </div>

            {hasSpecialTerms && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-text-muted">بنود خاصة</p>

                <p className="rounded-md bg-background p-3 text-xs leading-6 text-text-secondary">
                  {contract.specialTerms}
                </p>
              </div>
            )}

            {contract.internalNotes.trim() && (
              <div className="mt-4 rounded-md border border-border-subtle bg-background p-3">
                <p className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                  <LockKeyhole size={13} />
                  ملاحظات داخلية للإدارة — لا تظهر في العقد المطبوع
                </p>

                <p className="mt-2 text-xs leading-6 text-text-muted">
                  {contract.internalNotes}
                </p>
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      {/* Financial Summary */}
      <div className="mt-5">
        <SectionCard
          title="الملخص المالي والاتفاق"
          subtitle="الحسابات المالية"
          icon={ClipboardCheck}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-text-secondary">قيمة العقد الأساسية</span>

              <strong className="text-text-primary">
                {formatCurrency(baseValue)} ج.م
              </strong>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-text-secondary">
                التوثيق المضاف ({verificationMonths} أشهر)
              </span>

              <strong className="text-text-primary">
                {formatCurrency(verificationTotal)} ج.م
              </strong>
            </div>

            <div className="border-t border-border-subtle pt-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-text-primary">
                    إجمالي الاتفاق المالي
                  </p>

                  <p className="mt-1 text-[11px] text-text-muted">
                    يشمل قيمة العقد وخدمة التوثيق عند تفعيلها.
                  </p>
                </div>

                <p className="text-2xl font-bold text-text-primary" dir="ltr">
                  {formatCurrency(totalValue)}
                  <span className="mr-1 text-sm font-medium">ج.م</span>
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Creation Summary */}
      <section className="mt-6 rounded-xl border-2 border-brand-navy bg-background p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-white">
            <ClipboardCheck size={20} />
          </div>

          <h3 className="font-bold text-text-primary">
            ماذا سيحدث عند إنشاء المعرض؟
          </h3>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          <ReviewCheck>إنشاء Showroom داخل منظومة BaytFolio.</ReviewCheck>

          <ReviewCheck>إنشاء حساب Owner وربطه بالمعرض.</ReviewCheck>

          <ReviewCheck>إنشاء Commercial Profile والعقد التشغيلي.</ReviewCheck>

          <ReviewCheck>
            حفظ حدود الغرف ({contract.roomsLimit}) والباقات (
            {contract.packagesLimit}).
          </ReviewCheck>

          {contract.verificationEnabled && (
            <ReviewCheck>
              حفظ إعداد التوثيق المجدول ({verificationMonths} أشهر).
            </ReviewCheck>
          )}

          <ReviewCheck>
            ربط المعرض بطلب الانضمام {request.reference}.
          </ReviewCheck>

          <ReviewCheck>تجهيز رابط آمن لتعيين كلمة المرور للمالك.</ReviewCheck>
        </div>

        <div className="mt-5 rounded-md border border-border-subtle bg-card p-3">
          <p className="text-xs leading-6 text-text-secondary">
            لن يتم تفعيل أو نشر المعرض تلقائيًا. سيظل في حالة Onboarding حتى
            استكمال متطلبات التجهيز والتفعيل.
          </p>
        </div>
      </section>

      {/* Footer Actions */}
      <div className="mt-7 flex flex-col-reverse justify-between gap-3 border-t border-border-subtle pt-6 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onBack}
          disabled={isCreating}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border-subtle bg-background px-5 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowRight size={16} />
          السابق — العقد والحدود
        </button>

        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <button
            type="button"
            disabled
            title="معاينة العقد ستتوفر بعد تجهيز مستند العقد النهائي."
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border-subtle bg-background px-5 py-3 text-sm font-medium text-text-muted opacity-70"
          >
            <FileText size={16} />
            معاينة العقد
          </button>

          <button
            type="button"
            onClick={onCreate}
            disabled={isCreating}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-navy px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-navy/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Rocket size={16} />
            {isCreating ? "جاري التجهيز..." : "إنشاء المعرض"}
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-[11px] leading-5 text-text-muted">
        <ShieldCheck size={14} className="shrink-0" />

        <span>
          عملية الإنشاء الفعلية تحتاج إلى Backend API معتمد، ولن يتم اعتبار
          المعرض منشأً قبل تأكيد الخادم.
        </span>
      </div>
    </section>
  );
}
