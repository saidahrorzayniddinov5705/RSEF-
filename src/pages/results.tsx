import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Trophy, Medal, Star } from 'lucide-react';

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

  return (
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[calc(100vh-200px)]">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">{t.title}</h1>
        <div className="w-20 h-1.5 bg-emerald-500 rounded-full mb-12"></div>

        {loading ? (
           <div className="flex justify-center py-20 text-slate-500">{t.load}</div>
        ) : (
           <div className="space-y-12">
              {resultsList.length > 0 ? resultsList.map((res) => {
                 const title = res.title[locale || 'en'] || res.title['en'];
                 const desc = res.description[locale || 'en'] || res.description['en'];
                 return (
                    <div key={res.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                       <div className="bg-slate-900 p-6 flex items-center justify-between">
                          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                             <Trophy className="w-7 h-7 text-yellow-400" />
                             {title} (RSEF {res.year})
                          </h2>
                       </div>
                       <div className="p-8 flex flex-col md:flex-row gap-8">
                          {res.imageUrl && (
                              <div className="w-full md:w-1/3">
                                 <img src={res.imageUrl} alt={title} className="w-full rounded-xl shadow-md border border-slate-200" />
                              </div>
                          )}
                          <div className={`w-full ${res.imageUrl ? 'md:w-2/3' : ''}`}>
                             <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">{desc}</p>
                          </div>
                       </div>
                    </div>
                 );
              }) : (
                 <div className="text-center py-20 text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                    {t.empty}
                 </div>
              )}
           </div>
        )}
     </div>
  );
}
