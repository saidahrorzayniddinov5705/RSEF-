import fs from 'fs';
let content = fs.readFileSync('src/pages/registrationInfo.tsx', 'utf-8');

// Insert import 
content = content.replace("import { cn }", "import { guidelinesTranslations } from '../data/guidelinesTranslations';\nimport { cn }");

// Insert const t 
content = content.replace("const { locale } = useParams();", "const { locale } = useParams();\n  const t = guidelinesTranslations[(locale as keyof typeof guidelinesTranslations) || 'en'] || guidelinesTranslations.en;\n  const faqsItems = t.faqs;");

// Update JSX
content = content.replace(/Application <span class(.|\n)*?<\/p>/m, 
`{t.hero.title[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400 italic">{t.hero.title[1]}</span>
             </h1>
             <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mb-10">
               {t.hero.desc}
             </p>`);

content = content.replace('Apply <ArrowRight className="w-5 h-5" />', '{t.hero.applyBtn} <ArrowRight className="w-5 h-5" />');

content = content.replace('Road to RSEF 2026', '{t.road.title}');

content = content.replace(/<p className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-xs font-bold uppercase tracking-widest mb-4">.*?20 April – 15 May<\/p>(\s*)<h3 className="text-2xl font-bold text-slate-900 mb-3">.*?<\/h3>(\s*)<p className="text-slate-600 leading-relaxed text-sm md:text-base">.*?<\/p>/, 
`<p className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-xs font-bold uppercase tracking-widest mb-4"><CalendarRange className="w-3.5 h-3.5 mr-1.5" />{t.road.s1Label}</p>
                              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.road.s1Title}</h3>
                              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{t.road.s1Desc}</p>`);

content = content.replace(/<p className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">.*?15 May – 20 May<\/p>(\s*)<h3 className="text-2xl font-bold text-slate-900 mb-3">.*?<\/h3>(\s*)<p className="text-slate-600 leading-relaxed text-sm md:text-base">.*?<\/p>/, 
`<p className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4"><CalendarRange className="w-3.5 h-3.5 mr-1.5" />{t.road.s2Label}</p>
                              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.road.s2Title}</h3>
                              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{t.road.s2Desc}</p>`);

content = content.replace(/<p className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">.*?20 May – 25 May<\/p>(\s*)<h3 className="text-2xl font-bold text-slate-900 mb-3">.*?<\/h3>(\s*)<p className="text-slate-600 leading-relaxed text-sm md:text-base">.*?<\/p>/, 
`<p className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4"><CalendarRange className="w-3.5 h-3.5 mr-1.5" />{t.road.s3Label}</p>
                              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.road.s3Title}</h3>
                              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{t.road.s3Desc}</p>`);

content = content.replace(/<p className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-widest mb-4">.*?25 May<\/p>(\s*)<h3 className="text-2xl font-bold text-slate-900 mb-3">.*?<\/h3>(\s*)<p className="text-slate-600 leading-relaxed text-sm md:text-base">.*?<\/p>/, 
`<p className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-widest mb-4"><CalendarRange className="w-3.5 h-3.5 mr-1.5" />{t.road.s4Label}</p>
                              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.road.s4Title}</h3>
                              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{t.road.s4Desc}</p>`);

content = content.replace(/<p className="inline-flex items-center px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-widest mb-4">.*?26 May<\/p>(\s*)<h3 className="text-2xl font-bold text-slate-900 mb-3">.*?<\/h3>(\s*)<p className="text-slate-600 leading-relaxed text-sm md:text-base">.*?<\/p>/, 
`<p className="inline-flex items-center px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-widest mb-4"><CalendarRange className="w-3.5 h-3.5 mr-1.5" />{t.road.s5Label}</p>
                              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.road.s5Title}</h3>
                              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{t.road.s5Desc}</p>`);

content = content.replace(/<h3 className="text-2xl font-bold text-slate-900 mb-4">Project Abstract<\/h3>(.|\n)*?<p className="text-sm italic text-slate-500">.*?<\/p>\n                     <\/div>/m, 
`<h3 className="text-2xl font-bold text-slate-900 mb-4">{t.guidelines.abstractTitle}</h3>
                     <p className="text-slate-600 mb-6 text-base leading-relaxed">{t.guidelines.abstractDesc}</p>
                     <ul className="space-y-4 text-base text-slate-700 font-medium">
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" /> {t.guidelines.abstractChecks[0]}</li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" /> {t.guidelines.abstractChecks[1]}</li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" /> {t.guidelines.abstractChecks[2]}</li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" /> {t.guidelines.abstractChecks[3]}</li>
                     </ul>
                     <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                       <p className="text-sm italic text-slate-500">{t.guidelines.abstractNote}</p>
                     </div>`);


content = content.replace(/<h3 className="text-2xl font-bold text-slate-900 mb-4">Personal Statement<\/h3>(.|\n)*?What do you hope to learn from participating\?<\/li>\n                     <\/ul>/m,
`<h3 className="text-2xl font-bold text-slate-900 mb-4">{t.guidelines.statementTitle}</h3>
                     <p className="text-slate-600 mb-6 text-base leading-relaxed">{t.guidelines.statementDesc}</p>
                     <ul className="space-y-4 text-base text-slate-700 font-medium">
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-sky-400 shrink-0" /> {t.guidelines.statementChecks[0]}</li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-sky-400 shrink-0" /> {t.guidelines.statementChecks[1]}</li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-sky-400 shrink-0" /> {t.guidelines.statementChecks[2]}</li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-sky-400 shrink-0" /> {t.guidelines.statementChecks[3]}</li>
                     </ul>`);

