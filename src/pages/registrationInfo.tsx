import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, Upload, Users, Milestone, BookOpen, AlertCircle, CalendarRange, Award, ChevronDown, Tag } from 'lucide-react';
import { guidelinesTranslations } from '../data/guidelinesTranslations';
import { cn } from '../lib/utils';

export function RegistrationInfoPage() {
  const { locale } = useParams();
  const t = guidelinesTranslations[(locale as keyof typeof guidelinesTranslations) || 'en'] || guidelinesTranslations.en;
  const faqsItems = t.faqs;

  const [activeTab, setActiveTab] = useState<'timeline' | 'guidelines' | 'judging' | 'faq'>('timeline');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
     setOpenFaq(openFaq === idx ? null : idx);
  };

  const tabNames = {
    en: { timeline: "Process & Timeline", guidelines: "Guidelines", judging: "Judging & Format", faq: "FAQs" },
    uz: { timeline: "Jarayon va muddatlar", guidelines: "Qoidalar", judging: "Baholash va Format", faq: "Savol-javoblar" },
    ru: { timeline: "Процесс и сроки", guidelines: "Правила", judging: "Оценка и Формат", faq: "Вопросы" }
  };
  const tTabs = tabNames[locale as keyof typeof tabNames] || tabNames.en;

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#18181b] overflow-hidden relative border-t border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 via-[#18181b]/90 to-[#18181b] z-10"></div>
        
        {/* Background Image Area (Right aligned) */}
        <div className="absolute top-0 right-0 w-full md:w-3/5 h-full z-0 opacity-30 md:opacity-60 xl:opacity-80">
           <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-[#18181b] via-[#18181b]/80 to-transparent z-10" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent z-10 md:hidden" />
           <img 
               src="/registration.jpg" 
               alt="Registration info background" 
               className="w-full h-full object-cover object-center md:object-[70%_30%]" 
           />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-20">
          <div className="max-w-3xl">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-semibold rounded-full mb-6 uppercase tracking-widest pl-2">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                RSEF 2026
             </div>
             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
               {t.hero.title[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400 italic">{t.hero.title[1]}</span>
             </h1>
             <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mb-4">
               {t.hero.desc}
             </p>
             <p className="text-emerald-400 text-lg md:text-xl font-bold mb-10 max-w-2xl">
               {t.hero.motto2}
             </p>
             <div className="flex gap-4">
                <Link to={`/${locale}/apply`} className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all hover:translate-x-1 hover:-translate-y-1 shadow-lg shadow-emerald-500/20">
                   {t.hero.applyBtn} <ArrowRight className="w-5 h-5" />
                </Link>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-8">
               {/* Tabs Navigation */}
               <div className="flex overflow-x-auto space-x-2 md:space-x-4 mb-8 pb-2 no-scrollbar border-b border-slate-200">
                  <button 
                    onClick={() => setActiveTab('timeline')}
                    className={cn("px-4 py-3 font-bold text-sm md:text-base whitespace-nowrap transition-colors border-b-2", activeTab === 'timeline' ? "border-teal-500 text-teal-600" : "border-transparent text-slate-500 hover:text-slate-900")}
                  >
                    {tTabs.timeline}
                  </button>
                  <button 
                    onClick={() => setActiveTab('guidelines')}
                    className={cn("px-4 py-3 font-bold text-sm md:text-base whitespace-nowrap transition-colors border-b-2", activeTab === 'guidelines' ? "border-teal-500 text-teal-600" : "border-transparent text-slate-500 hover:text-slate-900")}
                  >
                    {tTabs.guidelines}
                  </button>
                  <button 
                    onClick={() => setActiveTab('judging')}
                    className={cn("px-4 py-3 font-bold text-sm md:text-base whitespace-nowrap transition-colors border-b-2", activeTab === 'judging' ? "border-teal-500 text-teal-600" : "border-transparent text-slate-500 hover:text-slate-900")}
                  >
                    {tTabs.judging}
                  </button>
                  <button 
                    onClick={() => setActiveTab('faq')}
                    className={cn("px-4 py-3 font-bold text-sm md:text-base whitespace-nowrap transition-colors border-b-2", activeTab === 'faq' ? "border-teal-500 text-teal-600" : "border-transparent text-slate-500 hover:text-slate-900")}
                  >
                    {tTabs.faq}
                  </button>
               </div>

               {/* Tab Contents */}
               {/* Process & Timeline */}
               {activeTab === 'timeline' && (
               <div className="mb-24 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-4xl font-extrabold text-slate-900 mb-12 flex items-center gap-4">
                     <Milestone className="w-10 h-10 text-teal-500 bg-teal-50 p-2 rounded-xl" /> 
                     {t.road.title}
                  </h2>
                  <div className="relative pl-4 md:pl-0">
                     <div className="absolute left-[39px] md:left-[50px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-teal-400 via-blue-400 to-rose-400 opacity-50"></div>
                     <div className="space-y-16 relative">
                        {/* Step 1 */}
                        <div className="flex gap-6 md:gap-10 relative group">
                           <div className="relative">
                             <div className="w-12 h-12 md:w-14 md:h-14 bg-white border-4 border-teal-400 rounded-full flex items-center justify-center font-bold text-lg md:text-xl text-teal-500 shadow-md z-10 transition-transform group-hover:scale-110 ml-4 md:ml-6 mt-1">01</div>
                           </div>
                           <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow group-hover:border-teal-100">
                              <p className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-xs font-bold uppercase tracking-widest mb-4"><CalendarRange className="w-3.5 h-3.5 mr-1.5" />{t.road.s1Label}</p>
                              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.road.s1Title}</h3>
                              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{t.road.s1Desc}</p>
                           </div>
                        </div>
                        {/* Step 2 */}
                        <div className="flex gap-6 md:gap-10 relative group">
                           <div className="relative">
                             <div className="w-12 h-12 md:w-14 md:h-14 bg-white border-4 border-blue-400 rounded-full flex items-center justify-center font-bold text-lg md:text-xl text-blue-500 shadow-md z-10 transition-transform group-hover:scale-110 ml-4 md:ml-6 mt-1">02</div>
                           </div>
                           <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow group-hover:border-blue-100">
                              <p className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4"><CalendarRange className="w-3.5 h-3.5 mr-1.5" />{t.road.s2Label}</p>
                              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.road.s2Title}</h3>
                              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{t.road.s2Desc}</p>
                           </div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex gap-6 md:gap-10 relative group">
                           <div className="relative">
                             <div className="w-12 h-12 md:w-14 md:h-14 bg-white border-4 border-indigo-400 rounded-full flex items-center justify-center font-bold text-lg md:text-xl text-indigo-500 shadow-md z-10 transition-transform group-hover:scale-110 ml-4 md:ml-6 mt-1">03</div>
                           </div>
                           <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow group-hover:border-indigo-100">
                              <p className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4"><CalendarRange className="w-3.5 h-3.5 mr-1.5" />{t.road.s3Label}</p>
                              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.road.s3Title}</h3>
                              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{t.road.s3Desc}</p>
                           </div>
                        </div>
                        {/* Step 4 */}
                        <div className="flex gap-6 md:gap-10 relative group">
                           <div className="relative">
                             <div className="w-12 h-12 md:w-14 md:h-14 bg-white border-4 border-purple-400 rounded-full flex items-center justify-center font-bold text-lg md:text-xl text-purple-500 shadow-md z-10 transition-transform group-hover:scale-110 ml-4 md:ml-6 mt-1">04</div>
                           </div>
                           <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow group-hover:border-purple-100">
                              <p className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-widest mb-4"><CalendarRange className="w-3.5 h-3.5 mr-1.5" />{t.road.s4Label}</p>
                              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.road.s4Title}</h3>
                              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{t.road.s4Desc}</p>
                           </div>
                        </div>
                        {/* Step 5 */}
                        <div className="flex gap-6 md:gap-10 relative group">
                           <div className="relative">
                             <div className="w-12 h-12 md:w-14 md:h-14 bg-white border-4 border-rose-400 rounded-full flex items-center justify-center font-bold text-lg md:text-xl text-rose-500 shadow-md z-10 transition-transform group-hover:scale-110 ml-4 md:ml-6 mt-1">05</div>
                           </div>
                           <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow group-hover:border-rose-100">
                              <p className="inline-flex items-center px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-widest mb-4"><CalendarRange className="w-3.5 h-3.5 mr-1.5" />{t.road.s5Label}</p>
                              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.road.s5Title}</h3>
                              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{t.road.s5Desc}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               )}

               {/* Guidelines Grid */}
               {activeTab === 'guidelines' && (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-24">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                     <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                     <div className="w-14 h-14 bg-emerald-50 text-emerald-500 flex items-center justify-center rounded-2xl mb-8">
                        <BookOpen className="w-7 h-7" />
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.guidelines.abstractTitle}</h3>
                     <p className="text-slate-600 mb-6 text-base leading-relaxed">{t.guidelines.abstractDesc}</p>
                     <ul className="space-y-4 text-base text-slate-700 font-medium">
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" /> {t.guidelines.abstractChecks[0]}</li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" /> {t.guidelines.abstractChecks[1]}</li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" /> {t.guidelines.abstractChecks[2]}</li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" /> {t.guidelines.abstractChecks[3]}</li>
                     </ul>
                     <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                       <p className="text-sm italic text-slate-500">{t.guidelines.abstractNote}</p>
                     </div>
                  </div>

                  <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                     <div className="w-14 h-14 bg-sky-50 text-sky-500 flex items-center justify-center rounded-2xl mb-8">
                        <Users className="w-7 h-7" />
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.guidelines.statementTitle}</h3>
                     <p className="text-slate-600 mb-6 text-base leading-relaxed">{t.guidelines.statementDesc}</p>
                     <ul className="space-y-4 text-base text-slate-700 font-medium">
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-sky-400 shrink-0" /> {t.guidelines.statementChecks[0]}</li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-sky-400 shrink-0" /> {t.guidelines.statementChecks[1]}</li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-sky-400 shrink-0" /> {t.guidelines.statementChecks[2]}</li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-sky-400 shrink-0" /> {t.guidelines.statementChecks[3]}</li>
                     </ul>
                  </div>
               </div>

               <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-500 flex items-center justify-center rounded-2xl mb-8">
                     <Tag className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.guidelines.categoriesTitle}</h3>
                  <p className="text-slate-600 mb-8 text-base leading-relaxed max-w-3xl">{t.guidelines.categoriesDesc}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                     {t.guidelines.categoriesList.map((cat, idx) => (
                       <div key={idx} className="flex items-start gap-3 group">
                          <CheckCircle2 className="w-5 h-5 text-indigo-300 group-hover:text-indigo-500 transition-colors shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors leading-snug">{cat}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
            )}

               {/* Judging Criteria & Submission Details */}
               {activeTab === 'judging' && (
               <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden mb-20 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="absolute right-0 bottom-0 w-64 h-64 bg-teal-500/20 rounded-full filter blur-[80px]"></div>
                  <div className="absolute left-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full filter blur-[80px]"></div>
                  
                  <div className="relative z-10">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                           <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                              <Award className="w-6 h-6 text-teal-400" /> {t.guidelines.judgingTitle}
                           </h3>
                           <div className="space-y-6">
                              <div>
                                 <div className="flex justify-between text-sm font-bold mb-2">
                                    <span>{t.guidelines.judging1}</span>
                                    <span className="text-teal-400">30%</span>
                                 </div>
                                 <div className="w-full bg-slate-800 rounded-full h-2">
                                    <div className="bg-teal-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                                 </div>
                              </div>
                              <div>
                                 <div className="flex justify-between text-sm font-bold mb-2">
                                    <span>{t.guidelines.judging2}</span>
                                    <span className="text-blue-400">30%</span>
                                 </div>
                                 <div className="w-full bg-slate-800 rounded-full h-2">
                                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                                 </div>
                              </div>
                              <div>
                                 <div className="flex justify-between text-sm font-bold mb-2">
                                    <span>{t.guidelines.judging3}</span>
                                    <span className="text-indigo-400">20%</span>
                                 </div>
                                 <div className="w-full bg-slate-800 rounded-full h-2">
                                    <div className="bg-indigo-400 h-2 rounded-full" style={{ width: '20%' }}></div>
                                 </div>
                              </div>
                              <div>
                                 <div className="flex justify-between text-sm font-bold mb-2">
                                    <span>{t.guidelines.judging4}</span>
                                    <span className="text-purple-400">20%</span>
                                 </div>
                                 <div className="w-full bg-slate-800 rounded-full h-2">
                                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '20%' }}></div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div>
                           <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                              <FileText className="w-6 h-6 text-blue-400" /> {t.guidelines.formatTitle}
                           </h3>
                           <ul className="space-y-4">
                              <li className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                                 <div className="bg-slate-700/50 p-2 rounded-lg"><BookOpen className="w-5 h-5 text-white" /></div>
                                 <div>
                                    <p className="font-bold">{t.guidelines.format1T}</p>
                                    <p className="text-sm text-slate-400">{t.guidelines.format1D}</p>
                                 </div>
                              </li>
                              <li className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                                 <div className="bg-slate-700/50 p-2 rounded-lg"><AlertCircle className="w-5 h-5 text-white" /></div>
                                 <div>
                                    <p className="font-bold">{t.guidelines.format2T}</p>
                                    <p className="text-sm text-slate-400">{t.guidelines.format2D}</p>
                                 </div>
                              </li>
                              <li className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                                 <div className="bg-slate-700/50 p-2 rounded-lg"><Upload className="w-5 h-5 text-white" /></div>
                                 <div>
                                    <p className="font-bold">{t.guidelines.format3T}</p>
                                    <p className="text-sm text-slate-400">{t.guidelines.format3D}</p>
                                 </div>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
               )}

               {/* FAQs */}
               {activeTab === 'faq' && (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-24">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8 pl-4 border-l-4 border-teal-500">{t.faqTitle}</h2>
                  <div className="space-y-4">
                     {faqsItems.map((faq: any, idx: number) => (
                        <div key={idx} className="bg-white border text-sm border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all hover:border-slate-300">
                           <button 
                             onClick={() => toggleFaq(idx)}
                             className="w-full text-left p-6 flex items-center justify-between font-bold text-slate-900 gap-4"
                           >
                              <span className="flex items-start gap-3">
                                 <span className="text-teal-500 shrink-0">Q.</span>
                                 <span>{faq.q}</span>
                              </span>
                              <ChevronDown className={cn("w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300", openFaq === idx ? "rotate-180" : "rotate-0")} />
                           </button>
                           
                           {/* Using simple conditional rendering or a max-height transition */}
                           <div className={cn("overflow-hidden transition-all duration-300 px-6", openFaq === idx ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0")}>
                               <div className="h-px w-full bg-slate-100 mb-4"></div>
                               <p className="text-slate-600 leading-relaxed pl-7 border-l-2 border-slate-100">{faq.a}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               )}

            </div>

            {/* Sidebar Sticky Area */}
            <div className="lg:col-span-4">
               <div className="sticky top-24 space-y-6">
                  
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                     <div className="bg-emerald-500 p-6 text-white text-center">
                        <h3 className="text-xl font-bold">{t.sidebar.readyTitle}</h3>
                        <p className="text-sm text-emerald-100 mt-1">{t.sidebar.readyDesc}</p>
                     </div>
                     <div className="p-6">
                        <Link to={`/${locale}/apply`} className="w-full flex items-center justify-center gap-2 text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all hover:-translate-y-1 shadow-lg mb-4">
                           {t.sidebar.applyBtn} <ArrowRight className="w-4 h-4" />
                        </Link>
                        <p className="text-xs text-center text-slate-500">
                           {t.sidebar.agreement}
                        </p>
                     </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                     <h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">{t.sidebar.eligibilityTitle}</h3>
                     <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex items-start gap-2">
                           <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                           {t.sidebar.elig1}
                        </li>
                        <li className="flex items-start gap-2">
                           <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                           {t.sidebar.elig2}
                        </li>
                     </ul>
                  </div>

                  <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 shadow-sm mb-6">
                     <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" /> {t.sidebar.codeTitle}
                     </h3>
                     <p className="text-sm text-amber-800/80 leading-relaxed">
                        {t.sidebar.codeDesc}
                     </p>
                  </div>

                  <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-6 shadow-sm">
                     <h3 className="font-bold text-indigo-900 mb-4 pb-2 border-b border-indigo-200/50 flex items-center gap-2">
                        <FileText className="w-5 h-5" /> {t.sidebar.reqTitle}
                     </h3>
                     <ul className="space-y-3 text-sm text-indigo-900/80">
                        <li className="flex items-start gap-2">
                           <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                           {t.sidebar.req1}
                        </li>
                        <li className="flex items-start gap-2">
                           <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                           {t.sidebar.req2}
                        </li>
                        <li className="flex items-start gap-2">
                           <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                           {t.sidebar.req3}
                        </li>
                        <li className="flex items-start gap-2">
                           <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                           {t.sidebar.req4}
                        </li>
                        <li className="flex items-start gap-2">
                           <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                           {t.sidebar.req5}
                        </li>
                     </ul>
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
