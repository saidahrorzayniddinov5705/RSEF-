import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, LogIn, LogOut, X, Search, Home, BookOpen, Newspaper, Trophy, FileText, LayoutDashboard, Shield, User as UserIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from './AuthProvider';

export function Navbar() {
  const { i18n } = useTranslation();
  const locale = useParams().locale || i18n.language || 'en';
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout, loading } = useAuth();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
       setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = location.pathname;
    const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
    navigate(newPath);
    setLangMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      setMobileMenuOpen(false);
      navigate(`/${locale}/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navTranslations = {
    en: {
      home: 'Home',
      registration: 'Guidelines',
      news: 'News',
      results: 'Results',
      sponsors: 'Sponsors',
      myApp: 'My Application',
      profile: 'Profile',
      admin: 'Admin',
      signOut: 'Sign Out',
      signIn: 'Sign In'
    },
    uz: {
      home: 'Bosh sahifa',
      registration: "Qo'llanma",
      news: 'Yangiliklar',
      results: 'Natijalar',
      sponsors: 'Homiylar',
      myApp: 'Mening arizam',
      profile: 'Profil',
      admin: 'Admin',
      signOut: 'Chiqish',
      signIn: 'Kirish'
    },
    ru: {
      home: 'Главная',
      registration: 'Руководство',
      news: 'Новости',
      results: 'Результаты',
      sponsors: 'Спонсоры',
      myApp: 'Моя заявка',
      profile: 'Профиль',
      admin: 'Админ',
      signOut: 'Выйти',
      signIn: 'Войти'
    }
  };

  const t = navTranslations[locale as keyof typeof navTranslations] || navTranslations.en;

  const navLinks = [
    { name: t.home, path: `/${locale}`, icon: LayoutDashboard },
    { name: t.registration, path: `/${locale}/registration`, icon: BookOpen },
    { name: t.news, path: `/${locale}/news`, icon: Newspaper },
    { name: t.results, path: `/${locale}/results`, icon: Trophy },
    { name: t.sponsors, path: `/${locale}/sponsors`, icon: Shield }
  ];

  if (user) {
    navLinks.push({ name: t.myApp, path: `/${locale}/apply`, icon: FileText });
    navLinks.push({ name: t.profile, path: `/${locale}/profile`, icon: UserIcon });
  }

  if (isAdmin) {
    navLinks.push({ name: t.admin, path: `/${locale}/admin`, icon: Shield });
  }

  const languages = [
    { code: 'uz', label: 'UZ', flagUrl: 'https://flagcdn.com/w40/uz.png', fullLabel: 'Uzbek' },
    { code: 'ru', label: 'RU', flagUrl: 'https://flagcdn.com/w40/ru.png', fullLabel: 'Russian' },
    { code: 'en', label: 'EN', flagUrl: 'https://flagcdn.com/w40/gb.png', fullLabel: 'English' }
  ];
  const activeLang = languages.find(l => l.code === locale) || languages[2];

  return (
    <>
      <header className={cn(
         "w-full fixed top-0 left-0 z-50 transition-all duration-300",
         scrolled || location.pathname !== `/${locale}`
           ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 py-3" 
           : "bg-transparent py-5"
      )}>
      <div className="max-w-none w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
        
        <div className="flex items-center gap-3 z-50">
           {/* Hamburger Menu Icon (Mobile Only) */}
           <button 
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                 "lg:hidden flex items-center justify-center p-1 -ml-1 rounded-md transition-colors",
                 scrolled || location.pathname !== `/${locale}` ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
              )}
           >
              <Menu className="w-7 h-7" strokeWidth={2.5} />
           </button>

           {/* Logo */}
           <Link to={`/${locale}`} className="flex items-center gap-2">
              <img 
                 src={scrolled || location.pathname !== `/${locale}` ? "/logo-navy.svg" : "/logo.png"} 
                 alt="RSEF" 
                 className="h-14 md:h-16 w-auto transition-all duration-300 object-contain"
                 onError={(e) => {
                   const target = e.currentTarget;
                   target.style.display = 'none';
                   const textFallback = target.parentElement?.querySelector('.text-fallback');
                   if (textFallback) textFallback.classList.remove('hidden');
                 }}
              />
              <div className={cn(
                 "flex flex-col justify-center transition-colors",
                 scrolled || location.pathname !== `/${locale}` ? "text-slate-900" : "text-white"
              )}>
                 <span className="text-fallback hidden text-2xl font-black tracking-tighter">RSEF</span>
                 <span className="text-sm md:text-base font-black italic tracking-tighter uppercase leading-tight">Think</span>
                 <span className="text-sm md:text-base font-black italic tracking-tighter uppercase leading-tight">Beyond Limits</span>
              </div>
           </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
           {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                 <Link 
                   key={link.name}
                   to={link.path}
                   className={cn(
                     "text-base font-bold transition-colors uppercase tracking-wide",
                     scrolled || location.pathname !== `/${locale}` 
                       ? (active ? "text-emerald-600" : "text-slate-600 hover:text-slate-900")
                       : (active ? "text-[#4FD1FF]" : "text-slate-200 hover:text-white")
                   )}
                 >
                   {link.name}
                 </Link>
              );
           })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Search Bar */}
          <div className="relative">
             {searchOpen ? (
                <form onSubmit={handleSearch} className="animate-in fade-in slide-in-from-right-4 flex items-center">
                   <div className={cn(
                     "flex items-center rounded-full px-3 py-1.5 border transition-colors",
                     scrolled || location.pathname !== `/${locale}`
                        ? "bg-slate-100 border-slate-200"
                        : "bg-white/20 border-white/30 backdrop-blur-md"
                   )}>
                     <Search className={cn("w-4 h-4 mr-2", scrolled || location.pathname !== `/${locale}` ? "text-slate-400" : "text-white/70")} />
                     <input 
                       autoFocus
                       type="text" 
                       placeholder="Search..." 
                       value={searchQuery}
                       onChange={e => setSearchQuery(e.target.value)}
                       onBlur={() => !searchQuery && setSearchOpen(false)}
                       className={cn(
                          "bg-transparent text-sm font-medium w-40 focus:outline-none placeholder:text-opacity-50",
                          scrolled || location.pathname !== `/${locale}` ? "text-slate-900 placeholder-slate-400" : "text-white placeholder-white"
                       )}
                     />
                   </div>
                </form>
             ) : (
                <button 
                  onClick={() => setSearchOpen(true)}
                  className={cn(
                     "w-9 h-9 flex items-center justify-center rounded-full transition-colors",
                     scrolled || location.pathname !== `/${locale}`
                       ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                       : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                  )}
                >
                   <Search className="w-4 h-4" />
                </button>
             )}
          </div>

          {/* Language Selector */}
          <div className="relative" ref={langMenuRef}>
             <button 
               onClick={() => setLangMenuOpen(!langMenuOpen)}
               className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-1.5 border transition-colors font-bold text-sm",
                  scrolled || location.pathname !== `/${locale}`
                    ? "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
               )}
             >
                <img src={activeLang.flagUrl} alt={activeLang.code} className="w-5 h-auto rounded-[2px] shadow-sm" />
                <span className="uppercase">{activeLang.code}</span>
             </button>
             {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-slate-100 py-1 flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                   {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={cn(
                           "flex items-center justify-between px-4 py-2.5 text-sm font-bold transition-colors w-full text-left",
                           lang.code === locale ? "bg-slate-50 text-emerald-600" : "text-slate-700 hover:bg-slate-50"
                        )}
                      >
                         <div className="flex items-center gap-3">
                           <img src={lang.flagUrl} alt={lang.code} className="w-5 h-auto rounded-[2px] shadow-sm" />
                           <span className="uppercase">{lang.code}</span>
                         </div>
                      </button>
                   ))}
                </div>
             )}
          </div>

          {!loading && (
            user ? (
               <button 
                  onClick={logout} 
                  className={cn(
                     "flex items-center gap-2 text-sm font-bold transition-colors px-4 py-2 rounded-lg border",
                     scrolled || location.pathname !== `/${locale}`
                       ? "border-rose-200 text-rose-600 hover:bg-rose-50"
                       : "border-white/20 text-white hover:bg-white/10"
                  )}
               >
                 <LogOut className="w-4 h-4" />
                 {t.signOut}
               </button>
            ) : (
               <Link 
                  to={`/${locale}/login`} 
                  className={cn(
                     "flex items-center gap-2 text-sm font-bold transition-all px-5 py-2 rounded-lg shadow-sm hover:-translate-y-0.5",
                     scrolled || location.pathname !== `/${locale}`
                       ? "bg-slate-900 text-white hover:bg-slate-800"
                       : "bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/20"
                  )}
               >
                 <LogIn className="w-4 h-4 transform rotate-180" />
                 {t.signIn}
               </Link>
            )
          )}
        </div>

        {/* Mobile Nav is handled by bottom bar */}
      </div>
    </header>

    {/* Mobile Sidebar Menu */}
    {mobileMenuOpen && (
       <div className="lg:hidden fixed inset-0 z-[110] flex" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"></div>
          
          <div 
             className="relative w-[320px] max-w-[85vw] h-full bg-[#033E6A] flex flex-col animate-in slide-in-from-left duration-300"
             onClick={e => e.stopPropagation()}
          >
             <div className="flex justify-end p-4 border-b border-white/10">
               <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white/80 hover:text-white transition-colors">
                 <X className="w-8 h-8" strokeWidth={2} />
               </button>
             </div>
             
             <div className="flex-1 overflow-y-auto w-full">
               <nav className="flex flex-col w-full text-white">
                  {navLinks.map((link) => {
                     const active = location.pathname === link.path;
                     return (
                        <Link 
                           key={'menu-'+link.path}
                           to={link.path}
                           onClick={() => setMobileMenuOpen(false)}
                           className={cn(
                              "flex items-center justify-between w-full p-5 border-b border-white/10 transition-colors uppercase font-bold text-sm tracking-wide",
                              active ? "bg-white/10 text-emerald-400" : "hover:bg-white/5",
                           )}
                        >
                           <span>{link.name}</span>
                        </Link>
                     );
                  })}

                  <form onSubmit={handleSearch} className="p-5 border-b border-white/10 flex items-center group focus-within:bg-white/5 transition-colors">
                     <span>SEARCH</span>
                     <Search className="w-5 h-5 ml-2 text-white opacity-80" />
                     <button type="submit" className="hidden"></button>
                  </form>
               </nav>

               <div className="p-5">
                  <div className="flex gap-4">
                     {languages.map(lang => (
                        <button
                           key={lang.code}
                           onClick={() => handleLanguageChange(lang.code)}
                           className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-sm transition-colors",
                              lang.code === locale ? "bg-white/20 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
                           )}
                        >
                           <img src={lang.flagUrl} alt={lang.code} className="w-5 h-auto rounded-[2px]" />
                           <span className="uppercase">{lang.code}</span>
                        </button>
                     ))}
                  </div>

                  <div className="mt-8">
                     {!loading && (
                     user ? (
                        <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="flex items-center gap-2 font-bold text-rose-300 hover:text-rose-200 transition-colors py-2 uppercase text-sm">
                           <LogOut className="w-5 h-5" />
                           {t.signOut}
                        </button>
                     ) : (
                        <Link to={`/${locale}/login`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 font-bold text-emerald-400 hover:text-emerald-300 transition-colors py-2 uppercase text-sm">
                           <LogIn className="w-5 h-5" />
                           {t.signIn}
                        </Link>
                     )
                     )}
                  </div>
               </div>
             </div>
          </div>
       </div>
    )}
  </>
  );
}

