/**
 * RSEF 2026 — featured content.
 *
 * Winners and the launch article live here (rather than Firestore) so they
 * render on a clean checkout with no database seeding. Both pages merge this
 * featured content with whatever is in Firestore, so admin-created entries
 * keep working alongside it.
 */

export type Locale = 'en' | 'uz' | 'ru';

export type Localized = Record<Locale, string>;

const pick = (value: Localized, locale?: string): string =>
  value[(locale as Locale) ?? 'en'] ?? value.en;

export const tr = pick;

/* ------------------------------------------------------------------ *
 * "RSEF 2026 by the Numbers"
 * ------------------------------------------------------------------ */

export const impactCopy: Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  countries: string;
  categoriesSplit: string;
  applications: string;
  applicationsSub: string;
  finalists: string;
  finalistsSub: string;
  researchCategories: string;
  judges: string;
  cashAwards: string;
  cashAwardsSub: string;
  motto: string;
  mottoSub: string;
  tagline: string;
  thanks: string;
}> = {
  en: {
    eyebrow: 'Research • Science • Engineering Fair',
    title: 'RSEF 2026 by the Numbers',
    subtitle: 'Celebrating our impact, inspiring the future.',
    countries: 'Participating Countries',
    categoriesSplit: 'Local & International Categories',
    applications: 'Applications',
    applicationsSub: 'Overall',
    finalists: 'Finalists',
    finalistsSub: 'Overall',
    researchCategories: 'Research Categories',
    judges: 'Judges',
    cashAwards: 'Cash Awards',
    cashAwardsSub: 'Presented',
    motto: 'Empowering young researchers.',
    mottoSub: 'Building a better future.',
    tagline: 'Research. Discover. Innovate.',
    thanks: 'Thank you to everyone who made this possible!',
  },
  uz: {
    eyebrow: 'Research • Science • Engineering Fair',
    title: 'RSEF 2026 raqamlarda',
    subtitle: "Ta'sirimizni nishonlaymiz, kelajakni ilhomlantiramiz.",
    countries: 'Ishtirokchi davlatlar',
    categoriesSplit: 'Mahalliy va xalqaro yo‘nalishlar',
    applications: 'Arizalar',
    applicationsSub: 'Jami',
    finalists: 'Finalchilar',
    finalistsSub: 'Jami',
    researchCategories: 'Tadqiqot yo‘nalishlari',
    judges: 'Hakamlar',
    cashAwards: 'Pul mukofotlari',
    cashAwardsSub: 'Taqdim etildi',
    motto: 'Yosh tadqiqotchilarni qo‘llab-quvvatlaymiz.',
    mottoSub: 'Yaxshiroq kelajak quramiz.',
    tagline: 'Tadqiq et. Kashf et. Yangilik yarat.',
    thanks: 'Buni mumkin qilgan har bir insonga rahmat!',
  },
  ru: {
    eyebrow: 'Research • Science • Engineering Fair',
    title: 'RSEF 2026 в цифрах',
    subtitle: 'Отмечаем наш вклад, вдохновляем будущее.',
    countries: 'Страны-участницы',
    categoriesSplit: 'Локальная и международная категории',
    applications: 'Заявок',
    applicationsSub: 'Всего',
    finalists: 'Финалистов',
    finalistsSub: 'Всего',
    researchCategories: 'Научных направлений',
    judges: 'Судей',
    cashAwards: 'Денежных наград',
    cashAwardsSub: 'Вручено',
    motto: 'Поддерживаем молодых исследователей.',
    mottoSub: 'Строим лучшее будущее.',
    tagline: 'Исследуй. Открывай. Создавай.',
    thanks: 'Спасибо всем, кто сделал это возможным!',
  },
};

export const participatingCountries = [
  { name: 'Uzbekistan', code: 'uz' },
  { name: 'Kazakhstan', code: 'kz' },
  { name: 'India', code: 'in' },
  { name: 'Vietnam', code: 'vn' },
  { name: 'Russia', code: 'ru' },
];

/* ------------------------------------------------------------------ *
 * Judging criteria (official 100-point rubric)
 * ------------------------------------------------------------------ */

export type Criterion = {
  id: string;
  icon: 'question' | 'flask' | 'chart' | 'bulb' | 'poster' | 'mic';
  category: Localized;
  description: Localized;
  score: number;
  highlight?: boolean;
};

