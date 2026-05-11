import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import { homePageData } from '../data/pages';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { locale = 'en' } = useParams();
  
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const found: any[] = [];

    // Simple search in homePageData (which acts as our database here)
    homePageData.forEach((section: any) => {
      const data = section.data?.[locale] || section.data;
      if (Array.isArray(data)) {
        data.forEach((item: any) => {
          const t = item.title?.toLowerCase() || '';
          const d = item.description?.toLowerCase() || '';
          if (t.includes(q) || d.includes(q)) {
            found.push({
              title: item.title,
              description: item.description,
              link: item.link || `/${locale}`,
              img: item.img
            });
          }
        });
      } else if (data) {
        const t = data.title?.toLowerCase() || '';
        const d = data.description?.toLowerCase() || '';
        if (t.includes(q) || d.includes(q)) {
          found.push({
            title: data.title,
            description: data.description,
            link: data.link || `/${locale}`,
            img: data.img
          });
        }
      }
    });

    setResults(found);
  }, [query, locale]);

  return (
    <div className="w-full min-h-[60vh] bg-slate-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
          <SearchIcon className="w-8 h-8 text-teal-500" />
          {locale === 'uz' ? 'Qidiruv Natijalari' : locale === 'ru' ? 'Результаты поиска' : 'Search Results'}
        </h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <p className="text-slate-600 mb-4">
            {locale === 'uz' ? `"${query}" uchun qidiruv natijalari:` : locale === 'ru' ? `Результаты поиска по запросу "${query}":` : `Showing results for "${query}":`}
          </p>

          {results.length > 0 ? (
            <div className="flex flex-col gap-6 mt-6">
              {results.map((result, idx) => (
                <Link to={result.link} key={idx} className="group flex flex-col sm:flex-row gap-4 border border-slate-100 hover:border-teal-200 rounded-xl p-4 transition-all hover:shadow-md bg-slate-50 hover:bg-white">
                  {result.img && (
                    <img src={result.img} alt={result.title} className="w-full sm:w-32 h-24 object-cover rounded-lg" />
                  )}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-600 transition-colors mb-2">
                      {result.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2">
                      {result.description}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center text-teal-500">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">
                {locale === 'uz' ? "Hech narsa topilmadi" : locale === 'ru' ? "Ничего не найдено" : "No results found"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
