import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Gavel,
  LockKeyhole,
  Package,
  Printer,
  ShieldCheck,
  DoorOpen,
  Calculator,
  BadgeCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";

import { Badge, Button, Input, Label } from "@/shared/components/ui";

type LegalInformation = {
  legalName?: string;
  authorizedPerson?: string;
  legalRole?: string;
  registrationNumber?: string;
  legalAddress?: string;
};

type ContractValues = {
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
  onPrevious: () => void;
  onNext: () => void;
  legalInformation?: LegalInformation;
  onChange: (values: ContractValues) => void;
};

const CONTRACT_MAX_MONTHS = 12;
const VERIFICATION_MONTHLY_PRICE = 1000;

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getContractEndDate(startDate: string) {
  const [year, month, day] = startDate.split("-").map(Number);

  if (!year || !month || !day) return "";

  const endDate = new Date(year, month - 1 + CONTRACT_MAX_MONTHS, day);
  endDate.setDate(endDate.getDate() - 1);

  return formatDate(endDate);
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

  const monthDifference =
    (end.getFullYear() - start.getFullYear()) * 12 +
    end.getMonth() -
    start.getMonth();

  const inclusiveMonth = end.getDate() >= start.getDate() - 1 ? 1 : 0;

  return Math.min(CONTRACT_MAX_MONTHS, monthDifference + inclusiveMonth);
}