export const judgingCopy: Record<Locale, {
  title: string;
  subtitle: string;
  colCategory: string;
  colDescription: string;
  colScore: string;
  colWeight: string;
  total: string;
  totalUnit: string;
  note: string;
}> = {
  en: {
    title: 'Judging Criteria',
    subtitle: 'Projects are evaluated using a standardized 100-point scoring system.',
    colCategory: 'Category',
    colDescription: 'Description',
    colScore: 'Max Score',
    colWeight: 'Weight',
    total: 'Total',
    totalUnit: 'points',
    note: 'Each project is independently evaluated by qualified judges using this official RSEF rubric to ensure fairness, transparency, and consistency.',
  },
  uz: {
    title: 'Baholash mezonlari',
    subtitle: 'Loyihalar standartlashtirilgan 100 ballik tizim asosida baholanadi.',
    colCategory: 'Mezon',
    colDescription: 'Tavsif',
    colScore: 'Maks. ball',
    colWeight: 'Ulush',
    total: 'Jami',
    totalUnit: 'ball',
    note: 'Har bir loyiha adolat, shaffoflik va izchillikni ta’minlash uchun malakali hakamlar tomonidan ushbu rasmiy RSEF mezonlari asosida mustaqil baholanadi.',
  },
  ru: {
    title: 'Критерии оценки',
    subtitle: 'Проекты оцениваются по стандартизированной 100-балльной системе.',
    colCategory: 'Категория',
    colDescription: 'Описание',
    colScore: 'Макс. балл',
    colWeight: 'Вес',
    total: 'Итого',
    totalUnit: 'баллов',
    note: 'Каждый проект независимо оценивается квалифицированными судьями по официальной рубрике RSEF для обеспечения справедливости, прозрачности и последовательности.',
  },
};

export const judgingCriteria: Criterion[] = [
  {
    id: 'i',
    icon: 'question',
    score: 10,
    category: {
      en: 'I. Research Question / Problem',
      uz: 'I. Tadqiqot savoli / Muammo',
      ru: 'I. Исследовательский вопрос / Проблема',
    },
    description: {
      en: 'The research question or problem is clearly identified, focused, and significant.',
      uz: 'Tadqiqot savoli yoki muammo aniq belgilangan, yo‘naltirilgan va ahamiyatli.',
      ru: 'Исследовательский вопрос или проблема четко определены, сфокусированы и значимы.',
    },
  },
  {
    id: 'ii',
    icon: 'flask',
    score: 15,
    category: {
      en: 'II. Design and Methodology',
      uz: 'II. Dizayn va metodologiya',
      ru: 'II. Дизайн и методология',
    },
    description: {
      en: 'The methods and procedures are appropriate, well-designed, and logically planned.',
      uz: 'Usullar va tartiblar mos, puxta ishlab chiqilgan va mantiqiy rejalashtirilgan.',
      ru: 'Методы и процедуры уместны, хорошо разработаны и логически спланированы.',
    },
  },
  {
    id: 'iii',
    icon: 'chart',
    score: 20,
    category: {
      en: 'III. Execution: Data, Analysis, Interpretation',
      uz: 'III. Ijro: ma’lumot, tahlil, talqin',
      ru: 'III. Выполнение: данные, анализ, интерпретация',
    },
    description: {
      en: 'Data is accurately collected, analyzed, and interpreted. Conclusions are supported by evidence.',
      uz: 'Ma’lumotlar to‘g‘ri to‘planadi, tahlil qilinadi va talqin etiladi. Xulosalar dalillar bilan asoslanadi.',
      ru: 'Данные точно собраны, проанализированы и интерпретированы. Выводы подкреплены доказательствами.',
    },
  },
  {
    id: 'iv',
    icon: 'bulb',
    score: 20,
    category: {
      en: 'IV. Creativity',
      uz: 'IV. Kreativlik',
      ru: 'IV. Креативность',
    },
    description: {
      en: 'The project demonstrates originality, innovation, and creative thinking.',
      uz: 'Loyiha o‘ziga xoslik, innovatsiya va ijodiy fikrlashni namoyish etadi.',
      ru: 'Проект демонстрирует оригинальность, инновационность и творческое мышление.',
    },
  },
  {
    id: 'v-a',
    icon: 'poster',
    score: 10,
    category: {
      en: 'V-a. Poster / Display',
      uz: 'V-a. Poster / Ko‘rgazma',
      ru: 'V-a. Постер / Стенд',
    },
    description: {
      en: 'The poster/display is well-organized, visually appealing, and effectively communicates the project.',
      uz: 'Poster puxta tuzilgan, ko‘rkam va loyihani samarali yetkazadi.',
      ru: 'Постер хорошо организован, визуально привлекателен и эффективно доносит суть проекта.',
    },
  },
  {
    id: 'v-b',
    icon: 'mic',
    score: 25,
    highlight: true,
    category: {
      en: 'V-b. Interview (Stage Q&A)',
      uz: 'V-b. Suhbat (sahna savol-javob)',
      ru: 'V-b. Интервью (вопросы со сцены)',
    },
    description: {
      en: 'The participant demonstrates a deep understanding of the project and answers questions clearly and confidently.',
      uz: 'Ishtirokchi loyihani chuqur tushunishini namoyish etadi va savollarga aniq, ishonchli javob beradi.',
      ru: 'Участник демонстрирует глубокое понимание проекта и отвечает на вопросы ясно и уверенно.',
    },
  },
];

