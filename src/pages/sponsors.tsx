import React from 'react';
import { useParams } from 'react-router-dom';

export function SponsorsPage() {
  const { locale } = useParams();
  
  const translations = {
    en: {
      title: 'Our Sponsors',
      soon: 'Coming Soon',
      desc: 'Sponsors will be announced soon. We are currently looking for partners to join our mission.'
    },
    uz: {
      title: 'Homiylarimiz',
      soon: 'Tez kunda',
      desc: 'Homiylar tez orada e\'lon qilinadi. Hozirda bizning missiyamizga qo\'shiladigan hamkorlarni qidirmoqdamiz.'
    },
    ru: {
      title: 'Наши спонсоры',
      soon: 'Скоро',
      desc: 'Спонсоры будут объявлены в ближайшее время. В настоящее время мы ищем партнеров.'
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50 flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase">{t.title}</h1>
        <div className="w-24 h-1.5 bg-emerald-500 mx-auto mb-10 rounded-full"></div>
        <div className="bg-white p-12 md:p-20 rounded-2xl shadow-sm border border-slate-200">
           <h2 className="text-3xl font-bold text-slate-800 mb-4">{t.soon}</h2>
           <p className="text-xl text-slate-600 leading-relaxed font-medium">{t.desc}</p>
        </div>
      </div>
    </div>
  );
}
