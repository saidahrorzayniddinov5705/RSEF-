import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Instagram, Linkedin, Send } from 'lucide-react';

type Social = {
  name: string;
  href: string;
  icon: React.ElementType;
  soon?: boolean;
};

const socials: Social[] = [
  { name: 'Instagram', href: 'https://www.instagram.com/rsefuz/', icon: Instagram },
  { name: 'Telegram', href: 'https://t.me/rsefofficial', icon: Send },
  { name: 'LinkedIn', href: '#', icon: Linkedin, soon: true },
];

export function Footer() {
  const { locale } = useParams();

  const translations = {
    en: {
      cols: [
        { title: "RSEF", links: [
          { name: "About Us", path: "about" },
          { name: "Contact", path: "contact" },
          { name: "Support", path: "contact" },
          { name: "News & Updates", path: "news" },
          { name: "Partners", path: "sponsors" }
        ] },
        { title: "Competition", links: [
          { name: "Guidelines", path: "registration" },
          { name: "Registration", path: "apply" },
          { name: "Judging Criteria", path: "registration" },
          { name: "Results", path: "results" },
          { name: "News", path: "news" }
        ] },
        { title: "Resources", links: [
          { name: "FAQ", path: "registration" },
          { name: "Rules & Regulations", path: "registration" }
        ] }
      ],
      cr: "Copyright © " + new Date().getFullYear() + " RSEF Foundation, Inc. All rights reserved.",
      contact: "Contact us",
      follow: "Follow us",
      soon: "Opening soon",
      tagline: "Empowering young researchers. Building a better future."
    },
    uz: {
      cols: [
        { title: "RSEF", links: [
          { name: "Biz haqimizda", path: "about" },
          { name: "Aloqa", path: "contact" },
          { name: "Qo'llab-quvvatlash", path: "contact" },
          { name: "Yangiliklar", path: "news" },
          { name: "Hamkorlar", path: "sponsors" }
        ] },
        { title: "Musobaqa", links: [
          { name: "Qo'llanma", path: "registration" },
          { name: "Ro'yxatdan o'tish", path: "apply" },
          { name: "Baholash mezonlari", path: "registration" },
          { name: "Natijalar", path: "results" },
          { name: "Yangiliklar", path: "news" }
        ] },
        { title: "Resurslar", links: [
          { name: "FAQ", path: "registration" },
          { name: "Qoidalar va Nizomlar", path: "registration" }
        ] }
      ],
      cr: "Mualliflik huquqi © " + new Date().getFullYear() + " RSEF Foundation, Inc. Barcha huquqlar himoyalangan.",
      contact: "Biz bilan aloqa",
      follow: "Bizni kuzating",
      soon: "Tez orada",
      tagline: "Yosh tadqiqotchilarni qo‘llab-quvvatlaymiz. Yaxshiroq kelajak quramiz."
    },
    ru: {
      cols: [
        { title: "RSEF", links: [
          { name: "О нас", path: "about" },
          { name: "Контакты", path: "contact" },
          { name: "Поддержка", path: "contact" },
          { name: "Новости", path: "news" },
          { name: "Партнеры", path: "sponsors" }
        ] },
        { title: "Соревнование", links: [
          { name: "Руководство", path: "registration" },
          { name: "Регистрация", path: "apply" },
          { name: "Критерии оценки", path: "registration" },
          { name: "Результаты", path: "results" },
          { name: "Новости", path: "news" }
        ] },
        { title: "Ресурсы", links: [
          { name: "ЧАВО", path: "registration" },
          { name: "Правила и положения", path: "registration" }
        ] }
      ],
      cr: "Авторское право © " + new Date().getFullYear() + " RSEF Foundation, Inc. Все права защищены.",
      contact: "Связаться с нами",
      follow: "Мы в соцсетях",
      soon: "Скоро",
      tagline: "Поддерживаем молодых исследователей. Строим лучшее будущее."
    }
  };

  const currentLang = (locale as 'en' | 'uz' | 'ru') || 'en';
  const t = translations[currentLang] || translations.en;

  return (
    <footer className="relative bg-paper-100 border-t border-mist-100 text-slate-700 pt-16 pb-28 lg:pb-8 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-14">
          {/* Brand */}
          <div className="relative">
            <div className="flex items-center gap-2 text-brand-900">
              <img
                src="/logo-navy.svg"
                alt="RSEF Logo"
                className="h-16 md:h-20 w-auto object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const textFallback = target.parentElement?.querySelector('.text-fallback');
                  if (textFallback) textFallback.classList.remove('hidden');
                }}
              />
              <div className="flex flex-col justify-center">
                <span className="text-fallback hidden text-2xl font-black tracking-tighter">RSEF</span>
                <span className="text-sm md:text-base font-black italic tracking-tighter uppercase leading-tight">Think</span>
                <span className="text-sm md:text-base font-black italic tracking-tighter uppercase leading-tight">Beyond Limits</span>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-500 max-w-xs">{t.tagline}</p>
            <div className="pointer-events-none absolute -right-4 top-0 h-24 w-24 rounded-full bg-brand-400/10 blur-2xl" />
          </div>

          {/* Link columns */}
          {t.cols.map((col, idx) => (
            <div key={idx}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-900">
                {col.title}
              </h3>
              <nav className="space-y-2.5 text-sm">
                {col.links.map((link, lIdx) => (
                  <Link
                    key={lIdx}
                    to={`/${currentLang}/${link.path}`}
                    className="block font-medium text-slate-600 transition-colors hover:text-brand-500"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div className="border-t border-mist-100 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-900">
              {t.follow}
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {socials.map(({ name, href, icon: Icon, soon }) =>
                soon ? (
                  <span
                    key={name}
                    title={`${name} — ${t.soon}`}
                    aria-label={`${name} — ${t.soon}`}
                    className="inline-flex items-center gap-2 rounded-full border border-mist-100 bg-paper-200 px-4 py-2.5 text-sm font-semibold text-slate-400 cursor-default"
                  >
                    <Icon className="h-4 w-4" />
                    {name}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-mist-400">
                      {t.soon}
                    </span>
                  </span>
                ) : (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-mist-100 bg-white px-4 py-2.5 text-sm font-semibold text-brand-900 transition-all hover:border-brand-400 hover:text-brand-500 hover:-translate-y-0.5"
                  >
                    <Icon className="h-4 w-4" />
                    {name}
                  </a>
                ),
              )}
            </div>
          </div>

          <Link
            to={`/${currentLang}/contact`}
            className="self-start md:self-auto inline-flex items-center rounded-xl bg-brand-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-500"
          >
            {t.contact}
          </Link>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-mist-100 pt-6 text-xs text-slate-500">
          <p className="font-medium">{t.cr}</p>
          <p className="font-medium">rsef.uz</p>
        </div>
      </div>
    </footer>
  );
}
