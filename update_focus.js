import * as fs from 'fs';

let content = fs.readFileSync('src/pages/apply.tsx', 'utf8');

const targetClass = 'w-full rounded-md border-0 bg-transparent px-0 py-0 focus:ring-0 disabled:bg-transparent resize-none placeholder:text-slate-400/50 font-serif text-lg text-[#0c182c]';
const newClass = 'w-full rounded-xl border-2 border-slate-800 bg-white px-4 py-3 focus:outline-none focus:ring-4 focus:ring-slate-800/10 disabled:bg-slate-50 resize-none placeholder:text-slate-400/50 font-serif text-lg text-[#0c182c]';

content = content.split(targetClass).join(newClass);

fs.writeFileSync('src/pages/apply.tsx', content, 'utf8');
console.log('done replacing blitz inputs');
