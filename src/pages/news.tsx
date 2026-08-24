import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { featuredArticles, tr, type Locale } from '../data/rsef2026';

/* ------------------------------------------------------------------ *
 * Article body — the launch story, kept beside its images.
 * ------------------------------------------------------------------ */

const articleBody: Record<string, Record<Locale, {
  intro: string;
  nationalTitle: string;
  internationalTitle: string;
  internationalAward: string;
  internationalProject: string;
  closing: string[];
}>> = {
  'rsef-2026-launch': {
    en: {
      intro:
        'This week, RSEF.uz launched the first-ever Research, Science, and Engineering Fair in Central Asia, bringing together young researchers from different countries to present their work, exchange ideas, and learn from experts.',
      nationalTitle: 'National Winners',
      internationalTitle: 'International Category',
      internationalAward: 'Best International Research',
      internationalProject:
        'Onset of Collective Behavior: Probing the QGP Boundary Across Collision Systems',
      closing: [
        "Congratulations to every finalist. Presenting your research, answering judges' questions, and sharing your ideas takes courage and dedication. Every project contributed to making this fair meaningful.",
        'A sincere thank you to our partners, judges, volunteers, guests, and everyone who supported RSEF. Your time, trust, and commitment made this event possible.',
        'This was only the beginning. We look forward to welcoming even more young researchers in the years ahead.',
      ],
    },
    uz: {
      intro:
        'Shu hafta RSEF.uz Markaziy Osiyodagi birinchi Research, Science and Engineering Fair tanlovini o‘tkazdi. Turli davlatlardan kelgan yosh tadqiqotchilar o‘z ishlarini taqdim etdi, g‘oyalar almashdi va mutaxassislardan o‘rgandi.',
      nationalTitle: 'Milliy g‘oliblar',
      internationalTitle: 'Xalqaro yo‘nalish',
      internationalAward: 'Eng yaxshi xalqaro tadqiqot',
      internationalProject:
        'Onset of Collective Behavior: Probing the QGP Boundary Across Collision Systems',
      closing: [
        'Barcha finalchilarni tabriklaymiz. Tadqiqotni taqdim etish, hakamlar savollariga javob berish va g‘oyalarni bo‘lishish jasorat va mehnat talab qiladi. Har bir loyiha bu yarmarkani mazmunli qildi.',
        'Hamkorlarimiz, hakamlar, ko‘ngillilar, mehmonlar va RSEF ni qo‘llab-quvvatlagan har bir kishiga chin dildan rahmat. Sizning vaqtingiz va ishonchingiz bu tadbirni mumkin qildi.',
        'Bu faqat boshlanishi edi. Kelgusi yillarda yanada ko‘proq yosh tadqiqotchilarni kutib olishni intiqlik bilan kutamiz.',
      ],
    },
    ru: {
      intro:
        'На этой неделе RSEF.uz провёл первую в Центральной Азии Research, Science and Engineering Fair, собрав молодых исследователей из разных стран, чтобы представить свои работы, обменяться идеями и поучиться у экспертов.',
      nationalTitle: 'Национальные победители',
      internationalTitle: 'Международная категория',
      internationalAward: 'Лучшее международное исследование',
      internationalProject:
        'Onset of Collective Behavior: Probing the QGP Boundary Across Collision Systems',
      closing: [
        'Поздравляем каждого финалиста. Представить исследование, ответить на вопросы судей и поделиться идеями — это требует смелости и упорства. Каждый проект сделал эту ярмарку значимой.',
        'Искренняя благодарность нашим партнёрам, судьям, волонтёрам, гостям и всем, кто поддержал RSEF. Ваше время, доверие и участие сделали это событие возможным.',
        'Это было только начало. Мы с нетерпением ждём ещё больше молодых исследователей в ближайшие годы.',
      ],
    },
  },
};

const nationalWinners = [
  { medal: '🥇', place: '1st Place', project: 'Aral Shield' },
  {
    medal: '🥈',
    place: '2nd Place',
    project:
      'Engineering a CubeSat Platform for Biological Research Under Authentic Stratospheric Conditions',
  },
  { medal: '🥉', place: '3rd Place', project: 'Histology AI' },
];

