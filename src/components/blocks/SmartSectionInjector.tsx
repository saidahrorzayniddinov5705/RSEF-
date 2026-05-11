import React from 'react';
import { useParams } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { ArrowRight } from 'lucide-react';

export interface LocalizedContent {
  title?: string;
  subtitle?: string;
  description?: string;
  img?: string;
  actionText?: string;
  stats?: { value: string; label: string }[];
  tag?: string;
  link?: string;
  author?: string;
  location?: string;
}

export interface SectionData {
  section: string;
  layout: 'hero' | 'grid-3-cols' | 'image-left' | 'image-right' | 'cards-list' | 'igem-hero' | 'igem-registration' | 'igem-section-title' | 'igem-winners' | 'igem-banner' | 'igem-news-grid' | 'igem-resource-grid' | 'igem-sponsors';
  data: Record<string, LocalizedContent | LocalizedContent[]>;
}

interface SmartSectionInjectorProps {
  config: SectionData;
}

export function SmartSectionInjector({ config }: SmartSectionInjectorProps) {
  const { locale } = useParams();
  const currentLocale = locale || 'en';

  // Extract the specific locale data. If the user sent an array (e.g. 3 cards), handle that.
  const localeData = config.data[currentLocale] || config.data['en'];
  
  if (!localeData) return null;

  // Let's create an injector map that delegates to specific UI layout components
  switch (config.layout) {
    case 'hero':
      return <HeroLayout content={localeData as LocalizedContent} />;
    case 'grid-3-cols':
      return <Grid3ColsLayout content={localeData as LocalizedContent[]} />;
    case 'image-left':
      return <ImageLeftLayout content={localeData as LocalizedContent} />;
    case 'igem-hero':
      return <IGemHeroLayout content={localeData as LocalizedContent} />;
    case 'igem-registration':
      return <IGemRegistrationLayout content={localeData as LocalizedContent} />;
    case 'igem-section-title':
      return <IGemSectionTitle content={localeData as LocalizedContent} />;
    case 'igem-winners':
      return <IGemWinnersLayout content={localeData as LocalizedContent[]} />;
    case 'igem-banner':
      return <IGemBannerLayout content={localeData as LocalizedContent} />;
    case 'igem-news-grid':
      return <IGemNewsGridLayout content={localeData as LocalizedContent[]} />;
    case 'igem-resource-grid':
      return <IGemResourceGridLayout content={localeData as LocalizedContent[]} />;
    case 'igem-sponsors':
      return <IGemSponsorsLayout />;
    default:
      return (
        <div className="p-8 border border-dashed border-rose-300 bg-rose-50 rounded-xl my-4">
          <p className="text-rose-600 font-mono text-sm max-w-full overflow-x-auto">
            Unknown layout type: {config.layout}
          </p>
        </div>
      );
  }
}

// --- Specific Reusable Layout Blocks ---

