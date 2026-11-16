import type { HelpCenterQuestion } from "../types/help-center";

export const helpCenterCategories = [
  "الغرف والمعارض",
  "المفضلة",
  "My Home",
  "المقارنة",
  "الباقات",
  "التقييمات",
  "الحساب",
];

export const helpCenterQuestions: HelpCenterQuestion[] = [
  {
    id: 1,
    question: "هل أقدر أشتري من BaytFolio مباشرة؟",
    questionEn: "Can I purchase directly through BaytFolio?",
    answer:
      "منصة لاكتشاف ومقارنة الأثاث والتخطيط، ويتم التواصل والشراء مباشرة مع المعرض أو المصنع المعتمد.",
    answerEn:
      "BaytFolio is a platform for discovering and comparing furniture. Purchases are made directly through approved showrooms and factories.",
    category: "الغرف والمعارض",
    status: "active",
  },
  {
    id: 2,
    question: "كيف أضيف غرفة إلى المفضلة؟",
    questionEn: "How do I add a room to my favorites?",
    answer: "يمكنك الضغط على أيقونة المفضلة الموجودة بجانب الغرفة.",
    answerEn: "You can click the favorites icon next to the room.",
    category: "المفضلة",
    status: "active",
  },
  {
    id: 3,
    question: "كيف أستخدم ميزة My Home لتنسيق منزلي؟",
    questionEn: "How do I use My Home to furnish and organize my space?",
    answer: "تتيح لك ميزة My Home تنظيم الغرف وإضافة المنتجات المفضلة.",
    answerEn:
      "My Home allows you to organize rooms and add your favorite products.",
    category: "My Home",
    status: "active",
  },
  {
    id: 4,
    question: "كيف أقوم بمقارنة الغرف والمنتجات جنبًا إلى جنب؟",
    questionEn: "How can I compare rooms and products side-by-side?",
    answer: "اختر المنتجات التي تريد مقارنتها ثم اضغط على زر المقارنة.",
    answerEn:
      "Select the products you want to compare, then click the compare button.",
    category: "المقارنة",
    status: "active",
  },
  {
    id: 5,
    question: "ما هي باقات التأثيث وما الفرق بينها وبين الغرف الفردية؟",
    questionEn:
      "What are furnishing packages and how do they differ from rooms?",
    answer: "باقات التأثيث توفر مجموعة من المنتجات ضمن باقة واحدة متكاملة.",
    answerEn:
      "Furnishing packages offer a collection of products in one complete package.",
    category: "الباقات",
    status: "active",
  },
  {
    id: 6,
    question: "كيف يتم تقييم المنتجات والمعارض في المنصة؟",
    questionEn: "How are products and showrooms rated on the platform?",
    answer: "يمكن للعملاء تقييم المنتجات والمعارض وفقًا لتجربتهم.",
    answerEn:
      "Customers can rate products and showrooms based on their experience.",
    category: "التقييمات",
    status: "active",
  },
  {
    id: 7,
    question: "كيف يمكنني تعديل بيانات حسابي الشخصي أو كلمة المرور؟",
    questionEn: "How do I update my profile details or password?",
    answer: "يمكنك تعديل بياناتك من خلال إعدادات الحساب الشخصي.",
    answerEn: "You can update your details through your account settings.",
    category: "الحساب",
    status: "active",
  },
];
