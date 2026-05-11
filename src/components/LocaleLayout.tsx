import { useEffect } from 'react';
import { Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { cn } from '../lib/utils';

const SUPPORTED_LOCALES = ['en', 'uz', 'ru'];

export function LocaleLayout() {
  const { locale } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!locale || !SUPPORTED_LOCALES.includes(locale)) {
      // Redirect to default locale if missing or unsupported
      navigate(`/en${location.pathname.replace(`/${locale}`, '')}`, { replace: true });
    } else if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n, navigate, location]);

  // Wait until i18n language matches the route
  if (locale && i18n.language !== locale) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      <Navbar />
      <main className={cn(
         "flex-1 w-full",
         (location.pathname === `/${locale}` || location.pathname.endsWith('/apply'))
           ? "" 
           : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-28 lg:pb-8"
      )}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