/* ------------------------------------------------------------------ *
 * News index
 * ------------------------------------------------------------------ */

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
     en: { title: "News & Updates", load: "Loading...", empty: "No news published yet.", read: "Read article" },
     uz: { title: "Yangiliklar va Yangilanishlar", load: "Yuklanmoqda...", empty: "Hali yangiliklar chop etilmagan.", read: "Maqolani o‘qish" },
     ru: { title: "Новости и обновления", load: "Загрузка...", empty: "Новости пока не опубликованы.", read: "Читать статью" }
  };
  const t = dictionary[(locale as keyof typeof dictionary) || 'en'] || dictionary.en;

  return (
     <div className="bg-paper-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-heading font-bold text-brand-900 mb-2">{t.title}</h1>
        <div className="w-20 h-1.5 bg-brand-500 rounded-full mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Featured articles authored in the repo */}
           {featuredArticles.map((article) => (
              <Link
                 key={article.id}
                 to={`/${locale || 'en'}/news/${article.slug}`}
                 className="bg-white rounded-2xl shadow-sm border border-mist-100 overflow-hidden flex flex-col group hover:shadow-md hover:border-mist-300 transition-all"
              >
                 <div className="w-full aspect-video bg-paper-200 flex-shrink-0 overflow-hidden">
                    <img
                       src={article.coverImage}
                       alt={tr(article.title, locale)}
                       className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                 </div>
                 <div className="w-full p-6 md:p-8 flex flex-col flex-1">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-3">
                       <Calendar className="w-4 h-4" />
                       {new Date(article.date).toLocaleDateString()}
                    </span>
                    <h2 className="text-2xl font-heading font-bold text-brand-900 mb-3">
                       {tr(article.title, locale)}
                    </h2>
                    <p className="text-slate-600 leading-relaxed flex-1">{tr(article.excerpt, locale)}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-brand-600 font-semibold group-hover:text-brand-500 transition-colors">
                       {t.read} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                 </div>
              </Link>
           ))}

           {/* Anything published from the admin panel */}
           {loading ? (
              <div className="md:col-span-2 flex justify-center py-20 text-slate-500">{t.load}</div>
           ) : newsList.length > 0 ? newsList.map((news) => {
              const title = (news.title && typeof news.title === 'object') ? (news.title[locale || 'en'] || news.title['en']) : (typeof news.title === 'string' ? news.title : 'No title');
              const desc = (news.description && typeof news.description === 'object') ? (news.description[locale || 'en'] || news.description['en']) : (typeof news.description === 'string' ? news.description : '');
              return (
                 <div key={news.id} className="bg-white rounded-2xl shadow-sm border border-mist-100 overflow-hidden flex flex-col group">
                    <div className="w-full aspect-video bg-paper-200 flex-shrink-0">
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
                             src={news.imageUrl || '/news-launch-group.jpg'}
                             alt={title}
                             className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                           />
                        )}
                     </div>
                    <div className="w-full p-6 md:p-8 flex flex-col justify-center flex-1">
                       <span className="flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-3">
                          <Calendar className="w-4 h-4" />
                          {new Date(news.createdAt).toLocaleDateString()}
                       </span>
                       <h2 className="text-2xl font-heading font-bold text-brand-900 mb-3">{title}</h2>
                       <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-base">{desc}</p>
                    </div>
                 </div>
              );
           }) : featuredArticles.length === 0 ? (
              <div className="md:col-span-2 text-center py-20 text-slate-500 border-2 border-dashed border-mist-100 rounded-xl">
                 {t.empty}
              </div>
           ) : null}
        </div>
      </div>
     </div>
  );
}

/* ------------------------------------------------------------------ *
 * Article detail
 * ------------------------------------------------------------------ */

