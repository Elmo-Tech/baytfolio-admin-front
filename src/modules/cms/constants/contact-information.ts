import {
  Clock,
  Mail,
  MessageSquare,
  Phone,
  type LucideIcon,
} from "lucide-react";

import type { ContactInformationField } from "../types/contact-information";

export interface ContactFieldConfig {
  field: ContactInformationField;
  id: string;
  label: string;
  badge: string;
  placeholder: string;
  helperText: string;
  type: "tel" | "email" | "text";
  dir?: "ltr";
  icon: LucideIcon;
}

export const CONTACT_INFORMATION_FIELDS: ContactFieldConfig[] = [
  {
    field: "phone",
    id: "contact-phone",
    label: "رقم الهاتف المباشر",
    badge: "إلزامي · ترويسة وتذييل",
    placeholder: "+20 2 0000 0000",
    helperText: "يظهر في ترويسة وتذييل الموقع وصفحة اتصل بنا بشكل رئيسي.",
    type: "tel",
    dir: "ltr",
    icon: Phone,
  },
  {
    field: "whatsapp",
    id: "contact-whatsapp",
    label: "رقم WhatsApp المخصص",
    badge: "إلزامي · الدعم الفوري",
    placeholder: "+20 10 0000 0000",
    helperText: "يستخدم في أيقونة واتساب السريعة في الواجهة العامة والتطبيق.",
    type: "tel",
    dir: "ltr",
    icon: MessageSquare,
  },
  {
    field: "email",
    id: "contact-email",
    label: "البريد الإلكتروني للدعم",
    badge: "إلزامي · المراسلات الرسمية",
    placeholder: "support@example.com",
    helperText:
      "يستقبل استفسارات العملاء العامة ورسائل المراجعة والتوثيق المالي.",
    type: "email",
    dir: "ltr",
    icon: Mail,
  },
  {
    field: "serviceHours",
    id: "contact-hours",
    label: "مواعيد تقديم الدعم والخدمة",
    badge: "إلزامي · الجدولة المؤسسية",
    placeholder: "أدخل مواعيد العمل الرسمية",
    helperText:
      "يظهر للعملاء في قسم تواصل معنا في الموقع والتطبيق لبيان وقت الاستجابة المعتمد.",
    type: "text",
    icon: Clock,
  },
];