content = content.replace(/<Award className="w-6 h-6 text-teal-400" \/> Judging Criteria/, '<Award className="w-6 h-6 text-teal-400" /> {t.guidelines.judgingTitle}');
content = content.replace('<span>Scientific merit & methodology</span>', '<span>{t.guidelines.judging1}</span>');
content = content.replace('<span>Originality & innovation</span>', '<span>{t.guidelines.judging2}</span>');
content = content.replace('<span>Clarity of presentation</span>', '<span>{t.guidelines.judging3}</span>');
content = content.replace('<span>Practical impact</span>', '<span>{t.guidelines.judging4}</span>');

content = content.replace(/<FileText className="w-6 h-6 text-blue-400" \/> Submission Format/, '<FileText className="w-6 h-6 text-blue-400" /> {t.guidelines.formatTitle}');
content = content.replace('<p className="font-bold">Written Report</p>', '<p className="font-bold">{t.guidelines.format1T}</p>');
content = content.replace('<p className="font-bold">Poster</p>', '<p className="font-bold">{t.guidelines.format2T}</p>');
content = content.replace('<p className="font-bold">3-Minute Video</p>', '<p className="font-bold">{t.guidelines.format3T}</p>');

content = content.replace('<p className="text-sm text-slate-400">8–15 pages, PDF format</p>', '<p className="text-sm text-slate-400">{t.guidelines.format1D}</p>');
content = content.replace('<p className="text-sm text-slate-400">A1 size, PDF or print-ready file</p>', '<p className="text-sm text-slate-400">{t.guidelines.format2D}</p>');
content = content.replace('<p className="text-sm text-slate-400">Uploaded to YouTube (unlisted) or Google Drive</p>', '<p className="text-sm text-slate-400">{t.guidelines.format3D}</p>');

content = content.replace('Frequently Asked Questions', '{t.faqTitle}');
content = content.replace('faqs.map((faq, idx)', 'faqsItems.map((faq: any, idx: number)');

content = content.replace(/<h3 className="text-xl font-bold">Ready to Apply\?<\/h3>\n                        <p className="text-sm text-emerald-100 mt-1">Applications close on April 15<\/p>/, 
`<h3 className="text-xl font-bold">{t.sidebar.readyTitle}</h3>
                        <p className="text-sm text-emerald-100 mt-1">{t.sidebar.readyDesc}</p>`);

content = content.replace(/className="w-full block text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-colors mb-4">\n                           Apply\n                        <\/Link>\n                        <p className="text-xs text-center text-slate-500">\n                           By participating, you agree to our Code of Conduct and competition rules.\n                        <\/p>/, 
`className="w-full block text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-colors mb-4">
                           {t.sidebar.applyBtn}
                        </Link>
                        <p className="text-xs text-center text-slate-500">
                           {t.sidebar.agreement}
                        </p>`);

content = content.replace(/<h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Eligibility<\/h3>\n                     <ul className="space-y-3 text-sm text-slate-600">\n                        <li className="flex items-start gap-2">\n                           <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" \/>\n                           Open to students aged 16–22 enrolled in secondary school or university.\n                        <\/li>\n                        <li className="flex items-start gap-2">\n                           <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" \/>\n                           Individual and team entries \(max 3 members\) are welcome.\n                        <\/li>\n                     <\/ul>/, 
`<h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">{t.sidebar.eligibilityTitle}</h3>
                     <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex items-start gap-2">
                           <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                           {t.sidebar.elig1}
                        </li>
                        <li className="flex items-start gap-2">
                           <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                           {t.sidebar.elig2}
                        </li>
                     </ul>`);

content = content.replace(/<AlertCircle className="w-5 h-5" \/> Code of Conduct/, '<AlertCircle className="w-5 h-5" /> {t.sidebar.codeTitle}');
content = content.replace(/All submitted work must be the student's own. Plagiarism or falsified data will result in immediate disqualification. Original research must be conducted within the last 12 months./, '{t.sidebar.codeDesc}');

content = content.replace(/<FileText className="w-5 h-5" \/> Project Requirements/, '<FileText className="w-5 h-5" /> {t.sidebar.reqTitle}');
content = content.replace(/<strong>Original research<\/strong> conducted within the last 12 months./, '{t.sidebar.req1}');
content = content.replace(/<strong>Written report<\/strong> \(8-15 pages, PDF\)./, '{t.sidebar.req2}');
content = content.replace(/<strong>Poster<\/strong> for presentation \(print-ready PDF\)./, '{t.sidebar.req3}');
content = content.replace(/<strong>Video submission<\/strong> \(3-minute pitch\)./, '{t.sidebar.req4}');
content = content.replace(/<strong>Crucial:<\/strong> Projects must not have won a prior national level competition./, '{t.sidebar.req5}');

content = content.replace(/const faqs = \[[\s\S]*?\];\s*/m, ''); // remove the faqs array

fs.writeFileSync('src/pages/registrationInfo.tsx', content, 'utf-8');
