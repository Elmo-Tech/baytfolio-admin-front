import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Circle,
  CircleX,
  Clock3,
  Copy,
  Factory,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  Printer,
  RefreshCw,
  Store,
  UserRound,
  Workflow,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { useNavigate, useParams } from "react-router";

import {
  Badge,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";

import { mockShowroomJoinRequests } from "../api/showroom-join-requests.mock";

import type {
  ShowroomActivityType,
  ShowroomJoinRequestHistoryEvent,
  ShowroomJoinRequestStatus,
} from "../types/showroom-join-requests.types";

const requestStatuses = [
  "new",
  "under_review",
  "pending_agreement",
  "approved",
  "contacted",
  "qualified",
  "rejected",
  "closed",
] as const satisfies readonly ShowroomJoinRequestStatus[];

const statusConfig: Record<
  ShowroomJoinRequestStatus,
  { label: string; className: string }
> = {
  new: {
    label: "طلب جديد",
    className: "bg-muted text-text-secondary",
  },
  under_review: {
    label: "قيد المراجعة",
    className: "bg-info/10 text-info",
  },
  pending_agreement: {
    label: "بانتظار الاتفاق",
    className: "bg-warning/10 text-warning",
  },
  approved: {
    label: "معتمد لبدء التجهيز",
    className: "bg-success/10 text-success",
  },
  contacted: {
    label: "تم التواصل",
    className: "bg-info/10 text-info",
  },
  qualified: {
    label: "مؤهل",
    className: "bg-success/10 text-success",
  },
  rejected: {
    label: "مرفوض",
    className: "bg-destructive/10 text-destructive",
  },
  closed: {
    label: "مغلق",
    className: "bg-muted text-text-secondary",
  },
};

const activityConfig: Record<
  ShowroomActivityType,
  { label: string; icon: typeof Store }
> = {
  showroom: {
    label: "معرض ومصنع",
    icon: Store,
  },
  commercial_display: {
    label: "صالة عرض تجارية",
    icon: Building2,
  },
  factory: {
    label: "مصنع أثاث وخزائن",
    icon: Factory,
  },
  design_studio: {
    label: "استوديو تصميم وتصنيع",
    icon: Building2,
  },
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatTime(timestamp: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(timestamp));
}

function getWhatsAppUrl(phone: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

function getStatusDescription(status: ShowroomJoinRequestStatus) {
  const descriptions: Record<ShowroomJoinRequestStatus, string> = {
    new: "تم استلامه عبر بوابة الانضمام",
    under_review: "قيد تدقيق الأهلية والمستندات",
    pending_agreement: "بانتظار استكمال الاتفاق التجاري",
    approved: "تم اعتماد الطلب وأصبح جاهزًا لبدء التجهيز",
    contacted: "تم التواصل مع مسؤول المعرض",
    qualified: "اجتاز الطلب مرحلة التأهيل الأولي",
    rejected: "لم يستوفِ الطلب الشروط المعتمدة",
    closed: "تم إغلاق الطلب",
  };

  return descriptions[status];
}

function getProgressIndex(status: ShowroomJoinRequestStatus) {
  if (status === "new") return 0;

  if (
    status === "under_review" ||
    status === "contacted" ||
    status === "qualified"
  ) {
    return 1;
  }

  return 2;
}

function DetailItem({
  label,
  value,
  icon: Icon,
  dir,
}: {
  label: string;
  value: string;
  icon: typeof Store;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div className="flex min-h-[76px] min-w-0 items-center gap-3 rounded-lg border border-border-subtle bg-card px-4 py-3 transition-colors hover:bg-users-surface-row-hover">
      <Icon size={18} className="shrink-0 text-text-secondary" />

      <div className="min-w-0 flex-1">
        <p className="text-xs text-text-muted">{label}</p>
        <p
          dir={dir}
          className="mt-1 break-words text-sm font-semibold text-text-primary"
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function SectionHeading({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description?: string;
  icon: typeof Store;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="h-5 w-1 rounded-full bg-primary" />
        <Icon size={17} className="text-primary" />
        <h2 className="text-sm font-bold text-text-primary">{title}</h2>
      </div>

      {description && (
        <span className="text-[11px] text-text-muted">{description}</span>
      )}
    </div>
  );
}

function ContactAction({
  label,
  href,
  icon: Icon,
  variant = "default",
}: {
  label: string;
  href: string;
  icon: typeof Phone;
  variant?: "default" | "whatsapp";
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className={`h-12 min-w-0 flex-1 gap-2 rounded-lg text-sm transition-colors ${
        variant === "whatsapp"
          ? "border-success/15 bg-success/10 text-success hover:bg-success/15"
          : "border-transparent bg-muted text-text-primary hover:bg-users-surface-row-hover"
      }`}
      onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
    >
      <Icon size={17} className="shrink-0" />
      <span className="truncate">{label}</span>
    </Button>
  );
}

export default function ShowroomJoinRequestDetailsPage() {
  const navigate = useNavigate();
  const { requestId } = useParams();

  const [statusOverride, setStatusOverride] = useQueryState(
    "status",
    parseAsStringEnum([...requestStatuses]),
  );

  const [internalNote, setInternalNote] = useState("");

  const {
    data: request,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["showroom-join-request", requestId],
    queryFn: () => {
      const foundRequest = mockShowroomJoinRequests.find(
        (item) => item.id === requestId || item.reference === requestId,
      );

      if (!foundRequest) {
        throw new Error("Showroom join request not found");
      }

      return foundRequest;
    },
    enabled: Boolean(requestId),
    retry: false,
    staleTime: Infinity,
  });

  if (isPending) {
    return (
      <main dir="rtl" className="pb-8">
        <div className="rounded-xl border border-border-subtle bg-card px-5 py-16 text-center">
          <RefreshCw
            size={25}
            className="mx-auto mb-3 animate-spin text-primary"
          />
          <p className="text-sm text-text-secondary">
            جاري تحميل بيانات الطلب...
          </p>
        </div>
      </main>
    );
  }

  if (isError || !request) {
    return (
      <main dir="rtl" className="pb-8">
        <div className="rounded-xl border border-border-subtle bg-card px-5 py-16 text-center">
          <Store size={32} className="mx-auto mb-3 text-text-muted" />

          <h1 className="text-lg font-bold text-text-primary">
            الطلب غير موجود
          </h1>

          <p className="mt-2 text-sm text-text-muted">
            لم نتمكن من العثور على طلب الانضمام المطلوب.
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-5 gap-2"
            onClick={() => navigate("/showroom-join-requests")}
          >
            <ArrowRight size={15} />
            العودة إلى قائمة الطلبات
          </Button>
        </div>
      </main>
    );
  }

  const selectedStatus: ShowroomJoinRequestStatus =
    statusOverride ?? request.status;

  const isRejected = selectedStatus === "rejected";
  const isApproved = selectedStatus === "approved";
  const isCompleted = isApproved;

  const status = statusConfig[selectedStatus];
  const activity = activityConfig[request.activityType];
  const ActivityIcon = activity.icon;

  const progressIndex = getProgressIndex(selectedStatus);

  const handleCopyReference = async () => {
    try {
      await navigator.clipboard.writeText(request.reference);
    } catch {
      // Clipboard access may be unavailable in the current browser context.
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleStartSetup = () => {
    navigate(`/showroom-join-requests/${request.id}/setup`);
  };

  const submissionEvent: ShowroomJoinRequestHistoryEvent = {
    id: `submission-${request.id}`,
    status: "new",
    description: "تم استلام الطلب رسميًا من بوابة الشركاء",
    timestamp: `${request.submittedAt}T09:12:00`,
    performedBy: "النظام المركزي (System Automated)",
    source: "system",
  };

  const historyEvents = (
    request.history?.length ? request.history : [submissionEvent]
  )
    .slice()
    .sort(
      (first, second) =>
        new Date(second.timestamp).getTime() -
        new Date(first.timestamp).getTime(),
    );

  const rejectionEvent = historyEvents.find(
    (event) => event.status === "rejected",
  );

  const rejectionReason =
    "البيانات المقدمة لا تتوافق حاليًا مع متطلبات الانضمام إلى المنصة.";

  const selectedStatusEvent = historyEvents.find(
    (event) => event.status === selectedStatus,
  );

  const progressSteps = [
    {
      title: "طلب جديد",
      description: "تم استلامه عبر بوابة الانضمام",
    },
    {
      title: "قيد المراجعة",
      description: "قيد تدقيق الأهلية والمستندات",
    },
    {
      title: isRejected ? "مسار متوقف (مرفوض)" : "القرار النهائي",
      description: isRejected
        ? "لم يستوفِ الطلب الشروط المعتمدة"
        : isApproved
          ? "تم اعتماد الطلب بنجاح والانتقال لبدء التجهيز"
          : getStatusDescription(selectedStatus),
    },
  ];

  return (
    <main dir="rtl" className="space-y-4 pb-8">
      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-subtle bg-card px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => navigate("/showroom-join-requests")}
            className="gap-2 text-xs"
          >
            <ArrowRight size={14} />
            العودة إلى قائمة الطلبات
          </Button>

          <span className="h-4 w-px bg-border-subtle" />

          <span className="text-xs font-medium text-text-secondary" dir="ltr">
            #{request.reference}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="outline"
            className={`border-transparent text-xs ${status.className}`}
          >
            <span className="me-1.5 size-1.5 rounded-full bg-current" />
            {isRejected ? "تم رفض الانضمام" : status.label}
          </Badge>

          <span className="text-xs text-text-muted" dir="ltr">
            {selectedStatusEvent
              ? `${formatTime(selectedStatusEvent.timestamp)} — ${formatDate(
                  selectedStatusEvent.timestamp.slice(0, 10),
                )}`
              : formatDate(request.submittedAt)}
          </span>
        </div>
      </div>

      {/* Request Header */}
      <section className="flex flex-col justify-between gap-5 rounded-xl border border-border-subtle bg-card px-6 py-7 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ActivityIcon size={34} />
          </div>

          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
                {request.showroomName}
              </h1>

              <Badge
                variant="secondary"
                className="border-transparent bg-muted px-3 py-1 text-xs font-medium text-text-secondary"
              >
                {activity.label}
              </Badge>

              <Badge
                variant="outline"
                className="border-transparent bg-warning/10 px-3 py-1 text-xs font-semibold text-warning"
              >
                ID: {request.reference.split("-").at(-1)}
              </Badge>
            </div>

            <p className="text-sm text-text-muted">
              طلب انضمام شريك لتصنيع منتجات جديدة مسجل عبر بوابة الشركاء الرسمية
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCopyReference}
            className="h-12 gap-2 border-transparent bg-muted text-sm hover:bg-users-surface-row-hover"
          >
            <Copy size={18} />
            نسخ المعرف
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handlePrint}
            className="h-12 gap-2 border-transparent bg-muted text-sm hover:bg-users-surface-row-hover"
          >
            <Printer size={18} />
            طباعة الملخص
          </Button>
        </div>
      </section>

      {/* Main Content and Sidebar */}
      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)]">
        <div className="min-w-0 space-y-4">
          {/* Request Information */}
          <section className="rounded-xl border border-border-subtle bg-card p-5">
            <SectionHeading
              title="بيانات طلب الانضمام"
              description="بيانات معتمدة من مقدم الطلب"
              icon={FileText}
            />

            <div className="grid grid-cols-1 gap-3 rounded-xl bg-background p-3 sm:grid-cols-2">
              <DetailItem
                label="اسم المعرض / المصنع"
                value={request.showroomName}
                icon={Building2}
              />

              <DetailItem
                label="نوع النشاط التجاري"
                value={activity.label}
                icon={ActivityIcon}
              />

              <DetailItem
                label="اسم مسؤول التواصل المعتمد"
                value={request.contactPerson}
                icon={UserRound}
              />

              <DetailItem
                label="البريد الإلكتروني التجاري"
                value={request.email}
                icon={Mail}
                dir="ltr"
              />

              <div className="sm:col-span-2">
                <DetailItem
                  label="رقم الهاتف ومحادثات WhatsApp"
                  value={request.phone}
                  icon={Phone}
                  dir="ltr"
                />
              </div>

              <div className="sm:col-span-2">
                <DetailItem
                  label="موقع المعرض / المصنع"
                  value={request.location}
                  icon={Building2}
                />
              </div>
            </div>
          </section>

          {/* Contact Channels */}
          <section className="rounded-xl border border-border-subtle bg-card p-5">
            <SectionHeading
              title="قنوات التواصل والتحقق المباشر"
              description="إجراءات تواصل سريعة"
              icon={Phone}
            />

            <div className="flex flex-col gap-2 sm:flex-row">
              <ContactAction
                label="محادثة WhatsApp"
                href={getWhatsAppUrl(request.phone)}
                icon={MessageCircle}
                variant="whatsapp"
              />

              <ContactAction
                label="اتصال مباشر"
                href={`tel:${request.phone.replace(/\s/g, "")}`}
                icon={Phone}
              />

              <ContactAction
                label="إرسال بريد إلكتروني"
                href={`mailto:${request.email}`}
                icon={Mail}
              />
            </div>
          </section>

          {/* Rejection Notice */}
          {isRejected && (
            <section className="overflow-hidden rounded-xl border border-destructive/20 border-r-4 border-r-destructive bg-card">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle px-5 py-4">
                <div className="flex items-center gap-2 text-destructive">
                  <CircleX size={19} />
                  <h2 className="text-sm font-bold">تم رفض طلب الانضمام</h2>
                </div>

                <span className="text-xs text-text-muted" dir="ltr">
                  {rejectionEvent
                    ? `${formatTime(rejectionEvent.timestamp)} — ${formatDate(
                        rejectionEvent.timestamp.slice(0, 10),
                      )}`
                    : "لا يوجد تاريخ مسجل للرفض"}
                </span>
              </div>

              <div className="p-5">
                <p className="mb-2 text-xs text-text-muted">سبب الرفض:</p>
                <div className="rounded-lg bg-destructive/5 px-4 py-4 text-sm leading-7 text-destructive">
                  {rejectionReason}
                </div>
              </div>
            </section>
          )}

          {/* Approved Onboarding Notice */}
          {isApproved && (
            <section className="relative overflow-hidden rounded-xl border border-success/20 bg-primary px-6 py-7 text-primary-foreground shadow-sm">
              <div className="pointer-events-none absolute -left-10 -top-12 size-40 rounded-full border border-primary-foreground/10" />
              <div className="pointer-events-none absolute -left-5 -top-7 size-28 rounded-full border border-primary-foreground/10" />

              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="border-transparent bg-success text-success-foreground">
                      المرحلة النهائية: الاعتماد
                    </Badge>

                    <span className="text-xs text-primary-foreground/70">
                      ربط بالمنظومة المركزية
                    </span>
                  </div>

                  <h2 className="text-xl font-bold leading-relaxed">
                    معتمد لبدء التجهيز والانضمام
                  </h2>

                  <p className="max-w-3xl text-sm leading-7 text-primary-foreground/80">
                    عند اكتمال كافة متطلبات التحقق والموافقة على الطلب، يتم
                    إنشاء ملف المعرض والمصنع مباشرة في منظومة BaytFolio وتوليد
                    حساب المالك التشغيلي تلقائياً.
                  </p>
                </div>

                <div className="flex shrink-0 items-center lg:ps-6">
                  <Button
                    type="button"
                    onClick={handleStartSetup}
                    className="h-auto min-h-14 w-full gap-2 whitespace-nowrap rounded-lg bg-success px-5 py-4 text-sm font-semibold text-success-foreground shadow-none hover:bg-success/90 sm:w-auto"
                  >
                    <Store size={19} />
                    إنشاء المعرض وبدء التجهيز
                  </Button>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="min-w-0 space-y-4">
          {/* Workflow and Status Update */}
          <section className="rounded-xl border border-border-subtle bg-card p-4">
            <SectionHeading
              title="مسار معالجة الطلب"
              description={
                isRejected
                  ? "تم إيقاف المعالجة"
                  : isCompleted
                    ? "3 من 3 (مكتمل)"
                    : `المرحلة ${progressIndex + 1} من 3`
              }
              icon={Workflow}
            />

            <div className="space-y-5">
              {progressSteps.map((step, index) => {
                const isRejectedStep = isRejected && index === 2;
                const isStepCompleted = isCompleted || index < progressIndex;
                const isCurrent =
                  !isRejected && !isCompleted && index === progressIndex;

                return (
                  <div key={step.title} className="relative flex gap-3">
                    {index !== progressSteps.length - 1 && (
                      <span
                        className={`absolute right-[13px] top-7 h-9 w-px ${
                          isCompleted || index < progressIndex
                            ? "bg-success/50"
                            : "bg-border-subtle"
                        }`}
                      />
                    )}

                    <div
                      className={`relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full ${
                        isRejectedStep
                          ? "border border-destructive/30 bg-destructive/10 text-destructive"
                          : isStepCompleted
                            ? "bg-success text-success-foreground"
                            : isCurrent
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-text-muted"
                      }`}
                    >
                      {isRejectedStep ? (
                        <CircleX size={15} />
                      ) : isStepCompleted ? (
                        <Check size={14} />
                      ) : isCurrent ? (
                        <RefreshCw size={14} />
                      ) : (
                        <Circle size={12} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 pb-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p
                          className={`text-xs font-semibold ${
                            isRejectedStep
                              ? "text-destructive"
                              : isStepCompleted
                                ? "text-success"
                                : isCurrent
                                  ? "text-primary"
                                  : "text-text-muted"
                          }`}
                        >
                          {index + 1}. {step.title}
                        </p>

                        {isCompleted && (
                          <Badge className="border-transparent bg-success/10 text-[10px] text-success">
                            مكتمل
                          </Badge>
                        )}

                        {isCurrent && (
                          <Badge variant="secondary" className="text-[10px]">
                            الحالي
                          </Badge>
                        )}
                      </div>

                      <p
                        className={`mt-1 text-[11px] leading-5 ${
                          isRejectedStep
                            ? "text-destructive"
                            : "text-text-muted"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p
              className={`mt-5 pe-10 text-xs leading-6 ${
                isRejected
                  ? "text-destructive"
                  : isCompleted
                    ? "text-success"
                    : "text-text-muted"
              }`}
            >
              {isRejected
                ? "تم إيقاف مسار الطلب بعد اتخاذ قرار الرفض."
                : isCompleted
                  ? "اكتملت مراحل مراجعة واعتماد الطلب، ويمكن البدء في تجهيز المعرض."
                  : selectedStatus === "closed"
                    ? "تم إغلاق الطلب."
                    : "الربط النهائي والتشغيل الفعلي"}
            </p>

            <div className="my-5 border-t border-border-subtle" />

            {/* Status Update */}
            <div className="rounded-lg border border-border-subtle bg-background p-3">
              <h3 className="mb-3 text-xs font-bold text-text-primary">
                تحديث حالة الطلب السريع
              </h3>

              <label className="mb-2 block text-xs text-text-muted">
                حالة الطلب الحالية
              </label>

              <Select
                value={selectedStatus}
                onValueChange={(value) => {
                  setStatusOverride(value as ShowroomJoinRequestStatus);
                }}
              >
                <SelectTrigger className="h-10 w-full border-border-subtle bg-card text-xs">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="new">طلب جديد</SelectItem>
                  <SelectItem value="under_review">قيد المراجعة</SelectItem>
                  <SelectItem value="pending_agreement">
                    بانتظار الاتفاق
                  </SelectItem>
                  <SelectItem value="approved">معتمد لبدء التجهيز</SelectItem>
                  <SelectItem value="contacted">تم التواصل</SelectItem>
                  <SelectItem value="qualified">مؤهل</SelectItem>
                  <SelectItem value="rejected">مرفوض</SelectItem>
                  <SelectItem value="closed">مغلق</SelectItem>
                </SelectContent>
              </Select>

              <label
                htmlFor="internal-note"
                className="mb-2 mt-4 block text-xs text-text-muted"
              >
                ملاحظات القرار الإداري (اختياري)
              </label>

              <textarea
                id="internal-note"
                value={internalNote}
                onChange={(event) => setInternalNote(event.target.value)}
                rows={3}
                placeholder="أدخل ملخص القرار أو أسباب التحويل..."
                className="w-full resize-y rounded-md border border-border-subtle bg-card px-3 py-2 text-xs text-text-primary outline-none placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              <Button
                type="button"
                disabled
                title="الحفظ الدائم يحتاج إلى Backend"
                className="mt-3 h-10 w-full gap-2 bg-primary text-primary-foreground disabled:opacity-100"
              >
                <RefreshCw size={15} />
                حفظ تحديث الحالة
              </Button>

              <p className="mt-3 text-[10px] leading-5 text-text-muted">
                تغيير الحالة للمعاينة فقط، ويتم الاحتفاظ بها في رابط الصفحة.
                الحفظ الدائم والملاحظات يحتاجان إلى Backend.
              </p>
            </div>
          </section>

          {/* Request History */}
          <section className="rounded-xl border border-border-subtle bg-card p-4">
            <SectionHeading
              title="سجل حالة الطلب"
              description="تاريخ الطلب"
              icon={Clock3}
            />

            <div className="space-y-3">
              {historyEvents.map((event) => {
                const eventStatus = statusConfig[event.status];
                const isRejectionEvent = event.status === "rejected";

                return (
                  <article
                    key={event.id}
                    className={`rounded-lg border p-3 transition-colors hover:bg-users-surface-row-hover ${
                      isRejectionEvent
                        ? "border-destructive/20 bg-destructive/5"
                        : "border-border-subtle bg-background"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Badge
                        variant="secondary"
                        className={`border-transparent text-[10px] ${eventStatus.className}`}
                      >
                        {eventStatus.label}
                      </Badge>

                      <span className="text-[10px] text-text-muted" dir="ltr">
                        {formatTime(event.timestamp)} —{" "}
                        {formatDate(event.timestamp.slice(0, 10))}
                      </span>
                    </div>

                    <p className="mt-3 text-xs leading-6 text-text-primary">
                      {event.description}
                    </p>

                    {event.performedBy && (
                      <p className="mt-2 text-[10px] text-text-muted">
                        بواسطة: {event.performedBy}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
