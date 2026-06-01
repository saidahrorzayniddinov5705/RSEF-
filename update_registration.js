import * as fs from 'fs';

let content = fs.readFileSync('src/pages/registrationInfo.tsx', 'utf8');

// Replace tabNames
content = content.replace(
  'en: { timeline: "Process & Timeline", guidelines: "Guidelines", judging: "Judging & Format", faq: "FAQs" },',
  'en: { timeline: "Process & Timeline", guidelines: "Online selection requirements", judging: "Judging & Format", faq: "FAQs" },'
);
content = content.replace(
  'uz: { timeline: "Jarayon va muddatlar", guidelines: "Qoidalar", judging: "Baholash va Format", faq: "Savol-javoblar" },',
  'uz: { timeline: "Jarayon va muddatlar", guidelines: "Onlayn tanlov talablari", judging: "Baholash va Format", faq: "Savol-javoblar" },'
);
content = content.replace(
  'ru: { timeline: "Процесс и сроки", guidelines: "Правила", judging: "Оценка и Формат", faq: "Вопросы" }',
  'ru: { timeline: "Процесс и сроки", guidelines: "Требования к онлайн-отбору", judging: "Оценка и Формат", faq: "Вопросы" }'
);

// Remove format3 block
const format3BlockRegex = /\s*<li className="flex items-start gap-4 p-4 rounded-xl bg-slate-800\/50 backdrop-blur-sm border border-slate-700">\s*<div className="bg-slate-700\/50 p-2 rounded-lg"><Upload className="w-5 h-5 text-white" \/><\/div>\s*<div>\s*<p className="font-bold">\{t\.guidelines\.format3T\}<\/p>\s*<p className="text-sm text-slate-400">\{t\.guidelines\.format3D\}<\/p>\s*<\/div>\s*<\/li>/;
content = content.replace(format3BlockRegex, '');

// Update req list
const reqListOld = `<li className="flex items-start gap-2">
                           <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                           {t.sidebar.req4}
                        </li>
                        <li className="flex items-start gap-2">
                           <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                           {t.sidebar.req5}
                        </li>`;
const reqListNew = `<li className="flex items-start gap-2">
                           <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                           {t.sidebar.req4}
                        </li>`;

content = content.replace(reqListOld, reqListNew);

fs.writeFileSync('src/pages/registrationInfo.tsx', content, 'utf8');
console.log('registrationInfo.tsx updated');
