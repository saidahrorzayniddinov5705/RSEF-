import * as fs from 'fs';

let content = fs.readFileSync('src/pages/registerForm.tsx', 'utf8');

const regex = /<div className="flex items-center gap-1\.5 flex-col">\s*<div className="flex items-center text-slate-800 text-3xl font-black tracking-tighter">\s*RSEF\s*<\/div>\s*<\/div>/g;

content = content.replace(regex, '');

fs.writeFileSync('src/pages/registerForm.tsx', content, 'utf8');