/* ------------------------------------------------------------------ *
 * Winners — Results page
 * ------------------------------------------------------------------ */

export type Winner = {
  id: string;
  place: 1 | 2 | 3;
  placeLabel: Localized;
  projectName: string;
  winnerName: string;
  school?: string;
  images: { src: string; alt: string }[];
  /** Student reviews stay in the student's own words, untranslated. */
  review: string;
  year: number;
};

export const winners: Winner[] = [
  {
    id: 'rsef2026-1st-aral-shield',
    place: 1,
    year: 2026,
    placeLabel: { en: '1st Place', uz: '1-o‘rin', ru: '1-е место' },
    projectName: 'Aral Shield',
    winnerName: 'Tashkent Presidential School',
    school: 'Tashkent Presidential School',
    images: [
      { src: '/winner-aral-1.jpg', alt: 'Aral Shield team member' },
      { src: '/winner-aral-2.jpg', alt: 'Aral Shield team member' },
    ],
    review:
      'The RSEF fair was the first arena where we presented Aral Shield. Initially, we expected only to share our project with the judges and receive feedback. However, stepping into such a competitive environment filled with diverse, impactful projects made us nervous. While presenting, we received various questions regarding our lab simulations. Seeing how engaged the judges were with our project during our presentation sparked a glimmer of hope in our team. Fortunately, we were able to win our first competition at RSEF.',
  },
  {
    id: 'rsef2026-2nd-cubesat',
    place: 2,
    year: 2026,
    placeLabel: { en: '2nd Place', uz: '2-o‘rin', ru: '2-е место' },
    projectName:
      'Engineering a CubeSat Platform for Biological Research Under Authentic Stratospheric Conditions',
    winnerName: 'Shakhnoza Khalilova',
    images: [
      { src: '/winner-cubesat.jpg', alt: 'Shakhnoza Khalilova holding her CubeSat platform' },
    ],
    review:
      "RSEF was actually the first research competition I ever participated in, and it introduced me to the research community. It taught me not only how to conduct and present research, but also how to communicate scientific ideas effectively. The judges' feedback was incredibly valuable, and seeing the projects of other talented students inspired me to think bigger and connect with like-minded researchers. I believe RSEF is an excellent preparation for international competitions such as ISEF, giving students the confidence and experience they need before stepping onto the global stage. I'm excited to see how RSEF grows in the coming years, and I truly believe it has the potential to become one of Central Asia's strongest research competitions.",
  },
  {
    id: 'rsef2026-3rd-histology-ai',
    place: 3,
    year: 2026,
    placeLabel: { en: '3rd Place', uz: '3-o‘rin', ru: '3-е место' },
    projectName: 'Histology AI',
    winnerName: 'O‘ktam Nazarov',
    images: [{ src: '/winner-histology.jpg', alt: 'O‘ktam Nazarov' }],
    review:
      'Before the fair I didn’t sleep for three nights, mostly because of the poster. Then I saw everyone else’s posters and realized the competition was actually strong. I was nervous until my presentation, but after it was done I felt good.\n\nDr. Hira Yilmaz’s feedback really stuck with me. She gave sharp comments on stuff from economics to histology, and that’s honestly the kind of person I want to be someday.\n\nPresenting also made me realize my project actually has a market here — some school directors said they wanted to collaborate, which gave me hope for it.\n\nI checked out RSEF before applying and wasn’t sure it would actually meet ISEF standards, but it did. Feels good knowing something like this exists in Uzbekistan now.',
  },
];