export function NewsArticlePage() {
  const { locale, slug } = useParams();
  const lang = (locale as Locale) || 'en';
  const article = featuredArticles.find((a) => a.slug === slug);

  const back = { en: 'Back to news', uz: 'Yangiliklarga qaytish', ru: 'Назад к новостям' }[lang] ?? 'Back to news';

  useEffect(() => {
     window.scrollTo({ top: 0 });
  }, [slug]);

  if (!article) {
     return (
        <div className="bg-paper-50 min-h-screen">
           <div className="max-w-3xl mx-auto px-4 py-24 text-center">
              <p className="text-slate-500 mb-6">Article not found.</p>
              <Link to={`/${lang}/news`} className="text-brand-600 font-semibold hover:text-brand-500">
                 {back}
              </Link>
           </div>
        </div>
     );
  }

  const body = articleBody[article.slug]?.[lang] ?? articleBody[article.slug]?.en;
  const [cover, ...gallery] = article.images;

  return (
     <div className="bg-paper-50 min-h-screen">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
           <Link
              to={`/${lang}/news`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-500 mb-8"
           >
              <ArrowLeft className="w-4 h-4" /> {back}
           </Link>

           <span className="flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-4">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString()}
           </span>

           <h1 className="text-3xl md:text-5xl font-heading font-bold text-brand-900 leading-tight mb-6">
              🌟 {tr(article.title, locale)}
           </h1>

           <figure className="mb-10">
              <img
                 src={cover.src}
                 alt={cover.alt}
                 className="w-full rounded-2xl border border-mist-100 shadow-[0_8px_30px_rgb(4,17,98,0.08)]"
              />
              <figcaption className="mt-3 text-sm text-slate-500">{tr(cover.caption, locale)}</figcaption>
           </figure>

           {body && (
              <>
                 <p className="text-lg text-slate-700 leading-relaxed mb-10">{body.intro}</p>

                 {/* National winners */}
                 <h2 className="text-2xl font-heading font-bold text-brand-900 mb-5">
                    🏆 {body.nationalTitle}
                 </h2>
                 <ol className="space-y-3 mb-10">
                    {nationalWinners.map((w) => (
                       <li
                          key={w.place}
                          className="flex items-start gap-4 rounded-xl bg-white border border-mist-100 px-5 py-4"
                       >
                          <span className="text-2xl leading-none" aria-hidden="true">{w.medal}</span>
                          <span>
                             <span className="block text-xs font-bold uppercase tracking-widest text-slate-400">
                                {w.place}
                             </span>
                             <span className="block font-semibold text-brand-900 leading-snug">
                                {w.project}
                             </span>
                          </span>
                       </li>
                    ))}
                 </ol>

                 {gallery[0] && (
                    <figure className="mb-10">
                       <img
                          src={gallery[0].src}
                          alt={gallery[0].alt}
                          className="w-full rounded-2xl border border-mist-100"
                       />
                       <figcaption className="mt-3 text-sm text-slate-500">
                          {tr(gallery[0].caption, locale)}
                       </figcaption>
                    </figure>
                 )}

                 {/* International category */}
                 <h2 className="text-2xl font-heading font-bold text-brand-900 mb-5">
                    🌍 {body.internationalTitle}
                 </h2>
                 <div className="rounded-xl bg-brand-900 text-white px-6 py-5 mb-10">
                    <span className="block text-xs font-bold uppercase tracking-widest text-mist-200 mb-1">
                       🏅 {body.internationalAward}
                    </span>
                    <span className="block font-semibold leading-snug">{body.internationalProject}</span>
                 </div>

                 {gallery[1] && (
                    <figure className="mb-10">
                       <img
                          src={gallery[1].src}
                          alt={gallery[1].alt}
                          className="w-full rounded-2xl border border-mist-100"
                       />
                       <figcaption className="mt-3 text-sm text-slate-500">
                          {tr(gallery[1].caption, locale)}
                       </figcaption>
                    </figure>
                 )}

                 <div className="space-y-5 text-lg text-slate-700 leading-relaxed mb-10">
                    {body.closing.map((paragraph, i) => (
                       <p key={i}>{paragraph}</p>
                    ))}
                 </div>

                 {gallery[2] && (
                    <figure className="mb-10">
                       <img
                          src={gallery[2].src}
                          alt={gallery[2].alt}
                          className="w-full rounded-2xl border border-mist-100"
                       />
                       <figcaption className="mt-3 text-sm text-slate-500">
                          {tr(gallery[2].caption, locale)}
                       </figcaption>
                    </figure>
                 )}
              </>
           )}

           <div className="flex flex-wrap gap-2 border-t border-mist-100 pt-6">
              {article.tags.map((tag) => (
                 <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-mist-100 text-brand-600 text-xs font-bold"
                 >
                    {tag}
                 </span>
              ))}
           </div>
        </article>
     </div>
  );
}
