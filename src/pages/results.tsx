import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Trophy, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import {
  resultsCopy,
  tr,
  winners,
  type Locale,
  type Winner,
} from '../data/rsef2026';

const placeStyles: Record<Winner['place'], { ring: string; badge: string; medal: string }> = {
  1: { ring: 'border-[#c9a227]/40', badge: 'bg-[#c9a227] text-white', medal: '🥇' },
  2: { ring: 'border-mist-300', badge: 'bg-mist-400 text-white', medal: '🥈' },
  3: { ring: 'border-[#b07a3c]/40', badge: 'bg-[#b07a3c] text-white', medal: '🥉' },
};

export function ResultsPage() {
  const { locale } = useParams();
  const [resultsList, setResultsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const fetchResults = async () => {
        try {
           const q = query(collection(db, 'results'), orderBy('year', 'desc'));
           const snap = await getDocs(q);
           const r: any[] = [];
           snap.forEach(d => r.push({ id: d.id, ...d.data() }));
           setResultsList(r);
        } catch (e) {
           console.error(e);
        } finally {
           setLoading(false);
        }
     };
     fetchResults();
  }, []);

  const t = {
     en: { title: "Competition Results", load: "Loading...", empty: "No results published yet. Check back later!" },
     uz: { title: "Musobaqa Natijalari", load: "Yuklanmoqda...", empty: "Hali natijalar e'lon qilinmadi. Keyinroq qayta tekshiring!" },
     ru: { title: "Результаты соревнований", load: "Загрузка...", empty: "Результаты пока не опубликованы. Загляните позже!" }
  }[locale as 'en' | 'uz' | 'ru'] || { title: "Competition Results", load: "Loading...", empty: "No results published yet. Check back later!" };

  const c = resultsCopy[(locale as Locale) ?? 'en'] ?? resultsCopy.en;

  return (
     <div className="bg-paper-50 min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-heading font-bold text-brand-900 mb-2">{t.title}</h1>
        <div className="w-20 h-1.5 bg-brand-500 rounded-full mb-12"></div>

        {/* ---- RSEF 2026 featured winners --------------------------- */}
        <section className="mb-20">
           <h2 className="text-2xl font-heading font-bold text-brand-900 mb-8">{c.featured}</h2>

           <div className="flex flex-col gap-8">
              {winners.map((w, idx) => {
                 const style = placeStyles[w.place];
                 return (
                    <motion.article
                       key={w.id}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true, margin: '-60px' }}
                       transition={{ delay: idx * 0.06 }}
                       className={`bg-white rounded-2xl border ${style.ring} shadow-[0_8px_30px_rgb(4,17,98,0.05)] overflow-hidden grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`}
                    >
                       {/* Images */}
                       <div className={`bg-paper-200 grid gap-1 ${w.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                          {w.images.map((img) => (
                             <img
                                key={img.src}
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                className="w-full h-64 lg:h-full object-cover object-top"
                             />
                          ))}
                       </div>

                       {/* Content */}
                       <div className="p-6 sm:p-8 flex flex-col gap-5">
                          <div className="flex flex-wrap items-center gap-3">
                             <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${style.badge}`}>
                                <span aria-hidden="true">{style.medal}</span>
                                {tr(w.placeLabel, locale)}
                             </span>
                             <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                RSEF {w.year}
                             </span>
                          </div>

                          <div>
                             <h3 className="text-2xl font-heading font-bold text-brand-900 leading-snug">
                                {w.projectName}
                             </h3>
                             <p className="mt-2 text-brand-600 font-semibold">{w.winnerName}</p>
                             {w.school && w.school !== w.winnerName && (
                                <p className="text-sm text-slate-500">{w.school}</p>
                             )}
                          </div>

                          <div className="border-t border-mist-100 pt-5">
                             <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                                {c.studentReview}
                             </p>
                             <div className="relative pl-8">
                                <Quote className="w-5 h-5 text-mist-300 absolute left-0 top-1" />
                                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                                   {w.review}
                                </p>
                             </div>
                          </div>
                       </div>
                    </motion.article>
                 );
              })}
           </div>
        </section>

        {/* ---- Anything published from the admin panel -------------- */}
        {loading ? (
           <div className="flex justify-center py-20 text-slate-500">{t.load}</div>
        ) : resultsList.length > 0 ? (
           <section>
              <h2 className="text-2xl font-heading font-bold text-brand-900 mb-8">{c.archive}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {resultsList.map((res) => {
                    const reviewText = (res.review && typeof res.review === 'object') ? (res.review[locale || 'en'] || res.review['en']) : (typeof res.review === 'string' ? res.review : ((res.description && typeof res.description === 'object') ? (res.description[locale || 'en'] || res.description['en']) : (typeof res.description === 'string' ? res.description : '')));
                    const heading = res.winnerName || ((res.title && typeof res.title === 'object') ? (res.title[locale || 'en'] || res.title['en']) : (typeof res.title === 'string' ? res.title : 'Winner'));
                    return (
                       <div key={res.id} className="bg-white rounded-2xl shadow-sm border border-mist-100 overflow-hidden flex flex-col">
                          <div className="bg-brand-900 p-5 md:p-6 flex flex-col justify-between">
                             <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                                <Trophy className="w-6 h-6 text-[#c9a227]" />
                                {heading}
                             </h3>
                             <p className="text-mist-200 text-sm mt-1">RSEF {res.year} {res.placement ? `• ${res.placement}` : ''}</p>
                          </div>
                          <div className="p-6 md:p-8 flex flex-col gap-6 flex-1">
                             {res.imageUrl && (
                                 <div className="w-full aspect-video bg-paper-200 rounded-xl overflow-hidden shadow-md border border-mist-100 flex-shrink-0">
                                    {res.imageUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/) ? (
                                       <iframe
                                           className="w-full h-full"
                                          src={`https://www.youtube.com/embed/${res.imageUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)[1]}`}
                                           title={heading}
                                          frameBorder="0"
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                          allowFullScreen
                                       ></iframe>
                                    ) : (
                                       <img src={res.imageUrl} alt={heading} className="w-full h-full object-cover object-top" />
                                    )}
                                 </div>
                             )}
                             <div className="w-full flex-1">
                                {res.projectName && <h4 className="font-bold text-brand-900 text-lg mb-2">{res.projectName}</h4>}
                                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-base italic">"{reviewText}"</p>
                             </div>
                          </div>
                       </div>
                    );
                 })}
              </div>
           </section>
        ) : null}
      </div>
     </div>
  );
}
