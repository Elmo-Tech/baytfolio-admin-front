import type { TermsAndConditions } from "../types/terms-and-conditions";

export const initialTermsAndConditions: TermsAndConditions = {
  documentId: "TERMS-2025-V3",
  status: "published",
  lastUpdated: "2025/05/18",
  sections: [
    {
      id: 1,
      label: "مطلوب للعرض العام",
      descriptionAr:
        "صيغة القبول والتعريف الوظيفي بنطاق منصة وتطبيق بيت فوليـو.",
      descriptionEn: "Platform introduction and acceptance of terms.",
      titleAr: "استخدام BaytFolio",
      titleEn: "Using BaytFolio",
      contentAr:
        "تعد منصة وتطبيق BaytFolio منصة رقمية متخصصة في استكشاف وتنسيق وتخطيط أثاث المنزل وتجهيزات الغرف، ومقارنة تصاميم ومعروضات المعارض والمصانع. إن استخدامك للمنصة إقرارًا صريحًا بموافقتك على كافة الشروط والضوابط الواردة هنا دون قيد أو شرط.",
      contentEn:
        "BaytFolio is a digital platform dedicated to discovering, coordinating, and planning home furniture and room furnishings, while comparing designs and listings from showrooms and factories. Your use of the platform constitutes your express acceptance of these terms and conditions.",
      noteAr: "النص العربي المعتمد للنسخة التشغيلية.",
      noteEn: "Approved Arabic text for the operational version.",
    },
    {
      id: 2,
      label: "الحسابات والمحتوى",
      descriptionAr:
        "التزامات المستخدم وإدارة غرف My Home وضوابط الحسابات الشخصية.",
      descriptionEn: "User obligations, My Home, and personal account rules.",
      titleAr: "الحسابات والمحتوى الشخصي",
      titleEn: "Accounts and Personal Content",
      contentAr:
        "يلتزم المستخدم بتقديم بيانات صحيحة ودقيقة عند إنشاء حسابه في BaytFolio، ويتحمل كامل المسؤولية عن سرية بيانات تسجيل الدخول. يحتفظ المستخدم بحقه في إدارة غرفه ومحتواه الشخصي داخل المنصة، وحذف حسابه في أي وقت من خلال إعدادات التطبيق.",
      contentEn:
        "Users must provide accurate information when creating an account on BaytFolio and are responsible for keeping their login credentials confidential. Users may manage their rooms and personal content and request account deletion through the application settings.",
      noteAr: "حقوق المستخدم ومسؤولية إدارة البيانات وحذف الحساب.",
      noteEn: "User rights and responsibility for account data.",
    },
    {
      id: 3,
      label: "المحتوى التجاري وطبيعة المنصة",
      descriptionAr:
        "طبيعة المعروضات الرقمية ودقة الأسعار الاسترشادية ومسؤولية المعارض والشركة.",
      descriptionEn:
        "Digital listings, indicative prices, and showroom responsibilities.",
      titleAr: "الغرف والأسعار ومحتوى المعارض",
      titleEn: "Rooms, Prices, and Showroom Content",
      contentAr:
        "منصة BaytFolio هي منصة استعراض وتخطيط ومقارنة وتواصل فقط. كافة صور الغرف والمنتجات وتفاصيل الخامات والأسعار المعروضة يتم توفيرها ونشرها مباشرة من قبل المعارض والمصانع المسجلة للتحقق من الجدية. لكنها لا تضمن دقة الأسعار أو توافر المعروضات لحظيًا في فروع المعارض الواقعية.",
      contentEn:
        "BaytFolio is a platform for browsing, planning, comparing, and communication only. Room images, products, material details, and displayed prices are provided by registered showrooms and factories. BaytFolio does not guarantee real-time price accuracy or product availability at physical showroom branches.",
      noteAr: "إخلاء المسؤولية عن توافر المعروضات والأسعار الفورية.",
      noteEn: "Disclaimer regarding listing availability and real-time prices.",
    },
    {
      id: 4,
      label: "فض النزاعات التجارية",
      descriptionAr:
        "تحديد طبيعة العلاقة التجارية ومسؤولية التعاملات المالية بين الأطراف.",
      descriptionEn:
        "Commercial relationship and financial transaction responsibilities.",
      titleAr: "التواصل والشراء",
      titleEn: "Communication and Purchasing",
      contentAr:
        "تحدد المنصة عبر اتفاقات مباشرة مسؤولية التحصيل والشحن والتركيب والضمان. تتم اتفاقات البيع والتعامل المالي والتعاقد وتحديد أسعار الشراء وإجراءات الدفع والتسليم والضمان بشكل مباشر وحصري بين العميل والمعرض أو المصنع المعني. ولا تتدخل المنصة في أي خدمات دفع إلكتروني أو إتمام عمليات البيع والشراء عبر الإنترنت.",
      contentEn:
        "Sales agreements, financial transactions, purchasing prices, payment, delivery, and warranties are arranged directly between the customer and the relevant showroom or factory. The platform does not intervene in these transactions unless explicitly stated in a separate agreement.",
      noteAr: "قاعدة الحماية التشغيلية والقانونية الرئيسية للشركة.",
      noteEn: "Main operational and legal protection rule for the company.",
    },
    {
      id: 5,
      label: "جودة المجتمع والالتزام",
      descriptionAr:
        "سياسة التقييمات الموضوعية للمعارض ومكافحة المحتوى الضار أو الكيدي.",
      descriptionEn: "Fair showroom reviews and prevention of harmful content.",
      titleAr: "التقييمات والاستخدام المقبول",
      titleEn: "Reviews and Acceptable Use",
      contentAr:
        "يحق للمستخدمين الذين تعاملوا مع المعارض تقديم تقييمات موضوعية وصادقة تعكس تجربتهم الحقيقية. يُحظر تمامًا نشر أي محتوى مسيء أو تقييمات مضللة وكيدية، أو استخدام المنصة بطريقة تنتهك القوانين السارية أو حقوق الملكية الفكرية. تحتفظ إدارة BaytFolio بحق إخفاء أو إزالة أي محتوى مخالف دون إشعار مسبق.",
      contentEn:
        "Users who have interacted with showrooms may submit fair and honest reviews reflecting their actual experiences. Misleading, abusive, or malicious content and any use that violates applicable laws or intellectual property rights are prohibited. BaytFolio reserves the right to hide or remove violating content.",
      noteAr: "ضمان نزاهة المراجعات ومنع الممارسات غير المشروعة.",
      noteEn: "Ensuring review integrity and preventing misuse.",
    },
    {
      id: 6,
      label: "التحديثات والالتزام",
      descriptionAr:
        "قنوات الدعم القانوني والتشغيلي وسريان التعديلات المستقبلية.",
      descriptionEn: "Support channels and future terms updates.",
      titleAr: "تحديث الشروط والتواصل",
      titleEn: "Updates and Contact",
      contentAr:
        "يحق لإدارة BaytFolio تحديث هذه الشروط والأحكام كلما دعت الحاجة التشغيلية أو القانونية، ويصبح أي تعديل نافذًا فور نشره على المنصة وتحديث تاريخ السريان أدناه. لأي استفسار متعلق بالشروط والأحكام، يرجى التواصل معنا عبر البريد الإلكتروني المعتمد: support@baytfolio.com أو من خلال صفحة تواصل معنا في المنصة.",
      contentEn:
        "BaytFolio may update these terms whenever operational or legal needs require. Changes become effective once published on the platform with the effective date updated below. For inquiries, contact support@baytfolio.com or use the Contact Us page.",
      noteAr: "قنوات الاتصال المعتمدة وسريان التعديلات التلقائي.",
      noteEn: "Official contact channels and effective updates.",
    },
  ],
};

export const saveTermsAndConditionsMock = (
  terms: TermsAndConditions,
): TermsAndConditions => ({
  ...terms,
  lastUpdated: new Date().toISOString().slice(0, 10).replaceAll("-", "/"),
  sections: terms.sections.map((section) => ({ ...section })),
});
