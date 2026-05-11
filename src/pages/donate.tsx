import React from 'react';
import { useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';

export function DonatePage() {
  const { locale } = useParams();
  
  const translations = {
    en: {
      title: 'Donate',
      heading: 'YOU CAN HELP KEEP SCIENCE A PRIORITY!',
      desc: 'Science does not happen without support. If you believe in what these students are building, help us make sure they have a place to do it.',
      btn: 'Donate Now'
    },
    uz: {
      title: 'Xayriya Qilish',
      heading: 'ILM-FANNI RIVOJLANTIRISHDA O\'Z HISSANGIZNI QO\'SHING!',
      desc: 'Ilm-fan qo‘llab-quvvatlashsiz rivojlanmaydi. Ushbu yosh tadqiqotchilarga o‘z salohiyatini namoyon etish imkonini yaratishda bizga yordam bering.',
      btn: 'Hozir xayriya qilish'
    },
    ru: {
      title: 'Пожертвовать',
      heading: 'ВЫ МОЖЕТЕ ПОМОЧЬ НАУКЕ ОСТАВАТЬСЯ В ПРИОРИТЕТЕ!',
      desc: 'Наука не может развиваться без поддержки. Если вы верите в то, что создают эти студенты, помогите нам обеспечить им площадку для этого.',
      btn: 'Пожертвовать сейчас'
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
           <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-6">
              <Heart className="w-10 h-10 fill-emerald-600" />
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase">{t.heading}</h1>
           <div className="w-24 h-1.5 bg-amber-400 mx-auto mb-10 rounded-full"></div>
        </div>
        
        <div className="bg-white p-8 md:p-16 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center">
           <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium mb-12 max-w-3xl">
              {t.desc}
           </p>
           
           <button className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xl py-5 px-12 rounded-full transition-transform hover:scale-105 shadow-lg shadow-amber-400/30 flex items-center gap-3">
              <Heart className="w-6 h-6" strokeWidth={2.5} />
              {t.btn}
           </button>
        </div>
      </div>
    </div>
  );
}
