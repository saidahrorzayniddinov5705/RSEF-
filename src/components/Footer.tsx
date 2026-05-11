import { useParams, Link } from 'react-router-dom';

export function Footer() {
  const { locale } = useParams();
  
  const translations = {
    en: {
      cols: [
        { title: "RSEF", links: [
          { name: "About Us", path: "about" },
          { name: "Contact", path: "contact" },
          { name: "Support", path: "contact" },
          { name: "News & Updates", path: "news" },
          { name: "Partners", path: "sponsors" }
        ] },
        { title: "Competition", links: [
          { name: "Guidelines", path: "registration" },
          { name: "Registration", path: "apply" },
          { name: "Judging Criteria", path: "registration" },
          { name: "Results", path: "results" },
          { name: "News", path: "news" }
        ] },
        { title: "Resources", links: [
          { name: "FAQ", path: "registration" },
          { name: "Rules & Regulations", path: "registration" }
        ] }
      ],
      cr: "Copyright © " + new Date().getFullYear() + " RSEF Foundation, Inc. All rights reserved.",
      contact: "Contact us"
    },
    uz: {
      cols: [
        { title: "RSEF", links: [
          { name: "Biz haqimizda", path: "about" },
          { name: "Aloqa", path: "contact" },
          { name: "Qo'llab-quvvatlash", path: "contact" },
          { name: "Yangiliklar", path: "news" },
          { name: "Hamkorlar", path: "sponsors" }
        ] },
        { title: "Musobaqa", links: [
          { name: "Qo'llanma", path: "registration" },
          { name: "Ro'yxatdan o'tish", path: "apply" },
          { name: "Baholash mezonlari", path: "registration" },
          { name: "Natijalar", path: "results" },
          { name: "Yangiliklar", path: "news" }
        ] },
        { title: "Resurslar", links: [
          { name: "FAQ", path: "registration" },
          { name: "Qoidalar va Nizomlar", path: "registration" }
        ] }
      ],
      cr: "Mualliflik huquqi © " + new Date().getFullYear() + " RSEF Foundation, Inc. Barcha huquqlar himoyalangan.",
      contact: "Biz bilan aloqa"
    },
    ru: {
      cols: [
        { title: "RSEF", links: [
          { name: "О нас", path: "about" },
          { name: "Контакты", path: "contact" },
          { name: "Поддержка", path: "contact" },
          { name: "Новости", path: "news" },
          { name: "Партнеры", path: "sponsors" }
        ] },
        { title: "Соревнование", links: [
          { name: "Руководство", path: "registration" },
          { name: "Регистрация", path: "apply" },
          { name: "Критерии оценки", path: "registration" },
          { name: "Результаты", path: "results" },
          { name: "Новости", path: "news" }
        ] },
        { title: "Ресурсы", links: [
          { name: "ЧАВО", path: "registration" },
          { name: "Правила и положения", path: "registration" }
        ] }
      ],
      cr: "Авторское право © " + new Date().getFullYear() + " RSEF Foundation, Inc. Все права защищены.",
      contact: "Связаться с нами"
    }
  };

  const currentLang = (locale as 'en' | 'uz' | 'ru') || 'en';
  const t = translations[currentLang] || translations.en;

  return (
    <footer className="bg-white pt-16 pb-28 lg:pb-8 border-t border-slate-200 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {t.cols.map((col, idx) => (
             <div key={idx}>
                <h4 className="font-bold text-sm text-slate-900 mb-4 tracking-wide">{col.title}</h4>
                <ul className="space-y-3">
                   {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                         <Link to={`/${currentLang}/${link.path}`} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                            {link.name}
                         </Link>
                      </li>
                   ))}
                </ul>
             </div>
          ))}
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-200">
           <div className="flex items-center gap-2 opacity-100 transition-opacity">
               <div className="flex items-center gap-2 text-slate-900">
                  <img src="/logo-navy.svg" alt="RSEF Logo" className="h-16 md:h-20 w-auto object-contain" 
                    onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const textFallback = target.parentElement?.querySelector('.text-fallback');
                    if (textFallback) textFallback.classList.remove('hidden');
                  }} />
                  <div className="flex flex-col justify-center">
                    <span className="text-fallback hidden text-2xl font-black tracking-tighter">RSEF</span>
                    <span className="text-sm md:text-base font-black italic tracking-tighter uppercase leading-tight">Think</span>
                    <span className="text-sm md:text-base font-black italic tracking-tighter uppercase leading-tight">Beyond Limits</span>
                  </div>
               </div>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-slate-400">
                 {/* Social placeholders */}
                 <div className="w-5 h-5 bg-slate-200 rounded-sm hover:bg-emerald-100 cursor-pointer transition-colors"></div>
                 <div className="w-5 h-5 bg-slate-200 rounded-sm hover:bg-emerald-100 cursor-pointer transition-colors"></div>
                 <div className="w-5 h-5 bg-slate-200 rounded-sm hover:bg-emerald-100 cursor-pointer transition-colors"></div>
              </div>
           </div>
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
           <p className="font-medium">{t.cr}</p>
           <div className="flex gap-4 font-medium">
              <Link to={`/${currentLang}/contact`} className="hover:text-emerald-600 transition-colors">{t.contact}</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}