export const resultsCopy: Record<Locale, {
  featured: string;
  project: string;
  studentReview: string;
  archive: string;
}> = {
  en: {
    featured: 'RSEF 2026 Winners',
    project: 'Project',
    studentReview: 'In their own words',
    archive: 'More results',
  },
  uz: {
    featured: 'RSEF 2026 g‘oliblari',
    project: 'Loyiha',
    studentReview: 'O‘quvchining so‘zlari bilan',
    archive: 'Boshqa natijalar',
  },
  ru: {
    featured: 'Победители RSEF 2026',
    project: 'Проект',
    studentReview: 'Своими словами',
    archive: 'Другие результаты',
  },
};

/* ------------------------------------------------------------------ *
 * Featured article — News page
 * ------------------------------------------------------------------ */

export type FeaturedArticle = {
  id: string;
  slug: string;
  date: string;
  coverImage: string;
  title: Localized;
  excerpt: Localized;
  images: { src: string; alt: string; caption: Localized }[];
  tags: string[];
};

export const featuredArticles: FeaturedArticle[] = [
  {
    id: 'rsef-2026-launch',
    slug: 'rsef-2026-launch',
    date: '2026-07-15',
    coverImage: '/news-launch-group.jpg',
    tags: ['#RSEF', '#ScienceFair', '#CentralAsia', '#Uzbekistan'],
    title: {
      en: 'Central Asia just wrote a new chapter in science',
      uz: 'Markaziy Osiyo fanda yangi sahifa ochdi',
      ru: 'Центральная Азия открыла новую главу в науке',
    },
    excerpt: {
      en: 'RSEF.uz launched the first-ever Research, Science and Engineering Fair in Central Asia, bringing together young researchers from five countries to present their work, exchange ideas, and learn from experts.',
      uz: 'RSEF.uz Markaziy Osiyodagi birinchi Research, Science and Engineering Fair tanlovini boshladi — besh davlatdan kelgan yosh tadqiqotchilar o‘z ishlarini taqdim etdi, g‘oyalar almashdi va mutaxassislardan o‘rgandi.',
      ru: 'RSEF.uz провёл первую в Центральной Азии Research, Science and Engineering Fair, собрав молодых исследователей из пяти стран, чтобы представить работы, обменяться идеями и поучиться у экспертов.',
    },
    images: [
      {
        src: '/news-launch-group.jpg',
        alt: 'RSEF 2026 finalists and volunteers together at Nest One',
        caption: {
          en: 'Finalists, volunteers and organisers at the close of RSEF 2026.',
          uz: 'RSEF 2026 yakunida finalchilar, ko‘ngillilar va tashkilotchilar.',
          ru: 'Финалисты, волонтёры и организаторы в завершение RSEF 2026.',
        },
      },
      {
        src: '/news-launch-poster.jpg',
        alt: 'Students presenting a detector research poster to judges',
        caption: {
          en: 'Poster sessions ran all day — each project defended in front of the jury.',
          uz: 'Poster sessiyalari kun bo‘yi davom etdi — har bir loyiha hakamlar oldida himoya qilindi.',
          ru: 'Постерные сессии шли весь день — каждый проект защищался перед жюри.',
        },
      },
      {
        src: '/news-launch-aral.jpg',
        alt: 'The Aral Shield team presenting their project',
        caption: {
          en: 'Aral Shield — the national first-place project — during its presentation.',
          uz: 'Aral Shield — milliy 1-o‘rin sohibi — taqdimot chog‘ida.',
          ru: 'Aral Shield — проект-победитель национальной категории — во время презентации.',
        },
      },
      {
        src: '/news-launch-judges.jpg',
        alt: 'Judges scoring projects using the RSEF rubric',
        caption: {
          en: 'Judges scoring independently against the official 100-point RSEF rubric.',
          uz: 'Hakamlar rasmiy 100 ballik RSEF mezonlari bo‘yicha mustaqil baholadi.',
          ru: 'Судьи оценивали независимо по официальной 100-балльной рубрике RSEF.',
        },
      },
    ],
  },
];
