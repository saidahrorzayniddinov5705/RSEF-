import { SectionData } from '../components/blocks/SmartSectionInjector';

export const homePageData: SectionData[] = [
  {
    section: "MainHero",
    layout: "igem-hero",
    data: {
      en: {
        title: "Competition",
        description: "The world's biggest synthetic biology competition is pioneering and driving the growth of the field. Each year, it trains the next generation of leaders by giving multidisciplinary student teams the incentive, tools, training, and platform to design, build, test, and present projects tackling the world's most pressing challenges - while competing on the global stage.",
        img: "https://images.unsplash.com/photo-1540505844439-01582e0e0172?q=80&w=1200&auto=format&fit=crop",
        actionText: "Learn more",
        stats: [
          { value: "23", label: "Years" },
          { value: "66", label: "Countries*" },
          { value: "5000+", label: "Projects" },
          { value: "400+", label: "Teams/year" }
        ]
      },
      uz: {
        title: "Musobaqa",
        description: "Markaziy Osiyodagi eng yirik ilm-fan va muhandislik musobaqasi bu soha rivojiga hissa qo'shmoqda. Har yili u ko'p tarmoqli talabalar jamoalariga rag'bat, vositalar, ta'lim va dunyoning eng dolzarb muammolarini hal qiluvchi loyihalarni loyihalash, qurish, sinash va taqdim etish uchun platforma taqdim etadi.",
        img: "https://images.unsplash.com/photo-1540505844439-01582e0e0172?q=80&w=1200&auto=format&fit=crop",
        actionText: "Batafsil ma'lumot",
        stats: [
          { value: "2", label: "Yil" },
          { value: "5", label: "Davlatlar*" },
          { value: "100+", label: "Loyihalar" },
          { value: "50+", label: "Jamoalar / yiliga" }
        ]
      },
      ru: {
        title: "Соревнование",
        description: "Крупнейшее соревнование по науке и инженерии в Центральной Азии. Каждый год мы готовим следующее поколение лидеров, предоставляя многопрофильным студенческим командам стимул, инструменты, обучение и платформу для проектирования, создания, тестирования и презентации проектов, решающих самые насущные проблемы мира.",
        img: "https://images.unsplash.com/photo-1540505844439-01582e0e0172?q=80&w=1200&auto=format&fit=crop",
        actionText: "Подробнее",
        stats: [
          { value: "2", label: "Года" },
          { value: "5", label: "Стран*" },
          { value: "100+", label: "Проектов" },
          { value: "50+", label: "Команд в год" }
        ]
      }
    }
  },
  {
    section: "RegistrationBanner",
    layout: "igem-registration",
    data: {
      en: {
        title: "RSEF 2026 Team Registration is OPEN!",
        subtitle: "Late Registration ends June 4",
        actionText: "Join over 400+ teams and 10,000 RSEFers ->",
        img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop"
      },
      uz: {
        title: "RSEF 2026 Jamoalarni ro'yxatga olish OCHIQ!",
        subtitle: "Kech ro'yxatga olish 4-iyunda yopiladi",
        actionText: "O'z abstraktingizni topshiring va bizga qo'shiling ->",
         img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop"
      },
      ru: {
        title: "Регистрация команд RSEF 2026 ОТКРЫТА!",
        subtitle: "Поздняя регистрация заканчивается 4 июня",
        actionText: "Отправьте свою аннотацию и присоединяйтесь ->",
         img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop"
      }
    }
  },
  {
    section: "WinnersTitle",
    layout: "igem-section-title",
    data: {
      en: { title: "2025 Grand Prize Winners" },
      uz: { title: "2025 Bosh Mukofot G'oliblari" },
      ru: { title: "Победители Гран-при 2025" }
    }
  },
  {
    section: "WinnersGrid",
    layout: "igem-winners",
    data: {
      en: [
        { tag: "Undergrad", title: "McGill", location: "Canada", description: "Cohere: A New Foundation For Engineered Multicellularity", img: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600&auto=format&fit=crop" },
        { tag: "Overgrad", title: "Brno Czech Republic", location: "Czechia", description: "NitroDuck", img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600&auto=format&fit=crop" },
        { tag: "High School", title: "GreatBay-SCIE", location: "China", description: "ArMOLDgeddon, Safe and Efficient Mold Eliminator", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop" }
      ],
      uz: [
        { tag: "Bakalavriat", title: "McGill", location: "Kanada", description: "Birlashtirish: Muhandislik ko'p hujayralilik uchun yangi poydevor", img: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600&auto=format&fit=crop" },
        { tag: "Magistratura", title: "Brno Czech Republic", location: "Chexiya", description: "NitroDuck", img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600&auto=format&fit=crop" },
        { tag: "O'rta maktab", title: "GreatBay-SCIE", location: "Xitoy", description: "ArMOLDgeddon, Xavfsiz va samarali mog'or yo'qotuvchi", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop" }
      ],
      ru: [
        { tag: "Бакалавриат", title: "McGill", location: "Канада", description: "Сплоченность: Новый фундамент для инженерной многоклеточности", img: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600&auto=format&fit=crop" },
        { tag: "Магистратура", title: "Brno Czech Republic", location: "Чехия", description: "NitroDuck", img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600&auto=format&fit=crop" },
        { tag: "Старшая школа", title: "GreatBay-SCIE", location: "Китай", description: "ArMOLDgeddon, Безопасное и эффективное средство от плесени", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop" }
      ]
    }
  },
  {
    section: "GEMinars",
    layout: "igem-banner",
    data: {
      en: {
        title: "2026 GEMinars: Insights for High School PIs",
        description: "Subject matter experts share advice on key RSEF topics through webinar sessions designed to guide High School PIs through the season and better understand the High School Competition.",
        actionText: "Read more and sign up",
        img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop"
      },
      uz: {
        title: "2026 Seminar: Maktab rahbarlari uchun tushunchalar",
        description: "Mutaxassislar maktab jamoalari rahbarlari uchun moslashtirilgan vebinar orqali RSEF ga oid asosiy maslahatlar bilan bo'lishadilar.",
        actionText: "Batafsil o'qish va ro'yxatdan o'tish",
        img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop"
      },
      ru: {
        title: "Вебинары 2026: Советы руководителям школ",
        description: "Эксперты делятся советами по ключевым темам RSEF на вебинарах, специально разработанных для наставников школьных команд.",
        actionText: "Читать далее и записаться",
        img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop"
      }
    }
  },
  {
    section: "NewsTitle",
    layout: "igem-section-title",
    data: {
      en: { title: "News" },
      uz: { title: "Yangiliklar" },
      ru: { title: "Новости" }
    }
  },
  {
    section: "NewsGrid",
    layout: "igem-news-grid",
    data: {
      en: [
        { title: "Meet the 2026 Judging Committee", description: "The Judging Committee has been renewed through an open recruitment process to lead the next phase of judging at RSEF. Meet the members and learn how the committee shapes the competition.", actionText: "Read more ->", img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=400&auto=format&fit=crop" },
        { title: "Sponsors and Special Offers", description: "Participating in the RSEF unlocks a curated set of exclusive offers from our sponsors. Discounts, free reagents, services, and more. See what's available for your team this season.", actionText: "Read more ->", img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=400&auto=format&fit=crop" },
        { title: "Join Our High School PI Network", description: "Being a high school PI, advisor, or instructor may be challenging. Connect with your global peers and get support!", actionText: "Read more ->", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop" },
        { title: "RSEF Team Experience Hub", description: "A collection of resources built from RSEF Teams and iGEMers to share their Competition experiences.", actionText: "Read more ->", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop" },
      ],
      uz: [
        { title: "2026 Hakamlar Hay'ati bilan tanishing", description: "Hakamlar hay'ati RSEFda keyingi bosqich hakamlikni boshqarish maqsadida ochiq tanlov orqali yangilandi.", actionText: "Batafsil ->", img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=400&auto=format&fit=crop" },
        { title: "Homiylar va Maxsus Takliflar", description: "RSEF da ishtirok etish orqali homiylarimizning maxsus takliflaridan foydalaning. Chegirmalar, reaktivlar va boshqalar.", actionText: "Batafsil ->", img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=400&auto=format&fit=crop" },
        { title: "Maktab murabbiylari tarmog'iga qo'shiling", description: "Maktab jamoasi murabbiyi bo'lish ba'zan qiyin bo'lishi mumkin. Hamkasblar bilan bog'laning va yordam oling!", actionText: "Batafsil ->", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop" },
        { title: "RSEF Tajriba Markazi", description: "Musobaqa tajribasi bilan o'rtoqlashish uchun jamoalari va bitiruvchilari tomonidan yaratilgan resurslar to'plami.", actionText: "Batafsil ->", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop" },
      ],
      ru: [
        { title: "Познакомьтесь с жюри 2026 года", description: "Судебный комитет обновлен через открытый набор для проведения следующего этапа судейства на RSEF.", actionText: "Подробнее ->", img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=400&auto=format&fit=crop" },
        { title: "Спонсоры и специальные предложения", description: "Участие в RSEF открывает доступ к эксклюзивным предложениям спонсоров. Скидки, реагенты и другое.", actionText: "Подробнее ->", img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=400&auto=format&fit=crop" },
        { title: "Присоединяйтесь к сети руководителей школ", description: "Быть руководителем команды часто непросто. Общайтесь с коллегами со всего региона и получайте поддержку!", actionText: "Подробнее ->", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop" },
        { title: "Центр обмена опытом RSEF", description: "Сборник ресурсов, созданный командами RSEF для обмена опытом участия в соревнованиях.", actionText: "Подробнее ->", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop" },
      ]
    }
  },
  {
    section: "ResourceTitle1",
    layout: "igem-section-title",
    data: {
      en: { title: "Check out these resources" },
      uz: { title: "Ushbu resurslarni ko'rib chiqing" },
      ru: { title: "Изучите эти ресурсы" }
    }
  },
  {
    section: "ResourceGrid1",
    layout: "igem-resource-grid",
    data: {
      en: [
        { title: "Introduction to RSEF", link: "/about", img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400&auto=format&fit=crop" },
        { title: "Understanding the Cycle", link: "/about/navigating", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400&auto=format&fit=crop" },
        { title: "How to start a Team", link: "/about/starting", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop" },
        { title: "Budgeting and Fundraising", link: "/about/fundraising", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400&auto=format&fit=crop" },
      ],
      uz: [
         { title: "RSEF ga kirish", link: "/about", img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400&auto=format&fit=crop" },
         { title: "Bosqichlarni tushunish", link: "/about/navigating", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400&auto=format&fit=crop" },
         { title: "Jamoani qanday yig'ish kerak", link: "/about/starting", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop" },
         { title: "Byudjet va mablag' jalb qilish", link: "/about/fundraising", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400&auto=format&fit=crop" },
       ],
       ru: [
         { title: "Введение в RSEF", link: "/about", img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400&auto=format&fit=crop" },
         { title: "Понимание этапов", link: "/about/navigating", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400&auto=format&fit=crop" },
         { title: "Как собрать команду", link: "/about/starting", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop" },
         { title: "Бюджетирование и фандрайзинг", link: "/about/fundraising", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400&auto=format&fit=crop" },
       ]
    }
  },
  {
    section: "ResourceTitle2",
    layout: "igem-section-title",
    data: {
      en: { title: "Planning an RSEF Project" },
      uz: { title: "RSEF Loyihasini Rejalashtirish" },
      ru: { title: "Планирование проекта RSEF" }
    }
  },
  {
    section: "ResourceGrid2",
    layout: "igem-resource-grid",
    data: {
      en: [
        { title: "Intro to Engineering in Biology", link: "technology.rsef.org", img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=400&auto=format&fit=crop" },
        { title: "Intro to DNA Assembly", link: "technology.rsef.org", img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=400&auto=format&fit=crop" },
        { title: "Intro to Responsible Design", link: "responsibility.rsef.org", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop" },
        { title: "If you want to use animals", link: "blog.rsef.org", img: "https://images.unsplash.com/photo-1533038590840-1cbeaaf112d7?q=80&w=400&auto=format&fit=crop" },
      ],
      uz: [
         { title: "Biologiya muhandisligiga kirish", link: "technology.rsef.org", img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=400&auto=format&fit=crop" },
         { title: "DNK assambleyasiga kirish", link: "technology.rsef.org", img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=400&auto=format&fit=crop" },
         { title: "Mas'uliyatli dizaynga kirish", link: "responsibility.rsef.org", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop" },
         { title: "Hayvonlardan foydalanish", link: "blog.rsef.org", img: "https://images.unsplash.com/photo-1533038590840-1cbeaaf112d7?q=80&w=400&auto=format&fit=crop" },
       ],
       ru: [
         { title: "Введение в инженерию", link: "technology.rsef.org", img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=400&auto=format&fit=crop" },
         { title: "Сборка ДНК", link: "technology.rsef.org", img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=400&auto=format&fit=crop" },
         { title: "Ответственный дизайн", link: "responsibility.rsef.org", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop" },
         { title: "Использование животных", link: "blog.rsef.org", img: "https://images.unsplash.com/photo-1533038590840-1cbeaaf112d7?q=80&w=400&auto=format&fit=crop" },
       ]
    }
  },
  {
    section: "ResourceTitle3",
    layout: "igem-section-title",
    data: {
      en: { title: "View RSEF projects" },
      uz: { title: "RSEF loyihalarini ko'rish" },
      ru: { title: "Посмотреть проекты RSEF" }
    }
  },
  {
    section: "ResourceGrid3",
    layout: "igem-resource-grid",
    data: {
      en: [
        { title: "2025 Project Promotions", link: "video.rsef.org", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop" },
        { title: "2025 Presentations", link: "video.rsef.org", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop" },
        { title: "2025 Judging Sessions", link: "video.rsef.org", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop" },
      ],
      uz: [
         { title: "2025 Loyiha aksiyalari", link: "video.rsef.org", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop" },
         { title: "2025 Loyiha taqdimotlari", link: "video.rsef.org", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop" },
         { title: "2025 Hakamlik sessiyalari", link: "video.rsef.org", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop" },
       ],
       ru: [
         { title: "Акции проектов 2025", link: "video.rsef.org", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop" },
         { title: "Презентации 2025", link: "video.rsef.org", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop" },
         { title: "Судейские сессии 2025", link: "video.rsef.org", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop" },
       ]
    }
  },
  {
    section: "ResourceTitle4",
    layout: "igem-section-title",
    data: {
      en: { title: "Awards and Medals" },
      uz: { title: "Mukofotlar va Medallar" },
      ru: { title: "Награды и медали" }
    }
  },
  {
    section: "ResourceGrid4",
    layout: "igem-resource-grid",
    data: {
      en: [
        { title: "2025 Results", link: "competition.rsef.org", img: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=400&auto=format&fit=crop" },
        { title: "2024 Results", link: "competition.rsef.org", img: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=400&auto=format&fit=crop" },
        { title: "2023 Results", link: "competition.rsef.org", img: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=400&auto=format&fit=crop" },
        { title: "2022 Results", link: "competition.rsef.org", img: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=400&auto=format&fit=crop" },
      ],
      uz: [
         { title: "2025 Natijalar", link: "competition.rsef.org", img: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=400&auto=format&fit=crop" },
         { title: "2024 Natijalar", link: "competition.rsef.org", img: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=400&auto=format&fit=crop" },
         { title: "2023 Natijalar", link: "competition.rsef.org", img: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=400&auto=format&fit=crop" },
         { title: "2022 Natijalar", link: "competition.rsef.org", img: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=400&auto=format&fit=crop" },
       ],
       ru: [
         { title: "Результаты 2025", link: "competition.rsef.org", img: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=400&auto=format&fit=crop" },
         { title: "Результаты 2024", link: "competition.rsef.org", img: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=400&auto=format&fit=crop" },
         { title: "Результаты 2023", link: "competition.rsef.org", img: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=400&auto=format&fit=crop" },
         { title: "Результаты 2022", link: "competition.rsef.org", img: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=400&auto=format&fit=crop" },
       ]
    }
  },
  {
    section: "SponsorsTitle",
    layout: "igem-section-title",
    data: {
      en: { title: "RSEF Sponsors" },
      uz: { title: "RSEF Homiylari" },
      ru: { title: "Спонсоры RSEF" }
    }
  },
  {
    section: "Sponsors",
    layout: "igem-sponsors",
    data: {}
  }
];