const initialValues: ContractValues = {
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

const currency = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

function SectionHeading({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: typeof FileText;
}) {
  return (
    <div className="mb-5 flex items-start gap-3 border-b border-border-subtle pb-4">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-navy/5 text-brand-navy">
        <Icon size={19} />
      </div>

      <div>
        <h3 className="font-bold text-text-primary">{title}</h3>
        <p className="mt-1 text-xs leading-6 text-text-muted">{description}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  prefix,
  hint,
  dir = "rtl",
  min,
  max,
  readOnly = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  prefix?: string;
  hint?: string;
  dir?: "rtl" | "ltr";
  min?: number;
  max?: number;
  readOnly?: boolean;
}) {
  return (
    <div className="min-w-0 space-y-2">
      <Label className="text-xs font-semibold text-text-primary">{label}</Label>

      <div className="flex min-w-0 overflow-hidden rounded-md border border-border-subtle bg-card focus-within:border-brand-navy">
        {prefix && (
          <span className="flex shrink-0 items-center border-l border-border-subtle bg-muted px-3 text-xs text-text-muted">
            {prefix}
          </span>
        )}

        <Input
          type={type}
          dir={dir}
          value={value}
          min={min}
          max={max}
          readOnly={readOnly}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-11 min-w-0 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
      </div>

      {hint && <p className="text-[11px] leading-5 text-text-muted">{hint}</p>}
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label className="text-xs font-semibold text-text-primary">
          {label}
        </Label>

        {hint && <span className="text-[11px] text-text-muted">{hint}</span>}
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-y rounded-md border border-border-subtle bg-card px-3 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-navy focus:ring-1 focus:ring-brand-navy/10"
      />
    </div>
  );
}

export default function ShowroomContractStep({
  onPrevious,
  onNext,
  legalInformation,
  onChange,
}: Props) {
  const [values, setValues] = useState<ContractValues>(() => ({
    ...initialValues,
    legalName: legalInformation?.legalName ?? "",
    authorizedPerson: legalInformation?.authorizedPerson ?? "",
    legalRole: legalInformation?.legalRole ?? "",
    registrationNumber: legalInformation?.registrationNumber ?? "",
    legalAddress: legalInformation?.legalAddress ?? "",
  }));

  const update = <K extends keyof ContractValues>(
    key: K,
    value: ContractValues[K],
  ) => {
    const nextValues = {
      ...values,
      [key]: value,
    };

    setValues(nextValues);
    onChange(nextValues);
  };

  const baseValue = Math.max(0, Number(values.baseValue) || 0);

  const maxContractEndDate = useMemo(
    () => getContractEndDate(values.startDate),
    [values.startDate],
  );

  const contractDuration = useMemo(
    () => getContractDuration(values.startDate, values.endDate),
    [values.startDate, values.endDate],
  );

  const validDates =
    Boolean(values.startDate) &&
    Boolean(values.endDate) &&
    values.endDate > values.startDate &&
    values.endDate <= maxContractEndDate &&
    contractDuration > 0;

  const verificationMonths = Math.max(
    1,
    Number(values.verificationMonths) || 1,
  );

  const effectiveVerificationMonths =
    values.verificationDuration === "full"
      ? contractDuration
      : verificationMonths;

  const verificationDurationValid =
    !values.verificationEnabled ||
    (validDates &&
      effectiveVerificationMonths >= 1 &&
      effectiveVerificationMonths <= contractDuration);

  const verificationCost = values.verificationEnabled
    ? effectiveVerificationMonths * VERIFICATION_MONTHLY_PRICE
    : 0;

  const total = baseValue + verificationCost;

  const canContinue =
    validDates &&
    baseValue > 0 &&
    Number(values.roomsLimit) > 0 &&
    Number(values.packagesLimit) > 0 &&
    verificationDurationValid;

  const handleStartDateChange = (startDate: string) => {
    const newEndDate = getContractEndDate(startDate);

    const nextValues = {
      ...values,
      startDate,
      endDate: newEndDate,
    };

    setValues(nextValues);
    onChange(nextValues);
  };

  const handleEndDateChange = (endDate: string) => {
    if (endDate > maxContractEndDate) return;

    update("endDate", endDate);
  };

  const handleVerificationMonthsChange = (value: string) => {
    if (value === "") {
      update("verificationMonths", value);
      return;
    }

    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue)) return;

    update(
      "verificationMonths",
      String(
        Math.min(
          Math.max(1, parsedValue),
          contractDuration || CONTRACT_MAX_MONTHS,
        ),
      ),
    );
  };

  return (
    <section dir="rtl" className="space-y-6">
      <div className="rounded-xl border border-border-subtle bg-card p-5 sm:p-7">
        {/* Contract Information */}
        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-text-primary">
                بيانات العقد
              </h2>

              <p className="mt-1 text-sm text-text-muted">
                سجل بيانات الاتفاق التجاري المعتمد ومدة سريان العقد.
              </p>
            </div>

            <Badge
              variant="secondary"
              className="border-transparent bg-warning/10 text-warning"
            >
              <span className="ml-1 size-1.5 rounded-full bg-warning" />
              حالة العقد: مسودة أولية (Draft)
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-5 border-b border-border-subtle pb-7 md:grid-cols-3">
            <Field
              label="تاريخ بداية العقد"
              type="date"
              value={values.startDate}
              onChange={handleStartDateChange}
              hint="أول يوم في دورة التعاقد التشغيلي"
              dir="ltr"
            />

            <div className="min-w-0 space-y-2">
              <Field
                label="تاريخ نهاية العقد"
                type="date"
                value={values.endDate}
                onChange={handleEndDateChange}
                max={undefined}
                dir="ltr"
              />

              <div className="flex flex-wrap items-center gap-2 text-[11px] leading-5">
                {validDates ? (
                  <>
                    <Clock size={13} className="shrink-0 text-text-muted" />
                    <span className="text-text-muted">
                      مدة العقد: {contractDuration} شهرًا (سنة تعاقدية كاملة)
                    </span>
                  </>
                ) : (
                  <span className="text-destructive">
                    تاريخ النهاية يجب أن يكون بعد البداية وألا يتجاوز 12 شهرًا.
                  </span>
                )}
              </div>

              <p className="text-[11px] text-text-muted">
                الحد الأقصى لتاريخ نهاية العقد: 12 شهرًا من تاريخ البداية.
              </p>
            </div>

            <Field
              label="قيمة العقد الأساسية"
              value={values.baseValue}
              onChange={(value) => update("baseValue", value)}
              type="number"
              min={1}
              prefix="ج.م"
              hint="العملة ثابتة (جنيه مصري). يتم تحديد قيمة مخصصة لكل معرض ولا توجد باقات اشتراك عامة."
              dir="ltr"
            />
          </div>
        </section>

        {/* Operational Limits */}
        <section className="mt-7">
          <SectionHeading
            title="الحدود التشغيلية"
            description="حدد الحصص المصرح بها للمعرض داخل المنصة."
            icon={ShieldCheck}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-lg border border-border-subtle bg-background p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DoorOpen size={18} className="text-brand-navy" />
                  <span className="text-sm font-semibold text-text-primary">
                    حد الغرف
                  </span>
                </div>

                <Badge variant="outline">غرفة</Badge>
              </div>

              <Field
                label=" "
                value={values.roomsLimit}
                onChange={(value) => update("roomsLimit", value)}
                type="number"
                min={1}
                prefix="غرفة معتمدة"
                dir="ltr"
              />

              <p className="mt-2 text-xs text-text-muted">
                أقصى عدد غرف يمكن للمعرض نشرها وإدارتها داخل المنصة.
              </p>
            </div>

            <div className="rounded-lg border border-border-subtle bg-background p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package size={18} className="text-brand-navy" />
                  <span className="text-sm font-semibold text-text-primary">
                    حد الباقات
                  </span>
                </div>

                <Badge variant="outline">باقة</Badge>
              </div>

              <Field
                label=" "
                value={values.packagesLimit}
                onChange={(value) => update("packagesLimit", value)}
                type="number"
                min={1}
                prefix="باقة منشورة"
                dir="ltr"
              />

              <p className="mt-2 text-xs text-text-muted">
                أقصى عدد باقات تصميم ومجموعات أثاث منشورة متكاملة.
              </p>
            </div>
          </div>
        </section>

        {/* Optional Services */}
        <section className="mt-8 border-t border-border-subtle pt-7">
          <SectionHeading
            title="الخدمات الإضافية"
            description="خدمات القيمة المضافة الاختيارية لهذا العقد."
            icon={BadgeCheck}
          />

          <div className="rounded-lg border border-border-subtle bg-background p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-gold/20 text-brand-navy">
                  <BadgeCheck size={21} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-text-primary">
                      إضافة التوثيق الرسمي لهذا العقد (شارة موثّق)
                    </h4>

                    <Badge
                      variant="secondary"
                      className="border-transparent bg-success/10 text-success"
                    >
                      اختياري
                    </Badge>
                  </div>

                  <p className="mt-2 text-xs leading-6 text-text-muted">
                    تفعيل شارة التوثيق الذهبية/الرسمية لزيادة موثوقية المعرض
                    أمام العملاء والظهور في نتائج البحث الموثوقة.
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={values.verificationEnabled}
                aria-label="تفعيل التوثيق الرسمي"
                onClick={() =>
                  update("verificationEnabled", !values.verificationEnabled)
                }
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                  values.verificationEnabled
                    ? "bg-success"
                    : "bg-muted-foreground/40"
                }`}
              >
                <span
                  className={`absolute top-1 size-5 rounded-full bg-white shadow-sm transition-all ${
                    values.verificationEnabled ? "right-1" : "right-6"
                  }`}
                />
              </button>
            </div>

            {values.verificationEnabled && (
              <div className="mt-5 grid grid-cols-1 gap-5 rounded-lg border border-border-subtle bg-card p-4 md:grid-cols-2">
                <div className="space-y-3">
                  <Label className="text-xs font-semibold">مدة التوثيق</Label>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant={
                        values.verificationDuration === "full"
                          ? "default"
                          : "outline"
                      }
                      onClick={() => update("verificationDuration", "full")}
                    >
                      طوال مدة العقد
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant={
                        values.verificationDuration === "fixed"
                          ? "default"
                          : "outline"
                      }
                      onClick={() => update("verificationDuration", "fixed")}
                    >
                      مدة محددة بالشهور
                    </Button>
                  </div>

                  {values.verificationDuration === "fixed" && (
                    <Field
                      label="عدد أشهر التوثيق"
                      value={values.verificationMonths}
                      onChange={handleVerificationMonthsChange}
                      type="number"
                      min={1}
                      max={contractDuration || CONTRACT_MAX_MONTHS}
                      dir="ltr"
                      hint={`بحد أقصى لا يتجاوز تاريخ نهاية العقد (${contractDuration || CONTRACT_MAX_MONTHS} شهرًا).`}
                    />
                  )}

                  {values.verificationDuration === "full" && (
                    <p className="text-xs text-text-muted">
                      يتم احتساب التوثيق طوال مدة العقد ({contractDuration}{" "}
                      شهرًا).
                    </p>
                  )}

                  <p className="flex items-center gap-2 text-xs text-text-muted">
                    <Clock size={14} />
                    الحد الأقصى لمدة التوثيق: {contractDuration} شهرًا
                  </p>

                  {!verificationDurationValid && (
                    <p className="text-xs text-destructive">
                      لا يمكن أن تتجاوز مدة التوثيق تاريخ نهاية العقد.
                    </p>
                  )}
                </div>

                <div className="flex flex-col justify-center gap-3 rounded-lg bg-background p-4">
                  <div>
                    <p className="text-xs text-text-muted">
                      سعر التوثيق المعتمد
                    </p>

                    <p className="mt-1 font-bold text-text-primary">
                      {currency(VERIFICATION_MONTHLY_PRICE)} ج.م
                      <span className="mr-1 text-xs font-normal text-text-muted">
                        / شهر (من الإعدادات العامة)
                      </span>
                    </p>
                  </div>

                  <div className="border-t border-border-subtle pt-3">
                    <p className="text-xs text-text-muted">
                      إجمالي التوثيق المحتسب
                    </p>

                    <p className="mt-1 text-2xl font-bold text-text-primary">
                      {currency(verificationCost)}{" "}
                      <span className="text-sm font-medium">ج.م</span>
                    </p>

                    <p className="mt-1 text-xs text-text-muted">
                      {effectiveVerificationMonths} شهر ×{" "}
                      {currency(VERIFICATION_MONTHLY_PRICE)} ج.م
                    </p>
                  </div>

                  <p
                    className={`flex items-center gap-2 text-xs ${
                      verificationDurationValid
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    <CheckCircle2 size={14} />
                    {verificationDurationValid
                      ? "تاريخ انتهاء التوثيق لا يتجاوز تاريخ نهاية العقد."
                      : "يرجى تعديل مدة التوثيق لتناسب مدة العقد."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contract Terms */}
        <section className="mt-8 border-t border-border-subtle pt-7">
          <SectionHeading
            title="الشروط والبنود التعاقدية"
            description="صيغة البنود التعاقدية والشروط الملحقة والملاحظات التنظيمية."
            icon={FileText}
          />

          <div className="mb-5 flex flex-col justify-between gap-3 rounded-lg border border-border-subtle bg-background p-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <FileText size={21} className="mt-0.5 shrink-0 text-brand-navy" />

              <div>
                <p className="text-sm font-semibold text-text-primary">
                  قالب العقد: عقد BaytFolio القياسي (الإصدار التجاري V1)
                </p>

                <p className="mt-1 text-xs text-text-muted">
                  يتم تضمين الشروط والأحكام العامة تلقائيًا من القالب المعتمد في
                  نسخة العقد الرسمية.
                </p>
              </div>
            </div>

            <Badge variant="outline">القالب النشط</Badge>
          </div>

          <div className="space-y-5">
            <TextAreaField
              label="بنود واشتراطات خاصة بهذا العقد"
              hint="اختياري - تظهر في نسخة العقد المطبوعة"
              value={values.specialTerms}
              onChange={(value) => update("specialTerms", value)}
              placeholder="أضف أي بنود أو اشتراطات تجارية مخصصة لهذا المعرض ستظهر في نسخة العقد المطبوعة..."
            />

            <TextAreaField
              label="ملاحظات داخلية للإدارة"
              hint="لا تظهر للمعرض ولا في نسخة العقد المطبوعة"
              value={values.internalNotes}
              onChange={(value) => update("internalNotes", value)}
              placeholder="ملاحظات داخلية حول الاتفاق التجاري، المبيعات المسؤولة، أو شروط التجديد المستقبلية..."
            />
          </div>
        </section>

        {/* Contracting Party */}
        <section className="mt-8 rounded-lg border border-border-subtle bg-background p-5">
          <SectionHeading
            title="بيانات الطرف المتعاقد (لنسخة العقد المطبوعة)"
            description="بيانات المنشأة القانونية والمفوض بالتوقيع المعتمدة في وثيقة العقد."
            icon={Gavel}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field
              label="الاسم القانوني للمنشأة"
              value={values.legalName}
              onChange={(value) => update("legalName", value)}
              placeholder="غير متوفر في طلب الانضمام"
            />

            <Field
              label="اسم المفوض بالتوقيع"
              value={values.authorizedPerson}
              onChange={(value) => update("authorizedPerson", value)}
              placeholder="غير متوفر في طلب الانضمام"
            />

            <Field
              label="صفة المفوض"
              value={values.legalRole}
              onChange={(value) => update("legalRole", value)}
              placeholder="غير متوفر في طلب الانضمام"
            />

            <Field
              label="رقم السجل التجاري / البطاقة الضريبية"
              value={values.registrationNumber}
              onChange={(value) => update("registrationNumber", value)}
              placeholder="غير متوفر في طلب الانضمام"
            />

            <div className="md:col-span-2">
              <Field
                label="العنوان القانوني للمقر"
                value={values.legalAddress}
                onChange={(value) => update("legalAddress", value)}
                placeholder="غير متوفر في طلب الانضمام"
              />
            </div>
          </div>

          <p className="mt-4 text-xs leading-6 text-text-muted">
            بيانات شركة BaytFolio القانونية تُدرج تلقائيًا من إعدادات المنصة في
            نسخة العقد الصادرة.
          </p>
        </section>

        {/* Financial Summary */}
        <section className="mt-6 rounded-xl border border-border-subtle bg-background p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Calculator size={19} className="text-brand-navy" />
              <h3 className="font-bold text-text-primary">
                الملخص المالي للاتفاق التجاري
              </h3>
            </div>

            <Badge
              variant="secondary"
              className="border-transparent bg-brand-gold/20 text-text-primary"
            >
              حساب العقد التشغيلي
            </Badge>
          </div>

          <div className="space-y-4 border-b border-border-subtle pb-5">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-text-secondary">
                قيمة العقد الأساسية ({contractDuration} شهرًا)
              </span>

              <strong className="text-text-primary">
                {currency(baseValue)} ج.م
              </strong>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-text-secondary">خدمة التوثيق المعتمدة</span>

              <strong className="text-text-primary">
                {currency(verificationCost)} ج.م
              </strong>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 py-5 sm:flex-row sm:items-center">
            <div>
              <p className="font-bold text-text-primary">
                إجمالي الاتفاق التجاري المستحق
              </p>

              <p className="mt-1 text-xs text-text-muted">
                شامل الترخيص التشغيلي وتوثيق المعرض للمدة المحددة.
              </p>
            </div>

            <p className="text-3xl font-bold text-text-primary">
              {currency(total)}{" "}
              <span className="text-base font-medium">ج.م</span>
            </p>
          </div>

          <div className="rounded-md border border-border-subtle bg-card p-3 text-xs leading-6 text-text-secondary">
            لا يشمل تكاليف الحملات الترويجية التي يتم الاشتراك فيها وإدارتها
            بشكل منفصل عبر وحدة الترويجيات.
          </div>
        </section>

        {/* Navigation */}
        <div className="mt-7 flex flex-col-reverse justify-between gap-3 border-t border-border-subtle pt-6 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            className="gap-2"
          >
            <ArrowRight size={16} />
            السابق: حساب المالك
          </Button>

          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.print()}
              className="gap-2"
            >
              <Printer size={16} />
              معاينة العقد المطبوع
            </Button>

            <Button
              type="button"
              disabled={!canContinue}
              onClick={onNext}
              className="gap-2 bg-brand-navy text-white hover:bg-brand-navy/90"
            >
              التالي: المراجعة والإنشاء
              <ArrowLeft size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 px-2 text-xs text-text-muted">
        <LockKeyhole size={14} />
        <span>
          بيانات العقد والحدود المعروضة حاليًا نموذج أولي محلي، وسيتم حفظها
          وربطها بالـBackend عند تنفيذ التكامل.
        </span>
      </div>
    </section>
  );
}
