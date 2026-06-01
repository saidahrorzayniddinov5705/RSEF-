import React from 'react';
import { useParams } from 'react-router-dom';

export function SponsorsPage() {
  const { locale } = useParams();
  
  const translations = {
    en: {
      title: 'Supported by',
      supportersText: 'We gratefully acknowledge the support of Freshman Academy in making this fair possible.'
    },
    uz: {
      title: 'Qo\'llab-quvvatlovchi',
      supportersText: 'Ushbu yarmarkani tashkil etishda Freshman Academy ko\'rsatgan yordami uchun minnatdorchilik bildiramiz.'
    },
    ru: {
      title: 'При поддержке',
      supportersText: 'Мы с благодарностью отмечаем поддержку Freshman Academy в проведении этой выставки.'
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 w-full">
         <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 text-center tracking-tight uppercase">{t.title}</h1>
         <div className="w-24 h-1.5 bg-[#4FD1FF] mx-auto mb-16 rounded-full"></div>
         
         <div className="bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex flex-col items-center shrink-0">
               <div className="w-64 h-64 mb-6 flex items-center justify-center hover:scale-105 transition-transform duration-300 bg-slate-50/50 rounded-2xl p-4">
                  <img src="/freshman-logo.png" alt="Freshman Academy Logo" className="w-full h-full object-contain" />
               </div>
               <h2 className="text-3xl font-black text-[#0a192f] uppercase tracking-wide">Freshman Academy</h2>
            </div>
            <div className="flex-1 text-center md:text-left">
               <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-[#0a192f] tracking-tight leading-relaxed">
                 "{t.supportersText}"
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