function HeroLayout({ content }: { content: LocalizedContent }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 w-full mb-12">
      {content.img && (
        <img 
          src={content.img} 
          alt={content.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
      )}
      <div className="relative z-10 p-12 md:p-24 flex flex-col items-center text-center justify-center min-h-[400px]">
        {content.title && (
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            {content.title}
          </h1>
        )}
        {content.description && (
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8">
            {content.description}
          </p>
        )}
        {content.actionText && (
          <button className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3 rounded-full font-medium transition-transform transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2">
            {content.actionText}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

function Grid3ColsLayout({ content }: { content: LocalizedContent[] }) {
  // If content is an object but we expect array mapping, fallback gracefully
  const items = Array.isArray(content) ? content : [content];
  
  return (
    <div className="w-full mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
            {item.img && (
              <div className="h-48 overflow-hidden bg-slate-100">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6">
              {item.title && <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>}
              {item.description && <p className="text-slate-600 leading-relaxed">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImageLeftLayout({ content }: { content: LocalizedContent }) {
  return (
    <div className="w-full mb-12 flex flex-col md:flex-row gap-12 items-center">
      {content.img && (
        <div className="w-full md:w-1/2 aspect-video rounded-3xl overflow-hidden bg-slate-100 shadow-lg">
          <img src={content.img} alt={content.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="w-full md:w-1/2 space-y-6">
        {content.subtitle && (
          <span className="text-teal-600 font-semibold tracking-wider uppercase text-sm">{content.subtitle}</span>
        )}
        {content.title && (
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{content.title}</h2>
        )}
        {content.description && (
          <p className="text-lg text-slate-600 leading-relaxed">{content.description}</p>
        )}
      </div>
    </div>
  );
}

// --- iGEM Specific Layout Blocks ---

function IGemHeroLayout({ content }: { content: LocalizedContent }) {
  return (
    <div className="relative w-[100vw] ml-[calc(-50vw+50%)] bg-[#0B1121] overflow-hidden -mt-8 pt-8 mb-12">
      {/* Background Image with Gradient Overlay */}
      {content.img && (
        <>
          <div className="absolute inset-0 w-full h-full opacity-60">
            <img src={content.img} alt="Background" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-[#0B1121]/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
        </>
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-start min-h-[600px] justify-center">
        <div className="flex flex-col gap-6 mb-12 mt-12 w-full md:w-3/4">
          <div className="flex items-center gap-4">
             <div className="text-white flex items-center gap-3">
               <img src="/logo.png" alt="RSEF Logo" className="h-20 md:h-28 w-auto object-contain drop-shadow-md" onError={(e) => {
                 e.currentTarget.style.display = 'none';
                 const textFallback = e.currentTarget.parentElement?.querySelector('.text-fallback');
                 if (textFallback) textFallback.classList.remove('hidden');
               }} />
               <div className="flex flex-col justify-center text-white drop-shadow-md">
                 <span className="text-fallback hidden text-4xl md:text-5xl font-black tracking-tighter">RSEF</span>
                 <span className="text-xl md:text-2xl font-black italic tracking-tighter uppercase leading-tight">Think</span>
                 <span className="text-xl md:text-2xl font-black italic tracking-tighter uppercase leading-tight">Beyond Limits</span>
               </div>
             </div>
             <div className="w-[1px] h-16 bg-white/30 transform skew-x-12 mx-2"></div>
             <h1 className="text-white text-3xl md:text-5xl font-bold italic tracking-tight">{content.title}</h1>
          </div>
          
          <p className="text-white text-lg md:text-xl max-w-3xl leading-relaxed mt-4 font-medium">
            {content.description}
          </p>
        </div>

        {content.stats && (
          <div className="flex flex-wrap gap-12 gap-y-8 mb-12">
            {content.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">{stat.value}</span>
                <span className="text-slate-300 text-sm md:text-base font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {content.actionText && (
          <button className="text-[#10b981] hover:text-[#059669] font-medium text-lg flex items-center gap-2 transition-colors">
            {content.actionText}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

function IGemRegistrationLayout({ content }: { content: LocalizedContent }) {
  return (
    <div className="w-full mb-16 rounded-xl overflow-hidden relative bg-[#1e40af] flex md:flex-row flex-col shadow-lg">
      <div className="p-10 md:p-14 flex-1 flex flex-col justify-center z-10 relative">
        <h2 className="text-3xl md:text-4xl text-white font-bold tracking-tight mb-3 leading-tight">{content.title}</h2>
        {content.subtitle && <p className="text-blue-200 font-medium mb-8 text-sm">{content.subtitle}</p>}
        {content.actionText && (
          <div className="mt-auto">
             <button className="text-white font-medium hover:text-blue-100 flex items-center gap-2 transition-colors text-sm border-b border-transparent hover:border-blue-100 pb-0.5 w-fit">
               {content.actionText} 
               <ArrowRight className="w-4 h-4 ml-1" />
             </button>
          </div>
        )}
      </div>
      {content.img && (
        <div className="md:w-1/2 w-full h-48 md:h-auto overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af] via-transparent to-transparent z-10 md:block hidden"></div>
          <img src={content.img} className="w-full h-full object-cover object-left-top" alt="Registration Banner" />
        </div>
      )}
    </div>
  );
}

function IGemSectionTitle({ content }: { content: LocalizedContent }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight mt-16 mb-8 w-full">
      {content.title}
    </h2>
  );
}

function IGemWinnersLayout({ content }: { content: LocalizedContent[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
      {content.map((item, idx) => (
        <div key={idx} className="flex flex-col group">
          <h3 className="text-base font-bold text-slate-800 mb-3">{item.tag}</h3>
          <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden mb-4 cursor-pointer shadow-sm group-hover:shadow-md transition-shadow">
            {item.img && <img src={item.img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={item.title} />}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-12 h-12 rounded-full border border-white/60 flex items-center justify-center text-white/80 group-hover:scale-110 group-hover:border-white group-hover:text-white transition-all bg-black/30 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
               </div>
            </div>
          </div>
          <div className="text-center px-4">
             <h4 className="font-bold text-slate-900 text-lg flex items-center justify-center gap-1 cursor-pointer hover:underline">
                {item.title} 
                <ArrowRight className="w-4 h-4 transform -rotate-45 text-slate-400" />
             </h4>
             {item.location && <p className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1.5"><span className="w-3.5 h-3.5 rounded-full bg-slate-200 inline-block border-2 border-white shadow-sm"></span> {item.location}</p>}
             <p className="text-xs text-slate-600 mt-2 line-clamp-2 md:px-4 leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function IGemBannerLayout({ content }: { content: LocalizedContent }) {
  return (
    <div className="w-full mb-16 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex flex-col md:flex-row shadow-sm">
      {content.img && (
        <div className="md:w-1/3 w-full h-48 md:h-auto overflow-hidden">
          <img src={content.img} alt="Banner" className="w-full h-full object-cover object-center" />
        </div>
      )}
      <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
        <h3 className="text-xl font-bold text-slate-900 mb-3">{content.title}</h3>
        <p className="text-sm text-slate-600 mb-6 max-w-prose leading-relaxed">{content.description}</p>
        {content.actionText && (
          <button className="text-teal-600 font-medium text-sm hover:underline mr-auto">
            {content.actionText}
          </button>
        )}
      </div>
    </div>
  );
}

function IGemNewsGridLayout({ content }: { content: LocalizedContent[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
      {content.map((item, idx) => (
        <div key={idx} className="bg-slate-50/50 rounded-xl overflow-hidden border border-slate-100 flex flex-col group hover:shadow-md transition-shadow">
          {item.img && (
            <div className="aspect-[4/3] overflow-hidden relative bg-slate-200">
               <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          )}
          <div className="p-6 flex flex-col flex-1">
            <h4 className="font-bold text-sm text-slate-900 mb-3 leading-snug">{item.title}</h4>
            <p className="text-[13px] text-slate-600 mb-6 line-clamp-4 leading-relaxed">{item.description}</p>
            <div className="mt-auto">
               <button className="text-teal-600 font-medium text-xs hover:underline flex items-center gap-1">
                 {item.actionText || 'Read more'} <ArrowRight className="w-3 h-3 transform -rotate-45" />
               </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function IGemResourceGridLayout({ content }: { content: LocalizedContent[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-12">
      {content.map((item, idx) => (
        <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 bg-white group cursor-pointer flex flex-col hover:shadow-md transition-shadow hover:border-slate-300">
          {item.img && (
            <div className="aspect-[2/1] overflow-hidden bg-slate-100">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          )}
          <div className="p-4 flex items-start gap-3 bg-white">
            <div className="mt-0.5">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 transform -rotate-45">
                  <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
               </svg>
            </div>
            <div>
              <p className="text-[13px] font-bold text-slate-800 leading-tight mb-1 group-hover:text-teal-600 transition-colors">{item.title}</p>
              {item.link && <p className="text-[11px] text-slate-500">{item.link}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function IGemSponsorsLayout() {
  return (
    <div className="w-full mb-24 mt-8">
      <div className="mb-12">
        <h3 className="text-sm font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2 uppercase tracking-wide">Platinum Partner</h3>
        <div className="flex gap-12 sm:gap-24 items-center flex-wrap opacity-80">
           <div className="font-black text-3xl tracking-tighter italic text-blue-600">XXIDT</div>
           <div className="flex items-center gap-2">
              <span className="font-black text-2xl tracking-[0.2em] text-teal-600 uppercase">Twist</span>
              <span className="text-xs tracking-wider text-slate-500 uppercase mt-1">Bioscience</span>
           </div>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-sm font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2 uppercase tracking-wide">Partner Plus</h3>
        <div className="flex gap-12 items-center flex-wrap opacity-80">
           <div className="flex items-center gap-2">
              <div className="text-teal-500 font-bold text-4xl italic">G</div>
              <div className="font-bold text-2xl text-slate-800">GenScript</div>
           </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2 uppercase tracking-wide">Partner</h3>
        <div className="flex gap-12 items-center flex-wrap opacity-80">
           <div className="font-black text-3xl text-slate-800 uppercase tracking-[0.15em]">ANTHROP\C</div>
        </div>
      </div>
    </div>
  );
}