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
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {newsList.length > 0 ? newsList.map((news) => {
                 const title = (news.title && typeof news.title === 'object') ? (news.title[locale || 'en'] || news.title['en']) : (typeof news.title === 'string' ? news.title : 'No title');
                 const desc = (news.description && typeof news.description === 'object') ? (news.description[locale || 'en'] || news.description['en']) : (typeof news.description === 'string' ? news.description : '');
                 return (
                    <div key={news.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group">
                       <div className="w-full aspect-video bg-slate-100 flex-shrink-0">
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
                              <img 
                                src={news.imageUrl || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop'} 
                                alt={title} 
                                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" 
                              />
                           )}
                        </div>
                       <div className="w-full p-6 md:p-8 flex flex-col justify-center flex-1">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3 block">
                             <Calendar className="w-4 h-4 inline-block mb-1" />
                             {new Date(news.createdAt).toLocaleDateString()}
                          </span>
                          <h2 className="text-2xl font-bold text-slate-900 mb-3">{title}</h2>
                          <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-base">{desc}</p>
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
