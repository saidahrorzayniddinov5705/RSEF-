import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Calendar } from 'lucide-react';

export function NewsPage() {
  const { locale } = useParams();
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const fetchNews = async () => {
        try {
           const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
           const snap = await getDocs(q);
           const results: any[] = [];
           snap.forEach(d => results.push({ id: d.id, ...d.data() }));
           setNewsList(results);
        } catch (e) {
           console.error(e);
        } finally {
           setLoading(false);
        }
     };
     fetchNews();
  }, []);

  const dictionary = {
     en: { title: "News & Updates", load: "Loading...", empty: "No news published yet." },
     uz: { title: "Yangiliklar va Yangilanishlar", load: "Yuklanmoqda...", empty: "Hali yangiliklar chop etilmagan." },
     ru: { title: "Новости и обновления", load: "Загрузка...", empty: "Новости пока не опубликованы." }
  };
  const t = dictionary[(locale as keyof typeof dictionary) || 'en'] || dictionary.en;

  return (
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">{t.title}</h1>
        <div className="w-20 h-1.5 bg-emerald-500 rounded-full mb-12"></div>

        {loading ? (
           <div className="flex justify-center py-20 text-slate-500">{t.load}</div>
        ) : (
           <div className="space-y-10">
              {newsList.length > 0 ? newsList.map((news) => {
                 const title = news.title[locale || 'en'] || news.title['en'];
                 const desc = news.description[locale || 'en'] || news.description['en'];
                 return (
                    <div key={news.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row group">
                       <div className="w-full md:w-1/3 h-64 md:h-auto overflow-hidden">
                          <img 
                            src={news.imageUrl || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop'} 
                            alt={title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                       </div>
                       <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3">
                             <Calendar className="w-4 h-4" />
                             {new Date(news.createdAt).toLocaleDateString()}
                          </span>
                          <h2 className="text-2xl font-bold text-slate-900 mb-4">{title}</h2>
                          <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{desc}</p>
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
