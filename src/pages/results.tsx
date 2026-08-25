import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Trophy } from 'lucide-react';
import { WinnersStack } from '../components/blocks/WinnersStack';
import { resultsCopy, type Locale } from '../data/rsef2026';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <h1 className="text-4xl font-heading font-bold text-brand-900 mb-2">{t.title}</h1>
        <div className="w-20 h-1.5 bg-brand-500 rounded-full"></div>
      </div>

      <WinnersStack locale={locale} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
