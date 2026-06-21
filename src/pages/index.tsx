import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArrowRight, Calendar, MapPin, Award } from 'lucide-react';

export function HomePage() {
  const { i18n } = useTranslation();
  const locale = useParams().locale || i18n.language || 'en';
  const [latestNews, setLatestNews] = useState<any[]>([]);

  useEffect(() => {
     // Fetch top 3 latest news
     const fetchNews = async () => {
        try {
           const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'), limit(3));
           const snap = await getDocs(q);
           const results: any[] = [];
           snap.forEach(d => results.push({ id: d.id, ...d.data() }));
           setLatestNews(results);
        } catch (e) {
           console.error(e);
        }
     };
     fetchNews();
  }, []);

   const translations = {
    en: {
      title: "Research, Science & Engineering Fair",
      action: "Apply",
      news: "Latest News",
      competition: "Competition",
      fair: "Fair",
      appOpen: "Applications Open for 2026",
      desc: "RSEF is an initiative dedicated to advancing student research in Uzbekistan and building the next generation of scientists and engineers through rigorous evaluation, expert mentorship and meaningful recognition, while cultivating a culture of curiosity and innovation.",
      ages: "Ages",
      countries: "Countries",
      projects: "Projects",
      teams: "Teams/year",
      dateTitle: "July 15, 2026",
      venueTitle: "Nest One, Tashkent City",
      googleMaps: "Google",
      yandexMaps: "Yandex",
      appleMaps: "Apple",
      dateDesc: "Join us for an immersive competition where top middle school, high school, and gap year students showcase their research.",
      awardTitle: "Prizes & Scholarships",
      awardDesc: "Finalists will receive exclusive awards and prizes, generously provided by Registan School, while winners will additionally receive cash prizes.",
      viewAll: "View All",
      noNews: "No news published yet.",
      supportersTitle: "Supported by",
      supportersText: "We gratefully acknowledge the support of Freshman Academy in making this fair possible.",
      supportersText2: "We sincerely appreciate Registon School’s support in bringing RSEF to life."
    },
    uz: {
      title: "Research, Science & Engineering Fair",
      action: "Ariza topshirish",
      news: "So'nggi yangiliklar",
      competition: "Musobaqa",
      fair: "Yarmarka",
      appOpen: "2026-yil uchun qabul ochiq",
      desc: "RSEF — O'zbekistonda talabalar tadqiqotlarini rivojlantirishga va qat'iy baholash, mutaxassislar ustozligi va ahamiyatli e'tirof orqali, qiziquvchanlik va innovatsiyalar madaniyatini shakllantirgan holda keyingi avlod olimlari va muhandislarini tayyorlashga bag'ishlangan tashabbusdir.",
      ages: "Yosh",
      countries: "Davlatlar",
      projects: "Loyihalar",
      teams: "Jamoalar/yil",
      dateTitle: "15-Iyul, 2026",
      venueTitle: "Nest One, Toshkent",
      googleMaps: "Google",
      yandexMaps: "Yandex",
      appleMaps: "Apple",
      dateDesc: "Eng yaxshi o'rta maktab, litsey va gap year o'quvchilari o'z tadqiqotlarini namoyish etadigan immersiv tanlovda bizga qo'shiling.",
      awardTitle: "Sovrinlar va Grantlar",
      awardDesc: "Finalchilar Registon School tomonidan taqdim etilgan eksklyuziv mukofotlar va sovg'alarni qo'lga kiritadilar, g'oliblarga esa qo'shimcha ravishda pul mukofotlari beriladi.",
      viewAll: "Barchasini ko'rish",
      noNews: "Hozircha yangiliklar yo'q.",
      supportersTitle: "Qo'llab-quvvatlovchi",
      supportersText: "Ushbu yarmarkani tashkil etishda Freshman Academy ko'rsatgan yordami uchun minnatdorchilik bildiramiz.",
      supportersText2: "RSEF ni amalga oshirishda Registon School ko'rsatgan yordami uchun chin dildan minnatdormiz."
    },
    ru: {
      title: "Research, Science & Engineering Fair",
      action: "Подать заявку",
      news: "Последние новости",
      competition: "Соревнование",
      fair: "Выставка",
      appOpen: "Прием заявок на 2026 год открыт",
      desc: "RSEF — это инициатива, посвященная развитию студенческих исследований в Узбекистане и подготовке следующего поколения ученых и инженеров посредством строгой оценки, наставничества экспертов и значимого признания, культивируя при этом культуру любознательности и инноваций.",
      ages: "Возраст",
      countries: "Страны",
      projects: "Проекты",
      teams: "Команд/год",
      dateTitle: "15 Июля, 2026",
      venueTitle: "Nest One, Ташкент",
      googleMaps: "Google",
      yandexMaps: "Yandex",
      appleMaps: "Apple",
      dateDesc: "Присоединяйтесь к нам на захватывающем конкурсе, где лучшие ученики средних и старших классов, а также студенты, взявшие академический отпуск, представят свои исследования.",
      awardTitle: "Призы и Стипендии",
      awardDesc: "Финалисты получат эксклюзивные награды и призы, любезно предоставленные Registon School, а победители дополнительно получат денежные призы.",
      viewAll: "Смотреть все",
      noNews: "Пока нет новостей.",
      supportersTitle: "При поддержке",
      supportersText: "Мы с благодарностью отмечаем поддержку Freshman Academy в проведении этой выставки.",
      supportersText2: "Мы искренне признательны Registon School за поддержку в воплощении RSEF в жизнь."
    }
  };
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="w-full flex flex-col items-center bg-white min-h-screen">
      
      {/* Hero Section (Split Layout) */}
      <div 
         className="relative w-full min-h-[100svh] flex items-center overflow-hidden"
         style={{ background: 'radial-gradient(circle at top left, #123a8f 0%, #07152f 40%, #020817 100%)' }}
      >
         {/* Background Image Area (Right aligned) */}
         <div className="absolute top-0 right-0 w-full md:w-1/2 h-full z-0 opacity-30 md:opacity-80 mix-blend-screen pointer-events-none">
             {/* Gradient overlay to seamlessly merge the image with the left solid background */}
            <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#07152f] to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent z-10 md:hidden" />
            <img 
                src="/hero.jpg" 
                alt="Young student doing robotics/electronics" 
                className="w-full h-full object-cover object-[70%_30%] md:object-center grayscale opacity-80 mix-blend-luminosity" 
            />
         </div>

         {/* Content Area */}
         <div className="relative z-20 w-full max-w-none mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-32 md:py-40">
            <div className="w-full md:w-[75%] lg:w-[70%] xl:w-[65%] flex flex-col">
               <div className="inline-flex self-start items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                  <span className="w-2 h-2 rounded-full bg-[#4FD1FF] animate-pulse shadow-[0_0_8px_#4FD1FF]"></span>
                  <span className="text-slate-200 text-sm font-semibold tracking-wide uppercase">{t.appOpen}</span>
               </div>
               
               {/* Heading */}
               <div className="flex items-center gap-4 mb-6 relative">
                   <div className="text-white text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tighter drop-shadow-sm">
                       RSEF 2026
                   </div>
                   <div className="w-[1.5px] h-10 md:h-12 bg-white/20 transform skew-x-12 mx-2"></div>
                   <h1 className="text-[#4FD1FF] text-sm md:text-base font-bold tracking-[0.2em] uppercase">{t.fair}</h1>
               </div>

               <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6 leading-[1.15] max-w-4xl drop-shadow-sm">
                  {t.title}
               </h2>

               <p className="text-white/75 text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-3xl font-normal">
                  {t.desc}
               </p>

               <Link to={`/${locale}/apply`} className="self-start inline-flex items-center gap-3 bg-[#4FD1FF] hover:bg-[#3bc2f5] text-slate-950 font-bold text-lg px-8 py-4 rounded-xl transition-all hover:translate-x-1 hover:-translate-y-1 shadow-[0_0_20px_rgba(79,209,255,0.3)]">
                  {t.action} <ArrowRight className="w-5 h-5" />
               </Link>
            </div>
         </div>
      </div>

      {/* Info Cards - White background, black text */}
      <div className="relative z-10 w-full bg-slate-50 border-t border-slate-200 py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 rounded-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
                  <Calendar className="w-10 h-10 text-emerald-500 mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{t.dateTitle}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{t.dateDesc}</p>
               </div>
               
               <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 rounded-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col justify-between">
                  <div>
                    <MapPin className="w-10 h-10 text-red-500 mb-6" />
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{t.venueTitle}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                     <a href="https://www.google.com/maps/search/?api=1&query=Nest+One,+Tashkent" target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[70px] flex items-center justify-center py-2 px-1 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-700">
                        {t.googleMaps}
                     </a>
                     <a href="https://yandex.com/maps/?text=Nest+One,+Tashkent" target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[70px] flex items-center justify-center py-2 px-1 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-700">
                        {t.yandexMaps}
                     </a>
                     <a href="https://maps.apple.com/?q=Nest+One,Tashkent,Uzbekistan" target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[70px] flex items-center justify-center py-2 px-1 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-700">
                        {t.appleMaps}
                     </a>
                  </div>

               </div>

               <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 rounded-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
                  <Award className="w-10 h-10 text-indigo-500 mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{t.awardTitle}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{t.awardDesc}</p>
               </div>
            </div>

            <div className="mt-16 flex justify-center">
               <a href="https://t.me/rsefofficial" target="_blank" rel="noopener noreferrer" className="inline-flex flex-col items-center group">
                  <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4 group-hover:text-[#28A8EA] transition-colors duration-300">For more info</span>
                  <div className="flex items-center gap-4 bg-[#28A8EA] hover:bg-[#1e8cc7] text-white px-10 py-5 rounded-2xl shadow-[0_8px_30px_rgba(40,168,234,0.3)] hover:shadow-[0_12px_40px_rgba(40,168,234,0.4)] hover:-translate-y-1 transition-all duration-300">
                     <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                     </svg>
                     <span className="text-3xl font-black tracking-wide">Telegram</span>
                  </div>
               </a>
            </div>
         </div>
      </div>

      {/* Latest News - White background, black text */}
      <div className="relative z-10 w-full bg-white border-t border-slate-100 py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
               <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.news}</h2>
                  <div className="w-20 h-1 bg-emerald-500 rounded-full"></div>
               </div>
               <Link to={`/${locale}/news`} className="text-emerald-600 font-bold hover:text-emerald-500 flex items-center gap-1 group">
                  {t.viewAll} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {latestNews.length > 0 ? latestNews.map((news) => {
                  const title = news.title[locale || 'en'] || news.title['en'];
                  const desc = news.description[locale || 'en'] || news.description['en'];
                  return (
                     <div key={news.id} onClick={() => window.location.href = `/${locale}/news`} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all group cursor-pointer flex flex-col h-full">
                        <div className="aspect-video overflow-hidden bg-slate-100 shrink-0">
                           {news.imageUrl && news.imageUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/) ? (
                              <iframe 
                                 className="w-full h-full"
                                 src={`https://www.youtube.com/embed/${news.imageUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)[1]}`} 
                                 title={title}
                                 frameBorder="0"
                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                 allowFullScreen
                              ></iframe>
                           ) : (
                              <img src={news.imageUrl || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop'} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                           )}
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                           <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3 block">
                              {new Date(news.createdAt).toLocaleDateString()}
                           </span>
                           <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{title}</h3>
                           <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-4 flex-1">{desc}</p>
                           <div className="text-emerald-600 font-semibold text-sm flex items-center gap-1 group-hover:text-emerald-500 transition-colors">
                             Read More <ArrowRight className="w-4 h-4" />
                           </div>
                        </div>
                     </div>
                  );
               }) : (
                  <div className="col-span-1 md:col-span-3 text-center py-16 text-slate-500 bg-slate-50 rounded-xl border border-slate-100">
                     {t.noNews}
                  </div>
               )}
            </div>
         </div>
      </div>

      {/* Supported By */}
      <div className="relative z-10 w-full bg-slate-50 border-t border-slate-200 py-32">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6 text-center uppercase tracking-tight leading-tight">{t.supportersTitle}</h2>
            <div className="w-24 h-1 bg-[#4FD1FF] rounded-full mx-auto mb-16"></div>
            
            <div className="flex flex-col gap-8">
               <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-12 md:gap-16">
                  <div className="flex flex-col items-center shrink-0">
                     <div className="w-48 h-48 mb-4 flex items-center justify-center bg-slate-50/50 rounded-2xl p-4">
                        <img src="/freshman-logo.png" alt="Freshman Academy Logo" className="w-full h-full object-contain" />
                     </div>
                     <h3 className="text-2xl font-black text-[#0a192f] uppercase tracking-wide">Freshman Academy</h3>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                     <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-[#0a192f] tracking-tight leading-relaxed">
                       "{t.supportersText}"
                     </p>
                  </div>
               </div>

               <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16">
                  <div className="flex flex-col items-center shrink-0">
                     <div className="w-48 h-48 mb-4 flex items-center justify-center bg-slate-50/50 rounded-2xl p-4">
                        <img src="/registon-logo.png" alt="Registon School Logo" className="w-full h-full object-contain mix-blend-multiply" />
                     </div>
                     <h3 className="text-2xl font-black text-[#0a192f] uppercase tracking-wide">Registon School</h3>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                     <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-[#0a192f] tracking-tight leading-relaxed">
                       "{t.supportersText2}"
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  const { i18n } = useTranslation();
  const locale = useParams().locale || i18n.language || 'en';
  
  const translations = {
    en: {
      title: "About Us",
      content: "Founded in Tashkent in 2026, the Research Science & Engineering Fair has been dedicated to expanding scientific literacy, access to STEM education, and student research across Central Asia. As an international science competition, our mission promotes the understanding and appreciation of science and the vital role it plays in human advancement: to challenge, educate, and inspire. We are best known for being Central Asia's first large-scale science and engineering fair, our rigorous research competition open to students across the region, and our outreach programs ensuring that every young person can strive to become a scientist or engineer. Guided by our motto, Think Beyond Limits, and with support from our jury, partners, and academic institutions, we continue to achieve our mission through our competitions and mentorship programs."
    },
    uz: {
      title: "Biz Haqimizda",
      content: "2026 yilda Toshkentda asos solingan Research Science & Engineering Fair butun Markaziy Osiyo bo'ylab ilmiy savodxonlikni, STEM ta'limiga kirishni va talabalar tadqiqotlarini kengaytirishga bag'ishlangan. Xalqaro ilmiy musobaqa sifatida bizning vazifamiz fanni va uning insoniyat taraqqiyotidagi muhim rolini tushunish va qadrlashni targ'ib qilishdir: sinash, o'rgatish va ilhomlantirish. Biz Markaziy Osiyodagi birinchi yirik ilmiy va muhandislik yarmarkasi, butun mintaqa bo'ylab talabalar uchun ochiq bo'lgan qat'iy tadqiqot musobaqamiz va har bir yoshning olim yoki muhandis bo'lishga intilishini ta'minlaydigan tushuntirish dasturlarimiz bilan mashhurmiz. \"Chegaradan tashqarida fikrla\" shiorimizga amal qilib, hakamlar hay'ati, hamkorlarimiz va ta'lim muassasalarining ko'magi bilan musobaqalar va ustozlik dasturlarimiz orqali o'z vazifamizni bajarishda davom etamiz."
    },
    ru: {
      title: "О нас",
      content: "Основанная в Ташкенте в 2026 году, Research Science & Engineering Fair посвящена расширению научной грамотности, доступу к STEM-образованию и студенческим исследованиям по всей Центральной Азии. Как международное научное соревнование, наша миссия способствует пониманию и оценке науки и ее жизненно важной роли в развитии человечества: бросать вызов, обучать и вдохновлять. Мы наиболее известны как первая в Центральной Азии крупномасштабная научно-инженерная ярмарка, нашим строгим исследовательским конкурсом, открытым для студентов со всего региона, и нашими информационно-просветительскими программами, обеспечивающими, чтобы каждый молодой человек мог стремиться стать ученым или инженером. Руководствуясь нашим девизом «Думай за пределами возможного» и при поддержке нашего жюри, партнеров и академических институтов, мы продолжаем выполнять нашу миссию с помощью наших конкурсов и программ наставничества."
    }
  };
  
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="w-full bg-slate-50 min-h-[70vh] py-24 flex flex-col items-center">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 bg-white rounded-2xl shadow-sm border border-slate-200 py-16 mt-8">
        <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-slate-900 mb-8 tracking-tight text-center">{t.title}</h2>
        <div className="w-20 h-1.5 bg-[#4FD1FF] rounded-full mx-auto mb-12"></div>
        <div className="text-[#5a6069] text-lg sm:text-x leading-relaxed space-y-6 text-center sm:text-left">
           <p>{t.content}</p>
        </div>
      </div>
    </div>
  );
}

export function TeamPage() {
  return (
    <div className="p-12 text-center text-slate-500">
      <h2 className="text-3xl font-bold mb-4">Team Page</h2>
      <p>This is a placeholder for the Team page.</p>
    </div>
  );
}
